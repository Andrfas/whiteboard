var app = angular.module('mainApp', ['ngRoute', 'ngFileUpload', 'ngLocale']);

angular.module('mainApp').config(['$routeProvider', function($routeProvider) {
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


/*
    TODO
    - вставка изображения по ссылке
    - ресайз изображения
    - обрезание изображения

    - стрелки прямые
    - стрелки рисованные вручную

    - смена размера шрифта в текстовом стикере
    - смена цвета текста
*/
