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

export default {
  name: 'HomeView',

  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      cards: [],
      searchError: '',
      searchErrorTimer: null,
      apiRequestTimer: null,
      loading: false,
    };
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
      const query = $.param({
        q: search,
        unique,
      });

      this.loading = true;
      const response = await this.request({
        url: this.apiUrl,
        path: 'cards/search',
        query: query,
      });
      this.loading = false;

      response.object === 'error' && this.showError(response);
      response.object === 'list' && this.setCards(response);
    },

    refresh() {
      this.cards = [];
      this.searchError = '';
      this.searchErrorTimer && clearTimeout(this.searchErrorTimer);
    },

    setCards(response) {
      this.cards = response.data;
    },

    showError(response) {
      this.searchError = `${response.status} ${response.code}`;
      this.searchErrorTimer = setTimeout(() => { this.searchError = '' }, process.env.VUE_APP_ALERT_TIMEOUT)
    },

    async request(data) {
      if (this.apiRequestTimer) {
        return {
          object: 'error',
          status: '429',
          code: 'too many requests',
        };
      }
      const url = data.url + data.path + '?' + data.query;
      this.apiRequestTimer = setTimeout(() => { this.apiRequestTimer = null }, process.env.VUE_APP_API_REQUEST_INTERVAL)
      const response = await fetch(url);
      return response.json();
    },
  },
}
</script>
