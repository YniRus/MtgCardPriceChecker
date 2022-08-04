<template>
  <div class="news" v-html="changelog" />
</template>

<script>
import changelog from "@/../CNANGELOG.md"

export default {
  name: 'TheNews',

  data() {
    return {
      changelog,
    };
  },
}
</script>

<style lang="scss">
.news {
  h2 {
    font-size: 24px;
  }
}
</style>