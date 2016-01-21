(function () {
  'use strict';

  angular.module('common.services.api')
    .factory('parseApi', parseApi);


  function parseApi($http, PARSE_CREDENTIALS, PARSE_URLS) {
    var service = {};

    service.getAll = function (chosenClass) {
      return $http.get(PARSE_URLS.CLASSES + chosenClass, {
        headers:{
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
        }
      });
    };

    service.get = function (chosenClass, id) {
      return $http.get(PARSE_URLS.CLASSES + chosenClass + '/' + id, {
        headers:{
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
        }
      });
    };

    service.create = function (chosenClass, data) {
      return $http.post(PARSE_URLS.CLASSES + chosenClass, data, {
        headers:{
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
          'Content-Type':'application/json'
        }
      });
    };

    service.edit = function (chosenClass, id, data) {
      return $http.put(PARSE_URLS.CLASSES + chosenClass + '/' + id, data, {
        headers:{
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
          'Content-Type':'application/json'
        }
      });
    };

    service.remove = function (chosenClass, id) {
      return $http.delete(PARSE_URLS.CLASSES + chosenClass + '/' + id, {
        headers:{
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
          'Content-Type':'application/json'
        }
      });
    };
    return service;
  }

})();
