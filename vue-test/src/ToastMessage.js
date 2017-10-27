var ToastMessage = (function () {

  const sucessCss = "blue lighten-2"
  const errorCss = "red lighten-2";
  const toastTime = 3000;

  var displayMessage = function (message) {
    Materialize.toast(message, toastTime, sucessCss);
  };


  var displayError = function (message) {
    Materialize.toast(message, toastTime, errorCss);
  };
  return {
    displayMessage: displayMessage,
    displayError: displayError
  }
})();

export default ToastMessage;
