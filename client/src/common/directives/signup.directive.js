(function () {
  'use strict';

  angular.module('signup.module')
      .directive('signupForm', signupForm);

  function signupForm() {
    return {
      restrict: 'E',
      templateUrl: 'src/app/signup/signup.tpl.html'
    };
  }

})();
