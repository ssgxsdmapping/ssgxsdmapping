
const XsdProcessorsParam = {
  FILENAME: "FILENAME"
};

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
      retriveNodeAttribute(node, "name")
        .then(nodeName => insertParamInOutputParams(XsdProcessorsParam.FILENAME, nodeName, outputParams))
        .then(() => resolve(outputParams));
    })
  }



  //generic functions

  var retriveNodeAttribute = function (node, attributeName) {
    return new Promise(function (resolve, reject) {
      var attributeValue = node.attributes.getNamedItem(attributeName).value;
      if(attributeValue !== null && attributeValue !== undefined){
        resolve(attributeValue);
      }else {
        reject();
      }
    })
  };

  var insertParamInOutputParams = function (keyName, param, outputParams) {
    return new Promise(function (resolve, reject) {
      outputParams[XsdProcessorsParam.FILENAME] = param;
      console.log("inseted" + outputParams[XsdProcessorsParam.FILENAME])
      resolve(outputParams);
    })
  };

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
