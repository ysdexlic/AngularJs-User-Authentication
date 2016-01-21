(function () {
  'use strict';

  angular.element(document).ready(function () {
    angular.bootstrap(document.documentElement, ['app']);
  });

  function Route($stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('httpInterceptor');
    $stateProvider
      .state('root', {
        views: {
          'header': {
            templateUrl: 'src/common/header.tpl.html',
            controller: 'HeaderCtrl'
          },
          'footer': {
            templateUrl: 'src/common/footer.tpl.html',
            controller: 'FooterCtrl'
          }
        }
      });
  }

  function MainCtrl($log, userApi) {
    var vm = this;
    vm.loaded = 'MainCtrl loaded'; //temporary to avoid gulp error: defined but not used.
    $log.debug(vm.loaded);

    //if a user is logged in.
    if (userApi.isLoggedIn() && userApi.currentUser()) {
      //do something...
    }
  }

  function run($log, $location, $rootScope) {
    $log.debug('App is running');

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      //event.preventDefault();
      $log.debug('authenticated user');
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      //event.preventDefault();
      if (error.authenticated === false) {
        $log.debug('unauthenticated user');
        $location.path('/');
      }
    });
  }

  angular.module('app', [
      'ui.router',
      'ngCookies',
      'home.module',
      'login.module',
      'signup.module',
      'profile.module',
      'getting-started',
      'common.header',
      'common.footer',
      'common.services.data',
      'common.services.api',
      'common.directives.version',
      'common.filters.uppercase',
      'common.interceptors.http',
      'templates'
    ])
    .config(Route)
    .run(run)
    .controller('MainCtrl', MainCtrl)
    .value('version', '1.1.0');
})();
