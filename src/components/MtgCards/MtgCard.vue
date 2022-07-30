<template>
  <div class="mtg-card-wrapper text-center">
    <div class="mtg-card mx-auto mb-4 shadow">
      <img
          v-if="card.image_uris"
          :src="card.image_uris.normal"
          class="mtg-card_image"
      >

      <div class="mtg-card_footer d-flex justify-content-between">
        <div class="container text-left align-self-center">
          <span class="d-block">{{ card.name }}</span>
          <small v-if="card.printed_name">{{ card.printed_name }}</small>
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
    starcityUrl() {
      const query = $.param({ card_name: this.card.name });

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
    padding: 4px;
    overflow: hidden;
    background-color: #125687;
    height: 60px;
  }
}
</style>
