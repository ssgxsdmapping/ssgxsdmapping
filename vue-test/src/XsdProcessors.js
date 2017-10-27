
const XsdProcessorsParam = {
  FILENAME: "FILENAME"
};

var XsdProcessors = (function () {
  /**
   * Functions that return a list of TemplateIdParam + fileName
   */

  const xsElementProcessor = function (node) {
    var outputParams = {};
    outputParams[XsdProcessorsParam.FILENAME] = getNameFromNode(node);
    return outputParams;
  };
  const xsSimpleTypeProcessor = function (node) {
    var outputParams = {};
    outputParams[XsdProcessorsParam.FILENAME] = getNameFromNode(node);
    return outputParams;
  };
  const xsComplexTypeProcessor = function (node) {
    var outputParams = {};
    outputParams[XsdProcessorsParam.FILENAME] = getNameFromNode(node);
    return outputParams;
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
