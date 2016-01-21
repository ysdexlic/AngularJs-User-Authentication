(function () {
  'use strict';

  angular.module('login.module')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($log, userApi, $location) {
    $log.debug('loginCtrl Loaded');
    var vm = this;

    vm.logIn = function (username, password) {
      if (userApi.isLoggedIn()){
        vm.errorMessage = 'You are already logged in!';
        $log.debug(vm.errorMessage);
        return;
      }
      //console.log('call Logged In As:', username);
      vm.errorMessage = '';

      userApi.logIn(username, password)
        .then(
        function (userProfile) {
          // Successful login
          $log.debug('loginCtrl login success');
          $location.path('/getting-started');

        },
        function (error) {
          // Login failed, display error message
          $log.debug('loginCtrl login failed');
          vm.errorMessage = error.message;
        });
    };

    vm.logOut = function () {
      if (userApi.isLoggedIn()){
        //console.log('call Log Out');
        vm.errorMessage = '';

        userApi.logOut()
          .then(
          function (response) {
            //successful logout
            $log.debug('loginCtrl logout success');
          },
          function (error) {
            // Logout failed, display error message
            $log.debug('loginCtrl logout failed');
            vm.errorMessage = error.message;
          });
      }
      else {
        vm.errorMessage = 'No user logged in!';
      }
    };
  }

})();
