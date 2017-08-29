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
.controller('UploadCtrl', [   'CmmModalSrvc'
							, 'CmmAjaxService'
							, '$scope'
							, '$mdDialog'
							, 'Upload'
							, function (CmmModalSrvc
									, CmmAjaxService
									, $scope
									, $mdDialog
									, Upload
									) 
{
								
								var self = this;
								$scope.imageInfo = {show:false , percentage:'0'};
								
							    self.cancel = function() {
							    	$mdDialog.hide();
							    	console.log("팝업끔")
							    };
							    
								$scope.onFileSelect = function($files) {
									if($files!=null){ // 파일 선택 
										if($files.type.indexOf('image') === -1){ //이미지 아닌 파일
											$scope.imageInfo = {show:false , percentage:0};
											CmmModalSrvc.showMessage("이미지 파일이 아닙니다");
											$scope.imageInfo = {show:false , percentage:0};
											
										}else{							// 이미지 파일 선택
											$scope.imageInfo =  {
													  name : $files.name
													, type : $files.type
													, size : $files.size + "  Bytes"
													, date : $files.lastModifiedDate
													, show : true
											}
										}
									}else{
										$scope.imageInfo = {show:false , percentage:0};
									}
								};
								
									 $scope.submit = function() {
										if ($scope.file!=undefined) { // 파일이 있는경우
											var extension = $scope.file.name.split('.')[1];
											if(extension =='jpg' ||extension =='png'||extension =='gif'||extension =='jpeg'){// 이미지 파일인경우
												$scope.upload($scope.file);
												console.log("submit")
											}else{ // 이미지 파일이 아닌걍우
												CmmModalSrvc.showMessage("선택된 파일이 없습니다");
											}
									      }else{
									    	  CmmModalSrvc.showMessage("선택된 파일이 없습니다");
									      }
									 };

								     $scope.upload = function (file) {
								    	 console.log("upload")
								        Upload.upload({
								        	method: 'POST',
								        	enctype: "multipart/form-data",
								        	contentType: false,
								        	processData: false,
								            url: 'bas/saveImage.do',
								            data: {file: file}
								        }).then(function (resp) { //done
								        	console.log(resp)
								            console.log('Success ' + resp.config.data.file.name + '  uploaded.  Response: ' + resp.data);
								        }, function (resp) { 	  // fail
								            console.log('Error status: ' + resp.status);
								        }, function (evt) { 	  //finally
								        	console.log(evt)
								            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
								            $scope.imageInfo.percentage = progressPercentage;
								            if (progressPercentage == 100) {
								            	alert("업로드가 완료되었습니다.");
								            }
								            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
								        });
								    };
    
}]);
