/**
 * @Class Name : worker2.js
 * @Description : 내부페이지 데이터 갱신 관리 워커
 * @Modification Information  
 * @
 * @  작업일       작성자      내용
 * @ ----------  ---------  -------------------------------
 * @ 2017.05.    조준연 정유경    최초생성
 * @ 
 * @since 
 * @version 1.0
 * @function
 */


 onmessage = function(evt){
    // interval 시간을 설정한다.
    // Default는 5초로 정해둠.
    var interval = 5000;
    var curPageSettingTime= evt.data;
    
   //console.log(curPageSettingTime);
    
    
    if(curPageSettingTime!=null){
    	interval = curPageSettingTime.dataTime * 1000;
    }
    setInterval(post, interval);
    
    
    function post(){
    	postMessage(interval);
    }
    
}
