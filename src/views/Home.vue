<template>
  <v-container>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
    <v-row no-gutters>
      <v-col class="my-5 sticky" cols="3" lg="3" sm="12" xs="12">
        <div class="sticky">
          <v-date-picker class="" full-width v-model="dates" range></v-date-picker>
          <v-text-field
            v-model="dateRangeText"
            label="Date range"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="9" lg="9" sm="12" xs="12">
        <div v-if="loading" class="d-flex justify-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <div v-for="(item, index) in images" v-bind:key="index">
          <ImageCard
            @like="like"
            @dislike="dislike"
            :liked="likedSet"
            :disliked="dislikedSet"
            :item="item"
            :loading="loading"
            @copy="copy"
          />
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="js">
import Axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
import Vue from 'vue';
import ImageCard from '../components/ImageCard.vue';
export default Vue.extend({
  name: 'Home',
  components: { ImageCard },
  data() {
    return {
      dates: [this.$store.state.startDate, this.$store.state.endDate],
      images: [],
      loading: true,
      error: "",
      likedSet: new Set(),
      dislikedSet: new Set(),
      snackbar: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapGetters(['startDate', 'endDate', 'liked', 'disliked']),
    dateRangeText: function () {
      return `${this.startDate} ~ ${this.endDate}`;
    },
  },
  methods: {
    ...mapMutations([
      "setStartDate",
      "setEndDate",
      "addLike",
      "removeLike",
      "addDislike",
      "removeDislike",
      "init"
    ]),
    copy() {
      this.snackbarText = "Copied url to clipboard"
      this.snackbar = true
    },
    like(item) {
      if (this.likedSet && this.likedSet.has(item.date)) {
        this.removeLike(item.date)
      } else {
        this.addLike(item.date)
        this.removeDislike(item.date)
      }
    },
    dislike(item) {
      if (this.dislikedSet.has(item.date)) {
        this.removeDislike(item.date)
        } else {
        this.addDislike(item.date)
        this.removeLike(item.date)
      }
    },
    getDifferenceInDays(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60 * 60 * 24);
    },
    fetchData() {
      return Axios.get(`https://api.nasa.gov/planetary/apod`, {
        params: {
          api_key: 'o2PAPO1caisJqTuUiiIQhW7G7TuKqOylSnFybBxx',
          start_date: this.startDate,
          end_date: this.endDate,
        },
      }).then((res) => {
        return res.data;
      }).catch(err => {
        console.error(err);
      });
    },
    async updateImages() {
      this.error = false;
      if (!this.startDate || !this.endDate) return
      this.loading = true;
      const startTime = (new Date(this.startDate)).getTime()
      const endTime = (new Date(this.endDate)).getTime()
      const now = (new Date()).getTime();
      if (startTime > now || endTime > now) {
        this.error = "Set a date before today"
      }
      const days = this.getDifferenceInDays(new Date(this.startDate), new Date(this.endDate));
      this.images = Array(days).fill(0).map(() => {return  {loading: true}})
      try {
        this.images = await this.fetchData();
        this.loading = false;
        console.log(this.images);
      } catch (error) {
        this.error = `Request Error: ${error}`
      }
    }
  },
  watch: {
    dates: function (val) {
      this.setStartDate(val[0]);
      this.setEndDate(val[1]);
      this.updateImages()
    },
    liked: function(val) {
      this.likedSet = new Set(val)
    },
    disliked: function(val) {
      this.dislikedSet = new Set(val)
    },
  },
   mounted() {
    // this.init()
    this.likedSet = new Set(this.liked)
    this.dislikedSet = new Set(this.disliked)
    this.updateImages()
  },
});
</script>

<style>
.fixed {
  position: fixed;
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 5rem;
}
</style>
