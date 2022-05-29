document.write("    <font size=\"5\"><div id=\"datetime\">");
document.write("        <script>");
document.write("            setInterval(\"document.getElementById('datetime').innerHTML=new Date().toLocaleString();\", 1000);");
document.write("        <\/script>");
document.write("    <\/div><\/font>");
