<template>
  <AppHeader :title="t('gameTitle')" @set-locale="setLocale($event.language)"/>

  <div id="content-container" class="container-fluid mt-5 mb-5">
    <router-view :key="$route.fullPath"/>
  </div>

  <AppFooter :build-number="buildNumber" :credits-label="t('footer.credits')" credits-modal-id="creditsModal" zoom-enabled
      :base-font-size="state.baseFontSize" @zoomFontSize="zoomFontSize"/>

  <ModalDialog id="errorMessage">
    <template #body>
      <div class="alert alert-danger" role="alert">{{errorMessage}}</div>
    </template>
  </ModalDialog>

  <ModalDialog id="serviceWorkerUpdatedRefresh" :title="t('serviceWorkerUpdatedRefresh.title')">
    <template #body>
      <p v-html="t('serviceWorkerUpdatedRefresh.notice')"></p>
    </template>
    <template #footer>
      <button class="btn btn-primary" data-bs-dismiss="modal" @click="updateServiceWorker()">{{t('serviceWorkerUpdatedRefresh.title')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
    </template>
  </ModalDialog>

  <ModalDialog id="creditsModal" :title="t('footer.credits')">
    <template #body>
      <h4><a href="https://boardgamegeek.com/boardgame/132531/roll-galaxy" target="_blank" rel="noopener">{{t('gameTitle')}}</a></h4>
      <dl>
        <dt>Game design</dt>
        <dd>Wei-Hwa Huang, Thomas Lehmann</dd>
        <dt>Graphics design</dt>
        <dd>Martin Hoffmann, Claus Stephan, Mirko Suzuki</dd>
        <dt><a href="https://boardgamegeek.com/filepage/124323/solo-rules-rftg-amibtion" target="_blank" rel="noopener">Solo Mode Design (unofficial)</a></dt>
        <dd>Dale Buonocore, Ken Thibodeau</dd>
        <dt>Publisher</dt>
        <dd><a href="https://www.riograndegames.com/" target="_blank" rel="noopener">Rio Grande Games</a></dd>
      </dl>
      <h4 class="border-top pt-3">{{appTitle}}</h4>
      <dl>
        <dt>Application Development</dt>
        <dd>Stefan Seifert</dd>
        <dt>Version</dt>
        <dd>{{buildNumber}}</dd>
        <dt>Source Code (Apache-2.0 License)</dt>
        <dd><a href="https://github.com/brdgm/roll-for-the-galaxy-solo-helper" target="_blank" rel="noopener">https://github.com/brdgm/roll-for-the-galaxy-solo-helper</a></dd>
      </dl>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import AppHeader from 'brdgm-commons/src/components/structure/AppHeader.vue'
import AppFooter from 'brdgm-commons/src/components/structure/AppFooter.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import getErrorMessage from 'brdgm-commons/src/util/error/getErrorMessage'
import showModal, { showModalIfExist } from 'brdgm-commons/src/util/modal/showModal'
import { version, description } from '@/../package.json'
import { registerSW } from 'virtual:pwa-register'
import onRegisteredSWCheckForUpdate from 'brdgm-commons/src/util/serviceWorker/onRegisteredSWCheckForUpdate'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ModalDialog
  },
  setup() {
    const { t, locale } = useI18n({
      inheritLocale: true,
      useScope: 'global'
    })
    const state = useStateStore()

    // handle PWA updates with prompt if a new version is detected, check every 8h for a new version
    const checkForNewVersionsIntervalSeconds = 8 * 60 * 60
    const updateServiceWorker = registerSW({
      // check for new app version, see https://vite-pwa-org.netlify.app/guide/periodic-sw-updates.html
      onRegisteredSW(swScriptUrl : string, registration? : ServiceWorkerRegistration) {
        onRegisteredSWCheckForUpdate(swScriptUrl, registration, checkForNewVersionsIntervalSeconds)
      },
      onNeedRefresh() {
        showModalIfExist('serviceWorkerUpdatedRefresh')
      }
    })

    locale.value = state.language

    return { t, state, locale, updateServiceWorker }
  },
  data() {
    return {
      buildNumber: version,
      appTitle: description,
      errorMessage: 'Error'
    }
  },
  computed: {
    baseFontSize() : number {
      return this.state.baseFontSize
    }
  },
  methods: {
    setLocale(lang: string) {
      this.locale = lang;
      this.state.language = lang
    },
    zoomFontSize(payload: { baseFontSize: number }) {
      this.state.baseFontSize = payload.baseFontSize
    }
  },
  errorCaptured(err : unknown) {
    this.errorMessage = getErrorMessage(err, translErr => this.t(translErr.key, translErr.named, translErr.plural))
    showModal('errorMessage')
  }
})
</script>

<style lang="scss">
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/utilities";
#content-container {
  font-size: calc(v-bind(baseFontSize) * $font-size-base);
  h1 { font-size: calc(v-bind(baseFontSize) * $h1-font-size); }
  h2 { font-size: calc(v-bind(baseFontSize) * $h2-font-size); }
  h3 { font-size: calc(v-bind(baseFontSize) * $h3-font-size); }
  h4 { font-size: calc(v-bind(baseFontSize) * $h4-font-size); }
  h5 { font-size: calc(v-bind(baseFontSize) * $h5-font-size); }
  h6 { font-size: calc(v-bind(baseFontSize) * $h6-font-size); }

  .modal {
    --bs-modal-zindex: 9000;
  }
  .nav-tabs {
    --bs-nav-tabs-link-active-bg: #f8f8f8;
  }
  .tab-pane {
    background-color: #f8f8f8;
    border-left: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    padding: 10px;
  }
}
</style>
