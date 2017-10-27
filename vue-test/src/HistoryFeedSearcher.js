var HistoryFeedSearcher = (function () {

  var downloadLinks = [];

  return {
    getDownloadLinkList: function () {
      if(downloadLinks.length === 0) {
        firebase.database().ref("operations/").once('value').then(this.processDatabaseResult)
      }
      return downloadLinks;
    },
    processDatabaseResult: function (snapshot) {
      var snapshopValue = snapshot.val();
      for(var props in snapshopValue){
        downloadLinks.push({date: props, link:snapshopValue[props].downloadLink});
      }
    }
  }
})();

export default HistoryFeedSearcher;
