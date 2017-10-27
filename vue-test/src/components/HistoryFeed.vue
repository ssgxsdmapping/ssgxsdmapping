<template>
  <div>
    <table class="highlight">
      <thead>
        <tr>
          <th>Date</th>
          <th>Download link</th>
        </tr>
      </thead>
      <tbody v-for="ddllink in downloadLinks">
        <HistoryTableEntry v-bind:ddl-object="ddllink"></HistoryTableEntry>
      </tbody>
    </table>
  </div>
</template>

<script>

  import HistoryFeedSeacher from '../HistoryFeedSearcher.js';
  import HistoryTableEntry from './HistoryTableEntry.vue'

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
    },
    components: {
      HistoryTableEntry
    }
  }
</script>
