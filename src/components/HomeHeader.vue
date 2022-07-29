<template>
  <header class="py-3 sticky-top container">
    <SearchLine
        :loading="loading"
        @search="onSearch"
    />
  </header>
</template>

<script>
import SearchLine from "@/components/SearchLine";

export default {
  name: 'HomeHeader',

  components: {
    SearchLine,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onSearch(search) {
      this.$emit('search', search);
    },
  },
}
</script>

<style lang="scss">
header {
  transition: 0.25s all;
}
</style>
