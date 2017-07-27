<%@ Page Language="C#" %>

<script runat="server">

    // AUIGrid Export 시 로컬에 다운로드 가능하도록 작성된 서버사이드 예제(ASP.NET C#) 입니다.
    // AUIGrid 가 xlsx, csv, xml 등의 형식을 작성하여 base64 로 인코딩하여 data 파라메터로 post 요청을 합니다.
    // 해당 서버 예제(본 ASP.NET C#) 에서는 base64 로 인코딩 된 데이터를 디코드하여 다운로드 가능하도록 붙임으로 마무리합니다.
    protected void Page_Load(object sender, EventArgs e)
    {
        //if (!Page.IsPostBack)
        //    return;

        string data = "";
        string extension = "xlsx";
        string filename = "export";

        // 파라메터 data
        if (!String.IsNullOrEmpty(Request.Form["data"]))
            data = Request.Form["data"];
        else
            return;

        // 파라메터 확장자
        if (!String.IsNullOrEmpty(Request.Form["extension"]))
            extension = Request.Form["extension"];

        // AUIGrid.exportToXlsx() 사용시 exportProps 로 파일명을 지정해 줬다면 다음과 같이 지정된 파일명을 얻을 수 있습니다.
        if (!String.IsNullOrEmpty(Request.Form["filename"]))
        {
            filename = Request.Form["filename"];
            filename = HttpUtility.UrlDecode(filename);

            // 파일명이 한글인 경우 깨짐 현상 방지
            filename = HttpUtility.UrlEncode(filename, System.Text.Encoding.UTF8).Replace("+","%20");
        }

        // PC 에 저장될 파일명(export.xlsx, export.csv 등)
        filename = filename + "." + extension;

        // BASE64 디코딩
        // 실제로 AUIGrid 에서 작성한 엑셀, CSV 등의 base64 encoding 된 양식을 decoding 처리합니다.
        byte [] decodedBytes = Convert.FromBase64String(data);

        
        Response.ClearContent();
        Response.Clear();
        Response.AddHeader("Content-disposition", "attachment; filename=" + filename);
        Response.ContentType = "application/octet-stream";
        Response.BinaryWrite(decodedBytes);
        Response.End();
        Response.Flush();
    }
</script>
