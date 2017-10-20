/**  
 * @Class Name : uploadCtrl.js
 * @Description : upload 
 * @Modification Information  
 * @ 개발모드에서 이미지 업로드하는 팝업창
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
							, '$timeout'
							, function (CmmModalSrvc
									, CmmAjaxService
									, $scope
									, $mdDialog
									, Upload
									, $timeout
									){
								
	var self = this;
	$scope.imageInfo = {show:false , percentage:'0'};
	
	self.cancel = function() {
		$mdDialog.hide();
	};
	
	//파일선택
	$scope.onFileSelect = function($files) {
		if($files!=null){ // 파일 선택 
			if($files.type.indexOf('image') === -1){ //이미지 아닌 파일일 경우
				$scope.imageInfo = {show:false , percentage:0};
				CmmModalSrvc.showMessage("이미지 파일이 아닙니다");
				$scope.imageInfo = {show:false , percentage:0};
				
			}else{									// 이미지 파일 선택한 경우
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
	
	//선택된 파일 업로드
	 $scope.submit = function() {
		if ($scope.file!=undefined) { // 파일이 있는경우
			var extension = $scope.file.name.split('.')[1];
			if(extension =='jpg' ||extension =='png'||extension =='gif'||extension =='jpeg'){// 이미지 파일인 ㄴ경우
				$scope.upload($scope.file);
			}else{ 																			 // 이미지 파일이 아닌걍우
				CmmModalSrvc.showMessage("선택된 파일이 없습니다");
			}
	    }else{						// 선택된 파일이 없는경우
	    	CmmModalSrvc.showMessage("선택된 파일이 없습니다");
	    }
	 };

	 
     $scope.upload = function (file) {
        Upload.upload({
        	method: 'POST',
        	enctype: "multipart/form-data",
        	contentType: false,
        	processData: false,
            url: 'bas/saveImage.do',
            data: {file: file}
        }).then(function (resp) { //done
        	//console.log('Success ' + resp.config.data.file.name + '  uploaded.  Response: ' + resp.data);
        }, function (resp) { 	  // fail
            //console.log('Error status: ' + resp.status);
        }, function (evt) { 	  //finally
        	if(evt.type=="load"){
        		var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        		$scope.imageInfo.percentage = progressPercentage;
	            var  progressTimeout= $timeout(function(){// 업로드가 끝나기전에 알림창이 떠버려서 timeout을 지정해주었으나, 검토해봐야함.
	            	 if ($scope.imageInfo.percentage == 100) {
			            	alert("업로드가 완료되었습니다.");
			            	progressTimeout.$cancel();
			            	progressTimeout=null;
			            }
	            }, 500);
	        }
        });
    };
								
}]);
