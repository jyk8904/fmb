/**
 * 
 */
var userPopup = angular.module('app', ['ui.bootstrap']);
userPopup.controller('popupController', function($scope, $modal, $log) {
        $scope.usrs = [];
        $scope.usr = {name: '', job: '', age: '', sal: '', addr:''};
       
        $scope.addUser = function(){
         var dialogInst = $modal.open({
    			  templateUrl: '/smart-mes/modules/cmm/views/cmmPopupTest.html',
    			  controller: 'DialogInstCtrl',
    			  size: 'lg',
    			  resolve: {
    				selectedUsr: function () {
    				  return $scope.usr;
    				}
    			  }
			    });
			dialogInst.result.then(function (newusr) {
			    $scope.usrs.push(newusr);
			    $scope.usr = {name: '', job: '', age: '', sal: '', addr:''};
			}, function () {
			  $log.info('Modal dismissed at: ' + new Date());
			});
        };
});

userPopup.controller('DialogInstCtrl', function($scope, $modalInstance, selectedUsr, $log) {
	$scope.usr = selectedUsr;
	init();
	
	function init() {
		// angular.element(document.getElementById('space-for-buttons')).append($compile("<div><button class='btn btn-default' data-alert="+scope.count+">Show alert #"+scope.count+"</button></div>")(scope));
		$scope.title = 'test title';
		$modalInstance.title = 'test title';
	}
	
	
	$scope.submitUser = function () {
		$modalInstance.close($scope.usr);
		//	$scope.usr = {name: '', job: '', age: '', sal: '', addr:''};
  	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
