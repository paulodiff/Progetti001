function FetchCtrl($scope, $http, $templateCache) {
  $scope.method = 'POST';
  $scope.url = 'http://127.0.0.1:8989/gitroot/Progetti001/REST-API/curl.php';
 
  $scope.fetch = function() {
    $scope.code = null;
    $scope.response = null;
 
    $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
      success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
      }).
      error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    });
  };
    
  
  
   $scope.updateModel = function(method, url) {
    $scope.method = method;
    $scope.url = url;
	$scope.status = 'waiting...';
	
  };
  
  $scope.fetchJQUERY = function (){
	
		console.log('jquery .. ');
  
	  $.ajax({
		type: $scope.method,
		url: $scope.url,
		crossDomain: true,
		headers: {
				'Content-Type':'application/json',
				'Authorization':'key=AIzaSyBp249VakoQG3mNuXedhYJedjtaioiKIKg'
		},
		data: { 
											collapse_key: 'score_update',
											time_to_live: 108,
											delay_while_idle: true,
											data: {
												score: "4x8",
												foreground : true,
												soundname : "bell.mp3",
												message : "SALUTONI!BELLI!",
												msgcnt : "12",
												time: "15:16.2342"
											},
											registration_ids: [ "APA91bGGGhKkhR2GE1TppjDw1XC9FXOHQzD4ZH_kebJmEGHfXM2erRjt3G9t9jfrh81Jez-gpzBgdlnCqqjnS8NHdDgZ6FlGJ4jxqrsz2Qtjrt6kDG8LahAjNlkWH9of_crBLP8QH_kCDXkmnzOParKV_KsAyMlgnA" ] 
										},
								
		dataType: 'json',
		success: function(responseData, textStatus, jqXHR) {
			var value = responseData.someKey;
		},
		error: function (responseData, textStatus, errorThrown) {
			alert('POST failed.');
		}
	});
  
  
  };
  
	$scope.fetchANGULAR = function () {
						
						console.log('SendNotifications---START');
											
						
						$http({	method: $scope.method, 
								url: $scope.url, 
								//url: 'http://127.0.0.1', 
								//headers: { 'Authorization' : 'key=AIzaSyBp249VakoQG3mNuXedhYJedjtaioiKIKg' },
								//cache: false,
								//withCredentials : true,
								params: { Authorization : 'key=AIzaSyBp249VakoQG3mNuXedhYJedjtaioiKIKg',
										  par2 : 2
										},
								data : { 
											collapse_key: 'score_update',
											time_to_live: 108,
											delay_while_idle: true,
											data: {
												score: "4x8",
												foreground : true,
												soundname : "bell.mp3",
												message : "SALUTONI!BELLI!1000000",
												msgcnt : "12",
												time: "15:16.2342"
											},
											registration_ids: [ "APA91bGGGhKkhR2GE1TppjDw1XC9FXOHQzD4ZH_kebJmEGHfXM2erRjt3G9t9jfrh81Jez-gpzBgdlnCqqjnS8NHdDgZ6FlGJ4jxqrsz2Qtjrt6kDG8LahAjNlkWH9of_crBLP8QH_kCDXkmnzOParKV_KsAyMlgnA" ] 
										}
								}).
							  success(function(data, status) {
								$scope.status = status;
								$scope.data = data;
							  }).
							  error(function(data, status) {
								$scope.data = data || "Request failed";
								$scope.status = status;
							});
							
							console.log('SendNotifications--END');
							
					};
  
  $scope.fetchCORS = function () {
  
	console.log('fetchCORS ... ');
  
    var xhr = createCORSRequest($scope.method, $scope.url);
	  if (!xhr) {
		alert('CORS not supported');
		return;
	  }

	  // Response handlers.
	  xhr.onload = function() {
		var text = xhr.responseText;
		//var title = getTitle(text);
		alert('Response from CORS request to ' + $scope.url + ': ' + text);
	  };

	  xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	  };

	  
	console.log('fetchCORS ... set header');  
	  
	//xhr.setRequestHeader('Content-Type','application/json');  
	xhr.setRequestHeader('Authorization','key=AIzaSyBp249VakoQG3mNuXedhYJedjtaioiKIKg');  
	
	
	console.log('fetchCORS ... send'); 	
	  
	xhr.send();
  
  
  };
  
  
}


// CORS


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}


