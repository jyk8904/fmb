/* 
 * @Class Name : cmmMatMstCtrl.js
 * @Description : 품번 조회 및 선택 컨트롤로 화면
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

angular.module('app')
	.controller('CmmMatMstCtrl', 
	 ['CmmAjaxService', '$scope', '$http', '$q', 'close', 'title', 'message', 
     function(CmmAjaxService, $scope, $http, $q, close, title, message) {
		 
	var self = this,
         gridId = null;		// 마스터 그리드 ID
	
	$scope.title = title;
	$scope.message = message;
	
    self.vo = {matCd:null, matNm:null};
	self.btnSearch = btnSearch;
	self.btnConfirm = btnConfirm;
	self.btnClose = btnClose;

    var rstVO = {msgID:'F', matCd:null, matNm:null, weight:null, unitCd:null};

    /*------------------------------------------
     * AUI 그리드 변수 선언
     *-----------------------------------------*/
    // combo 공통 코드 
    var bcfCdList = [
	     {"code" : "BAS001",  "codeNm" : "typeCdList"}, //자재유형
         {"code" : "SHP003",  "codeNm" : "unitCdList"}  //단위 
    ];
    
    // 컬럼 레이아웃 정의
    function setAgColumnLayout(bcfCdInfo) {
    	var jsonTypeCd = angular.fromJson(bcfCdInfo.typeCdList);
    	var jsonUnitCd = angular.fromJson(bcfCdInfo.unitCdList);
    	
	    // Master(메시지) 컬럼 정의    
	    var agColumnLayout = [ 
	        {
				dataField : "matCd", 	headerText : "품번",	width:"10%" , style : "column-left"
			}, {
				dataField : "matNm",	headerText : "품명",	width:"30%" , style : "column-left"
			}, {
				dataField : "spec",		headerText : "규격",	width:"30%" , style : "column-left"
			}, {
				dataField : "unitCd",	headerText : "단위",	width:"15%" , style : "column-left",
				labelFunction : function(rowIndex, columnIndex, value, headerText, item ) { 
					var retStr = value;
					for(var i=0,len=jsonUnitCd.length; i<len; i++) {
						if(jsonUnitCd[i]["code"] == value) {
							retStr = jsonUnitCd[i]["codeNm"];
							break;
						}
					}
					return retStr;
					
				}
			}, {
				dataField : "weight", 	headerText : "중량/개수",	width:"15%", dataType : "numeric"  , style : "column-right"
			}
		];
	   
	    return agColumnLayout;
    }


	// AUIGrud 속성 정의	
	var agProps = {
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

		editable : false,
		autoScrollSize : true,
		showStateColumn : false
	}
	
	
	init();
	
    /*------------------------------------------
     * 초기화 메서드 
     *-----------------------------------------*/	
	function init()	{
    	CmmAjaxService.selectOne("/smart-mes/bcf/getCodeList.do", bcfCdList)
    	.then(
			function(d) {
				var agColumnLayout = setAgColumnLayout(d);

				// 그리드 생성
				gridId = AUIGrid.create("$scope.#auiGrid", agColumnLayout, agProps);
				
				btnSearch();
			},
			function(errResponse){
				console.error("basMatMstCtrl error1=" + errResponse);
			}
    	);
	}
	
    // Master(메시지) 그리드 조회/새로고침 기능
	function btnSearch()	{
		CmmAjaxService.select(gridId, "/smart-mes/bas/selectMBasMatMst.do", self.vo);
		AUIGrid.refresh();
	}

	
	function btnConfirm() {
		/*
		•rowIndex : 행의 인덱스
		•columnIndex : 칼럼의 인덱스
		•dataField : 선택 칼럼이 출력하고 있는 그리드 데이터의 필드명
		•headerText : 선택 칼럼의 헤더 텍스트
		•editable : 선택 칼럼의 수정 가능 여부
		•value : 선택 셀의 현재 그리드 값
		•item : 선택 행 아이템들을 갖는 Object

		사용 예는 다음과 같습니다.
		*/
		/**/
		 var selectedItems = AUIGrid.getSelectedItems(gridId);
		 if(selectedItems.length <= 0) return;
		 
		 // singleRow, singleCell 이 아닌 multiple 인 경우 선택된 개수 만큼 배열의 요소가 있음
		 var item = selectedItems[0].item;
		
		//alert(first.matCd+","+first.matNm+","+first.weight+","+first.unitCd); // name 값 가져오기. 

		rstVO.msgID = "T";
		rstVO.matCd = item.matCd;
		rstVO.matNm = item.matNm;
		rstVO.spec = item.spec;
		rstVO.unitCd = item.unitCd;
		rstVO.weight = item.weight;
		
		close(rstVO, 500); // close, but give 500ms for bootstrap to animate
	}
	
	function btnClose(result) {
		rstVO.msgID = "F";
		close(rstVO, 500); // close, but give 500ms for bootstrap to animate
	}
	
}]);
