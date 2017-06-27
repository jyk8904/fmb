<%
Function Base64Decode(strBase64)
    Dim Byte1, Byte2, Byte3, Byte4
    Dim Data
    Dim iterator
    Const CharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

    For iterator = 0 To Len(strBase64) - 1 Step 4
        Byte1 = InStr(CharMap, Mid(strBase64, iterator + 1, 1)) - 1
        Byte2 = InStr(CharMap, Mid(strBase64, iterator + 2, 1)) - 1
        Byte3 = InStr(CharMap, Mid(strBase64, iterator + 3, 1)) - 1
        Byte4 = InStr(CharMap, Mid(strBase64, iterator + 4, 1)) - 1

        Data = Data & ChrB(Byte1 * 4 + Byte2 \ 16)

        If Byte3 >= 0 Then
            Data = Data & ChrB((Byte2 And 15) * 16 + Byte3 \ 4)
        Else
            Data = Data & ChrB((iterator * 3 \ 4 + 1) = (Byte2 And 15) * 16)
        End If

        If Byte4 >= 0 Then
            Data = Data & ChrB((Byte3 And 3) * 64 + Byte4)
        End If
    Next
    Base64Decode = Data
End Function
%>


<%
'AUIGrid Export 시 로컬에 다운로드 가능하도록 작성된 서버사이드 예제입니다.
'AUIGrid 가 xlsx, csv, xml 등의 형식을 작성하여 base64 로 인코딩하여 data 파라메터로 post 요청을 합니다.
'해당 서버 예제(본 ASP) 에서는 base64 로 인코딩 된 데이터를 디코드하여 다운로드 가능하도록 붙임으로 마무리합니다.

'AUIGrid 가 만든 base64 인코딩 된 데이터
Dim Base64Data : Base64Data = Request.Form("data")

'인코딩된 데이터를 디코딩함.
Dim DecodedData : DecodedData = Base64Decode(Base64Data)


response.Clear()
response.AddHeader "Content-Disposition", "attachment; filename=" & "export.xlsx"
response.ContentType = "application/octet-stream"
response.BinaryWrite  DecodedData
response.End
%>
