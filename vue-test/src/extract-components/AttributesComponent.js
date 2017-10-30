
import GenericXsdProcesses from '../GenericXsdProcesses.js';

const AttributeObjectKey = {
  TYPE: "TYPE",
  NAME: "NAME"
}

var AttributesComponent = (function () {

  var extract = function (node, outputParams) {
    return new Promise(function (resolve, reject) {
      GenericXsdProcesses.retriveAllChildNodesOnNameRecursively(node, "element")
        .then(result => GenericXsdProcesses.flattenListRecursively(result))
        .then(nodeList => {
          return new Promise(function (resolve, reject) {
            var typeList = [];
            var promisesList = [];
            nodeList.forEach(node => {
              promisesList.push(new Promise((resolve, reject) => {
                var attributeObject = {};
                GenericXsdProcesses.retriveNodeAttribute(node, "type")
                  .then(typeName => attributeObject[AttributeObjectKey.TYPE] = typeName)
                  .then(() => GenericXsdProcesses.retriveNodeAttribute(node, "name"))
                  .then(name => attributeObject[AttributeObjectKey.NAME] = name)
                  .then(() => typeList.push(attributeObject))
                  .then(typeName => resolve())
              }));

              Promise.all(promisesList).then(() => resolve(typeList));
            })
          })
        })
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
