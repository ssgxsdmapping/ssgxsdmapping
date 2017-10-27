
import {JavaTemplate, TemplatesId} from "./JavaTemplate.js";
import {XsdProcessors, XsdProcessorsParam} from "./XsdProcessors.js";
import ToastMessage from "./ToastMessage.js";

var XsdProcessing = (function () {

  var JSZip = require('jszip');
  var FileSaver = require('file-saver');

  var processElements = function(doc){
    if(doc.children){
      var filesParams = [];

      Array.from(doc.children[0].children).forEach(function (node) {
        filesParams.push(XsdProcessors.processNode(node));
      });
      return filesParams;
    }
  };

  var processDocs = function (sourceDoc, targetDoc, packageName) {
    return new Promise(function (resolve, reject) {
      var filesParams = processElements(sourceDoc);

      var filesProcessCounter = 0;
      var zip = new JSZip();

      filesParams.forEach(function (currentFileparam) {

        JavaTemplate.getStringFromTemplate(TemplatesId.CLASS_TEMPLATE)
          .then(function (templateText) {
            console.log(templateText);
            zip.file(currentFileparam[XsdProcessorsParam.FILENAME] + ".java", templateText);
            filesProcessCounter ++;
            if(filesProcessCounter === filesParams.length){
              zip.generateAsync({type:"blob"}).then(function (content) {
                //FileSaver.saveAs(content, "test.zip");
                const currentDate = new Date().getTime();
                var storageRef = firebase.storage().ref().child(currentDate + "/" + "test.zip");
                storageRef.put(content).then(function (snapshot) {
                  firebase.database().ref("operations/"+currentDate).set({
                    downloadLink: snapshot.downloadURL
                  }).then(function (snapshot) {
                    resolve();
                  })
                });
              })
            }
          })
          .catch(e => ToastMessage.displayError("An error occured while contacting the server !"))
      });
    })
  }

  return{
    processDocs: processDocs
  }
})();


export default XsdProcessing;
