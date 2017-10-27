var GenericXsdProcess = (function () {

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

  var retriveChildNodeOnNameRecursively = function (node, childName) {
    return new Promise(function (resolve, reject) {

    })
  }

  var insertParamInOutputParams = function (keyName, param, outputParams) {
    return new Promise(function (resolve, reject) {
      outputParams[keyName] = param;
      resolve(outputParams);
    })
  };


  return{
    retriveNodeAttribute:retriveNodeAttribute,
    retriveChildNodeOnNameRecursively:retriveChildNodeOnNameRecursively,
    insertParamInOutputParams:insertParamInOutputParams
  }
})();

export default GenericXsdProcess;
