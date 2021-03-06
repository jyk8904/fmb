﻿/**  
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
    angular				//  --(미사용 모듈)
        .module('app', [ 'angularModalService', 'ngSanitize','ngCookies', 'ngRoute',  'ngAnimate',  'ngMaterial', 'ngMessages', 'ngFileUpload', 'ui.bootstrap', 'ui.bootstrap.modal', 'ui.bootstrap.tpls', 'angular.filter', 'angular-marquee'])
        .config(config)
        .run(run);

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
	        .when('/login', {
	            controller: 'LoginCtrl',
	            templateUrl: 'login.html',
	            controllerAs: 'vm'
	        })
	        /*------------------------------------------
	         * FMB 화면
	         *-----------------------------------------*/
	        .when('/FmbMon', {
	            controller: 'FmbMonCtrl',
	            templateUrl: 'modules/fmb/views/fmbMon.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbAndon', {
	            controller: 'FmbAndonCtrl',
	            templateUrl: 'modules/fmb/views/fmbAndon.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbCwMon', {
	            controller: 'FmbCwMonCtrl',
	            templateUrl: 'modules/fmb/views/fmbCwMon.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbMainMon', {
	            controller: 'FmbMainMonCtrl',
	            templateUrl: 'modules/fmb/views/fmbMainMon.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbMode', {
	            controller: 'FmbModeCtrl',
	            templateUrl: 'modules/fmb/views/fmbMode.html',
	            controllerAs: 'vm'
	        })
	       	.when('/FmbPopup', {
	            controller: 'FmbPopupCtrl',
	            templateUrl: 'modules/fmb/views/fmbPopup.html',
	            controllerAs: 'vm'
	        })	 
	       .when('/FmbTbm', {
	            controller: 'FmbTbmCtrl',
	            templateUrl: 'modules/fmb/views/fmbTbm.html',
	            controllerAs: 'vm'
	        })	 
      	    .when('/FmbLine001', {
	            controller: 'FmbLine001Ctrl',
	            templateUrl: 'modules/fmb/views/fmbLine001.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbLine002', {
	            controller: 'FmbLine002Ctrl',
	            templateUrl: 'modules/fmb/views/fmbLine002.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbLine003', {
	            controller: 'FmbLine003Ctrl',
	            templateUrl: 'modules/fmb/views/fmbLine003.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbLine004', {
	            controller: 'FmbLine004Ctrl',
	            templateUrl: 'modules/fmb/views/fmbLine004.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbLine005', {
	            controller: 'FmbLine005Ctrl',
	            templateUrl: 'modules/fmb/views/fmbLine005.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbLine006', {
	            controller: 'FmbLine006Ctrl',
	            templateUrl: 'modules/fmb/views/fmbLine006.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbLine007', {
	            controller: 'FmbLine007Ctrl',
	            templateUrl: 'modules/fmb/views/fmbLine007.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbFactAll', {
	            controller: 'FmbFactAllCtrl',
	            templateUrl: 'modules/fmb/views/fmbFactAll.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbFact001', {
	            controller: 'FmbFact001Ctrl',
	            templateUrl: 'modules/fmb/views/fmbFact001.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbFact002', {
	            controller: 'FmbFact002Ctrl',
	            templateUrl: 'modules/fmb/views/fmbFact002.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbFact003', {
	            controller: 'FmbFact003Ctrl',
	            templateUrl: 'modules/fmb/views/fmbFact003.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbFact004', {
	            controller: 'FmbFact004Ctrl',
	            templateUrl: 'modules/fmb/views/fmbFact004.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbFact005', {
	            controller: 'FmbFact005Ctrl',
	            templateUrl: 'modules/fmb/views/fmbFact005.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbFact006', {
	            controller: 'FmbFact006Ctrl',
	            templateUrl: 'modules/fmb/views/fmbFact006.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbFact007', {
	            controller: 'FmbFact007Ctrl',
	            templateUrl: 'modules/fmb/views/fmbFact007.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbSpc', {
	            controller: 'FmbSpcCtrl',
	            templateUrl: 'modules/fmb/views/fmbSpc.html',
	            controllerAs: 'vm'
	        })
	        .when('/FmbTotal', {
	            controller: 'FmbTotalCtrl',
	            templateUrl: 'modules/fmb/views/fmbTotal.html',
	            controllerAs: 'vm'
	        })

	        /*.otherwise({ redirectTo: '/FmbLogin' })*/;
    }
    run.$inject = ['$rootScope', '$interval' , '$timeout'];
    function run($rootScope, $interval, $timeout) {
        // add the register task to the rootScope. This will allow for autoUnregister when the  
        // scope is destroyed to prevent tasks from leaking.  
        var ScopeProt = Object.getPrototypeOf($rootScope);  
        ScopeProt.$interval = function(func, time){  
             var timer = $interval(func,time);  
             this.on('$destroy', function(){$timeout.cancel(timer); });  
             return timer;  
        };  
        ScopeProt.$timeout = function(func, time){  
            this.on('$destroy', function(){$timeout.cancel(timer); });  
       };  
        
    }
    
    
/*    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
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
    }*/

})();