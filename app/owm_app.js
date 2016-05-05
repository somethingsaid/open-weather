angular.module('OWMApp', ['ngRoute', 'ngAnimate'])
	.value('owmCities', ['New York', 'Dallas', 'Chicago'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', { //i.e, when user visits / (root), app should respond with home.html and HomeCtrl
            templateUrl : 'home.html',
            controller : 'HomeCtrl'
        })
        .when('/cities/:city', {
        	templateUrl : 'city.html',
        	controller : 'CityCtrl',
        	resolve: {
        		city: function(owmCities, $route, $location) {
        			var city = $route.current.params.city;
        			if (owmCities.indexOf(city) === -1) {
        				$location.path('/error');
        				return;
        			}
        			return city;
        		}
        	}
        })
        .when('/error', {
        	template: '<p>Error - Page Not Found</p>'
        })
    }])
    .run(function($rootScope, $location, $timeout) {
	    $rootScope.$on('$routeChangeError', function() {
	        $location.path("/error");
	    });
	    $rootScope.$on('$routeChangeStart', function() {
	        $rootScope.isLoading = true;
	    });
	    $rootScope.$on('$routeChangeSuccess', function() {
	        // if not using timeout, change would be instantenous. we want to simulate loading state
	        $timeout(function() {
	            $rootScope.isLoading = false;
	        }, 1000);
	    });
	})
    .controller('HomeCtrl', ['$scope', function($scope) {
        //empty for now
    }])
    .controller('CityCtrl', ['$scope', 'city', function($scope, city) {
    	$scope.city = city; // for display in city.html
    }]); 