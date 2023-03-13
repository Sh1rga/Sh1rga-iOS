var version = "0.4.0";
var socketTime = 0;
var socketConnect = false;
var server_encrypt = "";
var my_encrypt = "";
var my_decrypt = "";
var encrypt_key = "";
var roomID = 240000000000;
var userID = 240000000000;
var userID_crypt = "";
var join = false;
var reloadDelay = false;
var yjoin = false;
var deletePress = 0;
var inputText = "";
var getMess = "";
var getMessDec = "";
var cryptFlag = false;
var langFlag = false;
var verErrorFlag = false;
var langErrorFlag = false;
var serverErrorFlag = false;
var latestError = "";
var nowErrorView = "";
var errorCheckEnd = false;
var language = "en";
var defaultLang = (window.navigator.languages && window.navigator.languages[0]) ||
    			   window.navigator.language ||
    			   window.navigator.userLanguage ||
            	   window.navigator.browserLanguage;

var langjson = "";

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var accountID = "";
window.onload = function(){ loopApp();
	autoLangSet();
	if (address_api != null) {
		socketTimeCounter();
		errorloop();
	}
	document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) { e.preventDefault();}}, { passive: false });
	document.addEventListener("dblclick", function(e){ e.preventDefault();}, { passive: false });
    location.href = "sh1rga://appSettingLoad";
}

function autoLangSet() {
  const alllanglist = ['en', 'ja', 'ru', 'cn', 'tw', 'ar', 'es', 'pt', 'fr', 'de', 'ko', 'tok'];
  if (alllanglist.includes(getParam('lang'))) {
 	language = getParam('lang');
  }else{
	const langlist = ['ja', 'ru', 'ar', 'es', 'pt', 'fr', 'de', 'ko', 'tok'];
	const cnlanglist = ['zh-TW', 'zh-tw', 'zh-HK', 'zh-hk'];
	if (langlist.includes(defaultLang.substr( 0, 2 ))) {
		language = defaultLang.substr( 0, 2 );
	}else if (cnlanglist.includes(defaultLang.substr( 0, 5 ))) {
		language = "tw";
	}else if (defaultLang.substr( 0, 5 ) == "zh-CN" || defaultLang.substr( 0, 5 ) == "zh-cn") {
		language = "cn";
	}
  }
  langset();
}

function langset() {
	$('#loadCurtain').show()
	settinglangset()
    if (language == "ar") {
		document.getElementById('bdo').dir = "rtl";
		$('#msgbox').css('right','-3px');
	}else{
		document.getElementById('bdo').dir = "ltr";
		$('#msgbox').css('right','3px');
	}
    langFlag = true;
   	langErrorFlag = false;
   	if (serverErrorFlag == false) {
    	if (verErrorFlag == true && latestError == "ver") {
			document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">' + langjson.oldver1 + '<br>' + langjson.oldver2 + '</div>';
			nowErrorView = "ver";
		}else if (langErrorFlag == true && latestError == "lang") {
  			document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">Failed to retrieve language file.<br>Please try again.</div>';
  			nowErrorView = "lang";
  		}
  	}
  	window.setTimeout("$('#loadCurtain').fadeOut(500)", 100);
}

function sleep(msec) {
   return new Promise(function(resolve) {
      setTimeout(function() {resolve()}, msec);
   })
}

async function msgMove() {
	nowErrorView == ''
	$('#msgbox').fadeOut(500);
	window.setTimeout("if (nowErrorView == '') { document.getElementById('msg').innerHTML = ''; }", 500);
}

var connected = false;
const socket = io.connect( address_api );

//To pass the App Store's review process
//function banCheck() {
//    if (connected == true && accountID != "") {
//        startView();
//        socket.emit( 'banCheck', accountID );
//    }
//}
//socket.on('banCheck', strMessage => {
//    if (strMessage == true) {
//        location.href = "sh1rga://banned";
//    }
//})

socket.on('connect',() => {
	socketConnect = true;
	sendCryptLoad();
//    banCheck();
    if (connected == false) {
    	connected = true;
    	langLoad();
	}
});

socket.on('disconnect',() => {
	socketConnect = false;
	socketTime = 0;
	socketTimeCounter();
});

