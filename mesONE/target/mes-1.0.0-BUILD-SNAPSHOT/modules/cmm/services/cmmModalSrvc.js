/* 
 * @Class Name : cmmMatMstCtrl.js
 * @Description : 공통 코드 조회 컨트롤러
 * @Modification Information  
 * @
 * @  수정일            수정자            수정내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.04.19  kb.shin    - 최초생성
 * 
 * @author kb.shin
 * @since 2017.01.01
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by Brit Consortium All right reserved.
*/

'use strict';

angular.module('app').factory('CmmModalSrvc', ['ModalService', '$q', function(ModalService, $q) {

    var factory = {
       	getYesNo: getYesNo,
        getSave : getSave,
        
        showSave : showSave,
        showError : showError,
		showMessage: showMessage,
		
		//showMatMst : showMatMst
     };

    return factory;

	/**
     * 사용자에게 Yes/No 확인함
     */
    function getYesNo(title, message) {
        var deferred = $q.defer();
        
	    ModalService.showModal({
	      templateUrl: "/smart-mes/modules/cmm/views/cmmYesNoDlg.html",
	      controller: "CmmConfirmCtrl",
	      controllerAs: 'vm',
          inputs: {
              title: title,
              message: message
           }
	    }).then(function(modal) {
	      modal.element.modal();
	      modal.close.then(function(result) {
	    	  deferred.resolve(result);
	      });
	   });
	    
	   return deferred.promise;
	};

	/**
	 * 데이터를 저장할지 사용자에게 확인함
	 */
    function getSave() {
        var deferred = $q.defer();
	    ModalService.showModal({
	      templateUrl: "/smart-mes/modules/cmm/views/cmmYesNoDlg.html",
	      controller: "CmmConfirmCtrl",
	      controllerAs: 'vm',
          inputs: {
              title: "확인",
              message: "데이터를 저장하시겠습니까?"
           }
	    }).then(function(modal) {
	      modal.element.modal();
	      modal.close.then(function(result) {
	    	  deferred.resolve(result);
	      });
	   });
	    
	   return deferred.promise;
	};

	/**
	 * 저장 처리 결과를 확인함
	 */
    function showSave(message) {
    	return getConfirm("확인", message);
	};
	
	/**
	 * 저장 시 오류 발생시 확인함
	 */
    function showError(message) {
    	return getConfirm("오류", message);
	};
	

	/**
	 * 일반적인 메시지 내용을 확인함
	 */
    function showMessage(message) {
    	return getConfirm("확인", message);
	};
	
	
	/**
	 * 내부용 함수 
	 */
    function getConfirm(title, message) {
	    ModalService.showModal({
	      templateUrl: "/smart-mes/modules/cmm/views/cmmConfirmDlg.html",
	      controller: "CmmConfirmCtrl",
	      controllerAs: 'vm',
          inputs: {
              title: title,
              message: message
           }
	    }).then(function(modal) {
	      modal.element.modal();
	      modal.close.then(function(result) {
	      });
	   });
	};
	
	
	
	/**
	 * 자재 마스터를 검색한다.
	 */
    function showMatMst(vo) {
        var deferred = $q.defer();
        
	    ModalService.showModal({
	      templateUrl: "/mes/modules/fmb/views/fmbPopup.html",
		  controller: "fmbPopupCtrl",
	      controllerAs: 'vm',
          inputs: {
              message: vo
           }
	    }).then(function(modal) {
	      modal.element.modal();
	      modal.close.then(function(result) {
	    	  deferred.resolve(result);
	      });
	   });
	    
	   return deferred.promise;
	};
	
	  /*
	  $scope.showCustom = function() {

	    ModalService.showModal({
	      templateUrl: "/smart-mes/modules/cmm/views/custom.html",
	      controller: "CustomController",
	      bodyClass: "custom-modal-open"
	    }).then(function(modal) {
	      modal.close.then(function(result) {
	        $scope.customResult = "All good!";
	      });
	    });
	  };
      */
}]);


