(function () {
  'use strict';


  angular.module('common.services.api', ['ngCookies'])
    .constant('PARSE_CREDENTIALS', {
      APP_ID: '', //enter your Parse App Id here
      REST_API_KEY: '' //enter your Parse Rest Api key here
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
