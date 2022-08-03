<template>
  <header
      class="py-2 py-lg-3 px-2 px-lg-3 mb-1 sticky-top bg-white container-fluid"
      :class="{ 'shadow': headerShadow }"
  >
    <img
      class="header-logo--big d-none d-lg-block"
      src="@/assets/images/logos/mtg-cpc-big.png"
    >
    <img
        class="header-logo--small d-lg-none"
        src="@/assets/images/logos/mtg-cpc-small.png"
    >

    <SearchLine
        :loading="loading"
        @search="onSearch"
    />

    <div class="powered-by d-none d-lg-inline">
      <small class="mr-2"> Powered by <b>Scryfall</b> </small>
      <a
          class="text-decoration-none"
          href="https://scryfall.com/docs/syntax"
          target="_blank"
      >
        <img
            class="scryfall-logo"
            src="@/assets/images/logos/other/scryfall.svg"
        >
      </a>
    </div>
  </header>
</template>

<script>
import SearchLine from "@/components/SearchLine";

export default {
  name: 'HomeHeader',

  emits: ['search'],

  components: {
    SearchLine,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      headerShadow: false,
    }
  },

  created() {
    window.addEventListener('scroll', this.handleScroll);
  },

  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    onSearch(search, options) {
      this.$emit('search', search, options);
    },

    handleScroll(event) {
      this.headerShadow = Boolean(window.scrollY);
    },
  },
}
</script>

<style lang="scss">
header {
  transition: 0.25s all;
  display: grid;
  grid-gap: 0 0.5rem;
  grid-template-columns: auto 1fr;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 992px) {
    grid-gap: 0 1rem;
    grid-template-columns: auto 1fr auto;
  }

  .header-logo--big,
  .header-logo--small,
  .scryfall-logo {
    max-height: 36px;
  }

  .powered-by {
    justify-self: right;
  }

  #search_group {
    justify-self: center;
    min-width: 216px;
  }
}
</style>
