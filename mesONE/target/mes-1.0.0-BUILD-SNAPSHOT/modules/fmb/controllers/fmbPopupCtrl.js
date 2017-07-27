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
    .controller('ModalController', ['CmmAjaxService','CmmModalSrvc', '$http', '$scope', '$q', function (CmmAjaxService, CmmModalSrvc, $http, $scope, $q, close) 
{
    	
    	/*------------------------------------------
         * 변수 선언
         *-----------------------------------------*/
        var self 	= this;
    	self.close = function(result) {
    		 close(result, 500); // close, but give 500ms for bootstrap to animate
    	};
}]);

