app.controller('loginController', function($scope, $http, $rootScope,
		$location, $filter, $timeout, $window) {

	if (typeof (Storage) !== "undefined") {
		console.log("step1",localStorage);
		if (localStorage.getItem("username") != ''
				&& localStorage.getItem("password") != ''
				&& localStorage.getItem("username") != null
				&& localStorage.getItem("password") != null) {
			console.log("step2");
			$location.path("/loading");
		} else {
			console.log("step3");
			$location.path("/");
			
		}
	}

	$scope.login = function() {
		var username = $scope.user;
		var pwd = $scope.pwd;

		console.log("user and pwd is" + username);
		if ($scope.user != '' && $scope.pwd != '' && $scope.user != null
				&& $scope.pwd != null) {
			console.log("success");
			localStorage.setItem("username", username);
			localStorage.setItem("password", pwd);
			$location.path("/loading");

			

		} else {
			$location.path("/");
			console.log("successsssss	");
		}
	}
});
