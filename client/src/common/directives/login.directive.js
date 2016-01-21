(function () {
  'use strict';

  angular.module('login.module')
      .directive('loginForm', loginForm);

  function loginForm() {
    return {
      restrict: 'E',
      templateUrl: 'src/app/login/login.tpl.html'
    };
  }

})();
