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
      <div class="btn-group" role="group">
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

        <a
            role="button"
            class="btn btn-outline-primary collapsed collapse-button"
            data-toggle="collapse"
            href="#searchCollapse"
            aria-expanded="false"
            aria-controls="searchCollapse"
        >
          <i class=" fa fa-angle-down"/>
        </a>
      </div>
    </div>

    <div class="collapse bg-white shadow-sm" id="searchCollapse">
      <div class="container text-left">
        <div class="row p-2">
          <label class="mb-0"> Язык </label>
          <div class="btn-group btn-group-toggle language-select w-100" data-toggle="buttons">
            <label
                class="btn btn-outline-primary"
                :class="{'active': lang === 'ru,en'}"
                @click.prevent="onLanguageChange('ru,en')"
                @keydown.enter="onLanguageChange('ru,en')"
            >
              <input type="radio" name="lang" autocomplete="off" :checked="lang === 'ru,en'"> русский и английский
            </label>
            <label
                class="btn btn-outline-primary"
                :class="{'active': lang === 'any'}"
                @click.prevent="onLanguageChange('any')"
                @keydown.enter="onLanguageChange('any')"
            >
              <input type="radio" name="lang" autocomplete="off" :checked="lang === 'any'"> все языки
            </label>
          </div>
        </div>

        <div class="row pt-0 px-2 pb-2">
          <label class="mb-0"> Ограничения выборки </label>
          <div class="btn-group btn-group-toggle unique-select w-100" data-toggle="buttons">
            <label
                class="btn btn-outline-primary"
                :class="{'active': unique === 'cards'}"
                @click.prevent="onUniqueChange('cards')"
                @keydown.enter="onUniqueChange('cards')"
            >
              <input type="radio" name="unique" autocomplete="off" :checked="unique === 'cards'"> уникальные карты
            </label>
            <label
                class="btn btn-outline-primary"
                :class="{'active': unique === 'art'}"
                @click.prevent="onUniqueChange('art')"
                @keydown.enter="onUniqueChange('art')"
            >
              <input type="radio" name="unique" autocomplete="off" :checked="unique === 'art'"> уникальные арты
            </label>
            <label
                class="btn btn-outline-primary"
                :class="{'active': unique === 'prints'}"
                @click.prevent="onUniqueChange('prints')"
                @keydown.enter="onUniqueChange('prints')"
            >
              <input type="radio" name="unique" autocomplete="off" :checked="unique === 'prints'"> все принты
            </label>
          </div>

          <div
              v-if="['art','prints'].includes(unique)"
              class="alert alert-info px-2 py-1 mt-1 mb-0 w-100"
              role="alert"
          >
            <small>
              В данном режиме рекомендуется использовать поиск по полному соответствию названия.
              <br> Для этого поставьте <b>!</b> перед названием карты и напишите его в кавычках (например, <b>!</b>"Шок").
            </small>
          </div>
        </div>
      </div>
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
      lang: '',
      unique: '',
      extended: false,
    };
  },

  methods: {
    prepareLang(lang) {
      return lang
        .split(',')
        .map(l => `lang:${l}`)
        .join(' or ');
    },

    prepareSearch(search) {
      if (search) {
        search = !search.includes('lang:') ? `${search} (${this.prepareLang(this.lang)})` : search;
      }

      return search || '';
    },

    onLanguageChange(value) {
      this.lang = value;
    },

    onUniqueChange(value) {
      this.unique = value;
    },

    search() {
      !this.loading && this.$emit('search', this.prepareSearch(this.searchText), {
        unique: this.unique,
      });
    },
  },

  mounted() {
    this.onLanguageChange('ru,en');
    this.onUniqueChange('cards');
  },
}
</script>

<style lang="scss">
#search_group {
  border-radius: 0.25rem;
  transition: 0.25s all;
  max-height: 38px;
  position: relative;

  .btn-group {
    button:first-child {
      border-radius: 0;
    }
  }

  .collapse-button {
    i {
      transition: 0.25s all;
    }

    &:not(.collapsed) {
      i {
        transform: rotateZ(-180deg);
      }
    }
  }

  #searchCollapse {
    position: absolute;
    top: calc(38px + 6px);
    right: 0;
    max-width: 600px;
    border-radius: 0 0 0.25rem 0.25rem;
  }
}
</style>