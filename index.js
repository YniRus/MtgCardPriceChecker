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

var app = new Vue({
    el: '#app',
    data: {
        apiUrl: 'https://api.magicthegathering.io/v1/',
        searchText: null,
        defaultLanguage: 'russian',
        cards : [],
        loading : false
    },
    methods : {
        searchCards : async function(event) {
                let params = {
                    name: this.searchText,
                    language: this.defaultLanguage
                };

                let query = jQuery.param(params);

                this.loading = true;
                let response = await this.request({
                    path: 'cards',
                    query: query
                });
                this.loading = false;

                if (response.cards !== undefined) {
                    this.cards = response.cards;
                }
        },
        request: async function (data) {
            let url = this.apiUrl + data.path + '?' + data.query;
            // let url = '/testdata.json';
            let options = {};
            let response = await fetch(url, options); // завершается с заголовками ответа
            let result = await response.json(); // читать тело ответа в формате JSON
            return result;
        }
    }
});