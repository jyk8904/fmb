/**
 * 
 */
'use strict';

angular.module('app').factory('CmmUtilSrvc', ['$http', '$q', '$mdDialog', function($http, $q, $mdDialog) {

    var factory = {
        getSysDate: getSysDate,
        getDate: getDate,
        showObjects : showObjects,
        
        auiProps : auiProps,
        auiDropDownListRenderer : auiDropDownListRenderer,
        auiLabelRenderer: auiLabelRenderer,
        auiEditLenValidate: auiEditLenValidate,
        auiEditNumValidate: auiEditNumValidate,
        auiRegExprValidate: auiRegExprValidate,
        
        showAlert: showAlert
    };

    return factory;

    /**
     * 날짜 함수 년(4)+월(2)+일(2) 
     */
    function getSysDate() {
		var curDate = new Date();
		return curDate.toISOString().slice(0,10);
    } 
    
    /**
     * 날짜 함수 년(4)+월(2)+일(2) 
     */
    function getDate(dateTime) {
		var curDate = new Date(dateTime);
		return curDate.toISOString().slice(0,10);
    } 

    /**
     * 객체배열을 확인
     */
    function showObjects(objects) {
		angular.forEach(objects, function(key, value) {
			alert("key=" + key + ", value=" + value) ;
		});
    }
    
    /*=====================================================
     * AUIGrid 관련 Util
     * ===================================================*/
	function auiProps()	{
		var auiProps = {
			usePaging : true,
			pageRowCount : 30,
			pagingInfoLabelFunction : function(currentPage, totalPageCount, currentTopNumber, currentBottomNumber, dataLen) {
				return currentTopNumber + " ~ " + currentBottomNumber + " ( 전체 " + dataLen + "건 중)";
			},
			enableFilter : true,  // 필터 활성화
			enableMovingColumn : true,
			// 컨텍스트 메뉴 사용
			useContextMenu : true,
			//  컨텍스트 메뉴를 보기 위해 오른쪽 클릭을 한 경우 클릭 지점이 왼쪽 클릭과 같이 셀 선택을 할지 여부
			enableRightDownFocus : false, // 기본값 : false,
			selectionMode : "singleRow",  // singleRow 선택모드

			editable : true,
			showStateColumn : true
		};
		return auiProps;
	}
	/**
	 * AUIGrid DropDown 렌더링
	 */
	function auiDropDownListRenderer(bcList) {
		var auiRenderer = {
			type : "DropDownListRenderer",
			showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
			list : bcList,
			keyField : "code", // key 에 해당되는 필드명
			valueField : "codeNm" // value 에 해당되는 필드명
		}
		return auiRenderer;
	}
	
	
	/**
	 * AUIGrid 라벨 렌더링
	 */
	function auiLabelRenderer (jsonList, value) { 
		var retStr = value;
		var len=jsonList.length;
		
		for(var i=0; i<len; i++) {
			if(jsonList[i]["code"] == value) {
				retStr = jsonList[i]["codeNm"];
				break;
			}
		}
		return retStr;
	}
	
	/**
	 * AUIGrid 입력필드 길이 Validate
	 */
	function auiEditLenValidate(newValue, len) {
		var isValid = false;
		
		if(newValue && newValue.length <= len) {
			isValid = true;
		}
		// 리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
		return { "validate" : isValid, "message"  : len + "자 이하 입력해 주세요." };
	}

	/**
	 * AUIGrid 입력필드 숫자 Validate
	 */
	function auiEditNumValidate(newValue, len) {
		var isValid = false;
		
		var numVal = Number(newValue);
		if(!isNaN(numVal) && numVal > 0) {
			isValid = true;
		}
		// 리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
		return { "validate" : isValid, "message"  : "숫자만 입력가능합니다." };
	}
	
	
	function auiRegExprValidate(newValue, regExpr, errMessage) {
		var isValid = false;
		//var matcher = /^[A-Za-z0-9]{1,10}$/; // 알파벳 2~8자 체크 정규식
		var matcher = /^[^ㄱ-ㅎ|ㅏ-ㅣ|가-힝]{1,10}$/g;
		
		if(regExpr.test(newValue)) { 
			isValid = true;
		}
		// 리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
		return { "validate" : isValid, "message"  : errMessage };
	}
	
	function showAlert(message) {
		$mdDialog.show(
			$mdDialog.alert()
			//.parent(angular.element(document.body))
			.clickOutsideToClose(false)
			.title('알림')
			.textContent(message)
			.ariaLabel('Alert Dialog Demo')
			.ok('OK!')
			//.targetEvent(ev)
		);
	}
}]);
