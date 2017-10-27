<template>
  <tr>
    <td>{{date}}</td>
    <td><a v-bind:href="url">Download link...</a></td>
  </tr>
</template>

<script>

  export default {
    name: "HistoryTableEntry",
    props: ["ddlObject"],
    data(){
      return{
      }
    },
    computed:{
      date: function () {
        return this.ddlObject.date;
      },
      url: function () {
        return this.ddlObject.link;
      }
    }
  }

</script>
