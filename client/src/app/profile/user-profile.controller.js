(function () {
  'use strict';

  angular.module('profile.module')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl($log) {
    $log.debug('profileCtrl Loaded!');
    var vm = this;
  }

})();
