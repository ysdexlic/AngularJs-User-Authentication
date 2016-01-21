(function () {
  'use strict';

  angular.module('signup.module')
    .controller('SignupCtrl', SignupCtrl);

  function SignupCtrl($log, userApi, $location) {
  	$log.debug('signupCtrl Loaded!');
  	var vm = this;

  	vm.signUp = function (username, password) {
      vm.errorMessage = '';
      //console.log('call Signed up as:', username);
      userApi.signUp(username, password)
        .then(function (userProfile) {
          //successful login
          $log.debug('signupCtrl signup success');
          $location.path('/getting-started');
        },
        function (error) {
          // Login failed, display error message
          $log.debug('SignupCtrl signup failed');
          vm.errorMessage = error.message;
        });
    };

    vm.isUser = function (username) {
      vm.errorMessage = '';
      userApi.isUser(username)
        .then(function (user) {
          $log.debug('isUser signup success');
          /*
          if(user.results.length > 0) {
            vm.usernameTaken = 'Sorry, that username is taken';
          }
          else{
            vm.usernameTaken = '';
          }
          */
        },
        function (error) {
          $log.debug('isUser signup failed');
          vm.errorMessage = error.message;
        });
    };
  }

})();
