<template>
  <div class="mtg-card-wrapper text-center">
    <div class="mtg-card mx-auto mb-4 shadow">
      <img
          v-if="cardImage"
          :src="cardImage"
          class="mtg-card_image"
      >
      <img
          v-else
          class="mtg-card_image"
          src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=109796&type=card"
      >

      <div class="mtg-card_footer d-flex justify-content-between">
        <div class="container text-left align-self-center">
          <div>{{ englishCardName }}</div>
          <div>{{ russianCardName }}</div>
        </div>
        <div class="align-self-end">
          <a
              class="text-decoration-none"
              :href="starcityUrl"
              target="_blank"
          >
            <img src="@/assets/starcitygames-logo.png" class="starcity-logo">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MtgCard',

  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    russianCardName() {
      const foreignName = (this.card.foreignNames || []).find(i => i.language === 'Russian');

      return foreignName?.name || "";
    },

    cardImage() {
      const foreignName = (this.card.foreignNames || []).find(i => i.language === 'Russian');

      return foreignName?.imagetUrl || this.card.imageUrl;
    },

    englishCardName() {
      return this.card.name;
    },

    starcityUrl() {
      const query = $.param({ search_query: this.englishCardName });

      return 'https://starcitygames.com/search/' + '?' + query;
    },
  },

  methods: {
    setCardWidth() {
      const imgWidth = $(this.$el).find('.mtg-card_image').width();
      $(this.$el).find('.mtg-card').width(imgWidth);
    },
  },

  mounted() {
    this.setCardWidth();
  },
}
</script>

<style lang="scss">
.mtg-card {
  border-radius: 15px;
  overflow: hidden;

  .mtg-card_image {
    width: 100%;
    max-width: 300px;
    border-radius: 15px;
    overflow: hidden;
    padding: 10px;
  }

  .starcity-logo {
    float: right;
    border-radius: 15px 0px;
    overflow: hidden;
    background-color: #125687;
    height: 60px;
  }
}
</style>
