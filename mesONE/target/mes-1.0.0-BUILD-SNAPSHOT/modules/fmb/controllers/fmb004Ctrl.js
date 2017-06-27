/**  
 * @Class Name : fmb001Ctrl.js
 * @Description : fmb001 
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.26  kb.shin    최초생성
 * @ 
 * 
 * @author kb.shin
 * @since 2017.01.01
 * @version 1.0
 * @see
 * 
 */

'use strict';

angular
    .module('app')
    .controller('Fmb004Ctrl', ['CmmAjaxService', '$http', '$scope', '$q', function (CmmAjaxService, $http, $scope, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    
    var self = this;
    var gridId = null; //그리드 ID 선언
   
    console.log("004ctrl");
    self.vo = {
        	plcId: '', 
        	factId: ''
        }
    
    // 조회버튼 클릭이벤트
    self.btnSelectClick = btnSelectClickHandler;
    
   /* ------------------------------------------
     * AUI 그리드 변수 선언
     *-----------------------------------------
     */
    
    
 // 컬럼 레이아웃 정의
	    var agColumnLayout = [ {
			dataField : "factId",
			headerText : "공장ID",
			width : '12%'
		}, {
			dataField : "lineNm",
			headerText : "라인명",
			width : '12%'
		}, {
			dataField : "plcId",
			headerText : "PLC ID",
			width : '12%'
		}, {
			dataField : "eqptNm",
			headerText : "설비명",
			width : '12%'
		}, {
			dataField : "eqptSts",
			headerText : "설비상태",
			width : '12%'
		}, {
			dataField : "prodDt",
			headerText : "생산날짜",
			width : '12%'
		}, {
			dataField : "plcCount",
			headerText : "생산량",
			width : '12%'
		}];

	// AUIGrud 속성 정의
	var agMstProps = {
			// 페이징 사용		
			usePaging : true,
			// 한 화면에 출력되는 행 개수 30개로 지정
			// pageRowCount 의 크기가 너무 크면 퍼포먼스가 낮아집니다.
			// 그리드 페이징은 해당 행 수만큼 DOM을 만들기 때문입니다.
			pageRowCount : 10,
			
			// 페이징 하단에 출력되는 페이징 정보 텍스트 변경 함수
			// 파라메터 설명
			// currentPage : 현재 페이지
			// totalPageCount : 총 페이지수
			// currentTopNumber : 현재 페이지에서 최상단의 행 번호
			// currentBottomNumber : 현재 페이지에서 최하단의 행 번호
			// dataLen : 총 데이터 수
			pagingInfoLabelFunction : function(currentPage, totalPageCount, currentTopNumber, currentBottomNumber, dataLen) {
				//return "현재 : " + currentPage + " / 전체 : " + totalPageCount + "( " + currentTopNumber + "~" + currentBottomNumber + " )";
				return currentTopNumber + " ~ " + currentBottomNumber + " ( 전체 " + dataLen + "건 중)";
			},
		// 필터 활성화
		enableFilter : true,
		enableMovingColumn : true,
		// 컨텍스트 메뉴 사용
		useContextMenu : true,
		//  컨텍스트 메뉴를 보기 위해 오른쪽 클릭을 한 경우 클릭 지점이 왼쪽 클릭과 같이 셀 선택을 할지 여부
		enableRightDownFocus : false, // 기본값 : false,
		// singleRow 선택모드
		selectionMode : "singleRow",
		
		editable : true,
		
		showStateColumn : true
	};
   	
	init();
	
	/*------------------------------------------
     * 초기화 메서드 
     *-----------------------------------------
     */
	function init()	{
		
		gridId = AUIGrid.create("$scope.#grid", agColumnLayout, agMstProps);
		AUIGrid.showAjaxLoader(gridId);

		btnSelectClickHandler();
		/*CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.vo)
    	.then(
    			function(response) {
    				AUIGrid.removeAjaxLoader(gridId);
    				AUIGrid.setGridData(gridId,response);
    				},
    			function(errResponse){
    				console.error("error1=" + errResponse);
    			}
    	);
		self.dataLoading = false;*/
	}

/*	// PK 칼럼 수정 시 편집 안되도록 (추가시 최초 편집 가능 *한번 편집된 이후 수정으로 간주하여 에디트 불가)
    function disablePKUpdate(event) {
    	if(event.dataField == "matCd") {
    		if(event.item.matCd == null) {
    			return true;
    		} else {
    			return false;
    		}
    	} else {
    		return true;
    	}
    }*/
    /*------------------------------------------
     * Master(공통코드그룹) 버튼  이벤트  메서드 정의
     *-----------------------------------------*/
	  // Master(공통코드그룹) 그리드 조회/새로고침 기능
    // Master(메시지) 그리드 조회/새로고침 기능
	function btnSelectClickHandler()	{
		console.log(self.vo);
		CmmAjaxService.select("/mes/bas/selectFmbPlc.do", self.vo)
		.then(
    			function(response) {
    				
    				AUIGrid.removeAjaxLoader(gridId);
    				AUIGrid.setGridData(gridId,response);
    			},
    			function(errResponse){
    				console.error("error1=" + errResponse);
    			}
    	);
	}
	
}]);

