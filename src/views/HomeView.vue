<template>
  <div class="home">
    <HomeHeader
        :loading="loading"
        @search="searchCards"
    />

    <div class="container pb-1">
      <MtgCards :cards="cards" />
    </div>

    <HomeFooter />
  </div>
</template>

<script>
import MtgCards from "@/components/MtgCards/MtgCards";
import HomeHeader from "@/components/HomeHeader";
import HomeFooter from "@/components/HomeFooter";

import Api from "@/modules/api";

export default {
  name: 'HomeView',

  data() {
    return {
      cards: [],
    };
  },

  computed: {
    loading() {
      return Api.loading;
    },
  },

  components: {
    HomeFooter,
    HomeHeader,
    MtgCards,
  },

  methods: {
    async searchCards(search, { unique }) {
      if (!search) { return }
      this.setCards([]);

      const response = await Api.request('cards/search', 'GET', { q: search, unique });

      response.object === 'error' && this.showError(response);
      response.object === 'list' && this.setCards(response.data);
    },

    setCards(cards) {
      this.cards = cards;
    },

    showError(response) {
      this.$vaToast.init({
        title: response.status,
        message: response.code,
        color: 'primary',
        offsetY: 70,
        duration: process.env.VUE_APP_ALERT_TIMEOUT,
      })
    },
  },
}
</script>
