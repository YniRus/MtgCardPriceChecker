<template>
  <div class="list-group">
    <NewsItem title="Обновление 2.1.1" date="29.07.2022">
      Я вернулся и переписал приложение. <br>
      Теперь поиск работает на API <a href="https://scryfall.com/" class="text-decoration-none" target="_blank">Scryfall</a>.
      Это позволило сильно ускорить поиск и добавило возможности мощной поисковой системы (<a href="https://scryfall.com/docs/syntax" class="text-decoration-none" target="_blank">подробнее</a>)
    </NewsItem>
    <NewsItem title="Обновление 1.2.0" date="30.12.2019">
      Немного изменил дизайн шапки и низа сайта. Он стал более лаконичным.
    </NewsItem>
    <NewsItem title="Обновление 1.1.0" date="22.12.2019">
      Добавил возможность поиска и по английскому названию карты.
      <br>
      Добавил разделы "Новости" и "Обратная связь"
    </NewsItem>
    <NewsItem title="Запуск приложения" date="19.12.2019">
      <p class="mb-1">Пока <a href="http://mtgmania.ru/" class="text-decoration-none" target="_blank">mtgmania.ru</a> не
        торопится изменить ссылки на старсити, я сваял сие детище. Надеюсь оно будет
        полезно не только мне, но и всему нашему mtg-коммьюнити.
      </p>
    </NewsItem>
  </div>
</template>

<script>
import NewsItem from "@/components/News/NewsItem";

export default {
  name: 'TheNews',

  components: {
    NewsItem,
  },

  data() {
    return {};
  },
}
</script>