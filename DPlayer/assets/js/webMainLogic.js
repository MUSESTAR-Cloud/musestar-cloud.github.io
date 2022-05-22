function getQueryVariable(variable) { //获取参数(function from https://www.runoob.com )
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}


function getVariable(variable) //返回变量字符串
{
    if (getQueryVariable(variable) && variable != "urlofvid") //检查url中变量是否存在，存在即返回值，否则执行else
    {
        return getQueryVariable(variable);
    } else {
        if (variable == "vidtype") {
            if (getQueryVariable("magurl")) //存在magurl时返回“webtorrent”
            {
                var vidtype = "webtorrent"; //when test we use auto,when we use it,it should be "webtorrent"
                return vidtype;
            } else //vidtype未指定时返回“自动”
            {
                var vidtype = "auto";
                return vidtype;
            }
        } else if (variable == "urlofvid") //获得vidurl 或magurl（base64 encoded）链接
        {
            if (getQueryVariable("magurl")) {
                var decodedmagurl = base64Decoder(getQueryVariable("magurl"));
                return decodedmagurl;
            } else if (getQueryVariable("vidurl")) //vidurl的值存在时返回的链接
            {
                return getQueryVariable("vidurl");
            } else if (getQueryVariable("qsurl" + getVariable("defaultql"))) //video switch default vid
            {
                return getQueryVariable("qsurl" + getVariable("defaultql"));
            } else //vidurl和magurl的值未指定时返回的链接（默认播放）
            {
                var defaultVidUrl = gTH.defaultVidUrl;
                return defaultVidUrl;
            }

        } else if (variable == "picurl" && getDefault()) //picurl的值未指定时返回的链接（默认展示图）
        {
            var defaultPicUrl = gTH.defaultPicUrl;
            return defaultPicUrl;
        } else if (variable == "playerlogo" && getDefault()) //播放器左上角logo相关
        {
            var defaultPlayerLogo = "assets/Cloud_Play_128px.png";
            return defaultPlayerLogo;
        } else if (variable == "suburl") {
            if (getDefault()) //demo字幕相关,可用cdn加速
            {
                var defaultSubUrl = gTH.defaultSubUrl; // Internationalization
                return defaultSubUrl;
            } else {
                let videourl = getVariable('magurl') ? false : getVariable('urlofvid');
                if (videourl) {
                    if ((videourl.endsWith(".mp3") ||videourl.endsWith(".aac"))== false) {
                        let SubUrl = videourl.replace('.mp4', '.vtt');
                        SubUrl = SubUrl.replace('.m3u8', '.vtt');
                        SubUrl = SubUrl.replace('.mpd', '.vtt');
                        SubUrl = SubUrl.replace('.flv', '.vtt');
                        SubUrl = SubUrl.replace('.webm', '.vtt');
                        return SubUrl; //默认字幕
                    } else { 
                        console.warn("Subtitle OFF(Music)")
                        return false;
                    }
                } else {
                    console.warn("Subtitle OFF(Webtorrent)")
                    return false;
                }

            }
        } else if (variable == "webtitle") //页面title相关
        {
            var defaultWebTitle = 'DPlayer-ReadyToUse';
            return defaultWebTitle;
        } else if (variable == "danmakuaddition") //外加bilibili弹幕使用的服务器
        {
            var defaultDanmakuaddition = 'https://api.mochanbw.cn/dplayer/v3/bilibili/?';
            return defaultDanmakuaddition;
        } else if (variable == "danmakuapi") //默认弹幕api
        {
            var defaultDanmakuapi = 'https://api.mochanbw.cn/dplayer/';
            return defaultDanmakuapi;
        } else if (variable == "favicon") //favicon用下面的函数指定
        {
            return "assets/Cloud_Play.svg";
        } else if (variable == "preload") //preload相关
        {
            return "auto";
        } else if (variable == "speed") //播放速度
        {
            return [0.5, 0.75, 1, 1.25, 1.5, 2];
        } else {
            return false;
        }
    }
}

function getDefault() //查看url中的vidurl和magurl是否定义，是，即非默认状态
{
    if (getQueryVariable("vidurl") == false && getQueryVariable("magurl") == false && getTorFalse("vidqs") == false) {
        return true;
    } else {
        return false;
    }
}