function socketTimeCounter() {
	if (socketConnect == false) {
		socketTime += 1;
		window.setTimeout("socketTimeCounter();", 1000);
		if (socketTime >= 30) {
			serverErrorFlag = true;
			latestError = "server";
			if (nowErrorView != "server3") {
				document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">' + langjson.notconnect30_1 + '<br>' + langjson.notconnect30_2 + '</div>';
			}
			nowErrorView = "server3";
		}else if (socketTime >= 10) {
			serverErrorFlag = true;
			latestError = "server";
			if (nowErrorView != "server2") {
				document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">' + langjson.notconnect10_1 + '<br>' + langjson.notconnect_re + '</div>'
			}
			nowErrorView = "server2";
		}else{
			if (socketConnect == true) {
				serverErrorFlag = true;
				latestError = "server";
				if (nowErrorView != "server") {
					document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">' + langjson.notconnect_1 + '<br>' + langjson.notconnect_re + '</div>';
				}
				nowErrorView = "server";
			}
		}
	}else{
		serverErrorFlag = false;
		socketTime = 0;
	}
}

function langLoad() {
if (langFlag == false) {
	window.setTimeout("langLoad();", 100);
}else{
	errorCheckEnd = true;
	startView();
	if (langErrorFlag == false && verErrorFlag == false && errorCheckEnd == true) {
  		document.getElementById('msg').innerHTML = '<div class="goodmsg" id="msgbox">' + langjson.loadingviewsuc + '</div>';
  		if (language == "ar") {
			$('#msgbox').css('right','-8px');
		}else{
			$('#msgbox').css('right','8px');
		}
  		nowErrorView = "";
  		window.setTimeout("if (nowErrorView == '') { msgMove(); }", 2000);
	}
}
}

var enc_bits = 2048;
var enc_len = 16;
var enc_str = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var enc_strLen = enc_str.length;
var enc_result = "";
var ThisIsStart = false;
var appBox = document.getElementById('box');

function startView() {
	if (language == "ar") {
	  appBox.innerHTML = '<h1 aria-label="Shirga Chat">Sh1rga Chat</h1><div class="setbox"><h2 style="margin:8px">' + langjson.startroom + '</h2><button onclick="sendStart();" style="margin-bottom:8px">' + langjson.start + '</button></div><br><div class="setbox"><h2 style="margin:8px">' + langjson.joinroom + '</h2><form action="" style="margin-bottom:8px"><input type="number" id="input" autocomplete="off" required maxlength="12" alt="' + langjson.entertheroomid + '" enterkeyhint="done" pattern="^[0-9]+$" aria-label="' + langjson.entertheroomid + '" style="border-radius:0 32px 32px 0" dir="ltr"><button type="submit" onClick="Button();return false;" style="border-radius:32px 0 0 32px;padding-right:14px">' + langjson.join + '</button></form></div><br><p>Ver: ' + version + '</p><p><a style="color:#aaa" class="nobox" href="' + address_web + '/tos?lang=' + language + '" target="_blank" rel="noopener noreferrer">' + langjson.tos + '</a><br><a style="color:#aaa" class="nobox" href="https://www.mozilla.org/en-US/MPL/2.0/" target="_blank" rel="noopener noreferrer">This software is licensed under the terms of the Mozilla Public License 2.0.</a></p>';
	}else{
	  appBox.innerHTML = '<h1 aria-label="Shirga Chat">Sh1rga Chat</h1><div class="setbox"><h2 style="margin:8px">' + langjson.startroom + '</h2><button onclick="sendStart();" style="margin-bottom:8px">' + langjson.start + '</button></div><br><div class="setbox"><h2 style="margin:8px">' + langjson.joinroom + '</h2><form action="" style="margin-bottom:8px"><input type="number" id="input" autocomplete="off" required maxlength="12" alt="' + langjson.entertheroomid + '" enterkeyhint="done" pattern="^[0-9]+$" aria-label="' + langjson.entertheroomid + '"><button type="submit" onClick="Button();return false;" style="border-radius:0 32px 32px 0;padding-left:14px">' + langjson.join + '</button></form></div><br><p>Ver: ' + version + '</p><p><a style="color:#aaa" class="nobox" href="' + address_web + '/tos?lang=' + language + '" target="_blank" rel="noopener noreferrer">' + langjson.tos + '</a><br><a style="color:#aaa" class="nobox" href="https://www.mozilla.org/en-US/MPL/2.0/" target="_blank" rel="noopener noreferrer">This software is licensed under the terms of the Mozilla Public License 2.0.</a></p>';
	}
    if (accountID != "") {
        document.getElementById('accountIDBox').innerHTML = 'ID:' + accountID;
    }
}

