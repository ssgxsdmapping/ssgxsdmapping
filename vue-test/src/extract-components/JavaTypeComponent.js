
import GenericXsdProcesses from '../GenericXsdProcesses.js'
import {SimpleTypeProcess} from '../SimpleTypeProcess.js'

var JavaTypeComponent = (function () {

  var extract = function (node, outputParams) {
      GenericXsdProcesses.retriveChildNodeOnNameRecursively(node, "restriction")
        .then(restrictionNode => GenericXsdProcesses.retriveNodeAttribute(restrictionNode, "base"))
        .then(simpleTypeBaseName => SimpleTypeProcess.extractJavaTypeFromSimpleString(simpleTypeBaseName))
        .then(javaTypeName => GenericXsdProcesses.insertParamInOutputParams(JavaTypeComponentParamValue, javaTypeName, outputParams))
        .then((outputParams) => console.log(outputParams));
  };


  return{
    extract: extract
  }
})();

const JavaTypeComponentParamValue = "JAVA_TYPE";

export default JavaTypeComponent;