function getContextMenu() //返回右键的自定义功能目录（数组）
{
    var contextMenu = [];
    if (getDefault()) //如果url中的vidurl和magurl的参数为空，则返回默认menu
    {
        /*contextMenu[0] = {
            text: gTH.contextMenu0text,
            click: (player) => {
                dp.notice(gTH.contextMenuSwitchText + gTH.contextMenu0text, 2000); //显示通知（string，time）时间单位毫秒
                dp.switchVideo({
                    url: gTH.contextMenu0Url,
                    pic: gTH.contextMenu0Pic,
                    //thumbnails: 'example.jpg',
                }, {
                    //id: 'test',
                    //api: 'https://api.prprpr.me/dplayer/',
                    //maximum: 3000,
                    //user: 'DIYgod',
                });
            },
        };*/
        contextMenu[0] = {
            text: gTH.Manual,
            link: "https://github.com/MoChanBW/DPlayer-ReadyToUse/",
        };
        var maxIndex = contextMenu.length - 1;
        var length = contextMenu.length;
        var k = 0;
        while (k < length) {
            if (contextMenu[k].text == undefined) {
                var count = k;
                while (count < maxIndex) {
                    contextMenu[count] = contextMenu[count + 1]; //后面的传递上来
                    count++;
                }
                contextMenu.pop(); //删除数组的最后一个元素
            } else {
                k++;
            }
        }
        maxIndex = null,
            length = null,
            k = null;
        return contextMenu;
    } else //返回一个空数组
    {
        return contextMenu;
    }
}

function getTrueorF(key) { //根据url中的1或0返回布伦值,默认true
    if (getQueryVariable(key) == "1" || getQueryVariable(key) == false) {
        return (true);
    } else {
        return (false);
    }
}

function getTorFalse(key) { //根据url中的1或0返回布伦值,默认false
    if (getQueryVariable(key) == "0" || getQueryVariable(key) == false) {
        return (false);
    } else {
        return (true);
    }
}

(function writeWebTitle() { //取消此功能
    var webTitle = getVariable("webtitle");
    document.title = webTitle;
})();

/*(function urlChangeFavicon() { //用js更改favicon（立即执行）
    document.head = document.head || document.getElementsByTagName('head')[0];
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'icon';
    link.href = getVariable("favicon");
    if (getVariable("favicon")) { //如果favicon未指定且oldlink存在
        // document.head.removeChild(oldLink);
        document.head.appendChild(link);
    }
})(); //暂无法实现此功能
*/

/*
window.onfocus = function () { //标签页焦点更改
    if (blurYet == 1) {
        document.title = '恢复正常了...';
        this.setTimeout("document.title = getVariable('webtitle')", 2333)//delay 2333ms

    }
};
window.onblur = function () {
    blurYet = 1;
    document.title = '快回来~页面崩溃了';
};
*/
function getVideoQualitySelect() { //清晰度切换
    var vidDefault = { //默认返回
        url: getVariable("urlofvid"), //视频链接
        pic: getVariable("picurl"),
        thumbnails: getVariable("thumburl"),
        type: getQueryVariable("vidtype") ? getQueryVariable("vidtype") : "auto", //视频类型(flv.normal.hls.dash)
    };
    if (getTorFalse('vidqs') && getQueryVariable("vidurl") == false && getQueryVariable("magurl") == false) {
        var k = 0;
        while (1) {
            if (getQueryVariable("qsname" + k) && getQueryVariable("qsurl" + k)) {
                k++;
            } else {
                break;
            };
        }
        var qualityInArray = [];
        for (i = 0; i < k; i++) {
            var jsonInQuality = {
                name: getQueryVariable("qsname" + i),
                url: getQueryVariable("qsurl" + i),
                type: getQueryVariable("qstype" + i) ? getQueryVariable("qstype" + i) : "auto",
            };
            qualityInArray[i] = jsonInQuality;
        };
        var vidHaveQualities = { //当?vidqs=1时返回  
            quality: qualityInArray,
            defaultQuality: getQueryVariable("defaultql") ? getQueryVariable("defaultql") : 0, //默认画质为第一个
            pic: getVariable("picurl"),
            thumbnails: getVariable("thumburl"),
        };
        return vidHaveQualities;
    } else {
        return vidDefault
    }
}

