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

  //return a list of list of mathing elements
  var retriveAllChildNodesOnNameRecursively = function (node, childName, resultAccumulator) {
    if(resultAccumulator === null || resultAccumulator === undefined){
      resultAccumulator = [];
    }
    return new Promise(function (resolve, reject) {

      var filteredChildArray = Array.from(node.children).filter(child => child.nodeName.includes(childName));
      if(filteredChildArray !== undefined && filteredChildArray !== null && filteredChildArray.length > 0) {
        console.log("Node " + node + " treated. Return " + filteredChildArray);
        console.log(resultAccumulator)
        resultAccumulator.push(filteredChildArray);
        resolve(resultAccumulator);
      } else {
        var promiseList = [];
        Array.from(node.children).forEach(child => {
          retriveAllChildNodesOnNameRecursively(child, childName, resultAccumulator)
            .then((resultAccumulator) => console.log("Result of method call : " + resultAccumulator))
            .then((resultAccumulator) => console.log(resultAccumulator))
            .then((resultAccumulator) => resolve(resultAccumulator));
        });
      }
      resolve(resultAccumulator)
    })


  };

  var flattenListRecursively = function (currentElement ,listAccumulator) {

    if(listAccumulator === null || listAccumulator === undefined) {
      listAccumulator = [];
    }

    return new Promise(function (resolve, reject) {

      if(currentElement !== null && currentElement !== undefined) {
        if(!Array.isArray(currentElement)){
          listAccumulator.push(currentElement);
        }
      }

      if(Array.isArray(currentElement)) {
        currentElement.forEach(function (element) {
          flattenListRecursively(element, listAccumulator)
            .then(elements => resolve(elements))
        })
      }

      resolve(listAccumulator);

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
    flattenListRecursively:flattenListRecursively,
    insertParamInOutputParams:insertParamInOutputParams
  }
})();

export default GenericXsdProcess;
