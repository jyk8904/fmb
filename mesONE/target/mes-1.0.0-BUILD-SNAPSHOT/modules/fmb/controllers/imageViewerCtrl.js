/**  
 * @Class Name : imageViewerCtrl.js
 * @Description : imageViewer
 * @Modification Information  
 * @ 개발모드에서 저장되어있는 이미지를 보여주는 팝업창
 * @ 작업일        작성자          내용
 * @ ----------  ------------  -------------------------------
 * @ 2017.07.03  조준연, 정유경    최초생성
 * @ 
 * 
 */
'use strict';

angular
    .module('app')
    .controller('ImageViewerCtrl', [ 'CmmAjaxService'
    							, 'CmmModalSrvc'
    							, 'CmmWorkerSrvc'
    							, 'CmmFactSrvc'
    							, '$rootScope'
    							, '$http'
    							, '$scope'
    							, '$window'
    							, '$q'
    							, '$filter'
    							, '$location'
    							, '$mdDialog'
    							, '$timeout'
    							, 'factId'
    							, function (
    									  CmmAjaxService
    									, CmmModalSrvc
    									, CmmWorkerSrvc
    									, CmmFactSrvc
    									, $rootScope
    									, $http
    									, $scope
    									, $window
    									, $q
    									, $filter
    									, $location
    									, $mdDialog
    									, $timeout
    									, factId
    									) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
	var images = {};
	$scope.select = {};
	self.target = {
			num : null
	};
	self.delTarget = {
			file_p_path: null,
			seq : null
	};
    self.cancel = function() {
    	$mdDialog.hide();
    };
    
	getImages();
	
	// 이미지 가져오기
	function getImages(){
		var promise = CmmAjaxService.selectOne("bas/selectFmbImage.do");
        promise.then(function(data){
        	self.images = data;//fmbPlcVo가 담긴 리스트 형태리턴
        }
        ,function(data){
        	alert('fail: '+ data)
        });
    };
    
    self.imagePick = function imagePick(index) {
    	self.target.num = index;
    };
    
    //이미지 선택하기
    self.saveBgImg = function saveBgImg(target) {
    	if (Object.keys(target).length === 0 || target === undefined || target.num === null) 
    	{
    		alert("이미지가 선택되지 않았습니다. 이미지를 선택해주세요.");
    		return;
    	}
    	else 
    	{
    		var targetData = self.images[target.num].seq;
    		
    		self.saveBgImageVo = {
    				  factId : factId
    				, imgSeq : targetData
    		}
    		var eqptPromise = CmmAjaxService.save("bas/saveBgImage.do", self.saveBgImageVo);
    	}
    };
    
    //저장된 이미지 지우기
    self.imgDel = function imgDel(target) {
    	self.delTarget.seq = self.images[target].seq;
    	self.delTarget.file_p_path = self.images[target].file_p_path;
    	var promise = CmmAjaxService.del("bas/delFmbImage.do", self.delTarget);
    	
        promise.then(function(data){
        	self.target.num = null;
        	getImages();
        }
        ,function(data){
        	alert('fail: '+ data)
        });
    	
    };
}]);

