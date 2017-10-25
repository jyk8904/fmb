/**
 * @Class Name : worker.js
 * @Description : 화면 전환 및 내부페이지 데이터 갱신 관리 워커
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
	var jsonData = evt.data[0];			//페이지 세팅데이터(순환순서, 시간, 횟수, 이름, 순환되는페이지포함여부 )
	var maxLength = jsonData.length;	//총 페이지 갯수
	var curPageSeq = evt.data[1];		//현재페이지(workerStart postMessage를 보내는 페이지)
	var switchPage = evt.data[2];		//페이지를 전환하는지 여부 on, off
	var switchNum = jsonData[curPageSeq].switchNum; //현재페이지의 갱신횟수
    var interval = jsonData[curPageSeq].dataTime *1000;	//현재페이지의 갱신시간 
    var postNum = 0;								//페이지가 갱신한 횟수
	var dataChange = true;							//데이터 갱신을 계속 하는지 여부
	var interval1;
	var interval2;
	//다음페이지
	var nextPage =getNextPage();
	//console.log("worker.js:현재페이지"+evt.data[1] +" ,다음페이지"+nextPage)
    if(switchPage =="on"){//페이지 전환중 -> 페이지 갱신 횟수만큼 post, 후 페이지 전환
    
    	interval1= setInterval(post, interval);			//페이지 전환
    	
    }else{				  //페이지 내에서 데이터만 갱신중, 계속 페이지 갱신 post
    	interval2= setInterval(post2, interval);	//계속 페이지 갱신
    }  
    
    //페이지 전환중 -> 페이지 갱신 횟수만큼 post, 후 페이지 전환
    function post(){
    	postNum+=1;// 갱신한횟수
    	if(postNum==switchNum){ //지정한 갱신 횟수를 만족한경우
    		if(evt.data[1]==nextPage){
    			clearInterval(interval1)
        		interval2 = setInterval(post2, interval);
    		}else{
    			dataChange=false;	//데이터 갱신 여부
    			//console.log("worker.js: post1-1  " + postNum + "/"+ switchNum);
    			postMessage([dataChange, nextPage]); //데이터갱신여부, 전환할 페이지
    		}
    	}else if(postNum<switchNum){//postNum<switchNum  지정한 갱신횟수를 아직 만족못한경우
    		//console.log("worker.js: post1-2  " + postNum + "/"+ switchNum);
    		postMessage([dataChange, nextPage]); //데이터갱신여부, 전환할 페이지
    	}else if(postNum>switchNum){
    		//console.log("worker.js: post1-3  " + postNum + "/"+ switchNum);
    		dataChange=true;
    		clearInterval(interval1)
    		interval2 = setInterval(post2, interval);
    	
    	}
    		
    }
    //페이지 내에서 데이터만 갱신중, 계속 페이지 갱신 post
    function post2(){
    	//console.log("worker.js: post2(무한 데이터 갱신)")
       	postMessage([dataChange, nextPage]);
    }
    
    function getNextPage(){ //다음 페이지를 구하는 function(순환되는 페이지포함여부, 마지막페이지여부)
    		//다른 페이지에서 시작한경우 seq+1
        	curPageSeq = curPageSeq + 1;
        	if(curPageSeq>=maxLength){//현재 마지막페이지인경우 변경될 페이지를 첫페이지로 지정
        		curPageSeq = 0;
    	    }
        	while(jsonData[curPageSeq].switcher == false){// 순환되는 페이지 포함여부가 true일때까지 반복.
        		curPageSeq = curPageSeq + 1;
        		if(curPageSeq>=maxLength){
        			curPageSeq = 0;
        	    }
        	}
            return curPageSeq;
    }
    
    
}
