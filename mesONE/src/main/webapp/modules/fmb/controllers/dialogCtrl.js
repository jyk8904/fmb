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
	var eqptStsCstData = [];
    var plcData = {};
    var timeProdData= {};
    self.plcData = CmmFactSrvc.getPlcData();
    
	self.plcSelectedVo = {
			plcId: CmmFactSrvc.getPlcData() ,
	        factId: ''
  		  } 
	self.stsVo = {
			dt:'',
			plcId: CmmFactSrvc.getPlcData() 
  		  } 
    getSelectedPlc();
    console.log(self.stsVo);
	//설비상태 발생추이 가져오기
	var dateRunInfoPromise = CmmAjaxService.select("/mes/bas/selectDateRunInfo.do");
		dateRunInfoPromise.then(function(data) {
		self.timeProdData = data;
		timeProd();
	}, function(data) {
		alert('fail: ' + data)
	});
	
	//시간별 가동상태 가져오기
	var eqptStsHisPromise = CmmAjaxService.select("/mes/bas/selectEqptStsHis.do", self.stsVo);
	eqptStsHisPromise.then(function(data) {
		
		self.eqptStsHisData = data;
		console.log(self.eqptStsHisData);
		
		
		getCstData();
		//StsProd();
	}, function(data) {
		alert('fail: ' + data)
	});
	
	
		
	function timeProd(){
		//대기발생추이
	    self.timeProd = {	    	
	        dataSource: self.timeProdData,
	        size: {
	        	width: 850,
	        	height: 298
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
	
	
	
	function getCstData(){
		for(var i = 0; i< self.eqptStsHisData.length; i++){
			
				if(self.eqptStsHisData[i].plcSts == '0'){
					eqptStsCstData[i] = {
										"task" : i,
										"strDttm0" : new Date(self.eqptStsHisData[i].strDttm.split('-')[0],
															  self.eqptStsHisData[i].strDttm.split('-')[1],
															  self.eqptStsHisData[i].strDttm.split('-')[3].split(' ')[0],
															  self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[0],
															  self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[1], 
															  self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[2]),
										"endDttm0" : new Date(self.eqptStsHisData[i].endDttm.split('-')[0],
													  self.eqptStsHisData[i].endDttm.split('-')[1],
													  self.eqptStsHisData[i].endDttm.split('-')[3].split(' ')[0],
													  self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[0],
													  self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[1], 
													  self.eqptStsHisData[i].endDttm.split(' ')[1].split(':')[2]),
										"strDttm1" : '',
										"endDttm1" : '',
										"strDttm2" : '',
										"endDttm2" : '',
										"strDttm3" : '',
										"endDttm3" : '',
										"strDttm4" : '',
										"endDttm4" : ''		}

					}else if(self.eqptStsHisData[i].plcSts == '1'){
						eqptStsCstData[i] = {"task" : i,
								"strDttm0" : '',
								"endDttm0" : '',
								"strDttm1" : new Date(self.eqptStsHisData[i].strDttm.split('-')[0],
										  self.eqptStsHisData[i].strDttm.split('-')[1],
										  self.eqptStsHisData[i].strDttm.split('-')[3].split(' ')[0],
										  self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[0],
										  self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[1], 
										  self.eqptStsHisData[i].strDttm.split(' ')[1].split(':')[2]),
								"endDttm1" :self.eqptStsHisData[i].endDttm,
								"strDttm2" : '0',
								"endDttm2" : '0',
								"strDttm3" : '',
								"endDttm3" : '',
								"strDttm4" : '',
								"endDttm4" : ''		}			
					}else if(self.eqptStsHisData[i].plcSts == '2'){
						eqptStsCstData[i] = {"task" : i,
								"strDttm0" : '',
								"endDttm0" : '',
								"strDttm1" : '',
								"endDttm1" : '',
								"strDttm2" : self.eqptStsHisData[i].strDttm,
								"endDttm2" : self.eqptStsHisData[i].endDttm,
								"strDttm3" : '',
								"endDttm3" : '',
								"strDttm4" : '',
								"endDttm4" : ''		}
					}else if(self.eqptStsHisData[i].plcSts == '3'){
						eqptStsCstData[i] = {"task" : i,
								"strDttm0" : '',
								"endDttm0" : '',
								"strDttm1" : '',
								"endDttm1" : '',
								"strDttm2" : '',
								"endDttm2" : '',
								"strDttm3" : self.eqptStsHisData[i].strDttm,
								"endDttm3" : self.eqptStsHisData[i].endDttm,
								"strDttm4" : '',
								"endDttm4" : ''		}
					}else{
						eqptStsCstData[i] = {"task" : i,
								"strDttm0" : '',
								"endDttm0" : '',
								"strDttm1" : '',
								"endDttm1" : '',
								"strDttm2" : '',
								"endDttm2" : '',
								"strDttm3" : '',
								"endDttm3" : '',
								"strDttm4" : self.eqptStsHisData[i].strDttm,
								"endDttm4" : self.eqptStsHisData[i].endDttm,
								}		
					}
			}
		 console.log(eqptStsCstData);
		StsProd();	

	}
  		
	
	function StsProd(){
		self.stsProd = {	
			rotated: true,
			palette: "violet",
	        dataSource: eqptStsCstData,
	        size: {
	        	width: 850,
	        	height: 298
	        },
	        commonSeriesSettings: {
	            argumentField: "task",
	            type:"rangeBar"
	        },
	        series: [
	            { rangeValue1Field: "strDttm0", 
	              rangeValue2Field: "endDttm0", 
	              name: "비가동" 
	             },
	            { rangeValue1Field: "strDttm1", 
	              rangeValue2Field: "endDttm1", 
	              name: "가동" 
		        },
		        { rangeValue1Field: "strDttm2", 
	              rangeValue2Field: "endDttm2", 
	              name: "대기" 
		        },
		        { rangeValue1Field: "strDttm3", 
	              rangeValue2Field: "endDttm3", 
	              name: "수리" 
		        },
		        { rangeValue1Field: "strDttm4", 
	              rangeValue2Field: "endDttm4", 
	              name: "알람" 
		        }
		        
	        ],
	        valueAxis: {
	      	        visible: true,
	                label: {
	                    customizeText: function () {
	                        return this.value.split(' ')[1]
	                        
	                    }
	                }
	        },
	        tooltip:{
	        	enbled: true,
	        	customizeTooltip: function (arg) {
	                return {
	                    text: arg.valueText
	                };
	            },
	        },
	        legend: {
	        	visible: true
	        }	 
		}
	}		
   	
	function getSelectedPlc(){
		var promise = CmmAjaxService.selectOne("/mes/bas/selectFmbPlc.do", self.plcSelectedVo);
        promise.then(function(data){
        	self.plc = data;//fmbPlcVo가 담긴 리스트 형태리턴
        }
        ,function(data){
        	alert('fail: '+ data)
        });
    	
    };
    
}]);

