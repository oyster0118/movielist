angular.module('myApp', [
    'ngRoute',
    'in_theatersCtrlModule',
    'myServiceModule',
    'coming_soonCtrlModule',
    'searchCtrlModule',
    'top250CtrlModule'
])

.controller('commonCtrl', ['$scope', '$location', function($scope, $location) {

    $scope.jump = function() {

        alert($scope.keyword)
        $location.path('/search/1/' + $scope.keyword);

    }

}])

.config(['$routeProvider', '$sceDelegateProvider', function($routeProvider, $sceDelegateProvider) {

    $routeProvider
        .when("/in_theaters/:page", {
            templateUrl: './views/in_theaters/in_theaters.html',
            controller: 'in_theatersCtrl'
        })
        .when("/coming_soon/:page", {
            templateUrl: './views/coming_soon/coming_soon.html',
            controller: 'coming_soonCtrl'
        })
        .when("/search/:page/:keyword", {
            templateUrl: './views/search/search.html',
            controller: 'searchCtrl'
        })
        .when('/top250/:page', {
            templateUrl: 'views/top250/top250.html',
            controller: 'top250Ctrl'
        })
        .otherwise('/in_theaters/1');


    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        //'https://api.douban.com/v2/movie/in_theaters'
    ]);

}])