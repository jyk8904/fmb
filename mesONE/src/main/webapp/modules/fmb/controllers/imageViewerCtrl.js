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
    									) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
	var images = {};
	$scope.select = {};
	
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
    
}]);

