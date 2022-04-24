function isMobile(){
	var sUserAgent= navigator.userAgent.toLowerCase(),  bIsIpad= sUserAgent.match(/ipad/i) == "ipad",  bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",  bIsMidp= sUserAgent.match(/midp/i) == "midp",  bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",  bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",  bIsAndroid= sUserAgent.match(/android/i) == "android",  bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",  bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",  bIsWebview = sUserAgent.match(/webview/i) == "webview";  return (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM); 
}
if (isMobile()) {
	var curl=document.URL;
	if(curl.indexOf('www.')>0){
		curl=curl.replace("www.","m.");
		window.location.href=curl;
	}
}
var qike123 = qike123 || {};
qike123.switchTab = function(i, o, p) {
    var n = {
        delay: 100,
        trigger: "mouseover",
        lazyload: 1
    };
    $.extend(n, p || {});
    var j = {};
    j.load0 = 1;
    var k;
    if (n.trigger === "mouseover") {
        i.mouseover(function() {
            l(this)
        })
    } else {
        if (n.trigger === "click") {
            i.click(function() {
                l(this)
            })
        }
    }
    function l(b) {
        var a = b;
        if (n.delay > 0) {
            k && clearTimeout(k);
            k = setTimeout(function() {
                m(a)
            },
            n.delay)
        } else {
            m(a)
        }
    }
    function m(c) {
        i.removeClass("av");
        $(c).addClass("av");
        var b = $(c).attr("tab");
        o.hide();
        var d = o[b];
        d.style.display = "block";

    }
};

////////////////////

function setTab(m, n) {
    var tli = document.getElementById("menu" + m).getElementsByTagName("li");
    var mli = document.getElementById("main" + m).getElementsByTagName("div");
    for (i = 0; i < tli.length; i++) {
        tli[i].className = i == n ? "on": "";
        mli[i].style.display = i == n ? "block": "none";
        const pli_cnt = mli[i].getElementsByTagName("ul")[0].getElementsByTagName("li");
        if(!pli_cnt.length){
            tli[i].style.display = 'none';
        }
    }
}


function __get_playtab_on_index(m) {	
	//
	const def_pindex = Number($('#DEF_PLAYINDEX').text());
	return def_pindex;

	//
	alert('已弃用191111');
    var tli = document.getElementById("menu" + m).getElementsByTagName("li");
    var mli = document.getElementById("main" + m).getElementsByTagName("div");
    for (i = 0; i < tli.length; i++) {
        const pli_cnt = mli[i].getElementsByTagName("ul")[0].getElementsByTagName("li");
        if(i > 0 && pli_cnt.length){
            return i;
        }
    }
    //
    return 0;
}


function __set_playtab_on_index(m) {
    setTab(0, __get_playtab_on_index(m));
    return null;
}

function __set_playtab_curr_on_index(m) {
	const _href_url = window.location.href;
	const _refresl = _href_url.match(/\/vp\/(\d+?)-(\d+?)-(\d+?)\.html/);
	const _iPlay = Number(_refresl[2]);
    setTab(0, _iPlay);
    return null;
}


////////////////////////



function PlayHistoryClass(){
	var cookieStr,nameArray,urlArray,allVideoArray;
	this.getPlayArray=function (){
		cookieStr = document.cookie;
		var start = cookieStr.indexOf("qike123=") + "qike123=".length,end = cookieStr.indexOf("_$_|",start),allCookieStr= unescape(cookieStr.substring(start,end))
		if(end==-1){allCookieStr="";return;}
		allVideoArray = allCookieStr.split("_$_");
		nameArray = new Array(),urlArray = new Array();
		for(var i = 0; i < allVideoArray.length; i++){
			var singleVideoArray = allVideoArray[i].split("^");
			nameArray[i] = singleVideoArray[0];urlArray[i] = singleVideoArray[1];
		}
	}
	this.viewPlayHistory=function (div){
		var tag = document.getElementById(div),n = 15
		if(navigator.cookieEnabled){
			var innerStr = "";
			for(var i =nameArray.length - 1; i >= 0; i--){
				var textCount = nameArray[i].replace(/[^\x00-\xff]/g,"cc").length;
				if(textCount <= n*2){
					texts = nameArray[i];
				}else{
						texts = nameArray[i].substr(0,n)+"...";
				}
				innerStr += "<li><a target=_blank class=name href=\"" + urlArray[i] + "\"" + " title=\"" + nameArray[i] + "\">" + texts + "</a><a target=_blank class=now href=\"" + urlArray[i] + "\"" + " title=\"" + nameArray[i] + "\">立即观看</a></li>"
			}
			if (innerStr.length>0){tag.innerHTML= innerStr}
		}else{
			 set(tag,"您浏览器关闭了cookie功能，不能为您自动保存最近浏览过的网页。")
		}
	}
	this.addPlayHistory=function (name,url){
		var count = 10; //播放历史列表调用条数
		var code_name = escape(name) + "^",code_url = escape(url) + "_$_",expireTime = new Date(new Date().setDate(new Date().getDate() + 30)),timeAndPathStr = "|; expires=" + expireTime.toGMTString() + "; path=/";
		if(cookieStr.indexOf("qike123=") != -1 || cookieStr.indexOf("_$_|") != -1){
			var newCookieStr = "";
			if(allVideoArray.length < count){
				for(i in allVideoArray){
					if(nameArray[i] == name) continue;
					newCookieStr += escape(nameArray[i]) + "^" + escape(urlArray[i]) + "_$_" ;
				}
			}else{
				for(var i = 1; i < count; i++){
					if(nameArray[i] == name) continue;
					newCookieStr += escape(nameArray[i]) + "^" + escape(urlArray[i]) + "_$_" ;
				}
			}
			document.cookie = "qike123=" + newCookieStr + code_name + code_url + timeAndPathStr;
		}else{
			document.cookie = "qike123="+ code_name + code_url + timeAndPathStr;
		}
	}
}


//var cookiedomain="1.22";

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}

function _GC(){
document.getElementById('playhistory').innerHTML="<center>暂无播放历史列表...</center>";
 var expdate=new Date(1970, 1, 1);
 delCookie("qike123");
}
var PlayHistoryObj=new PlayHistoryClass()
PlayHistoryObj.getPlayArray()
function killErrors() {
    return true;
}
window.onerror = killErrors;

var topShow=false;
	function showTop(n)
	{
		if(topShow==true)
		{
			switchTab('top',n,2,"history");
		}
		else{
			//alert("s");
			document.getElementById("Tab_top_"+n).className="history";
			//document.getElementById("List_top_"+n).className="dropbox_tigger dropbox_tigger_on";
			document.getElementById("List_top_"+n).style.display="";
			topShow=false;
		}
	}
	function hideTop()
	{
		for(i=0;i<2;i++) {
			var CurTabObj = document.getElementById("Tab_top_"+i) ;
			var CurListObj = document.getElementById("List_top_"+i) ;
			CurTabObj.className="history" ;
			CurListObj.style.display="none";
		}
	}
function turnOff(){
	$("#shadow").css("height",10000);
	$("#turnedOn").css("position","relative");
	$("#playbox").css("z-index",8);
	$("#shadow").show();
	$("#turnedOff").hide();
	$("#turnedOn").show();
	$("#light-switch").css("z-index",7);

	
}
function turnOn(){
	$("#turnedOff").show();
	$("#turnedOn").hide();
	$("#shadow").hide();
	$("#light-switch").css("z-index",0);

}