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
    .controller('DialogCtrl', [ 'CmmAjaxService'
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
    									) 
{
	/*------------------------------------------
     * 변수 선언
     *-----------------------------------------*/
    var self = this;
    
    var plcData = {};
    var timeProdData= {};
    
    self.plcData = CmmFactSrvc.getPlcData();
    
    
	//설비상태 발생추이 가져오기
	var dateRunInfoPromise = CmmAjaxService.select("/mes/bas/selectDateRunInfo.do");
		dateRunInfoPromise.then(function(data) {
		self.timeProdData = data;
		timeProd();
	}, function(data) {
		alert('fail: ' + data)
	});
	
		
	function timeProd(){
		//대기발생추이
	    self.timeProd = {	    	
	        dataSource: self.timeProdData,
	        size: {
	        	width: 900,
	        	height: 370
	        },
	        commonSeriesSettings: {
	            argumentField: "dt",
	            dashStyle: "solid",
	            color: "#f2f2f2",
	        	point: {
	        		color: "#7f7f7f"
	        	},
	        	width: 4
	        },
	        argumentAxis: {
	            valueMarginsEnabled: false,
	            discreteAxisDivisionMode: "crossLabels",
	            grid: {
	                visible: false
	            },
	        	label: {
	        		font: {
	        			color: "#e1e1e7"
	        		}
	        	}
	        },
	        valueAxis: {
	        	label: {
	        		font: {
	        			color: "#e1e1e7"
	        		}
	        	}
	        },
	        series: [
	            { valueField: "standbyCount", name: "대기 발생추이" },
	        ],
	        legend: {
	        	visible: false
	        },
	        tooltip: {
	            enabled: true,
	            customizeTooltip: function (arg) {
	                return {
	                    text: arg.valueText
	                };
	            },
	            zIndex: 101
	        }
	    };
	}			
    
}]);

