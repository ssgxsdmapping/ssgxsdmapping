
import GenericXsdProcesses from '../GenericXsdProcesses.js'
import {SimpleTypeProcess} from '../SimpleTypeProcess.js'

var JavaTypeComponent = (function () {

  var extractFromGenericNode = function (node, outputParams)  {
    return new Promise(function (resolve, reject) {
      GenericXsdProcesses.retriveNodeAttribute(node, "name")
        .then(nodeName => GenericXsdProcesses.insertParamInOutputParams(JavaTypeComponentParamValue, nodeName, outputParams))
        .then(nodeNam => resolve(outputParams))
    })
  }

  var extractFromRestictionNode = function (restrictionNode, outputParams) {
    return new Promise(function (resolve, reject) {
      GenericXsdProcesses.retriveNodeAttribute(restrictionNode, "base")
        .then(simpleTypeBaseName => SimpleTypeProcess.extractJavaTypeFromSimpleString(simpleTypeBaseName))
        .then(javaTypeName => GenericXsdProcesses.insertParamInOutputParams(JavaTypeComponentParamValue, javaTypeName, outputParams))
        .then((outputParams) => resolve(outputParams));
    })
  }

  var extract = function (node, outputParams) {
      return new Promise(function (resolve, reject) {
        GenericXsdProcesses.retriveChildNodeOnNameRecursively(node, "restriction")
          .catch(e => console.log(e))
          .then(restrictionNode => {
            if(restrictionNode === undefined || restrictionNode === null){
              return extractFromGenericNode(node, outputParams)
                .then((outputParams) => resolve(outputParams));
            } else {
              return extractFromRestictionNode(restrictionNode, outputParams)
                .then((outputParams) => resolve(outputParams));
            }
          })
      })
  };


  return{
    extract: extract
  }
})();

const JavaTypeComponentParamValue = "JAVA_TYPE";

export {JavaTypeComponent,JavaTypeComponentParamValue};