function langSelectView() {
	appBox.innerHTML = '<div style="text-align:left;margin-left:5px"><button onclick="startView();">Back</button></div><h2 style="margin-top:-10px">Language</h2><p><select name="language" id="lang" size="12" selected dir="ltr"><option value="en" selected>English</option><option value="ja">日本語</option><option value="ru">Русский</option><option value="cn">简体中文</option><option value="tw">繁體中文</option><option value="ar">العربية</option><option value="es">Español</option><option value="pt">Português</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="ko">한국어</option><option value="tok">toki pona</option></select></p><p><button onclick="langSelect();">OK</button></p>';
	if (language == "ja"){
	document.getElementById('lang').options[1].selected = true;
	}else if (language == "ru"){
	document.getElementById('lang').options[2].selected = true;
	}else if (language == "cn"){
	document.getElementById('lang').options[3].selected = true;
	}else if (language == "tw"){
	document.getElementById('lang').options[4].selected = true;
	}else if (language == "ar"){
	document.getElementById('lang').options[5].selected = true;
	}else if (language == "es"){
	document.getElementById('lang').options[6].selected = true;
	}else if (language == "pt"){
	document.getElementById('lang').options[7].selected = true;
	}else if (language == "fr"){
	document.getElementById('lang').options[8].selected = true;
	}else if (language == "de"){
	document.getElementById('lang').options[9].selected = true;
	}else if (language == "ko"){
	document.getElementById('lang').options[10].selected = true;
	}else if (language == "tok"){
	document.getElementById('lang').options[11].selected = true;
	}else{
	document.getElementById('lang').options[0].selected = true;
	}
}

function langSelect() {
	language = document.getElementById('lang').value;
	langFlag = false;
	langset();
	langLoad()
	if (getParam('customserver') != null) {
	  history.replaceState('','','?lang=' + language + '&customserver=' + getParam('customserver'));
	}
}

function loopfunc() {
	if (join == true) {
		socket.emit( 'load', userID_crypt );
		window.setTimeout("loopfunc();", 3000);
	}
}

function loadingView() {
	appBox.innerHTML = '<p><strong>' + langjson.setenc + '</strong></p><p><button onclick="setEncBit(2048);">' + langjson.setenc2048 + '</button><br><button onclick="setEncBit(3072);">' + langjson.setenc3072 + '</button><br><button onclick="setEncBit(4096);">' + langjson.setenc4096 + '</button></p><p style="color:#aaa">' + langjson.setenchint + '</p>';
}
function setEncBit(strength) {
	enc_bits = strength;
	appBox.innerHTML = '<p><strong>' + langjson.nowloading + '</strong><br>' + langjson.loadingview1 + '<br>' + langjson.loadingview2 + '</p>';
	window.setTimeout('preCrypt();',100);
}

function preCrypt() {
	cryptFlag = true;
	for (var i = 0; i < enc_len; i++) {
		enc_result += enc_str[Math.floor(Math.random() * enc_strLen)];
	}
	my_decrypt = cryptico.generateRSAKey(enc_result, enc_bits);
	my_encrypt = cryptico.publicKeyString(my_decrypt);
	if (ThisIsStart == true) {
		cryptFlag = false;
		appBox.innerHTML = '<p><strong>' + langjson.loadingviewsuc + '</strong></p><p><button onclick="startCryptSuc();">' + langjson.start + '</button></p>';
	}else{
		cryptFlag = false;
		$( '#input' ).val( '' ); 
		appBox.innerHTML = '<p><strong>' + langjson.loadingviewsuc + '</strong></p><p style="padding:0 10px;margin:5px 0 0;color:#ccc">' + langjson.roomid + ': ' + roomID + '</p><p><button onclick="joinCryptSuc();">' + langjson.join + '</button></p>';
	}
}

function startCryptSuc() {
	var msgcrypt = cryptico.encrypt(roomID + my_encrypt, server_encrypt);
	socket.emit( 'start', my_encrypt );
}

function joinCryptSuc() {
	var msgcrypt = cryptico.encrypt(roomID + my_encrypt, server_encrypt);
	socket.emit( 'join', msgcrypt.cipher );
}

function sendStart() {
	ThisIsStart = true;
	loadingView();
}

function sendJoin() {
	roomID = $( '#input' ).val();
	ThisIsStart = false;
	loadingView();
}

function sendLoad() {
	if (reloadDelay == false) {
		reloadDelay = true;
		window.setTimeout('reloadDelay = false;',1000);
		socket.emit( 'load', userID_crypt );
	}
	if (deletePress != 0 && nowErrorView == "deletecheck") {
		nowErrorView = "";
		msgMove();
	}
	deletePress = 0;
}

