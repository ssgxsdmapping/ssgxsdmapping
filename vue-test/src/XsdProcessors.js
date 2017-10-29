
const XsdProcessorsParam = {
  FILENAME: "FILENAME", //string
  NODETYPE: "NODE_TYPE", //string
  JAVATYPE: "JAVA_TYPE" //string
};

const JavaTemplatesParam = {

};

import {GenericExtractComponent} from './extract-components/GenericExtractComponent.js';

var XsdProcessors = (function () {

  const NodeElementComponents = {
    "xs:element" : [GenericExtractComponent.FILENAME_COMPONENT, GenericExtractComponent.NODETYPE_COMPONENT],
    "xs:simpleType" : [GenericExtractComponent.FILENAME_COMPONENT, GenericExtractComponent.NODETYPE_COMPONENT, GenericExtractComponent.JAVA_TYPE_COMPONENT],
    "xs:complexType" : [GenericExtractComponent.FILENAME_COMPONENT, GenericExtractComponent.NODETYPE_COMPONENT,GenericExtractComponent.JAVA_TYPE_COMPONENT , GenericExtractComponent.ATTRIBUTEES_COMPONENT]
  };

  var processNode = function (node) {
    return new Promise(function (resolve, reject) {
      //compute components
      var outputParams = {};
      var componentList = NodeElementComponents[node.nodeName];

      var promiseList = [];

      for(var componentNumber in componentList){
        promiseList.push(componentList[componentNumber].extract(node, outputParams));
      }

      Promise.all(promiseList)
        .then(() => console.log(outputParams))
        .then(() => resolve(outputParams))
    })
  };

  var getNameFromNode = function (node) {
    return node.attributes.getNamedItem("name").value;
  }

  return{
    processNode:processNode
  }
})();

export {XsdProcessors, XsdProcessorsParam};
