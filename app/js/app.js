'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute'
]).
config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $routeProvider.when('/',
  {
      templateUrl:'partials/search.html',
      controller: 'searchCtrl',
      title: 'Search for Food'
  }).when('/report/:reportId',
  {
      templateUrl: 'partials/report.html',
      controller: 'reportCtrl',
      title: 'Reports'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);
