const TemplateParams = {
  PACKAGE_NAME: {value: "${PACKAGE_NAME}"},
  CLASS_NAME: {value: "${JAVA_TYPE}"},
  IMPORTS: {value: "${IMPORTS}"},
  ATTRIBUTES: {value: "${ATTRIBUTES}"},
  NAME: {value :"${NAME}"}
};

const TemplatesId = {
  CLASS_TEMPLATE: {templateSrc: "java_class_template.txt", requiredTemplateParams: [TemplateParams.PACKAGE_NAME,
                                                                                  TemplateParams.CLASS_NAME,
                                                                                  TemplateParams.IMPORTS,
                                                                                  TemplateParams.ATTRIBUTES]},
  ATTRIBUTE_TEMPLATE: {templateSrc: "java_attribute_template.txt", requiredTemplateParams: [TemplateParams.CLASS_NAME,
                                                                                          TemplateParams.NAME]}
};

import JavaTemplateCache from "./JavaTemplateCache";

var JavaTemplate = (function () {

  var validated;

  var validateTemplate = function (templateId, fileText) {
    validated = true;
    templateId.requiredTemplateParams.forEach(function (templateParam) {
      if(!fileText.includes(templateParam.value)){
        validated = false;
      }
    });
    return validated;
  };

  var getTemplatePromise = function (templateId, url) {
    return new Promise(function (resolve, reject) {
      $.get(url, function (text, status) {
        if(validateTemplate(templateId, text)){
          JavaTemplateCache.saveToCache(templateId, text);
          resolve(text);
        } else {
          reject("Template not validated !");
        }
      }).fail(function () {
        reject("Error while getting template.");
      })
    })
  }

  var resolveTemplateParam = function (templateParam, templateparamValue, templateString) {
    return new Promise(function (resolve, reject) {
      templateString = templateString.replace(new RegExp('\\'+templateParam.value, 'g'), templateparamValue);
      resolve(templateString);
    })
  }

  return {
    getStringFromTemplate: function (templateId) {

      return new Promise(function (resolve, reject) {
        var getTryFromCache = JavaTemplateCache.getFromCache(templateId);

        if(getTryFromCache === undefined) {
          firebase.storage().ref().child(templateId.templateSrc).getDownloadURL()
            .then(url => getTemplatePromise(templateId, url))
            .then(templateText => resolve(templateText))
            .catch(e => {
              console.log(e)
              reject("An error occured while getting template")
            })
        } else {
          resolve(getTryFromCache);
        }
      })
    },
    resolveTemplateParam:resolveTemplateParam
  }
})();

export {JavaTemplate, TemplatesId, TemplateParams};
