<template>
  <form action="#">
    <div class="file-field input-field">
      <div class="btn waves-effect waves-light">
        <span>Select File</span>
        <input type="file" v-on:change="processFile">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" v-bind:placeholder="placeHolderMsg">
      </div>
    </div>
  </form>
</template>

<script>

  import AppConstants from '../constants.js';

  export default {
    name: "FilePicker",
    props: ["inputType"],
    data () {
      return{
        xsdFile: ""
      }
    },
    computed: {
        placeHolderMsg: function () {
          for(let i = 0; i<AppConstants.InputTypes.length; i++){
            if(AppConstants.InputTypes[i].inputTypeName === this.inputType){
              return AppConstants.InputTypes[i].inputTypePlaceholder;
            }
          }
          for(let i = 0; i<AppConstants.InputTypes.length; i++){
            if(AppConstants.InputTypes[i].inputTypeName === "DEFAULT"){
              return AppConstants.InputTypes[i].inputTypePlaceholder;
            }
          }
        }
    },
    methods: {
      getAttachedXsdSource: function () {
        console.log("Asking file from " + this.inputType + " picker.");
        return this.xsdFile;
      },
      processFile: function (fileChangeEvent) {
        var files = fileChangeEvent.target.files;
        if(files != undefined && files.length >= 1){
          this.xsdFile = files[0];
        }
      }
    }
  };



</script>
