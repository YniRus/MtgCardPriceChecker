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
      loading: false,
      cards: [],
      searchError: '',
      apiUrl: process.env.VUE_APP_API_URL,
      yandexTranslateApiUrl: process.env.VUE_APP_YANDEX_TRANSLATE_API_URL,
      yandexTranslateApiKey: process.env.VUE_APP_YANDEX_TRANSLATE_API_KEY,
      defaultLanguage: 'russian',
    };
  },

  components: {
    HomeFooter,
    HomeHeader,
    MtgCards,
  },

  watch: {
    cards: function (value) {
      if (!value.length) {
        this.searchError = "Ничего не найдено";
      } else {
        this.searchError = null;
      }
    },
  },

  computed: {
    api() {
      return process.env.VUE_API_URL;
    },
  },

  methods: {
    async searchCards(search) {
      this.searchError = null;

      const params = {
        name: search,
      };

      const lang = await this.getLang(search);
      if (lang !== 'english') {
        params.language = lang;
      }

      const query = $.param(params);

      this.loading = true;

      const response = await this.request({
        url: this.apiUrl,
        path: 'cards',
        query: query,
      });
      this.loading = false;

      if (response.cards !== undefined) {
        this.cards = response.cards;
      }
    },

    async getLang(text) {
      let lang = this.defaultLanguage;

      const params = {
        key: this.yandexTranslateApiKey,
        text: text,
        hint: 'en,ru',
      };

      const query = $.param(params);

      const response = await this.request({
        url: this.yandexTranslateApiUrl,
        path: '',
        query: query,
      });

      if (response.code === 200) {
        switch (response.lang) {
          case 'ru' : { lang = 'russian'; break; }
          case 'en' : { lang = 'english'; break; }
        }
      }
      return lang;
    },

    async request(data) {
      const url = data.url + data.path + '?' + data.query;
      const options = {};
      const response = await fetch(url, options); // завершается с заголовками ответа
      const result = await response.json(); // читать тело ответа в формате JSON
      return result;
    },
  },
}
</script>
