
import GenericXsdProcesses from '../GenericXsdProcesses.js'

var NodeTypeComponent = (function () {

  const NodeTypeKey = {
    ELEMENT : "ELEMENTS",
    SIMPLE_TYPE : "SIMPLE_TYPE",
    COMPLEX_TYPE : "COMPLEX_TYPE"
  }

  const NodeTypeCorrespondance = {
    "element" : NodeTypeKey.ELEMENT,
    "simpleType" : NodeTypeKey.SIMPLE_TYPE,
    "complexType" : NodeTypeKey.COMPLEX_TYPE
  };

  var extract = function (node, outputParams) {
    return new Promise(function (resolve, reject) {
      var nodeName = node.nodeName;

      for(var props in NodeTypeCorrespondance){
        if(nodeName.includes(props)){
          GenericXsdProcesses.insertParamInOutputParams(NodeTypeComponentParamValue, NodeTypeCorrespondance[props], outputParams)
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
