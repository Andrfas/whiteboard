app.controller('PostCreationController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.createPost = function() {
        $http.post('/post', {
            title:$scope.title,
            text:$scope.text
        }).
            success(function(data) {
                showSuccessMessage();
                $window.location.href = '/#/post/'+data.id;
            }).
            error(function() {
                showErrorMessage();
            })
    }

    function showSuccessMessage() {
        $scope.success = true;
    }

    function showErrorMessage() {
        $scope.error = true;
    }
}])
