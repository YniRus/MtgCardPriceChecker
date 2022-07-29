<template>
  <footer
      class="footer text-center"
      :class="collapseClass"
  >
    <div class="collapse-wrapper">
      <a
          @click="toggle"
          class="bg-white d-inline-block my-2"
          :class="collapseButtonClass"
          data-toggle="collapse"
          href="#footerCollapse"
          aria-expanded="false"
          aria-controls="footerCollapse"
      >
        <i class="fa" :class="collapseIconClass" />
      </a>
      <div class="collapse bg-white" id="footerCollapse">
        <div class="container h-100">
          <div class="row pb-3">
            <div class="col-6">
              <button class="btn btn-block btn-outline-primary align-self-center" data-toggle="modal" data-target="#feedbackModal"> Обратная связь </button>
            </div>
            <div class="col-6">
              <button class="text-decoration-none btn-block btn btn-outline-primary align-self-center"  data-toggle="modal" data-target="#newsModal">
                <span> Новости </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <!-- Modal -->
      <div class="modal fade" id="feedbackModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Обратная связь</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Есть вопросы, предложения или пожелания? Напишите мне...</p>
              <div class="container d-flex justify-content-around">
                <a href="https://vk.com/ynirus" target="_blank"> VK </a>
                <div>
                  <a href="mailto:ynirus@yandex.ru" target="_blank"> Email </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>

    <teleport to="body">
      <!-- Modal -->
      <div class="modal fade" id="newsModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Новости и обновления</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <TheNews/>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </footer>
</template>

<script>
import TheNews from "@/components/News/TheNews";

export default {
  name: 'HomeFooter',

  components: {
    TheNews,
  },

  data() {
    return {
      collapsed: true,
    };
  },

  computed: {
    collapseClass() {
      return {
        'bg-transparent': this.collapsed === true,
        'bg-white shadow': this.collapsed === false,
      };
    },

    collapseButtonClass() {
      return {
        'small-collapse-button shadow-sm': this.collapsed === true,
        'fluid-collapse-button shadow-none': this.collapsed === false,
      }
    },

    collapseIconClass() {
      return {
        'fa-angle-up': this.collapsed === true,
        'fa-angle-down': this.collapsed === false,
      }
    },
  },

  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
    },
  },
}
</script>

<style lang="scss">
/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}
body {
  /* Margin bottom by footer height */
  margin-bottom: 40px;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f5f5f5;
  transition: 0.25s all;
}

.collapse-wrapper > a {
  transition: 0.25s all;
}

.small-collapse-button {
  height: 20px;
  line-height: 20px;
  width: 50px;
  border-radius: 5px;
}

.fluid-collapse-button {
  width: 100%;
}
</style>