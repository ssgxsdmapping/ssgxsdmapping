
import GenericXsdProcesses from '../GenericXsdProcesses.js'

var NodeTypeComponent = (function () {

  const NodeTypeConst = {
    "element" : "ELEMENT",
    "simpleType" : "SIMPLE_TYPE",
    "complexType" : "COMPLEX_TYPE"
  };

  var extract = function (node, outputParams) {
      var nodeName = node.nodeName;

      for(var props in NodeTypeConst){
        if(nodeName.includes(props)){
          GenericXsdProcesses.insertParamInOutputParams(NodeTypeComponentParamValue, nodeName, outputParams)
            .then((outputParams) => outputParams)
        }
      }

  };


  return{
    extract: extract
  }
})();

const NodeTypeComponentParamValue = "NODE_TYPE";


export default NodeTypeComponent;
