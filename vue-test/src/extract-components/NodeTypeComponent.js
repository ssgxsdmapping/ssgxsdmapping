
import GenericXsdProcesses from '../GenericXsdProcesses.js'

var NodeTypeComponent = (function () {

  const NodeTypeConst = {
    "element" : "ELEMENT",
    "simpleType" : "SIMPLE_TYPE",
    "complexType" : "COMPLEX_TYPE"
  };

  var extract = function (node, outputParams) {
    return new Promise(function (resolve, reject) {
      var nodeName = node.nodeName;

      for(var props in NodeTypeConst){
        if(nodeName.includes(props)){
          GenericXsdProcesses.insertParamInOutputParams(NodeTypeComponentParamValue, nodeName, outputParams)
            .then((outputParams) => resolve(outputParams))
        }
      }
    })

  };


  return{
    extract: extract
  }
})();

const NodeTypeComponentParamValue = "NODE_TYPE";


export default NodeTypeComponent;
