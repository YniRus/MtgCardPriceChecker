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

      <div class="mtg-card_footer d-flex">
        <div class="mtg-card__names text-left align-self-center">
          <span class="d-block">{{ card.name }}</span>
          <small v-if="cardPrintedName">{{ cardPrintedName }}</small>
        </div>
        <div
            ref="tradeLinks"
            class="collapse trade-links"
            id="tradeLinks"
            :class="{'expanded': expanded}"
        >
          <a
              @click="setExpanded(!expanded)"
              class="expand-button"
              data-toggle="collapse"
              href="#tradeLinks"
              aria-expanded="false"
              aria-controls="footerCollapse"
          >
            <i class="fa fa-angle-left" />
          </a>

          <a
              v-for="(purchaseLink, idx) in purchaseLinks"
              :key="`purchaseLink-${idx}`"
              class="trade-link text-decoration-none"
              :class="{'shadow-lg': expanded}"
              :href="purchaseLink.link"
              target="_blank"
          >
            <img
                class="trade-link__logo"
                :class="idx"
                src=""
                :style="{'background-image': `url(${purchaseLink.logo})`}"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swipe from "@/lib/swipe";

export default {
  name: 'MtgCard',

  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      expanded: false,
    };
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

    purchaseLinks() {
      return {
        starcity: {
          logo: require('@/assets/starcitygames-logo.png'),
          link: this.starcityUrl,
        },
        cardhoarder: {
          logo: require('@/assets/cardhoarder-logo.png'),
          link: this.card.purchase_uris?.cardhoarder,
        },
        cardmarket: {
          logo: require('@/assets/cardmarket-logo.png'),
          link: this.card.purchase_uris?.cardmarket,
        },
        tcgplayer: {
          logo: require('@/assets/tcgplayer-logo.png'),
          link: this.card.purchase_uris?.tcgplayer,
        },
      };
    },
  },

  mounted() {
    const swipe = new Swipe(this.$refs.tradeLinks);
    swipe.addEventListener("after", this.onSwipe);
  },

  methods: {
    setExpanded(expanded) {
      this.expanded = expanded;
    },

    onSwipe(direction) {
      direction === 'left' && this.setExpanded(true);
      direction === 'right' && this.setExpanded(false);
    },
  },
}
</script>

<style lang="scss">
$mtg-card-width: 300px;
$base-border-radius: 15px;
$base-padding: 10px;
$expand-button-width: 20px;
$trade-link-height: 60px;
$trade-link-width: 70px;

.mtg-card {
  border-radius: $base-border-radius;
  overflow: hidden;
  max-width: $mtg-card-width;
  min-width: $mtg-card-width;

  .mtg-card_image {
    width: 100%;
    border-radius: $base-border-radius;
    overflow: hidden;
    padding: $base-padding;
  }

  .mtg-card__names {
    width: 100%;
    padding-left: $base-padding;
    padding-right: calc($trade-link-width + $expand-button-width);
  }

  .mtg-card_footer {
    position: relative;
    min-height: $trade-link-height;

    .trade-links {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      height: 100%;
      width: 100%;
      background-color: white;
      transition: 0.25s all ease-in-out;
      position: absolute;
      bottom: 0;
      left: calc(100% - $trade-link-width - $expand-button-width);

      .expand-button {
        height: $trade-link-height;
        min-width: $expand-button-width;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        text-decoration: none;

        i {
          transition: 0.25s all ease-in-out;
        }
      }

      .trade-link {
        overflow: hidden;
        transition: 0.25s border-radius ease-in-out;
      }

      .trade-link:nth-child(2) {
        border-top-left-radius: $base-border-radius;
      }

      &.expanded {
        left: 0;

        .expand-button i {
          width: $expand-button-width;
          transform: rotateY(180deg);
        }
      }
    }

    .trade-link__logo {
      height: $trade-link-height;
      width: $trade-link-width;
      background-position: center;
      background-size: contain;
      background-origin: content-box;
      background-repeat: no-repeat;

      &.starcity {
        background-color: #125687;
      }

      &.cardhoarder {
        background-color: #ddd;
      }

      &.cardmarket {
        background-color: #012169;
      }
    }

    img[src=""] {
      content:url('data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
    }
  }
}
</style>