function base64Decoder(encodedString) { //可以用 https://tool.oschina.net/encrypt?type=3  加密
    let Base64 = { //from https://www.jianshu.com/p/82afa633033e
        decode(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
    };

    //let encoded = Base64.encode(nonEncodedString); 
    let decoded = Base64.decode(encodedString);
    return decoded;
}

function base64Encoder(nonEncodedString) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(nonEncodedString).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

function getLang() { //获得语言,若未指定则返回浏览器语言
    if (getQueryVariable("lang")) {
        var lang = getQueryVariable("lang")
        if (lang == 'zh-tw' || lang == 'zh-hk') {
            return 'zh-tw';
        } else if (lang.substring(0, 2) == 'zh') {
            return 'zh-cn';
        } else {
            return 'en'
        }
    } else //from https://blog.csdn.net/qq_26212731/java/article/details/78457198
    {
        var lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
        if (lang == 'zh-tw' || lang == 'zh-hk') {
            return 'zh-tw';
        } else if (lang.substring(0, 2) == 'zh') {
            return 'zh-cn';
        } else {
            return 'en'
        }
    }
}




function getDanMaku() { //弹幕  
    if (getTorFalse("danmaku") || getDefault()) {
        if (getVariable("urlofvid").includes("huawei-p40pro/index")) {
            var abid = "aid=882531009";
            var part = '&p=2';
        } else {
            var abid = getQueryVariable("aid") ? 'aid=' + getQueryVariable("aid") : '';
            var abid = getQueryVariable("bvid") ? 'bvid=' + getQueryVariable("bvid") : abid;
            var part = getQueryVariable("part") ? '&p=' + getQueryVariable("part") : '';
        }
        var DanMaku = {
            id: getVariable("danmakuid"),
            api: getVariable("danmakuapi"),
            token: getVariable("danmakutoken"),
            maximum: 1000,
            addition: [getVariable("danmakuaddition") + abid + part],
            user: getVariable("danmakuuser"),
            bottom: '15%',
            unlimited: getTrueorF("unlimited"),
        };

        if (getDefault() || (getTorFalse("danmaku") && (DanMaku.api == false || getQueryVariable("danmakuaddition") == false))) { //（这里之后要改）弹幕启动且api或addition不存在，或默认状态
            var httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', 'https://api.mochanbw.cn/dpverification/?vidurl=' + base64Encoder(getVariable("urlofvid")) + '&cookies=' + 'undefined', true);
            httpRequest.send();
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
                    var json = httpRequest.responseText;
                    json = JSON.parse(json); //将文本转化为json对象
                    DanMaku.token = json.VerificationCode; //方便以后搭弹幕服务器时用于校验身份
                    DanMaku.user = "DPRTU" + json.VerificationCode.substring(0, 10);
                }
            }
            DanMaku.id = md5Encrypt(getVariable("urlofvid")).toUpperCase(); //视频的唯一id
            return DanMaku; //这个return放这，我也不知道为什么
        } else {
            return DanMaku;
        }

    } else {
        console.warn("Danmaku OFF");
        return false;
    }
}

function md5Encrypt(string) { //from https://mp.weixin.qq.com/s?src=11&timestamp=1588897977&ver=2325&signature=GBu3lAb0gmCyBQaLMSmGLqr3iV4c3-swAuHCMeVeDwl8NGbZZ8vo3J7KOV6rRpWPP7Pe6PIFWy7rabKf5ciHAyaRns36jfgKR9SxsUX9aAvC7Jr-19Fn1RF0xVJDjxDD&new=1
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }

    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function md5_WordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}

//国际化
function getTextHolder() {
    if (getLang() == "zh-cn") {
        return textHolder_zh_cn;
    } else if (getLang() == "zh-tw") {
        return textHolder_zh_tw;
    } else {
        return textHolder_en;
    }
}

var textHolder_en = {
    Manual: "Manual",
    //contextMenuSwitchText: "Switch to : ",
    defaultVidUrl: "https://cdn.jsdelivr.net/gh/MoChanBW/CDN@latest/huawei-p40pro/index.m3u8",
    defaultPicUrl: 'https://cdn.jsdelivr.net/gh/MoChanBW/CDN@latest/huawei-p40pro/index.jpg',
    defaultSubUrl: 'assets/demoSubtitle_en.vtt',
};

var textHolder_zh_tw = {
    Manual: "使用說明",
    //contextMenuSwitchText: "切換到 : ",
    defaultVidUrl: "https://cdn.jsdelivr.net/gh/MoChanBW/CDN@latest/huawei-p40pro/index.m3u8",
    defaultPicUrl: 'https://cdn.jsdelivr.net/gh/MoChanBW/CDN@latest/huawei-p40pro/index.jpg',
    defaultSubUrl: 'assets/demoSubtitle_zh_tw.vtt',
};

var textHolder_zh_cn = {
    Manual: "使用说明",
    //contextMenuSwitchText: "切换到 : ",
    defaultVidUrl: "https://cdn.jsdelivr.net/gh/MoChanBW/CDN@latest/huawei-p40pro/index.m3u8",
    defaultPicUrl: 'https://cdn.jsdelivr.net/gh/MoChanBW/CDN@latest/huawei-p40pro/index.jpg',
    defaultSubUrl: 'assets/demoSubtitle_zh_cn.vtt',
};
var gTH = getTextHolder(); //缩写

console.log("\n".concat(" %c GitHub").concat(" %c MoChanBW/DPlayer-ReadyToUse ", "\n", "\n"), "color: #fff; background: #8470ff; padding:5px 0;", "background: #fadfa3; padding:5px 0;");