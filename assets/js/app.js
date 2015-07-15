var app = angular.module('mainApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl:'pages/postList.html',
            controller:'PostListController'
        }).
        when('/createPost', {
            templateUrl:'pages/postCreation.html',
            controller:'PostCreationController'
        }).
        when('/signIn', {
            templateUrl:'pages/authenticationPage.html',
            controller:'AuthenticationController'
        }).
        when('/whiteboard', {
            templateUrl:'pages/whiteboardPage.html',
            controller:'WhiteboardPageController'
        })
}])
