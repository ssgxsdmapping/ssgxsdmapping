<template>
  <div>
    <FilePicker v-bind:inputType="sourceName" ref="sourceXsdPicker"></FilePicker>
    <FilePicker v-bind:inputType="targetName" ref="targetXsdPicker"></FilePicker>
    <div class="input-field col s6">
      <input id="package_name" type="text" class="validate" v-model="packageName">
      <label for="package_name">Package name</label>
    </div>
    <a class="waves-effect waves-light btn" v-bind:class="classObject" v-on:click="processXsd">Process</a>
  </div>
</template>

<script>

  import FilePicker from './FilePicker.vue';
  import AppConstants from '../constants.js';
  import XsdProcessing from '../XsdProcessing';
  import ToastMessage from '../ToastMessage.js';

  export default {
    name: "XsdInput",
    data(){
      return {
        sourceName: AppConstants.InputTypes[0].inputTypeName,
        targetName: AppConstants.InputTypes[1].inputTypeName,
        classObject: AppConstants.MainColorBackgroundClasses,
        packageName: ""
      }
    },
    methods: {
      processXsd: function () {
        let sourceFile = this.$refs.sourceXsdPicker.getAttachedXsdSource();
        let targetFile = this.$refs.targetXsdPicker.getAttachedXsdSource();
        if(sourceFile !== null && targetFile !== null){
          console.log("All files successfully getted.");
          console.log("Reading files...");
          this.readFile(sourceFile, function (stringedFile) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(stringedFile, "text/xml");
            this.sourceDoc = doc;
            this.callLib();
          }, this);
          this.readFile(targetFile, function (stringedFile) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(stringedFile, "text/xml");
            this.targetDoc = doc;
            this.callLib();
          }, this);

          //call parsing library library
        }
      },
      readFile: function (file, callback, context) {
        let reader = new FileReader();
        reader.onload = function (e) {
          callback.call(context, e.target.result);
        }
        reader.readAsText(file);
      },
      callLib: function () {
        if(this.sourceDoc && this.targetDoc){
          console.log("call lib");
          XsdProcessing.processDocs(this.sourceDoc, this.targetDoc, this.packageName)
            .then(() => ToastMessage.displayMessage("Processing successfull !"));
        }
      }
    },
    components: {
      FilePicker
    }
  }
</script>
