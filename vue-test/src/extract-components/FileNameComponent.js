
import GenericXsdProcesses from '../GenericXsdProcesses.js';

var FileNameComponent = (function () {

  var extract = function (node, outputParams) {
      GenericXsdProcesses.retriveNodeAttribute(node, "name")
        .then(nodeName => GenericXsdProcesses.insertParamInOutputParams(FileNameComponentParamValue, nodeName, outputParams))
        .then((outputParams) => (outputParams));
  };

  return{
    extract: extract
  }
})();

const FileNameComponentParamValue = "FILENAME";

export default FileNameComponent;
