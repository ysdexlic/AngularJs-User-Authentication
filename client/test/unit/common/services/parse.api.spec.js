(function () {
  'use strict';

  describe('GIVEN the parseApi', function () {
    var parseApi,
      $httpBackend,
      $rootScope,
      $q,
      PARSE_CREDENTIALS,
      PARSE_URLS;

    beforeEach(module('common.services.api'));

    beforeEach(inject(function (_parseApi_, _$httpBackend_, _$rootScope_, _$q_, _PARSE_CREDENTIALS_, _PARSE_URLS_) {
      parseApi = _parseApi_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      $q = _$q_;
      PARSE_CREDENTIALS = _PARSE_CREDENTIALS_;
      PARSE_URLS = _PARSE_URLS_;
    }));


    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should load the parseApi', function () {
      expect(parseApi).not.toEqual(null);
    });


    describe('WHEN get all is requested', function () {
      var chosenClass = 'aClass',
        goodResponse = {'objectId': 'fred', 'friends': 0};

      it('THEN it should call the correct endpoint', function () {
        $httpBackend
          .expect('GET', PARSE_URLS.CLASSES + chosenClass)
          .respond(goodResponse);

        parseApi.getAll(chosenClass);
        $httpBackend.flush();
      });

      it('THEN it should pass the service credentials', function () {
        $httpBackend
          .expect('GET', PARSE_URLS.CLASSES + 'aClass', undefined,
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(goodResponse);

        parseApi.getAll(chosenClass);
        $httpBackend.flush();
      });

    });

    describe('WHEN get is requested', function () {
      var chosenClass = 'aClass',
        id = '123',
        goodResponse = {'objectId': 'fred', 'friends': 0};

      it('THEN it should call the correct endpoint', function () {
        $httpBackend
          .expect('GET', PARSE_URLS.CLASSES + 'aClass/123')
          .respond(goodResponse);

        parseApi.get(chosenClass, id);
        $httpBackend.flush();
      });

      it('THEN it should pass the service credentials', function () {
        $httpBackend
          .expect('GET', PARSE_URLS.CLASSES + 'aClass/123', undefined,
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(goodResponse);

        parseApi.get(chosenClass, id);
        $httpBackend.flush();
      });

    });

    describe('WHEN create is requested', function () {
      var chosenClass = 'aClass',
        mockData = {'some': 'data'},
        goodResponse = {'objectId': 'fred', 'friends': 0};

      it('THEN it should call the correct endpoint', function () {
        $httpBackend
          .expect('POST', PARSE_URLS.CLASSES + 'aClass', {'some': 'data'})
          .respond(goodResponse);

        parseApi.create(chosenClass, mockData);
        $httpBackend.flush();
      });

      it('THEN it should pass the service credentials', function () {
        $httpBackend
          .expect('POST', PARSE_URLS.CLASSES + 'aClass', {'some': 'data'},
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(goodResponse);

        parseApi.create(chosenClass, mockData);
        $httpBackend.flush();
      });

    });

    describe('WHEN edit is requested', function () {
      var chosenClass = 'aClass',
        id = '123',
        mockData = {'some': 'data'},
        goodResponse = {'objectId': 'fred', 'friends': 0};

      it('THEN it should call the correct endpoint', function () {
        $httpBackend
          .expect('PUT', PARSE_URLS.CLASSES + 'aClass/123', {'some': 'data'})
          .respond(goodResponse);

        parseApi.edit(chosenClass, id, mockData);
        $httpBackend.flush();
      });

      it('THEN it should pass the service credentials', function () {
        $httpBackend
          .expect('PUT', PARSE_URLS.CLASSES + 'aClass/123', {'some': 'data'},
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(goodResponse);

        parseApi.edit(chosenClass, id, mockData);
        $httpBackend.flush();
      });

    });

    describe('WHEN remove is requested', function () {
      var chosenClass = 'aClass',
        id = '123',
        goodResponse = {'objectId': 'fred', 'friends': 0};

      it('THEN it should call the correct endpoint', function () {
        $httpBackend
          .expect('DELETE', PARSE_URLS.CLASSES + 'aClass/123')
          .respond(goodResponse);

        parseApi.remove(chosenClass, id);
        $httpBackend.flush();
      });

      it('THEN it should pass the service credentials', function () {
        $httpBackend
          .expect('DELETE', PARSE_URLS.CLASSES + 'aClass/123', undefined,
          function (headers) {
            return headers['X-Parse-Application-Id'] === PARSE_CREDENTIALS.APP_ID &&
              headers['X-Parse-REST-API-Key'] === PARSE_CREDENTIALS.REST_API_KEY;
          })
          .respond(goodResponse);

        parseApi.remove(chosenClass, id);
        $httpBackend.flush();
      });

    });

  });
})();
