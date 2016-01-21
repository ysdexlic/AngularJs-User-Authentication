(function() {
  'use strict';

  angular.module('profile.module',
    [
      'common.services.api',
      'ui.router.state',
      'login.module'
    ])
    .config(config);

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.profile', {
        url: '/profile',
        views: {
          '@': {
            templateUrl: 'src/app/profile/user-profile.tpl.html',
            controller: 'profileCtrl as vm'
          }
        },
        resolve: {
          auth: authentication
        }
      });
  }

  /**
   * @name  authentication
   * @description returns promise based on whether user is logged in
   */
  function authentication ($q, userApi) {

    if (userApi.currentUser()) {
      return $q.resolve({ 'authenticated': true });
    } else {
      return $q.reject({ 'authenticated': false });
    }
  }


})();
