app.controller('PostListController', ['$scope', '$http', function($scope, $http) {
    $scope.posts = [];
    $http.get('/post').
        success(function(data) {
            $scope.posts = data;
        })



}])
