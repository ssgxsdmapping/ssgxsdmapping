
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
    "xs:complexType" : [GenericExtractComponent.FILENAME_COMPONENT, GenericExtractComponent.NODETYPE_COMPONENT]
  };

  var processNode = function (node) {
      //compute components
      var outputParams = {};
      var componentList = NodeElementComponents[node.nodeName];
      for(var componentNumber in componentList){
        componentList[componentNumber].extract(node, outputParams);
      }

      //var outputParams = NodeElementProcessor[node.nodeName](node);
      console.log(outputParams);
      return outputParams;
  };

  var getNameFromNode = function (node) {
    return node.attributes.getNamedItem("name").value;
  }

  return{
    processNode:processNode
  }
})();

export {XsdProcessors, XsdProcessorsParam};
