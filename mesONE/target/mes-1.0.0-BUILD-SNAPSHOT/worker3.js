/**
 * 
 */
 onmessage = function(evt){
   
   
    // interval 시간을 설정한다.

    var interval = evt.data * 1000; 
  
    setInterval(post, interval);
    function post(){
    	postMessage(interval);
    }
}