function sendFirstLoad() {
	if (yjoin == false && join == true) {
		socket.emit( 'first-load', userID_crypt );
		window.setTimeout("sendFirstLoad();", 3000);
	}
}

function sendSend() {
	if ($( '#input' ).val().length != 0) {
		inputText = cryptico.encrypt(string_to_utf8_hex_string($( '#input' ).val()), encrypt_key);
		var msgcrypt = cryptico.encrypt(userID + inputText.cipher, server_encrypt);
		socket.emit( 'send', msgcrypt.cipher );
	}
	if (deletePress != 0 && nowErrorView == "deletecheck") {
		nowErrorView = "";
	}
	deletePress = 0;
	if (serverErrorFlag == false && langErrorFlag == false && latestError == "" && nowErrorView == "") {
		document.getElementById('msg').innerHTML = '<div class="goodmsg" id="msgbox">' + langjson.sending + '</div>';
	}
}

function sendDelete() {
	deletePress += 1;
	if (deletePress == 2) {
		join = false;
		deletePress = 0;
		socket.emit( 'delete', userID_crypt );
		appBox.innerHTML = '<p>' + langjson.deleting + '</p>';
		if (nowErrorView == "deletecheck") {
			nowErrorView = "";
			msgMove();		
		}
	}else{
		if (serverErrorFlag == false) {
			document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">' + langjson.deletecheck + '</div>';
			nowErrorView = "deletecheck";
		}else{
			deletePress = 0;
		}
	}
}

function sendCryptLoad() {
	socket.emit( 'cryptload' );
}

var flagAllow = false;
socket.on('flag-enable', strMessage => {
    flagAllow = strMessage;
})
function viewChat() {
	if (language == "ar") {
	appBox.innerHTML = '<p style="height:24px;padding:0 10px;margin:5px 0 0;text-align:right;color:#ccc" aria-hidden="true">' + langjson.roomid + ': ' + roomID + '<button class="nobox" style="display:none;color:red;margin:0" id="flagbtn">Flag</button></p><textarea readonly id="get-message-area" alt="' + langjson.receivemess + '" style="background-color:#033;border-radius:20px 0 20px 20px;transform:translateX(20px)" aria-label="' + langjson.receivemess + '"></textarea><br><form action="" style="height:calc(50% - 102px)"><textarea id="input" placeholder="' + langjson.entermess + '" alt="' + langjson.entermess + '" required style="height:100%;background-color:#023;border-radius:20px 20px 20px 0;transform:translateX(-20px)" aria-label="' + langjson.entermess + '"></textarea><br><div style="display:inline-flex;align-content:center;flex-direction:row-reverse"><button onclick="Button();return false;">' + langjson.send + '</button>&nbsp;<button onclick="sendLoad();return false;">' + langjson.reload + '</button>&nbsp;<button onclick="sendDelete();return false;" style="color:#f33;border-color:#534">' + langjson.delete + '</button></div></form>';
	}else{
	appBox.innerHTML = '<p style="height:24px;padding:0 10px;margin:5px 0 0;text-align:left;color:#ccc" aria-hidden="true">' + langjson.roomid + ': ' + roomID + '<button class="nobox" style="display:none;color:red;margin:0" id="flagbtn" onclick="sendFlag();return false;">Flag</button></p><textarea readonly id="get-message-area" alt="' + langjson.receivemess + '" style="background-color:#033;border-radius:0 20px 20px 20px;transform:translateX(-20px)" aria-label="' + langjson.receivemess + '"></textarea><br><form action="" style="height:calc(50% - 102px)"><textarea id="input" placeholder="' + langjson.entermess + '" alt="' + langjson.entermess + '" required style="height:100%;background-color:#023;border-radius:20px 20px 0 20px;transform:translateX(20px)" aria-label="' + langjson.entermess + '"></textarea><br><div style="display:inline-flex;align-content:center;flex-direction:row-reverse"><button onclick="Button();return false;">' + langjson.send + '</button>&nbsp;<button onclick="sendLoad();return false;">' + langjson.reload + '</button>&nbsp;<button onclick="sendDelete();return false;" style="color:#f33;border-color:#534">' + langjson.delete + '</button></div></form>';
	}
    if (flagAllow == true) {
        $('#flagbtn').css('display','inline');
    }
}

function sendFlag() {
    socket.emit( 'flag', userID_crypt );
}

