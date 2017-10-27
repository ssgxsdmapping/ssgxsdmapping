<template>
  <div>
    <ul class="collection">
      <li class="collection-item" v-for="ddllink in downloadLinks">
        {{ddllink.date}} ---- {{ddllink.link}}
      </li>
    </ul>
  </div>
</template>

<script>

  import HistoryFeedSeacher from '../HistoryFeedSearcher.js';

  export default {
    name: "HistoryFeed",
    data(){
      return{
        downloadLinks: [] // {date:   link: }
      }
    },
    methods: {
      initDownloadLinkList: function () {
        this.downloadLinks = HistoryFeedSeacher.getDownloadLinkList();
      }
    }
  }
</script>
