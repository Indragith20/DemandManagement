var app = angular.module('myApp', ['ngRoute','angular.filter','angularUtils.directives.dirPagination','ngXlsx']);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'main.html',
            controller: 'loginController'
        }).
        when('/filter', {
            templateUrl: 'filter.html',
            controller: 'myController'
        }).
        when('/preference', {
            templateUrl: 'preference.html',
            controller: 'myController'
        }).
        when('/loading', {
            templateUrl: 'loading.html',
            controller: 'profileController'
        }).
        when('/insert', {
            templateUrl: 'insert.html',
            controller: 'insertController'
        }).
        when('/page1', {
            templateUrl: 'page1.html',
            controller: 'myController'
        }).
        when('/page2', {
            templateUrl: 'page2.html',
            controller: 'myController'
        }).
        when('/profile', {
            templateUrl: 'profile.html',
            controller: 'profileController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);


app.factory("XLSXReaderService", ['$q', '$rootScope',
    function($q, $rootScope) {
        var service = function(data) {
            angular.extend(this, data);
        }

        service.readFile = function(file, readCells, toJSON) {
            var deferred = $q.defer();

            XLSXReader(file, readCells, toJSON, function(data) {
                $rootScope.$apply(function() {
                    deferred.resolve(data);
                });
            });

            return deferred.promise;
        }


        return service;
    }
]);
