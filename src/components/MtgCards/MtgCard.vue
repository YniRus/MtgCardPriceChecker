<template>
  <div class="mtg-card-wrapper text-center">
    <div class="mtg-card mx-auto mb-4 shadow">
      <img
          v-if="cardImages.normal"
          :src="cardImages.normal"
          class="mtg-card_image"
      >
      <img
          v-else
          class="mtg-card_image"
          src="https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg/revision/latest"
      >

      <div class="mtg-card_footer d-flex justify-content-between">
        <div class="container text-left align-self-center">
          <span class="d-block">{{ card.name }}</span>
          <small v-if="cardPrintedName">{{ cardPrintedName }}</small>
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
    cardPrintedName() {
      return this.card.printed_name
        ? this.card.printed_name
        : this.cardFaceFront.printed_name && this.cardFaceBack.printed_name
          ? `${this.cardFaceFront.printed_name} // ${this.cardFaceBack.printed_name}`
          : ''
    },

    cardFaceFront() {
      return this.card.card_faces?.[0] || {};
    },

    cardFaceBack() {
      return this.card.card_faces?.[1] || {};
    },

    cardImages() {
      return this.card.image_uris || this.cardFaceFront.image_uris || {}
    },

    starcityUrl() {
      const query = $.param({ card_name: this.card.name });

      return 'https://starcitygames.com/search/' + '?' + query;
    },
  },
}
</script>

<style lang="scss">
.mtg-card {
  border-radius: 15px;
  overflow: hidden;
  max-width: 300px;
  min-width: 300px;

  .mtg-card_image {
    width: 100%;
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
