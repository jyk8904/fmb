/**
 * 
 */

 onmessage = function(evt){
   
    // 화면전환에 필요한 각각의 데이터를 JSON으로 받음.
    var jsonData = evt.data;
 
    // 현재 전환 되고 있는 순서 지정
    var rotationSeq = 0;
 
    //화면 전환 최대 횟수
    var maxLength = jsonData.length;
 
    // interval 시간을 설정한다.
    // Default는 10초로 정해둠.
    var interval = 10000;
    
    if(jsonData.length>0){
    	interval = jsonData[0].rotateTime * 1000;
    }
 
    function timer() {
    
       //interval을 초기화 시켜줘야 각각 Timer가 동적으로 움직임.
       clearInterval(setTimer);
    
       // 화면 전환이 마지막일 경우 첫화면으로 돌아감.
       if (rotationSeq >= maxLength -1)
       {
         rotationSeq = 0;
       }
       // 아닐경우 계속 증가
       else 
       {
          rotationSeq++;
       }
      
       if(jsonData[rotationSeq].on == true){ //on 설정되어있을경우에만 post 넘김
    	  console.log(jsonData[rotationSeq].on);
	       console.log(rotationSeq, jsonData[rotationSeq].rotateTime * 1000);
	       // 화면 전환 순번을 넘김
	       postMessage(rotationSeq);
	       // 화면 별로 정의된 각각의 시간을 바탕으로 셋팅한다.
	       interval = jsonData[rotationSeq].rotateTime * 1000;
       }
       // 시간 설정 후 시작.
       setTimer = setInterval(timer, interval);
    }
    
    var setTimer = setInterval(timer, interval);
}
