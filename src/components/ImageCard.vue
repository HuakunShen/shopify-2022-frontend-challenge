<template>
  <v-card v-if="!loading" class="mx-auto my-5" max-width="70%">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="250" :src="item.url"></v-img>

    <v-card-title class="d-flex justify-space-between"
      >{{ item.title }}
      <v-icon @click="copy" color="#74b9ff">{{
        copied ? 'mdi-clipboard-check' : 'mdi-clipboard'
      }}</v-icon></v-card-title
    >

    <v-card-text>{{ item.explanation }}</v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-row>
      <v-col>
        <v-card-text> <strong>Date: </strong> {{ item.date }} </v-card-text>
      </v-col>
      <v-col>
        <v-card-text> <strong>Copyright: </strong>{{ item.copyright }} </v-card-text>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-icon @click="$emit('like', item)" class="mr-3 ml-3" color="green">{{
        disableLike ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'
      }}</v-icon>
      <v-icon @click="$emit('dislike', item)" class="mr-3 ml-3" color="red">
        {{ disableDislike ? 'mdi-thumb-down' : 'mdi-thumb-down-outline' }}
      </v-icon>
    </v-card-actions>
  </v-card>

  <v-skeleton-loader
    class="mx-auto my-5"
    v-else
    max-width="70%"
    v-bind="attrs"
    type="list-item-avatar-three-line, image, article"
  ></v-skeleton-loader>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ImageCard',
  props: ['loading', 'item', 'liked', 'disliked'],
  data() {
    return {
      copied: false,
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  computed: {
    disableLike: function () {
      return this.liked.has(this.item.date);
    },
    disableDislike: function () {
      return this.disliked.has(this.item.date);
    },
  },
  methods: {
    async copy() {
      await navigator.clipboard.writeText(this.item.url);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
      this.$emit('copy');
    },
  },
});
</script>
