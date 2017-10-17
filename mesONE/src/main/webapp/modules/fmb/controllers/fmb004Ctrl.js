/**  
 * @Class Name : fmb004Ctrl.js
 * @Description : fmb004
 * @Modification Information  
 * @
 * @ 작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.26  kb.shin    최초생성
 * @ 사용x
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
   
    //console.log("004ctrl");
    self.vo = {
        	plcId: '', 
        	factId: ''
        }
    
    // 조회버튼 클릭이벤트
    self.btnSelectClick = btnSelectClickHandler;
    self.exportClick = exportClick;
    self.exportPdfClick = exportPdfClick;
    self.expand = expand;
    self.showItemsOnDepth = showItemsOnDepth;
    
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
		    filter : {/*행 제목에  필터 보이기*/ 
		    	showIcon: true
		    },
		    headerTooltip : {/*행 제목에  툴팁 보이기*/ 
				show : true,
				tooltipHtml : '<div style="width:180px;"><p>AUI 그리드 <span style="color:#F29661;">테스트</span></p><p>이것은 메모 툴팁 </p></div>'
			},
			style : "left",
			width : '12%'
		}, {
			dataField : "plcId",
			headerText : "PLC ID",
			width : '12%',
			renderer : {/*데이터부분에 아이콘 보이기*/ 
				type : "IconRenderer",
				iconWidth : 20, // icon 가로 사이즈, 지정하지 않으면 24로 기본값 적용됨
				iconHeight : 20,
				iconFunction : function(rowIndex, columnIndex, value, item) {
					if(value && value.substr(0, 1) == "A") 
						return "vendor/samples/assets/office_female.png" ;
					return "vendor/samples/assets/office_man.png" ;
				}
			},
		
			editRenderer : {/* 데이터 클릭시 콤보박스같은 에디터보이기*/ 
				type : "ComboBoxRenderer",
				showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기 선택가능
				historyMode : true // 콤보 리스트 외에 사용자가 다른 값을 입력하면 해당 값이 기존 list 에 추가되어 출력됨
			}
		}, {
			dataField : "eqptNm",
			headerText : "설비명",
			width : '12%'
		}, {
			dataField : "eqptSts",
			headerText : "설비상태",
			width : '12%',
			renderer : {
				type : "BarRenderer",
				min : 0,
				max : 100
			},
			styleFunction : function(rowIndex, columnIndex, value, headerText, dataField, item) {
				if(value == 100)
					return "c-red";
				return "";
			}
		}, {
			dataField : "prodDt",
			headerText : "생산날짜",
			width : '12%',
			editRenderer : {
				type : "CalendarRenderer",
				onlyCalendar : true, // 달력으로만 수정 가능
				showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
				titles : ["S", "M", "T", "W", "T", "F", "S"],
				monthTitleString : "mmm", 
				formatMonthString : "mmm yyyy",
				formatYearString : "yyyy",
				showExtraDays : true, // 지난 달, 다음 달 여분의 날짜(days) 출력 안함
				showTodayBtn : true, // 오늘 날짜 선택 버턴 출력
				todayText : "Today" // 오늘 날짜 버턴 텍스트
			}
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
			pageRowCount : 30,
			treeColumnIndex  : 1,
			
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
		/*CmmAjaxService.select("bas/selectFmbPlc.do", self.vo)
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
		CmmAjaxService.select("bas/selectFmbPlc.do", self.vo)
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
	
	
	var isExpanded = true;
	function expand() {
		if (!isExpanded) {
			AUIGrid.expandAll(gridId);
			isExpanded = true;
		} else {
			AUIGrid.collapseAll(gridId);
			isExpanded = false;
		}
	}
	
	
	// 트리 depth 별 오픈하기
	function showItemsOnDepth(event) {
		var depthSelect = document.getElementById("depthSelect");
		var  depth = depthSelect.value;
		
		// 해당 depth 까지 오픈함
		AUIGrid.showItemsOnDepth(gridId, Number(depth) );
	};
	
	// 엑셀 내보내기(Export);
	function exportClick() {
		
		// 그리드가 작성한 엑셀, CSV 등의 데이터를 다운로드 처리할 서버 URL을 지시합니다.
		// 서버 사이드 스크립트가 JSP 이라면 ./export/export.jsp 로 변환해 주십시오.
		// 스프링 또는 MVC 프레임워크로 프로젝트가 구축된 경우 해당 폴더의 export.jsp 파일을 참고하여 작성하십시오.
		AUIGrid.setProp(gridId, "exportURL", "vendor/export_server_samples/export.jsp");
		
		// 내보내기 실행
		AUIGrid.exportToXlsx(gridId);
	};
	
	// PDF 내보내기(Export), AUIGrid.pdfkit.js 파일을 추가하십시오.
	function exportPdfClick() {
		
		// 완전한 HTML5 를 지원하는 브라우저에서만 PDF 저장 가능( IE=10부터 가능 )
		if(!AUIGrid.isAvailabePdf(gridId)) {
			alert("PDF 저장은 HTML5를 지원하는 최신 브라우저에서 가능합니다.(IE는 10부터 가능)");
			return;
		}
		
		// 그리드가 작성한 엑셀, CSV 등의 데이터를 다운로드 처리할 서버 URL을 지시합니다.
		// 서버 사이드 스크립트가 JSP 이라면 ./export/export.jsp 로 변환해 주십시오.
		// 스프링 또는 MVC 프레임워크로 프로젝트가 구축된 경우 해당 폴더의 export.jsp 파일을 참고하여 작성하십시오.
		AUIGrid.setProp(gridId, "exportURL", "vendor/export_server_samples/export.jsp");
		
		// 내보내기 실행
		AUIGrid.exportToPdf(gridId, {
			fontPath : "vendor/pdfkit/jejugothic-regular.ttf"
		});
	};
	
	
}]);

