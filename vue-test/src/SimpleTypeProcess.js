const SimpleTypeToJavaType = {
  "string": "String",
  "decimal": "Float",
  "integer": "Integer",
  "positiveInteger": "Integer",
  "boolean": "Boolean",
  "date": "String",
  "time": "String"
};

var SimpleTypeProcess = (function () {

  var extractJavaTypeFromSimpleString = function (simpleTypeString) {
    return new Promise(function (resolve, reject) {
      for(var props in SimpleTypeToJavaType){
        if(simpleTypeString.includes(props)){
          resolve(SimpleTypeToJavaType[props]);
        }
      }
      resolve(SimpleTypeToJavaType["string"]) //default value
    })
  };

  return{
    extractJavaTypeFromSimpleString: extractJavaTypeFromSimpleString
  }
})();

export {SimpleTypeProcess, SimpleTypeToJavaType};
