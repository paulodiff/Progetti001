var app = angular.module('app', ['mongolabResource']);

app.constant('API_KEY', 'DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_');

app.constant('DB_NAME', 'demo_123');

app.factory('Project', function ($mongolabResource) {
    return $mongolabResource('projects');
});


//var injector = angular.injector(['app', 'ng']);
//var Project = app.get('Project');

// crea il controller
app.controller('Controller1',function ($scope, Project) {

	console.log('ok');

    $scope.master= {};

    $scope.update = function(user) {
        $scope.master= angular.copy(user);
		console.log(Project);
		var project = new Project({'name':'Data' + Date() , 'cognome': 'Congnome' + Date() });
        project.saveOrUpdate();
		//$scope.projects = Project.query();
        console.log(user);
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();

	$scope.projects = Project.query();
	console.log($scope.projects);
	
});

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/projects', {templateUrl: 'partials/projects-list.html',   controller: 'Controller1'}).
      when('/projects/:projectId', {templateUrl: 'partials/projects-detail.html', controller: 'Controller1'}).
      otherwise({redirectTo: '/projects'});
}]);


 
