<template>
  <div class="news-item list-group-item flex-column">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ title }}</h5>
      <small v-if="date" class="text-muted align-self-center">{{ date }}</small>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'NewsItem',

  props: {
    title: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      default: '',
    },
  },

  data() {
    return {};
  },
}
</script>