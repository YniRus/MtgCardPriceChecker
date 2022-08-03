<template>
  <div class="home">
    <HomeHeader
        :loading="loading"
        @search="searchCards"
    />

    <div class="container pb-1">
      <MtgCards :cards="cards">
        <template #before>
          <p
              v-if="searchError"
              class="text-center text-muted"
          >
            {{ searchError }}
          </p>
        </template>
      </MtgCards>
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
      searchError: '',
      searchErrorTimer: null,
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

      this.refresh();

      const response = await Api.request('cards/search', 'GET', { q: search, unique });

      response.object === 'error' && this.showError(response);
      response.object === 'list' && this.setCards(response.data);
    },

    refresh() {
      this.setCards([]);
      this.searchError = '';
      // TODO: Перейти на vuetify и убрать это
      this.searchErrorTimer && clearTimeout(this.searchErrorTimer);
    },

    setCards(cards) {
      this.cards = cards;
    },

    showError(response) {
      this.searchError = `${response.status} ${response.code}`;
      // TODO: Перейти на vuetify и убрать это
      this.searchErrorTimer = setTimeout(() => { this.searchError = '' }, process.env.VUE_APP_ALERT_TIMEOUT)
    },
  },
}
</script>
