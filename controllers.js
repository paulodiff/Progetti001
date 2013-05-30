var app = angular.module('app', ['mongolabResource','ui.state']);

app.constant('API_KEY', 'DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_');

app.constant('DB_NAME', 'demo_123');

app.factory('Project', function ($mongolabResource) {
    return $mongolabResource('projects');
});


//var injector = angular.injector(['app', 'ng']);
//var Project = app.get('Project');

// crea il controller
app.controller('Controller1',function ($scope, Project) {

	console.log('Controller1 ... ');

    $scope.master= {};

	$scope.now= moment().format();
	
    $scope.update = function(user) {
        $scope.master= angular.copy(user);
		console.log(Project);
		var project = new Project({'name':'Data' + Date() , 'cognome': 'Cognome' + Date() });
        project.saveOrUpdate();
		//$scope.projects = Project.query();
        console.log(user);
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();

	$scope.projects = Project.query();
	console.log("Getting projects... " + $scope.projects);
	
});


app.controller('EditProjectController',function ($scope, $routeParams, Project, $stateParams) {

	console.log('EditProjectController...');
	$scope.projectId = $routeParams.projectId;
	
	// attenzione   
	
	$scope.projectId = $stateParams.projectId;
	
	if ($scope.projectId != "Add") {
		var result = Project.getById($scope.projectId);
	} else {
		var result = new Project({"name" : 'Andrea', "cognome": 'Rossi'});
	}	
	
	$scope.project = result;
	$scope.name = result.name;
	$scope.cognome = result.cognome;
	console.log('EditProjectController:projectId:' + $scope.projectId);
	console.log("result");
	console.log(result);
	console.log(result._id);
	console.log(result.name);
	console.log(result.cognome);
	console.log($scope.name);
	console.log($scope.cognome);
	
	$scope.$watch('project', function() { console.log('project!'); });
	
    $scope.save = function(project) {
		alert('save item!' + project);
		var project = new Project(project);
        project.saveOrUpdate();
		console.log(project);
		window.location = "#/projects";
		// reload side list!
    };

    
});


//app.config(['$routeProvider', function($routeProvider) {
//  $routeProvider.
//      when('/projects', {templateUrl: 'partials/projects-list.html',   controller: 'Controller1'}).
//      when('/projects/:projectId', {templateUrl: 'partials/projects-detail.html', controller: 'EditProjectController'}).
//	  when('/projects/Add', {templateUrl: 'partials/projects-detail.html', controller: 'EditProjectController'}).
//      otherwise({redirectTo: '/projects'});
//}]);

app.config(function($stateProvider, $routeProvider){
$stateProvider
    .state('index', {
        url: "", // root route
        views: {
            "viewA": {
                templateUrl: "partials/index.viewA.html"
            },
            "viewB": {
                templateUrl: "partials/index.viewB.html"
            }
        }
    })
    .state('route1', {
        url: "/route1",
        views: {
            "viewA": {
                templateUrl: "partials/route1.viewA.html"
            },
            "viewB": {
                templateUrl: "partials/route1.viewB.html"
            }
        }
    })
    .state('route2', {
        url: "/route2",
        views: {
            "viewA": {
                templateUrl: "partials/route2.viewA.html"
            },
            "viewB": {
                templateUrl: "partials/route2.viewB.html"
            }
        }
    })
	.state('route3', {
        url: "/route3",
        views: {
            "viewA": {
                template: '<h1>My route3</h1>'
            },
            "viewB": {
                templateUrl: "partials/route2.viewB.html",
				controller: 'Controller1'
            },
			"viewSideBar": {
				templateUrl: "partials/sidebar.html",
				//controller: 'Controller1'
				controller:
				[        '$scope', '$stateParams', 'Project', 
				 function ($scope,   $stateParams,   Project) {
					console.log('viewSideBar controller ... ');
					$scope.now= moment().format();
					$scope.projects = Project.query();
					console.log("Getting projects... " + $scope.projects);
                }]
			}
        }
    })
	
	.state('editProject', {
        url: "/projects/:projectId",
        views: {
            "viewA": {
                template: '<h1>EDIT PROJECT</h1>'
            },
            "viewB": {
                templateUrl: "partials/editProject.html",
				controller:
				[        '$scope', '$stateParams', 'Project', 
				 function ($scope,   $stateParams,   Project) {
                  //$scope.something = something;
                  //$scope.contact = findById($scope.contacts, $stateParams.contactId);
				  console.log('projectId : ' +  $stateParams.projectId);
				  var result = Project.getById($stateParams.projectId);
				  console.log(result);
				  $scope.prj = result;
				  $scope.update = function (prj) {
                    //$state.nsitionTo('contacts.detail.item', $stateParams);
					alert('update:' + prj.name);
					var project = new Project(prj);
					project.saveOrUpdate();
					console.log('saveOrUpdate:' + prj);
					window.location = "#/route3";
					//$state.transitionTo('index', $stateParams);
                  };
				  $scope.reset = function () {
					alert('reset');
				  };
                }],
            },
			"viewSideBar": {
				templateUrl: "partials/sidebar.html",
				//controller: 'Controller1'
				controller:
				[        '$scope', '$stateParams', 'Project', 
				 function ($scope,   $stateParams,   Project) {
					console.log('viewSideBar controller ... ');
					$scope.now= moment().format();
					$scope.projects = Project.query();
					console.log("Getting projects... " + $scope.projects);
                }]
			}
        }
    })
	
	
	
})
.run(
      [        '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
 }]);
 
