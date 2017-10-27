
const XsdProcessorsParam = {
  FILENAME: "FILENAME"
};

import GenericXsdProcesses from './GenericXsdProcesses.js';

var XsdProcessors = (function () {
  /**
   * Functions that return a list of TemplateIdParam + fileName
   */

  const xsElementProcessor = function (node) {
    var outputParams = {};
    insertNodeName(node, outputParams)
      .then(outputParamPromise => outputParams = outputParamPromise)
    return outputParams;
  };
  const xsSimpleTypeProcessor = function (node) {
    var outputParams = {};
    insertNodeName(node, outputParams)
      .then(outputParamPromise => outputParams = outputParamPromise)
    return outputParams;
  };
  const xsComplexTypeProcessor = function (node) {
    var outputParams = {};
    insertNodeName(node, outputParams)
      .then(outputParamPromise => outputParams = outputParamPromise)
    return outputParams;
  };

  var insertNodeName = function (node, outputParams) {
    return new Promise(function (resolve, reject) {
      GenericXsdProcesses.retriveNodeAttribute(node, "name")
        .then(nodeName => GenericXsdProcesses.insertParamInOutputParams(XsdProcessorsParam.FILENAME, nodeName, outputParams))
        .then((outputParams) => resolve(outputParams));
    })
  }

  const NodeElementProcessor = {
    "xs:element" : xsElementProcessor,
    "xs:simpleType" : xsSimpleTypeProcessor,
    "xs:complexType" : xsComplexTypeProcessor
  };

  var processNode = function (node) {
    if(NodeElementProcessor[node.nodeName]){
      return NodeElementProcessor[node.nodeName](node);
    }
    return undefined;
  };

  var getNameFromNode = function (node) {
    return node.attributes.getNamedItem("name").value;
  }

  return{
    processNode:processNode
  }
})();

export {XsdProcessors, XsdProcessorsParam};
