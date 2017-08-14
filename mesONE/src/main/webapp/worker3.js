/**
 * @Class Name : worker.js
 * @Description : 화면 하단 알람 갱신 관리 워커
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

    var interval = evt.data * 1000; 
  
    setInterval(post, interval);
    function post(){
    	postMessage(interval);
    }
}
