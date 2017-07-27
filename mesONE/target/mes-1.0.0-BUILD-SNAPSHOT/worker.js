/**
 * 
 */

 onmessage = function(evt){
   
    // 화면전환에 필요한 각각의 데이터를 JSON으로 받음.
	 var jsonData = evt.data[0];
	 var curPageSeq = evt.data[1];
	 var maxLength = jsonData.length;
	 var rotationSeq = 0;
	 // 페이지 전환 간격 Default값 10초.
	 

    if(curPageSeq == null){//main에서 시작한경우 바로 페이지 전환
    	curPageSeq = 0;
    	 while(jsonData[curPageSeq].switcher == false){
  		   curPageSeq++;
    	 }
    	postMessage(curPageSeq);
    	rotationSeq = curPageSeq;
    }
    
   	var interval = jsonData[curPageSeq].rotateTime * 1000;
    
   	var setTimer = setInterval(timer, interval);
    
    function timer() {
    	//interval을 초기화 시켜줘야 각각 Timer가 동적으로 움직임.
    	clearInterval(setTimer);
    	
    	rotationSeq = rotationSeq + 1;
    	if(rotationSeq>=maxLength){//현재 마지막페이지인경우 변경될 페이지를 첫페이지로 지정
    		rotationSeq = 0;
	    }
    	
    	while(jsonData[rotationSeq].switcher == false){
    		rotationSeq = rotationSeq + 1;
    		if(rotationSeq>=maxLength){
        		rotationSeq = 0;
    	    }
    	}
   
    	   
       // 화면 전환 순번을 넘김
       postMessage(rotationSeq);
       // 화면 별로 정의된 각각의 시간을 바탕으로 셋팅한다.
       interval = jsonData[rotationSeq].rotateTime * 1000;
       // 시간 설정 후 시작.
       setTimer = setInterval(timer, interval);
    }
}
