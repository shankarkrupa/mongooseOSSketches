<%@ Language=VBScript%>
<%
dim ledon
if not request.querystring("ledon") = "" then
	ledon = request.querystring("ledon")
	application("ledon") = ledon
end if
ledon = application("ledon")
if not request.querystring("showform") = "true" then
	response.write ledon
	Response.End 'Presumed to be a call from Microcontroller, stop processing from here.
end if

'START: Display a form to toggle the LED status
if request.querystring("showform") = "true" then
dim blnShowledoffbutton
dim blnShowledonbutton
dim strIconName
if ledon = "true" then	
	blnShowledonbutton = "checked"
	blnShowledoffbutton = ""
	strIconName= "grenbull.gif"
else
	blnShowledonbutton = ""
	blnShowledoffbutton = "checked"	
	strIconName= "wh_ball.gif"
end if

%>
<html>
<head>
<title>LED Manager</title>
<style type="text/css">
td
{
	width: 75px;
	height: 75px;
}
.indicator
{
	text-align: center;
	width: 20px;
	height: 20px;
}
</style>
</head>
<body>
<h1>
<center>Welcome to the ESP32 Lighting System at Krupa's Home
		
</center>
</h1>

<form>
<input type="hidden" name="showform" value="true" />
<table border="1" align="center">
<tr>
	<td colspan="2" class="indicator"><img src="<%=strIconName%>" /></td>
</tr>
<tr>
<td>
On
</td>
<td>
<input type="radio" name="ledon" value="true" <%= blnShowledonbutton%> onclick="document.forms[0].submit()" />
</td>
</tr>
<tr>
<td>
Off
</td>
<td>
<input type="radio" name="ledon" value="false" <%= blnShowledoffbutton%> onclick="document.forms[0].submit()"/>
</td>
</tr>
</table>
</form>
</body>
</html>
<%
end if 'END: Display form
%>