socket.on('flag', strMessage => {
    join = false;
    appBox.innerHTML = '<p><strong>' + langjson.roomflagged1 + '</strong><div style="font-size:150%"><strong>FlagID: ' + strMessage + '</strong></div></p><br><button onclick="Disconnect();">' + langjson.ok + '</button>';
})

socket.on('flag-error', strMessage => {
    if (serverErrorFlag == false && langErrorFlag == false && latestError == "" && nowErrorView == "") {
        document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">Flag error</div>';
        window.setTimeout("if (nowErrorView == '') { msgMove(); }", 3000);
    }
})

function errorloop() {
  if (serverErrorFlag == false) {
  	if (verErrorFlag == true && latestError == "ver" && nowErrorView != "ver") {
		document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">' + langjson.oldver1 + '<br>' + langjson.oldver2 + '</div>';
		nowErrorView = "ver";
  	}else if (langErrorFlag == true && latestError == "lang" && nowErrorView != "lang") {
  		document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">Failed to retrieve language file.<br>Please try again.</div>';
  		nowErrorView = "lang";
  	}
  	if (errorCheckEnd == false) {
  		document.getElementById('msg').innerHTML = '<div class="goodmsg" id="msgbox">Loading...</div>';
  	}
  }
  if (language == "ar") {
	  $('#msgbox').css('right','-8px');
  }else{
	  $('#msgbox').css('right','8px');
  }
  window.setTimeout("errorloop();", 500);
}

socket.on('get-roomid', strMessage => {
	strMessage = cryptico.decrypt(strMessage, my_decrypt).plaintext;
	roomID = strMessage;
	appBox.innerHTML = '<p><strong>' + langjson.waitjoin1 + '</strong><br><br><div style="font-size:150%">' + langjson.waitjoin2 + '</div><div style="font-size:150%"><strong style="-webkit-user-select:auto;user-select:auto;-webkit-touch-callout:auto;-webkit-user-drag:auto">' + roomID + '</strong></div><br><button onclick="sendDeleteForce();">' + langjson.cancel + '</button>&nbsp;<button onclick="sendFirstReload();">' + langjson.reload + '</button>&nbsp;<button onclick="navigator.clipboard.writeText(roomID);">' + langjson.copy + '</button></p>';
	sendFirstLoad();
})

function sendFirstReload() {
	socket.emit( 'first-load', userID_crypt );
}

socket.on('get-userid', strMessage => {
	strMessage = cryptico.decrypt(strMessage, my_decrypt).plaintext;
	userID = strMessage;
	userID_crypt = cryptico.encrypt(userID, server_encrypt).cipher;
})

socket.on('start', strMessage => {
	join = true;
	appBox.innerHTML = '<p><strong>' + langjson.waitjoin1 + '</strong><br><br><div style="font-size:150%">' + langjson.waitjoin2 + '</div><div style="font-size:150%"><strong>' + langjson.nowloading + '</strong></div></p>';
})

socket.on('join', strMessage => {
	join = true;
	encrypt_key = strMessage;
	viewChat();
	loopfunc();
})

socket.on('first-load', strMessage => {
	if (strMessage.substr( 0, 1 ) == "1") { location.href = "sh1rga://notifi/joinUser";
		yjoin = true;
		encrypt_key = strMessage.substr( 1 );
		viewChat();
		loopfunc();
	}
})

socket.on('load', strMessage => {
	if (getMess != strMessage && join == true) {
		getMess = strMessage;
		if (getMess.length != 0) { location.href = "sh1rga://notifi/getNewMessage";
			getMessDec = cryptico.decrypt(getMess, my_decrypt).plaintext;
			getMessDec = utf8_hex_string_to_string(getMessDec);
            if (enableMuteWord == true) {
                var gMA = getMessDec;
                var gMB = gMA.replace(muteWord, '[MUTE]');
                while(gMB !== gMA) {
                    gMA = gMA.replace(muteWord, '[MUTE]');
                    gMB = gMB.replace(muteWord, '[MUTE]');
                }
                getMessDec = gMB;
            }
			$('#get-message-area').val(getMessDec);
		}
	}
})
var muteWord = "";
var enableMuteWord = false;

socket.on('cryptload', strMessage => {
	if (server_encrypt != strMessage) {
		server_encrypt = strMessage;
		if (join == true) {
			userID_crypt = cryptico.encrypt(userID, server_encrypt);
            console.log(userID_crypt)
		}
	}
})

