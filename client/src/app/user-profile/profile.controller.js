(function () {
  'use strict';

  angular.module('profile.module')
    .controller('userProfileCtrl', userProfileCtrl);

  function userProfileCtrl($log) {
    $log.debug('userProfileCtrl Loaded!');
    var vm = this;
  }

})();
