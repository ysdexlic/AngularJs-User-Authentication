(function () {
  'use strict';

  angular.module('common.services.api')
    .factory('userApi', userApi);


  function userApi($log, $q, $http, $cookies, PARSE_CREDENTIALS, PARSE_URLS) {
    var service = {};

    service.isLoggedIn = function () {
      return $cookies.get('_sessionToken') !== undefined;
    };

    service.isUser = function (username) {
      var deferred = $q.defer(),
        config = {
          headers: {
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
          },
          params: {
            where: {'username': username}
          }
        };

      $http.get(PARSE_URLS.USERS, config)
        .then(function (response) {
          //console.log('successful user query:', username);
          $log.debug('username:', username);
          $log.debug(response.data);
          return deferred.resolve(response.data);
        },
        function (error) {
          //console.log('unsuccessful user query');
          return deferred.reject({'status': error.status, 'message': 'Invalid username or password'});
        });
      return deferred.promise;
    };

    service.signUp = function (username, password) {
      var deferred = $q.defer(),
        config = {
        headers: {
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
          'Content-Type': 'application/json'
        }
      };

      $http.post(PARSE_URLS.SIGNUP, {'username': username, 'password': password}, config)
        .then(function (response) {
          $log.debug('Signed Up');
          var sessionToken = response.data.sessionToken,
            userId = response.data.objectId;
          $cookies.put('_sessionToken', sessionToken);
          $cookies.put('_userId', userId);
          return deferred.resolve(response.data);
        },
        function (error) {
          return deferred.reject({'status': error.status, 'message': 'Invalid username or password'});
        });
      return deferred.promise;
    };

    service.logIn = function (username, password) {
      var deferred = $q.defer(),
        config = {
          headers: {
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
          },
          params: {
            'username': username,
            'password': password
          }
        };

      $http.get(PARSE_URLS.LOGIN, config)
        .then(function (response) {
          $log.debug('Logged In As:', response.data.username);
          var sessionToken = response.data.sessionToken,
            userId = response.data.objectId;
          $cookies.put('_sessionToken', sessionToken);
          $cookies.put('_userId', userId);
          return deferred.resolve(response.data);
        },
        function (error) {
          return deferred.reject({'status': error.status, 'message': 'Invalid username or password'});
        });
      return deferred.promise;
    };

    service.logOut = function () {
      var deferred = $q.defer(),
        sessionToken = $cookies.get('_sessionToken'),
        emptyData = {},
        headers = {
          headers: {
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
            'X-Parse-Session-Token': sessionToken
          }
        };
      $http.post(PARSE_URLS.LOGOUT, emptyData, headers)
        .then(function (response) {
          $log.debug('Logged Out');
          $cookies.remove('_sessionToken');
          $cookies.remove('_userId');
          return deferred.resolve(response.data);
        }, function (error) {
          return deferred.reject({'status': error.status, 'message': 'An error occurred'});
        });
      return deferred.promise;
    };

    service.currentUser = function () {
      var deferred = $q.defer(),
        sessionToken = $cookies.get('_sessionToken');
      if (sessionToken !== undefined) {
        $http.get(PARSE_URLS.CURRENT_USER, {
          headers: {
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
            'X-Parse-Session-Token': sessionToken
          }
        }).then (function (response) {
          return deferred.resolve(response.data);
        }, function (error) {
          return deferred.reject({'status': error.status, 'message': 'An error occurred'});
        });
        return deferred.promise;
      }
      return false;
    };
    return service;
  }

})();
