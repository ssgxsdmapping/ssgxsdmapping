
import GenericXsdProcesses from '../GenericXsdProcesses.js';

var AttributesComponent = (function () {

  var extract = function (node, outputParams) {
    return new Promise(function (resolve, reject) {
      GenericXsdProcesses.retriveAllChildNodesOnNameRecursively(node, "element")
        .then(result => outputParams[AttributesComponentParamValue] = result)
        .then(result => resolve(outputParams))
    })
  };

  return{
    extract: extract
  }
})();

const AttributesComponentParamValue = "ATTRIBUTES";

export default AttributesComponent;
