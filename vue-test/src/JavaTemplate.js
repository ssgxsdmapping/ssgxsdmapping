const TemplateParams = {
  PACKAGE_NAME: {value: "${packageName}"},
  CLASS_NAME: {value: "${className}"}
};

const TemplatesId = {
  CLASS_TEMPLATE: {templateSrc: "java_class_template.txt", requiredTemplateParams: [TemplateParams.PACKAGE_NAME,
                                                                                  TemplateParams.CLASS_NAME]}
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

  return {
    getStringFromTemplate: function (templateId) {

      return new Promise(function (resolve, reject) {
        var getTryFromCache = JavaTemplateCache.getFromCache(templateId);

        if(getTryFromCache === undefined) {
          firebase.storage().ref().child(templateId.templateSrc).getDownloadURL()
            .then(url => getTemplatePromise(templateId, url))
            .then(templateText => resolve(templateText))
            .catch(e => reject("An error occured while getting template"))
        } else {
          resolve(getTryFromCache);
        }
      })
    }
  }
})();

export {JavaTemplate, TemplatesId, TemplateParams};
