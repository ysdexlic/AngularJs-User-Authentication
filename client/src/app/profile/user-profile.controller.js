(function () {
  'use strict';

  angular.module('profile.module')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl($log, userApi) {
    $log.debug('profileCtrl Loaded!');
    var vm = this;
    vm.detailsShown = false;

    vm.getDetails = function() {
      if (vm.detailsShown === false) {
        userApi.currentUser()
          .then(function (response) {
            vm.username = response.username;
            vm.email = response.email;
            vm.id = response.objectId;
            vm.session = response.sessionToken;
          }, function (error) {
            $log.debug(error);
          });
        vm.detailsShown = true;
      }
      else{
        vm.username = '';
        vm.email = '';
        vm.id = '';
        vm.session = '';
        vm.detailsShown = false;
      }
    };

  }

})();
