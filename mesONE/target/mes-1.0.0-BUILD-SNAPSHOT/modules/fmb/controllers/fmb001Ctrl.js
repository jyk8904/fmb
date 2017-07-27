/**  
 * @Class Name : fmb004Ctrl.js
 * @Description : fmb004
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
    .controller('Fmb001Ctrl', ['CmmAjaxService', '$http', '$scope', '$q', function (CmmAjaxService, $http, $scope, $q) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    
    var self = this;
    self.exportClick = exportClick;
    self.exportPdfClick = exportPdfClick;
    self.showItemsOnDepth = showItemsOnDepth;
    self.expand = expand;
    

 // AUIGrid 생성 후 반환 ID
 var myGridID =null;;

 function documentReady() {
 	
 	// AUIGrid 그리드를 생성합니다.
 	createAUIGrid(columnLayout);
 	
 	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
 	requestData("vendor/samples/data/schedule_tree.json");

 };



 // AUIGrid 칼럼 설정
 var columnLayout = [ {
 		dataField : "id",
 		headerText : "ID",
 		width: 50
 }, {
 	    dataField: "name",
 	    headerText: "Task Name",
 	    filter : {
 	    	showIcon: true
 	    },
 	    headerTooltip : {
 			show : true,
 			tooltipHtml : '<div style="width:180px;"><p>Just an incredibly simple <span style="color:#F29661;">AUIGrid</span></p><p>Faucibus sed lobortis aliquam lorem blandit. Lorem eu nunc metus col. Commodo id in arcu ante lorem ipsum sed accumsan erat praesent faucibus commodo ac mi lacus. Adipiscing mi ac commodo. </p></div>'
 		},
 		style : "left",
 		width:300
 }, {
 		dataField : "charge",
 		headerText : "Charge",
 		filter : {
 	    	showIcon: true
 	    },
 		headerTooltip : {
 			show : true,
 			tooltipHtml : '<div style="width:120px;"><p>Things I Can Do</p><p> Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer non. Adipiscing cubilia elementum integer lorem ipsum dolor sit amet.</p></div>'
 		},
 		style : "left",
 		width:120,
 		renderer : {
 			type : "IconRenderer",
 			iconWidth : 20, // icon 가로 사이즈, 지정하지 않으면 24로 기본값 적용됨
 			iconHeight : 20,
 			iconFunction : function(rowIndex, columnIndex, value, item) {
 				if(value && value.substr(0, 1) == "A") 
 					return "vendor/samples/assets/office_female.png" ;
 				return "vendor/samples/assets/office_man.png" ;
 			}
 		},
 		editRenderer : {
 			type : "ComboBoxRenderer",
 			showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
 			historyMode : true // 콤보 리스트 외에 사용자가 다른 값을 입력하면 해당 값이 기존 list 에 추가되어 출력됨
 		}
 }, {
 		dataField: "complete",
 		headerText: "Complete(%)",
 		width : 100,
 		renderer : {
 			type : "BarRenderer",
 			min : 0,
 			max : 100
 		},
 		editRenderer : {
 			type : "NumberStepRenderer",
 			min : 0,
 			max : 100,
 			step : 1
 		},
 		styleFunction : function(rowIndex, columnIndex, value, headerText, dataField, item) {
 			if(value == 100)
 				return "c-red";
 			return "";
 		}
 }, {
 		dataField: "start",
 		headerText: "Start Date",
 		formatString : "mm/dd/yyyy",
 		dataType:"date",
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
 		dataField: "end",
 		headerText: "End Date",
 		formatString : "mm/dd/yyyy",
 		dataType:"date",
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
 }];


 // AUIGrid 를 생성합니다.
 function createAUIGrid(columnLayout) {
 	
 	var auiGridProps = {};

 	auiGridProps.selectionMode = "singleRow";
 	
 	auiGridProps.editable = true;
 	
 	auiGridProps.enableFilter = true;
 	
 	auiGridProps.showStateColumn = true;
 	
 	// 트리 컬럼(즉, 폴딩 아이콘 출력 칼럼) 을 인덱스1번으로 설정함(디폴트 0번임)
 	auiGridProps.treeColumnIndex = 1;
 	
 	// 최초 보여질 때 모두 열린 상태로 출력 여부
 	auiGridProps.displayTreeOpen = true;
 	
 	// 체크박스 사용 안함
 	auiGridProps.showRowCheckColumn = false;

 	auiGridProps.showRowNumColumn = false;

 	// 실제로 #grid_wrap 에 그리드 생성
 	myGridID = AUIGrid.create(self.grid_wrap, columnLayout, auiGridProps);
 	AUIGrid.showAjaxLoader(myGridID);

 }

 var isExpanded = true;
 function expand() {
 	if (!isExpanded) {
 		AUIGrid.expandAll(myGridID);
 		isExpanded = true;
 	} else {
 		AUIGrid.collapseAll(myGridID);
 		isExpanded = false;
 	}
 }

 // 트리 depth 별 오픈하기
 function showItemsOnDepth(event) {
 	var depthSelect = document.getElementById("depthSelect");
 	var depth = depthSelect.value;
 	
 	// 해당 depth 까지 오픈함
 	AUIGrid.showItemsOnDepth(myGridID, Number(depth) );
 };


 // 엑셀 내보내기(Export);
 function exportClick() {
 	
 	// 그리드가 작성한 엑셀, CSV 등의 데이터를 다운로드 처리할 서버 URL을 지시합니다.
 	// 서버 사이드 스크립트가 JSP 이라면 ./export/export.jsp 로 변환해 주십시오.
 	// 스프링 또는 MVC 프레임워크로 프로젝트가 구축된 경우 해당 폴더의 export.jsp 파일을 참고하여 작성하십시오.
 	AUIGrid.setProp(myGridID, "exportURL", "vendor/export_server_samples/export.jsp");
 	
 	// 내보내기 실행
 	AUIGrid.exportToXlsx(myGridID);
 };

 // PDF 내보내기(Export), AUIGrid.pdfkit.js 파일을 추가하십시오.
 function exportPdfClick() {
 	
 	// 완전한 HTML5 를 지원하는 브라우저에서만 PDF 저장 가능( IE=10부터 가능 )
 	if(!AUIGrid.isAvailabePdf(myGridID)) {
 		alert("PDF 저장은 HTML5를 지원하는 최신 브라우저에서 가능합니다.(IE는 10부터 가능)");
 		return;
 	}
 	
 	// 그리드가 작성한 엑셀, CSV 등의 데이터를 다운로드 처리할 서버 URL을 지시합니다.
 	// 서버 사이드 스크립트가 JSP 이라면 ./export/export.jsp 로 변환해 주십시오.
 	// 스프링 또는 MVC 프레임워크로 프로젝트가 구축된 경우 해당 폴더의 export.jsp 파일을 참고하여 작성하십시오.
 	AUIGrid.setProp(myGridID, "exportURL", "vendor/export_server_samples/export.jsp");
 	
 	// 내보내기 실행
 	AUIGrid.exportToPdf(myGridID, {
 		fontPath : "vendor/pdfkit/jejugothic-regular.ttf"
 	});
 };
    
	
}]);