//success
socket.on('send-success', strMessage => {
if (serverErrorFlag == false && langErrorFlag == false && latestError == "" && nowErrorView == "") {
	document.getElementById('msg').innerHTML = '<div class="goodmsg" id="msgbox">' + langjson.sent + '</div>';
	window.setTimeout("if (nowErrorView == '') { msgMove(); }", 3000);
}
})

socket.on('delete-success', strMessage => {
	appBox.innerHTML = '<p>' + langjson.deleted + '</p><br><button onclick="Disconnect();">' + langjson.ok + '</button>';
})

//error

socket.on('start-error', strMessage => {
	appBox.innerHTML = '<p>' + langjson.starterror1 + '<br>' + langjson.starterror2 + '</p><br><button onclick="Disconnect();">' + langjson.ok + '</button>';
})

socket.on('join-error', strMessage => {
	appBox.innerHTML = '<p>' + langjson.joinerror + '</p><br><button onclick="Disconnect();">' + langjson.ok + '</button>';
})

socket.on('join-notfound', strMessage => {
	join = false;
	appBox.innerHTML = '<p>' + langjson.joinrnf + '</p><br><button onclick="Disconnect();">' + langjson.ok + '</button>';
})

socket.on('joined', strMessage => {
	appBox.innerHTML = '<p>' + langjson.joined1 + '<br>' + langjson.joined2 + '</p><br><button onclick="Disconnect();">' + langjson.ok + '</button>';
})

socket.on('load-error', strMessage => {
if (serverErrorFlag == false && langErrorFlag == false && latestError == "" && nowErrorView == "") {
	document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">' + langjson.reloadfail + '</div>';
	window.setTimeout("if (nowErrorView == '') { msgMove(); }", 3000);
}
})

socket.on('send-error', strMessage => {
if (serverErrorFlag == false && langErrorFlag == false && latestError == "" && nowErrorView == "") {
	document.getElementById('msg').innerHTML = '<div class="msg" id="msgbox">' + langjson.sendfail + '</div>';
	window.setTimeout("if (nowErrorView == '') { msgMove(); }", 5000);
}
})

socket.on('delete-error', strMessage => {
	appBox.innerHTML = '<p>' + langjson.deletefail + '</p><br><button onclick="sendDeleteForce();">' + langjson.retry + '</button>&nbsp;<button onclick="Disconnect();">' + langjson.ok + '</button>';
})

function sendDeleteForce() {
	join = false;
	socket.emit( 'delete', userID_crypt );
}

socket.on('roomNotFound', strMessage => {
	join = false;
	appBox.innerHTML = '<p>' + langjson.roomnotfound1 + '<br>' + langjson.roomnotfound2 + '</p><br><button onclick="Disconnect();">' + langjson.ok + '</button>';
})

socket.on('serverIsDown', strMessage => {
	eraser();
	appBox.innerHTML = '' + langjson.serverdown1 + '<br>' + langjson.serverdown2 + '<br>' + strMessage;
})

socket.on('roomFlagged', strMessage => {
	join = false;
	appBox.innerHTML = '<p>' + langjson.roomflagged1 + '<br>' + langjson.roomflagged2 + '</p><br><button onclick="Disconnect();">' + langjson.ok + '</button>';
    if (accountID != "") {
        socket.emit( 'flagIDSend', accountID );
    }
})

function Disconnect() {
	if (join == true) {
		sendDeleteForce();
	}else{
		eraser();
		startView();
	}
}

function eraser() {
	my_encrypt = "";
	my_decrypt = "";
	encrypt_key = "";
	roomID = 240000000000;
	userID = 240000000000;
	userID_crypt = "";
	join = false;
	yjoin = false;
	deletePress = 0;
	inputText = "";
	getMess = "";
	getMessDec = "";
	ThisIsStart = false;
	exporting = false;
	exportPass = "";
	exported = "";
	if (nowErrorView == "deletecheck") {
		nowErrorView = "";
		msgMove();		
	}
}

function Button() {
	if (join == false) {
		if ($( '#input' ).val().length == 12) {
			sendJoin();
			$( '#input' ).val( '' );
		}
	}else{
		if ($( '#input' ).val().length != 0) {
			sendSend();
		}
	}
}

document.body.addEventListener('keydown', event => {
    if (yjoin == true && ((event.key === 'Enter' || event.key === 'Return') && (event.ctrlKey || event.metaKey))) {
		sendSend();
    }
});

window.onbeforeunload = function(e) {if (join == true) {return "";}}
