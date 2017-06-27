/**
 * @Class Name : cmmWorkerSrvc.js
 * @Description : Worker 를 통해 데이터 검색 및 처리하는 공통 모듈
 * @Modification Information
 * @  수정일            수정자              수정내용
 * @ ---------------------------------------------------- *
 * @author  KB.SHIN
 * @since 2017.06.20
 * @version 1.0
 * @see
*/

'use strict';

angular.module('app').factory('CmmWorkerSrvc',  function() {
    	var workerList = {}
    
    	workerList.worker1 = undefined;
    	workerList.worker2 = undefined;    
    	workerList.worker3 = undefined;
    	
    	
    	return workerList;
    });
