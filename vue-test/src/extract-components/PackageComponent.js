import GenericXsdProcesses from '../GenericXsdProcesses.js'

var PackageComponent = (function () {

  var extract = function (node, outputParams, packageName) {
    return new Promise(function (resolve, reject) {
      GenericXsdProcesses.insertParamInOutputParams(PackageComponentParamValue, packageName, outputParams)
        .then(outputParams => resolve(outputParams))
    })
  };

  return{
    extract:extract
  }
})();

const PackageComponentParamValue = "PACKAGE_NAME";

export default PackageComponent;
