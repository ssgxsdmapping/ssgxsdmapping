<template>
  <div>
    <FilePicker v-bind:inputType="sourceName" ref="sourceXsdPicker"></FilePicker>
    <FilePicker v-bind:inputType="targetName" ref="targetXsdPicker"></FilePicker>
    <a class="waves-effect waves-light btn" v-bind:class="classObject" v-on:click="processXsd">Process</a>
  </div>
</template>

<script>

  import FilePicker from './FilePicker.vue';
  import AppConstants from '../constants.js';

  export default {
    name: "XsdInput",
    data(){
      return {
        sourceName: AppConstants.InputTypes[0].inputTypeName,
        targetName: AppConstants.InputTypes[1].inputTypeName,
        classObject: AppConstants.MainColorBackgroundClasses
      }
    },
    methods: {
      processXsd: function () {
        let sourceFile = this.$refs.sourceXsdPicker.getAttachedXsdSource();
        let targetFile = this.$refs.targetXsdPicker.getAttachedXsdSource();
        if(sourceFile !== null && targetFile !== null){
          console.log("All files successfully getted.")
          //call parsing library library
        }
      }
    },
    components: {
      FilePicker
    }
  }
</script>
