
import {JavaTemplate, TemplatesId} from "./JavaTemplate.js";
import {XsdProcessors, XsdProcessorsParam} from "./XsdProcessors.js";
import ToastMessage from "./ToastMessage.js";
import {NodeTypeComponentParamValue, NodeTypeKey} from './extract-components/NodeTypeComponent.js'
import {JavaTypeComponentParamValue} from './extract-components/JavaTypeComponent.js'
import {AttributesComponentParamValue, AttributeObjectKey} from './extract-components/AttributesComponent.js'
import {TemplateParams} from "./JavaTemplate";

var XsdProcessing = (function () {

  var JSZip = require('jszip');
  var FileSaver = require('file-saver');

  var convertFilesParamsToPureString = function (filesParams) {

    var extractComplexTypes = function (filesParams) {
      return new Promise(function (resolve, reject) {
        var complextFilesParams = [];
        for(var props in filesParams){
          var nodetypeComponent = filesParams[props][NodeTypeComponentParamValue];
          if(nodetypeComponent !== undefined && nodetypeComponent !== null){
            if(nodetypeComponent === NodeTypeKey.COMPLEX_TYPE){
              complextFilesParams.push(filesParams[props]);
            }
          }
        }
        resolve(complextFilesParams);
      })
    }

    var computeAttributes = function (complexTypes,filesParams) {
      return new Promise(function (resolve, reject) {

        var promiseList = [];
        complexTypes.forEach(function (complexType) {
          promiseList.push(new Promise(function (resolve, reject) {

            complexType[AttributesComponentParamValue].forEach(attribute => {
              JavaTemplate.getStringFromTemplate(TemplatesId.ATTRIBUTE_TEMPLATE)
                .then(attributeTemplateString => JavaTemplate.resolveTemplateParam(TemplateParams.CLASS_NAME, filesParams[attribute[AttributeObjectKey.TYPE]][JavaTypeComponentParamValue], attributeTemplateString))
                .then(attributeTemplateString => JavaTemplate.resolveTemplateParam(TemplateParams.NAME, attribute[AttributeObjectKey.NAME], attributeTemplateString))
                .then(attributeTemplateString => resolve(attributeTemplateString))
            })
          }))
        })

        Promise.all(promiseList)
          .then(result => console.log(result))
          .then(result => resolve(complexTypes, result))

      })
    }

    return new Promise(function (resolve, reject) {
      //get complex types
      extractComplexTypes(filesParams)
        .then(complexTypes => computeAttributes(complexTypes,filesParams))
        .then((complexTypes, attributeTemplateString) => console.log(attributeTemplateString))
        .then(() => resolve(filesParams))
    })
  };

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
        .then(filesParams => convertFilesParamsToPureString(filesParams))
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
