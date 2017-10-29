
import GenericXsdProcesses from '../GenericXsdProcesses.js';

var FileNameComponent = (function () {

  var extract = function (node, outputParams) {
    return new Promise(function (resolve, reject) {
      GenericXsdProcesses.retriveNodeAttribute(node, "name")
        .then(nodeName => GenericXsdProcesses.insertParamInOutputParams(FileNameComponentParamValue, nodeName, outputParams))
        .then((outputParams) => resolve(outputParams))
    })
  };

  return{
    extract: extract
  }
})();

const FileNameComponentParamValue = "FILENAME";

export default FileNameComponent;
