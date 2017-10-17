/**
 * @Class Name : cmmAjaxSrvc.js
 * @Description : 서버와 Ajax통신을 통해 데이터 검색 및 처리하는 공통 모듈
 * @Modification Information
 * @  수정일            수정자              수정내용
 * @ ----------------------------------------------------
 * @ 2017.04.18  KB.SHIN    - 최초 생성 후 사용자 태그 적용함 
 *
 * @author  KB.SHIN
 * @since 2017.04.18
 * @version 1.0
 * @see
*/

'use strict';

angular.module('app').factory('CmmAjaxService', ['CmmModalSrvc', '$http', '$q','$window', function(CmmModalSrvc, $http, $q, $window) {

	// 서비스 메서드 목록
    var factory = {
        selectAll: selectAll,
        select : select,
        selectOne : selectOne,
        saveGrid: saveGrid,
        save: save,
        del: del,
        isNewRow : isNewRow
    };

    return factory;

    /**
     * @내용 : 전체 데이터를 조회한다.
     * @매개변수 :
     * 		url : 요청 url
     * @리턴값 :
     * 		검색 결과 데이터 객체
     */
    function selectAll(url) {
        var deferred = $q.defer();
        $http.get(url)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                deferred.reject(errResponse);
            }
        );
        //json형태로 리턴
        return deferred.promise;
    }

    /**
     * @내용 : 검색 조건에 따른 데이터를 조회한다.
     * @파라미터 :
     *     gridID : 검색 조건 결과를 반영할 grid
     *     url : 요청 url
     *     jsobObj : 데이터 검색 조건을 담고 있는 json 객체
     * @리턴값 :
     * 		성공 : OK
     *      실패 : NG 
     */
    function select(url, jsonObj) {
    //2. 1.CmmAjaxService.select("bas/selectFmbPlc.do", self.vo); 구문을 통해 요기로 이동
    	
        var deferred = $q.defer();
        
        $http.post(url, jsonObj)
        //3.url로 self.vo객체를 전송 java/com/dsinfo/fmb/web/FmbPlcCtrl.java로 이동
             .then(
            //결과를 성공적으로 받을경우 실행
            function (response) {
            	//response에 조회결과가 담겨있음
            	            	
    	    	// 현재 출력된 칼럼들의 값을 모두 조사하여 최적의 칼럼 사이즈를 찾아 배열로 반환.
    	    	// 만약 칼럼 사이즈들의 총합이 그리드 크기보다 작다면, 나머지 값들을 나눠 가져 그리드 크기에 맞추기
    	    	//var colSizeList = AUIGrid.getFitColumnSizeList(gridID, true);
    	    	// 구해진 칼럼 사이즈를 적용 시킴.
    	    	//AUIGrid.setColumnSizeList(gridID, colSizeList);
            	deferred.resolve(response.data);

            	
    		
    			// response.data.length;
            },
            //결과를 성공적으로 받지못할 경우 실행
            function(httpError){
				//CmmModalSrvc.showError(httpError.data);
				//deferred.reject("NG");
            	deferred.reject(httpError.data);
            }
        );
        return deferred.promise;
    }
    
/*    
    
    function select(gridID, url, jsonObj) {
        var deferred = $q.defer();
    	
		AUIGrid.removeAjaxLoader(gridID);
        $http.post(url, jsonObj)
            .then(
            function (response) {
    			AUIGrid.setGridData(gridID, response.data);
    	    	// 현재 출력된 칼럼들의 값을 모두 조사하여 최적의 칼럼 사이즈를 찾아 배열로 반환.
    	    	// 만약 칼럼 사이즈들의 총합이 그리드 크기보다 작다면, 나머지 값들을 나눠 가져 그리드 크기에 맞추기
    	    	//var colSizeList = AUIGrid.getFitColumnSizeList(gridID, true);
    	    	// 구해진 칼럼 사이즈를 적용 시킴.
    	    	//AUIGrid.setColumnSizeList(gridID, colSizeList);
    			deferred.resolve("OK"); // response.data.length;
            },
            function(httpError){
				CmmModalSrvc.showError(httpError.data);
				deferred.reject("NG");
            }
        );
        return deferred.promise;
    }
    */
    
    
    /**
     * @내용 : 검색 조건에 따른 데이터를 1건 조회한다.
     * @매개변수 :
     * 		url : 요청 url
     * 		jsobObj : 데이터 검색 조건을 담고 있는 json 객체
     * @리턴값 : 데이터 검색 결과
     */
    function selectOne(url, jsonObj) {
        var deferred = $q.defer();
        $http.post(url, jsonObj)
	        .then(function (response) {
	            deferred.resolve(response.data);
	        },
	        function(httpError){
	            deferred.reject(httpError.data);
	        });
        return deferred.promise;
    }

    
    /**
     * @내용 : 데이터를 저장
     * @매개변수 :  
     *     url : 요청 url
     *     jsobObj : 저장할 데이터 json 객체
     * @리턴값 :
     * 		성공 : OK
     * 		실패 : 오류 결과
     */
    function save(url, jsonObj) {
        var deferred = $q.defer();

		CmmModalSrvc.getSave().then(
    		function (result) {
    			if (result == true) {
			    	doSave(url, jsonObj)
					.then(
						function(d) {
							if (d.msgId == "OK") {
								//console.log("11"+CmmModalSrvc.showSave(d.msgNm));
								/*if(CmmModalSrvc.showSave(d.msgNm)==true){
									$window.location.reload();
								}	*/
								//
								CmmModalSrvc.showSave(d.msgNm)	
								$window.location.reload();
								
					            deferred.resolve(d);
							}
							else {
								CmmModalSrvc.showError(d.msgNm);
					            deferred.reject(httpError.data);
							}
						}
					);
    			}
    		}
		)
		return deferred.promise;
    }
    /* @내용 : 삭제
    * @매개변수 :  
    *     url : 요청 url
    *     gridID : 저장할 그리드 객체
    * @리턴값 :
    * 		신규 : true
    * 		기존 : false
    */
    
    
    function del(url, jsonObj) {
        var deferred = $q.defer();
       // console.log(jsonObj)
		CmmModalSrvc.getYesNo('알림','삭제하시겠습니까?' ).then(
    		function (result) {
    			
    			//console.log(result)
    			if (result == true) { // yes버튼 클릭
    			    
    				$http.post(url, jsonObj)
			        .then(function (response) {//삭제성공시
			        	deferred.resolve(response.data);
			            console.log(response.data)
			            CmmModalSrvc.showMessage(response.data[0]);
			        },
			        function(httpError){
			            deferred.reject(httpError.data);
			            console.log(httpError.data)
			        });
    			}else { //no 버튼 클릭
    				CmmModalSrvc.showMessage("취소되었습니다.");
		            deferred.reject(httpError.data);
				}
    		}
		);
		return deferred.promise;
    }

    /**
     * @내용 : AuiGrid의 변경된 레코드를 일괄적으로 저장함
     * @매개변수 :  
     *     url : 요청 url
     *     gridID : 저장할 그리드 객체
     * @리턴값 :
     * 		성공 : OK
     * 		실패 : 오류 결과
     */
    function saveGrid(url, gridID) {
        var deferred = $q.defer();
        
		CmmModalSrvc.getSave().then(
    		function (result) {
    			if (result == true) {
			    	doSaveGrid(url, gridID)
					.then(
						function(d) {
							if (d.msgId == "OK") {
								CmmModalSrvc.showSave(d.msgNm);
					            deferred.resolve(d.msgId);
							}
							else {
								CmmModalSrvc.showError(d.msgNm);
					            deferred.reject(httpError.data);
							}
						}
					);
    			}
    		}
	    )
	    return deferred.promise;
    }

    /**
     * @내용 : 신규로 추가된 Row인지 확인한다.  
     * @매개변수 :  
     *     url : 요청 url
     *     gridID : 저장할 그리드 객체
     * @리턴값 :
     * 		신규 : true
     * 		기존 : false
     */
    function isNewRow(event, gridId) {
		var uid = AUIGrid.getItemByRowIndex(gridId, event.rowIndex)._$uid;
		
    	var insertRows = AUIGrid.getAddedRowItems(gridId);
    	if (insertRows != null && insertRows.length > 0) {
        	for (var i=0; i < insertRows.length; i++) {
        		if (insertRows[i]._$uid === uid) {
        			return true;
        		}
        	}
    	}
    	return false; 
    }

    /**=================================================================
     * 내부 함수
     *=================================================================*/
    /**
     * @내용 : 신규,삭제, 추가된 데이터를 saveRows에 합치고 _$uid 필드에 신규,수정,삭제 식별자를 기록한다.
     *         저장할 내용을 서버에 요청한다. 
     * @매개변수 :  
     *     url : 요청 url
     *     gridID : 저장할 그리드 객체
     * @리턴값 :
     * 		신규 : true
     * 		기존 : false
     */
    function doSaveGrid(url, gridID) {
    	var updateRows = AUIGrid.getEditedRowItems(gridID);
    	var deleteRows = AUIGrid.getRemovedItems(gridID);
    	var insertRows = AUIGrid.getAddedRowItems(gridID);
    	var saveRows = [];
    	
    	for (var i=0; i < updateRows.length; i++) {
    		updateRows[i]._$uid = 'U';
    		saveRows.push(updateRows[i]);
    	}
   	
    	for (var i=0; i < deleteRows.length; i++) {
    		deleteRows[i]._$uid = 'D';
    		saveRows.push(deleteRows[i]);
    	}
    	
    	for (var i=0; i < insertRows.length; i++) {
    		insertRows[i]._$uid = 'I';
    		saveRows.push(insertRows[i]);
    	}
    	
    	if (saveRows != null && saveRows.length > 0) {
	    	var jsonObj = JSON.stringify(saveRows);

	        var deferred = $q.defer();
	        $http.post(url, jsonObj)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
    	} else {
    		CmmModalSrvc.showMessage("저장할 내용이 없습니다");
    	}
    }
    
    /**
     * @내용 : 데이터 저장할 내용이 1건일때 사용하며 저장할 내용을 서버에 요청한다. 
     * @매개변수 :  
     *     url : 요청 url
     *     jsonObj : 저장할 json 객체
     * @리턴값 :
     * 		성공 : OK
     * 		실패 : 오류 메시지
     */
    function doSave(url, jsonObj) {
        var deferred = $q.defer();
        $http.post(url, jsonObj)
	        .then(function (response) {
	            deferred.resolve(response.data);
	        },
	        function(httpError){
	            alert(httpError.status + ":" + httpError.data);
	            deferred.reject(httpError.data);
	        });
        return deferred.promise;
    }
    
    
}]);
