var JavaTemplateCache = (function () {
  var templatesCache = {
    // templateSrc : "stringFile",
  };

  var saveToCache = function (templateId, fileText) {
    templatesCache[templateId.templateSrc] = fileText;
  };

  var getFromCache = function (templateId) {
    if(templatesCache[templateId.templateSrc] !== null){
      return templatesCache[templateId.templateSrc];
    }
  };

  var invalidCache = function () {
    templatesCache = {}
  };

  return {
    saveToCache: saveToCache,
    getFromCache: getFromCache,
    invalidCache: invalidCache
  }
})();

export default JavaTemplateCache;
