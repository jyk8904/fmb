/**
 * 
 */

 onmessage = function(evt){
 var currentpage = evt.data;
 console.log(currentpage+'현재페이지 ');
// var tm = evt.data.tm;
 var pagename='';
 var pageList = ['Fmb001','Fmb002','Fmb003','Fmb004','Fmb005','Fmb006'];
	
 if(currentpage==undefined){
		currentpage = pageList[0];
		 console.log(currentpage+'현재페이지2 ');
		 postMessage(currentpage);
	}
 
	setInterval(post, 3000);
	function post(){
		if(currentpage==pageList[pageList.length-1]){
			pagename = pageList[0];// 첫페이지 저장
			
		}else{	
			for(var j = 0 ; j <pageList.length-1; j++){//0부터 5까지 반복
				if(currentpage == pageList[j]){//현재페이지가 pageList와 동일할경우
					pagename = pageList[j+1];// 다음 페이지 저장 
					return;
				}
			}
		}		
		console.log(pagename);
		postMessage(pagename);
		currentpage = pagename;
	}
}


/*
function sleep(milliSeconds){  
  var startTime = new Date().getTime(); // get the current time   
  while (new Date().getTime() < startTime + milliSeconds); // hog cpu 
} 
*/
