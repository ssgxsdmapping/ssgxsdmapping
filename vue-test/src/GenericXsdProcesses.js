var GenericXsdProcess = (function () {

  //generic functions

  var retriveNodeAttribute = function (node, attributeName) {
    return new Promise(function (resolve, reject) {
      var attributeValue = node.attributes.getNamedItem(attributeName).value;
      if(attributeValue !== null && attributeValue !== undefined){
        resolve(attributeValue);
      }else {
        reject("No attributes of name " + attributeName + " found.");
      }
    })
  };

  var retriveAllChildNodesOnNameRecursively = function (node, childName) {
    return new Promise(function (resolve, reject) {
      var filteredChildArray = Array.from(node.children).filter(child => child.nodeName.includes(childName));

      if(filteredChildArray !== undefined && filteredChildArray !== null && filteredChildArray.length > 0) {
        resolve(filteredChildArray)
      } else {
        var promiseList = [];
        Array.from(node.children).forEach(child => {
          promiseList.push(new Promise(function (resolve, reject) {
            retriveChildNodeOnNameRecursively(child, childName)
              .then((foundedChildNode) => resolve(foundedChildNode));
          }))
        })
        Promise.all(promiseList).then(nodeResult => resolve(nodeResult));
      }
      resolve(undefined)
    })
  }

  var retriveChildNodeOnNameRecursively = function (node, childName) {
    return new Promise(function (resolve, reject) {
      var filteredChildArray = Array.from(node.children).filter(child => child.nodeName.includes(childName));

      if(filteredChildArray !== undefined && filteredChildArray !== null && filteredChildArray.length > 0) {
        resolve(filteredChildArray[0])
      } else {
        Array.from(node.children).forEach(child => {
          retriveChildNodeOnNameRecursively(child, childName)
            .then((foundedChildNode) => resolve(foundedChildNode));
        })
      }
      resolve(undefined);
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
    retriveAllChildNodesOnNameRecursively:retriveAllChildNodesOnNameRecursively,
    insertParamInOutputParams:insertParamInOutputParams
  }
})();

export default GenericXsdProcess;
