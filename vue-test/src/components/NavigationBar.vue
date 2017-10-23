<template>
  <div>
    <nav class="nav-extended" v-bind:class="classObject">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Logo</a>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
      </div>
      <div class="nav-content">
        <ul class="tabs tabs-transparent">
          <li class="tab"><a href="#xsdInput">Xsd Input</a></li>
          <li class="tab"><a class="active" href="#historyFeed">History Feed</a></li>
        </ul>
      </div>
    </nav>
    <XsdInput id="xsdInput" class="col s12"></XsdInput>
    <HistoryFeed id="historyFeed"></HistoryFeed>
  </div>
</template>

<script>
  import AppConstants from '../constants.js';
  import XsdInput from './XsdInput.vue';
  import HistoryFeed from './HistoryFeed.vue';

  export default {
    name: "NavigationBar",
    data (){
      return {
        classObject: AppConstants.MainColorBackgroundClasses
      }
    },
    components: {
      XsdInput,HistoryFeed
    }
  }
</script>
