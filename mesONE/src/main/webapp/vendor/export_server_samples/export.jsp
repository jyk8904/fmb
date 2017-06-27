<%@page language="java" trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ page import="org.apache.commons.codec.binary.Base64" %>
<%@ page import="java.io.ByteArrayOutputStream" %>
<%

//AUIGrid Export 시 로컬에 다운로드 가능하도록 작성된 서버사이드 예제입니다.
//AUIGrid 가 xlsx, csv, xml 등의 형식을 작성하여 base64 로 인코딩하여 data 파라메터로 post 요청을 합니다.
//해당 서버 예제(본 JSP) 에서는 base64 로 인코딩 된 데이터를 디코드하여 다운로드 가능하도록 붙임으로 마무리합니다.
//참고로 org.apache.commons.codec.binary.Base64 클래스 사용을 위해는 commons-codec-1.4.jar 파일이 필요합니다.


ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

String data = request.getParameter("data"); // 파라메터 data
String extension = request.getParameter("extension"); // 파라메터 확장자

// AUIGrid.exportToXlsx() 사용시 exportProps 로 파일명을 지정해 줬다면 다음과 같이 지정된 파일명을 얻을 수 있습니다.
//String req_fileName = request.getParameter("filename"); // 파라메터 파일명


byte[] dataByte = Base64.decodeBase64(data.getBytes()); // 데이터 base64 디코딩

// csv 를 엑셀에서 열기 위해서는 euc-kr 로 작성해야 함.
if(extension.equals("csv")) {
	String sting = new String(dataByte, "utf-8");
	outputStream.write(sting.getBytes("euc-kr"));
} else {
	outputStream.write(dataByte);
}

String filename = "export." + extension; // 다운로드 될 파일명
	
response.reset();
response.setContentType("application/octet-stream");
response.setHeader("Content-Disposition","attachment; filename=" + filename );
response.setHeader("Content-Length",String.valueOf(outputStream.size()));

out.clear();
pageContext.pushBody();
ServletOutputStream sos = response.getOutputStream();
sos.write(outputStream.toByteArray());
sos.flush();
sos.close();
%>
