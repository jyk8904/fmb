/**  
 * @Class Name : fmbCwMonCtrl.js
 * @Description : fmbCwMon
 * @Modification Information  
 * @
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
    	console.log("팝업끔")
    };
    
	getImages();
	
	// 이미지 가져오기
	function getImages(){
		var promise = CmmAjaxService.selectOne("/mes/bas/selectFmbImage.do");
        promise.then(function(data){
        	self.images = data;//fmbPlcVo가 담긴 리스트 형태리턴
        	console.log(data);
        }
        ,function(data){
        	alert('fail: '+ data)
        });
    };
    
    self.imagePick = function imagePick(index) {
    	self.target.num = index;
    };
    
    self.saveBgImg = function saveBgImg(target) {
    	
    	console.log(target);
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
    		console.log(self.saveBgImageVo)
    		var eqptPromise = CmmAjaxService.save("/mes/bas/saveBgImage.do", self.saveBgImageVo);
    	}
    };
    
    
    self.imgDel = function imgDel(target) {
    	console.log(target);
    	
    	console.log(self.images[target].file_p_path);
    	console.log(self.images[target].seq);
    	self.delTarget.seq = self.images[target].seq;
    	self.delTarget.file_p_path = self.images[target].file_p_path;
    	console.log(self.delTarget);
    	var promise = CmmAjaxService.del("/mes/bas/delFmbImage.do", self.delTarget);
    	
        promise.then(function(data){
        	self.target.num = null;
        	getImages();
        	console.log("선택해제")
        }
        ,function(data){
        	alert('fail: '+ data)
        });
    	
    };
}]);

