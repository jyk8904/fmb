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
								
								$scope.imageInfo = {show:false , percentage:'0'};
								
								$scope.onFileSelect = function($files) {
									if ($files != null) {
										console.log($files)
										$scope.imageInfo =  {
															  name : $files.name
															, type : $files.type
															, size : $files.size + "  Bytes"
															, date : $files.lastModifiedDate
															, show : true
										};
										
										console.log($scope.imageInfo);
										
									}
									else {
										$scope.imageInfo = {show:false , percentage:0};
									}
								/*	for (var i = 0; i < $files.length; i++) {
										var file = $files[i];
										console.log(file)
									}*/
								};
								
								 $scope.submit = function() {
								      if ($scope.file.$valid && $scope.file) {
								    	  
								    	  //$scope.upload($scope.file);
								      }
								      console.log($scope.file);
								      $scope.upload($scope.file);
								    };

								    $scope.upload = function (file) {
								        Upload.upload({
								        	method: 'POST',
								        	enctype: "multipart/form-data",
								        	contentType: false,
								        	processData: false,
								            url: 'bas/saveImage.do',
								            data: {file: file}
								        }).then(function (resp) {
								        	console.log(resp)
								            console.log('Success ' + resp.config.data.file.name + '  uploaded.  Response: ' + resp.data);
								        }, function (resp) {
								            console.log('Error status: ' + resp.status);
								        }, function (evt) {
								            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
								            $scope.imageInfo.percentage = progressPercentage;
								            if (progressPercentage == '100') {
								            	alert("업로드가 완료되었습니다.");
								            }
								            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
								        });
								    };
    
}]);
