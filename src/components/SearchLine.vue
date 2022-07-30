<template>
  <div class="input-group bg-white" id="search_group">
    <input
      type="search"
      class="form-control"
      placeholder="Название карты"
      v-model="searchText"
      @search.prevent="search"
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

  emits: ['search'],

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
      !this.loading && this.$emit('search', this.searchText || '');
    },
  },
}
</script>

<style lang="scss">
#search_group {
  border-radius: 0.25rem;
  transition: 0.25s all;
  max-height: 38px;
}
</style>