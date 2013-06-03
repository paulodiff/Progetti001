 // parse the gridData array to find the object with testId
function fremove_ArrayItem(array, property, value) {
    $.each(array, function(index, result) {
        if (result[property] == value) {
            array.splice(index, 1);
        }
    });    
};


var app = angular.module('app', ['mongolabResourceHttp','ui.state','ngGrid','ui.bootstrap']);

app.constant('MONGOLAB_CONFIG',{API_KEY:'DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_', DB_NAME:'demo_123'});

//app.constant('API_KEY', 'DFfH9ZxX0DdVQCHKMphyMwteiLdvT23_');

//app.constant('DB_NAME', 'demo_123');

// app.factory('Project', function ($mongolabResource) {
//    return $mongolabResource('projects');
// });

app.factory('Project', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('projects');
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
		var result = new Project({"_id_" : moment().unix() ,"name" : 'Andrea', "cognome": 'Rossi'});
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
	.state('SoundCloud', {
	url: "/SoundCloud",
        views: {
            "viewA": {
                template: '<h1>SoundCloud</h1>'
            },
            "viewB": {
                templateUrl: "partials/editProject_SOUNDCLOUD.html",
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

    .state('index', {
        url: "", // root route
        views: {
            "viewA": {
                templateUrl: "partials/index.viewA.html"
            },
            "viewB": {
                template: '<p>ProjectA: <input ng-model="projectA">{{projectA}}</p>'
            },
			"viewSideBar": {
				templateUrl: "partials/sidebar.html",
				//template: '<li>ProjectId: <input ng-model="projectName"></li><li>{{projectName}}</li>',
				//controller: 'Controller1'
				controller:
				[        '$scope', '$stateParams', 'Project', 
				 function ($scope,   $stateParams,   Project) {
					console.log('viewSideBar controller ... ');
					$scope.now= moment().format();
					//$scope.projects = Project.query();
					Project.all(function(projects){
						$scope.projects = projects;
					});
					
					
					console.log("Getting projects... " + $scope.projects);
                }]
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
                template: ''
            },
            "viewB": {
                templateUrl: "partials/editProject_BOOTSTRAP.html",
				controller:
				[        '$scope', '$stateParams', 'Project', 
				 function ($scope,   $stateParams,   Project) {
                  //$scope.something = something;
                  //$scope.contact = findById($scope.contacts, $stateParams.contactId);
				  console.log('editProject - viewB....');
				  console.log('projectId : ' +  $stateParams.projectId);
				  Project.getById($stateParams.projectId,function(projectITEM){
						$scope.prjItem = projectITEM;
					});
				  //$scope.myData
				  $scope.mySelections = [];				  
				  $scope.gridOptions = { 
					data: 'prjItem.addresses',
					selectedItems: $scope.mySelections,
					columnDefs: [
						{field: 'street', displayName: 'street-via', enableCellEdit: true}, 
						{field:'city', displayName:'city'},
						{field:'zip', displayName:'zip'}
						
						]
				  };
				  
				   $scope.rr_modal_opts = {
						backdropFade: true,
						dialogFade:true
					};
				  
				  
				  //$scope.prj.note = moment().format();
				  //$scope.prj.note2 = moment().format();
				  $scope.update = function (prjItemPar) {
                    //$state.nsitionTo('contacts.detail.item', $stateParams);
					alert('update:' + prjItemPar.name);
					var project = new Project(prjItemPar);
					project.$saveOrUpdate();
					console.log('saveOrUpdate:' + prjItemPar);
					window.location = "#/route3";
					//$state.transitionTo('index', $stateParams);
                  };
				  
				  $scope.addAddressItem = function () {
					// push item
					console.log('addAddressItem....');
					$scope.prjItem.addresses.push({"id" : moment().unix(), "street": "Stree" + moment().format("SSS"),"city": "Faketon"});
					//$scope.$apply();
				  };
				  
				  $scope.delAddressItem = function () {
					// push item
					alert($scope.mySelections);
					console.log('remove street .. ' + $scope.mySelections.street );
					//fremove_ArrayItem($scope.prjItem.addresses, 'street', $scope.mySelections.street);
					$scope.prjItem.addresses.splice(1,1);
					console.log('deldAddressItem....' + $scope.mySelections);
					//$scope.$apply();
				  };


				  $scope.apriDialogDetail = function (id) {
					console.log('opening...:' + id);
				  };
				  
				  $scope.rr_openModalDialog = function (id) {
					console.log('opening...:' + id);
					$scope.shouldBeOpen = true;
					console.log('opening...:' + id);
					//console.log();
				  };
					
				  $scope.rr_closeModalDialog = function () {
					console.log('closing...:' + id);
					$scope.shouldBeOpen = false;
					console.log();
				  };
					

					
				  $scope.reset = function () {
 					alert('reset');
					console.log($scope.prjItem.note);
					console.log($scope.prjItem.note2);
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
					$scope.projects = Project.query({}, {limit: 100});
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
 
 
var ModalDemoCtrl = function ($scope) {

  $scope.open = function (id) {
    $scope.shouldBeOpen = true;
	console.log('opening...:' + id);
	console.log();
	//console.log('prj id....:' + $scope.prjItem.name);
	//console.log('prj id....:' + $rootScope.$state);
  };

  $scope.close = function () {
    $scope.closeMsg = 'I was closed at: ' + new Date();
	console.log($scope.closeMsg);
    $scope.shouldBeOpen = false;
  };

  //$scope.items = ['item1', 'item2'];

  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };

};
 
 // UTILS ...
 

