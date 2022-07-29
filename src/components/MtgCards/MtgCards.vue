<template>
  <div class="mtg-cards-wrapper">
    <slot name="before"/>

    <MtgCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script>
import MtgCard from "@/components/MtgCards/MtgCard";

export default {
  name: 'MtgCards',

  components: {
    MtgCard,
  },

  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
  },
}
</script>
