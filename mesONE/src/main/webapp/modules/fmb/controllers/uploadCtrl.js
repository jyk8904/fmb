/**  
 * @Class Name : fmbModeCtrl.js
 * @Description : fmbMode 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.29  정유경       최초생성
 * @ 2017.06.19  jy CHO     수정
 * 
 */

'use strict';

angular
.module('app')
.controller('UploadCtrl', [ 'CmmAjaxService'
							, '$scope'
							, '$mdDialog'
							, 'Upload'
							, function (CmmAjaxService
									, $scope
									, $mdDialog
									, Upload
									) 
{
								 $scope.submit = function() {
								      if ($scope.file.$valid && $scope.file) {
								        
								    	  //$scope.upload($scope.file);
								      }
								      console.log("파일은:" + $scope.file);
								      $scope.upload($scope.file);
								    };
						/*		    $scope.upload = function (file) {
								    	Upload.upload({
								    		url: '/mes/',
								    		method: 'POST',
								    		file: file,
								    		fileFormDataName : 'fileField1'
								    	}).then(function(data,status, headers, config) {
								    		console.log(data);
								    	});
								    };*/
								    $scope.upload = function (file) {
								        Upload.upload({
								            url: '/images/',
								            data: {file: file}
								        }).then(function (resp) {
								            console.log('Success ' + resp.config.data.file.name + '  uploaded.  Response: ' + resp.data);
								        }, function (resp) {
								            console.log('Error status: ' + resp.status);
								        }, function (evt) {
								            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
								            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
								        });
								    };
    
}]);
