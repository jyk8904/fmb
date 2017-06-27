<?php
// AUIGrid Export 시 로컬에 다운로드 가능하도록 작성된 서버사이드 예제입니다.
// AUIGrid 가 xlsx, csv, xml 등의 형식을 작성하여 base64 로 인코딩하여 data 파라메터로 post 요청을 합니다.
// 해당 서버 예제(본 PHP) 에서는 base64 로 인코딩 된 데이터를 디코드하여 다운로드 가능하도록 붙임으로 마무리합니다.

$data = $_REQUEST["data"]; // 파라메터 data
$extension = $_REQUEST["extension"]; // 파라메터 확장자

// AUIGrid.exportToXlsx() 사용시 exportProps 로 파일명을 지정해 줬다면 다음과 같이 지정된 파일명을 얻을 수 있습니다.
//$extension = $_REQUEST["filename"]; // 파라메터 파일명

// PC 에 저장될 파일명(export.xlsx, export.csv 등)
$filename = "export.".$extension;

$decodedData = base64_decode($data); 

// csv 를 엑셀에서 열기 위해서는 euc-kr 로 작성해야 함.
if($extension == "csv") {
	$decodedData = iconv('UTF-8', 'EUC-KR', $decodedData);
} 

$len=strlen($decodedData);

header("Pragma: public");
header("Expires: 0");
header("Content-Disposition: attachment; filename= $filename ");
header("Content-Type: application/octet-stream");
header("Content-Transfer-Encoding: binary");
header("Content-Length: $len");
 
 echo($decodedData);

?>
