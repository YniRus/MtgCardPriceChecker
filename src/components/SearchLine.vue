<template>
  <div class="input-group bg-white" id="search_group">
    <input
      type="text"
      class="form-control"
      placeholder="Название карты"
      v-model="searchText"
      @keydown.enter="search"
    >
    <div class="input-group-append">
      <button
        id="searchButton"
        class="btn btn-outline-primary"
        type="submit"
        @click="search"
      >
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm"
          role="status"
        />
        Найти
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchLine',

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      searchText: '',
    };
  },

  methods: {
    search() {
      this.$emit('search', this.searchText);
    },
  },
}
</script>

<style lang="scss">
#search_group {
  border-radius: 0.25rem;
  transition: 0.25s all;
}
</style>