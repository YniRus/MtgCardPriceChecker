Vue.component('mtg-card', {
    template: '#card_template',
    props: ['card'],
    data() {
        return {
        }
    },
    computed : {
        russianCardName : function () {
            let name = null;
            if(this.card.foreignNames !== undefined) {
                this.card.foreignNames.forEach(function (foreignName) {
                    if(foreignName.language === 'Russian') {
                        name = foreignName.name;
                    }
                })
            }
            return name;
        },
        cardImage : function () {
            let imageUrl = this.card.imageUrl;
            if(this.card.foreignNames.length !== 0) {
                this.card.foreignNames.forEach(function (foreignName) {
                    if(foreignName.language === 'Russian') {
                        imageUrl = foreignName.imageUrl;
                    }
                })
            }
            return imageUrl;
        },
        englishCardName :function () {
            return this.card.name;
        },
        starcityUrl: function () {
            let query = jQuery.param({
                search_query: this.englishCardName
            });
            return 'https://starcitygames.com/search.php' + '?' + query;
        }
    },
    methods: {
        setCardWidth : function () {
            let imgWidth =  $(this.$el).find('.mtg-card_image').width();
            $(this.$el).find('.mtg-card').width(imgWidth);
        },
    },
    mounted : function () {
        this.setCardWidth();
    }
});

Vue.component('mtg-news', {
    template: '#news_template',
    props: ['uid', 'title', 'date'],
    data() { return {}},
});

var app = new Vue({
    el: '#app',
    data: {
        apiUrl: 'https://api.magicthegathering.io/v1/',
        yandexTranslateApiUrl: 'https://translate.yandex.net/api/v1.5/tr.json/detect',
        yandexTranslateApiKey: 'trnsl.1.1.20191222T192818Z.055274cdb186fb75.6f6e3590aaa75aed1069ae85e6e4d3aa3621d753',
        searchText: null,
        defaultLanguage: 'russian',
        cards : [],
        loading : false,
        infoText : null
    },
    watch : {
      cards : function (value) {
          if(value.length === 0) {
              this.infoText = "Ничего не найдено";
          } else {
              this.infoText = null;
          }
      }
    },
    methods : {
        searchCards : async function(event) {
            this.infoText = null;

            let params = {
                name: this.searchText,
            };
            let lang = await this.getLang(this.searchText);
            if(lang !== 'english') {
                params.language = lang;
            }
            let query = jQuery.param(params);

            this.loading = true;
            let response = await this.request({
                url: this.apiUrl,
                path: 'cards',
                query: query
            });
            this.loading = false;

            if (response.cards !== undefined) {
                this.cards = response.cards;
            }
        },
        getLang : async function(text) {
            let lang = this.defaultLanguage;

            let params = {
                key: this.yandexTranslateApiKey,
                text: text,
                hint: 'en,ru'
            };

            let query = jQuery.param(params);

            let response = await this.request({
                url: this.yandexTranslateApiUrl,
                path: '',
                query: query
            });

            if (response.code === 200) {
                switch (response.lang) {
                    case 'ru' : { lang = 'russian'; break; }
                    case 'en' : { lang = 'english'; break; }
                }
            }
            return lang;
        },
        request: async function (data) {
            let url = data.url + data.path + '?' + data.query;
            let options = {};
            let response = await fetch(url, options); // завершается с заголовками ответа
            let result = await response.json(); // читать тело ответа в формате JSON
            return result;
        }
    }
});

$(function () {
    $('img[alt="www.000webhost.com"]').closest('div').remove();
});