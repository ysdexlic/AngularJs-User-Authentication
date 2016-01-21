(function () {
  'use strict';


  angular.module('common.services.api', ['ngCookies'])
    .constant('PARSE_CREDENTIALS', {
      APP_ID: 'eor63afSo5K3tMSMrITY76E6IPVcerPATtJhmpNo',
      REST_API_KEY: '426tpWnUZiO2g4ZoQqww4tuDhJxALhF5UtOVNafe'
    })
    .constant('PARSE_URLS', {
      LOGIN: 'https://api.parse.com/1/login',
      SIGNUP: 'https://api.parse.com/1/users',
      LOGOUT: 'https://api.parse.com/1/logout',
      CURRENT_USER: 'https://api.parse.com/1/users/me',
      USERS: 'https://api.parse.com/1/classes/_User',
      CLASSES: 'https://api.parse.com/1/classes/'
    });
})();
