angular.module('mainApp').controller('AuthenticationController', ['$scope', '$http', function($scope, $http) {
    $scope.signIn = function() {
        $http.post('/authentication', {
            email: $scope.email,
            password: $scope.password
        }).
            success(function(data) {
                if (data.authenticated) {
                    console.log('success');
                } else {
                    console.log('error')
                }
            })
    }

}])

