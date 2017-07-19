/**  
 * @Class Name : app.js
 * @Description : 전체 app 
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.03.02  kb.shin     최초생성
 * @ 2017.03.03  hc.kang     수정
 * 
 * @author kb.shin
 * @since 2017.03.02
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by Brit Consortium All right reserved.
 */

(function () {
    'use strict';

    angular
        .module('app', ['angularModalService', 'ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ngMaterial', 'ngMessages', 'ui.bootstrap', 'ui.bootstrap.modal', 'ui.bootstrap.tpls'])
        .config(config);
//        .run(run);

    config.$inject = ['$httpProvider', '$routeProvider', '$locationProvider', '$qProvider', '$provide', '$mdDateLocaleProvider'];
    function config($httpProvider, $routeProvider, $locationProvider, $qProvider, $provide, $mdDateLocaleProvider) {
    	$qProvider.errorOnUnhandledRejections(false);	// Possibly unhandled rejection: {} 에러 처리
    	$locationProvider.hashPrefix('');				// angualrjs 1.6.1 사용 시 적용할 것
    	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'; 
    	$mdDateLocaleProvider.formatDate = function(date) {
    		var day = date.getDate();
    	    var monthIndex = date.getMonth();
    	    var year = date.getFullYear();

    	    return year + '-' + (monthIndex + 1) + '-' + day;
    	};    	
    	$provide.decorator('inputDirective', function($delegate) {  //한글일 경우 처리
            var directive = $delegate[0];
            angular.extend(directive.link, {
                post: function(scope, element, attr, ctrls) {
                    element.on('compositionupdate', function (event) {
                        element.triggerHandler('compositionend');
                    })
                }
            });
            return $delegate;
        });    	
        $routeProvider
	        /*------------------------------------------
	         * 메인 화면
	         *-----------------------------------------*/
	        .when('/Main', {
	            controller: 'MainCtrl',
	            templateUrl: 'main.html',
	            controllerAs: 'vm'
	        })
	        /*------------------------------------------
	         * FMB 화면
	         *-----------------------------------------*/
	       .when('/dvlpmt001', {
	            controller: 'dvlpmt001Ctrl',
	            templateUrl: 'modules/dvlpmt/views/dvlpmt001.html',
	            controllerAs: 'vm'
	        })	        
	       /* .otherwise({ redirectTo: '/Fmb001' })*/;
    }
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/Login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/Main');
            }
        });
    }

})();