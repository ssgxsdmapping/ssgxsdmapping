
import {JavaTemplate, TemplatesId} from "./JavaTemplate.js";
import {XsdProcessors, XsdProcessorsParam} from "./XsdProcessors.js";
import ToastMessage from "./ToastMessage.js";

var XsdProcessing = (function () {

  var JSZip = require('jszip');
  var FileSaver = require('file-saver');

  var processElements = function(doc, packageName){
    return new Promise(function (resolve, reject) {
      if(doc.children){
        var filesParams = {};

        var promiseList = [];
        var nodeList = Array.from(doc.children[0].children)
        for(var nodeIndex in nodeList) {
          promiseList.push(new Promise(function (resolve, reject) {
            XsdProcessors.processNode(nodeList[nodeIndex],packageName)
              .then(outputParams => filesParams[outputParams[XsdProcessorsParam.FILENAME]] = outputParams)
              .then(() => resolve());
          }))
        }

        Promise.all(promiseList)
          .then(() => console.log(filesParams))
          .then(() => resolve(filesParams));
      }else{
        reject("No doc found !")
      }
    })

  };

  var processDocs = function (sourceDoc, targetDoc, packageName) {
    return new Promise(function (resolve, reject) {
      processElements(sourceDoc, packageName)
        .then(filesParams => {
          var filesProcessCounter = 0;
          var zip = new JSZip();

          for(var currentNodeId in filesParams){
            var currentFileparam = filesParams[currentNodeId];
            JavaTemplate.getStringFromTemplate(TemplatesId.CLASS_TEMPLATE)
              .then(function (templateText) {
                console.log(templateText);
                zip.file(currentFileparam[XsdProcessorsParam.FILENAME] + ".java", templateText);
                filesProcessCounter ++;
                if(filesProcessCounter === filesParams.length){
                  zip.generateAsync({type:"blob"}).then(function (content) {
                    FileSaver.saveAs(content, "test.zip");
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
          }
        })

    })
  }

  return{
    processDocs: processDocs
  }
})();


export default XsdProcessing;
