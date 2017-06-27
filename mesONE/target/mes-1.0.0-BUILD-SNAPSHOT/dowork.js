/**
 * 
 */
'use strict';
angular
.module('app',[])
.controller('dowork', ['$http', '$scope', '$location', '$timeout','$q', function($http, $scope, $location, $timeout, $q) {
		
	var self = this;
	

	/*테스트 용도로 쓰임 Web Worker 테스트임*/
	
	self.addEventListener('message',function(e){
		self.postMessage(e.data);
	}, false);
	
}]);
    	
    	