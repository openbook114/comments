<<<<<<< HEAD
function getQueryString(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

var msgObj=document.getElementById("message");
//utf-8转换为中文，解决昵称中有中文，防止出现乱码
var username = escape(getQueryString("username"));
username = username.replace(/%26/g,'&');
username = username.replace(/%3F/g,'?');
username = username.replace(/%3D/g,'=');
username=decodeURI(username);

var userid=getQueryString("userid");

//连接websocket后端服务器
var socket = io.connect('ws://haishen-comments.daoapp.io/haishen');
//var socket= io.connect('ws://localhost:3000/haishen');
//var socket= io.connect('ws://4k.evideocloud.com/haishen');

//告诉服务器端有用户加入房间
socket.emit('join',  {userid:userid, username:username});

//监听新用户登录
socket.on('join', function(o){
	updateSysMsg(o, 'join');
});

//监听新用户登录
socket.on('leave', function(o){
	updateSysMsg(o, 'leave');
});

//监听消息发送
socket.on('message', function(obj){
	var contentDiv = '<small style="font-size:130%">'+obj.content+'</small>';
	var timeDiv = '<small style="font-size:130%">'+obj.times+'</small>';
	var usernameDiv = '<p style="font-size:130%">'+obj.username+'</p>';

	var section = document.createElement('li');
	section.innerHTML = "<div class='justify-content'>"+usernameDiv + timeDiv + contentDiv+"</div>";
	msgObj.insertBefore(section,msgObj.childNodes[2]);
});

//提交聊天消息内容
function submit_msg(){
	var content = document.getElementById("content").value;
	if(content != ''){
		var obj = {
			userid: userid,
			username: username,
			content: content
		};
		socket.emit('message', obj);
		document.getElementById("content").value = '';
	}
	return false;
}


//更新系统消息，本例中在用户加入、退出的时候调用
function updateSysMsg(o, action){
	//当前总的在线用户列表
	//var onlineUsers = o.onlineUsers;
	//当前总的在线人数
	//var onlineCount = o.onlineCount;
	//新加入用户的信息
	var user = o.user;

	var roomCount = o.roomCount;

	document.getElementById("onlinecount").innerHTML = '当前共有 '+roomCount+' 人在线';

	//如果是新加入的用户，显示最近几条信息
	if(user.username == username){
		for(var i= 0;i<o.room.length;i++){
			var contentDiv = '<small style="font-size:130%">'+o.room[i].comment+'</small>';
			var usernameDiv = '<p  style="font-size:130%">'+o.room[i].username+'</p>';
			var timeDiv = '<small style="font-size:130%">'+o.room[i].times+'</small>';

			var section = document.createElement('li');
			section.innerHTML = "<div class='justify-content'>"+usernameDiv + timeDiv + contentDiv+"</div>";
			msgObj.appendChild(section);
		}
	}
}


//通过“回车”提交信息
document.getElementById("content").onkeydown = function(e) {
	e = e || event;
	if (e.keyCode === 13) {
		submit_msg();
	}
}

=======
(function () {
	var d = document,
	w = window,
	p = parseInt,
	dd = d.documentElement,
	db = d.body,
	dc = d.compatMode == 'CSS1Compat',
	dx = dc ? dd: db,
	ec = encodeURIComponent;
	
	
	w.CHAT = {
		msgObj:d.getElementById("message"),
		screenheight:w.innerHeight ? w.innerHeight : dx.clientHeight,
		username:null,
		userid:null,
		socket:null,
		//让浏览器滚动条保持在最低部
		scrollToBottom:function(){
			w.scrollTo(0, this.msgObj.clientHeight);
		},
		//退出，本例只是一个简单的刷新
		logout:function(){
			this.socket.disconnect();
			location.reload();
		},
		//提交聊天消息内容
		submit:function(){
			var content = d.getElementById("content").value;
			if(content != ''){
				var obj = {
					userid: this.userid,
					username: this.username,
					content: content
				};
				this.socket.emit('message', obj);
				d.getElementById("content").value = '';
			}
			return false;
		},
		genUid:function(){
			return new Date().getTime()+""+Math.floor(Math.random()*899+100);
		},
		//更新系统消息，本例中在用户加入、退出的时候调用
		updateSysMsg:function(o, action){
			//当前在线用户列表
			var onlineUsers = o.onlineUsers;
			//当前在线人数
			var onlineCount = o.onlineCount;
			//新加入用户的信息
			var user = o.user;
				
			//更新在线人数
			//var userhtml = '';
			//var separator = '';
			//for(key in onlineUsers) {
		    //    if(onlineUsers.hasOwnProperty(key)){
			//		userhtml += separator+onlineUsers[key];
			//		separator = '、';
			//	}
		    //}
			//d.getElementById("onlinecount").innerHTML = '当前共有 '+onlineCount+' 人在线，在线列表：'+userhtml;
			d.getElementById("onlinecount").innerHTML = '当前共有 '+onlineCount+' 人在线';
			
			//添加系统消息
			//var html = '';
			//html += '<div class="msg-system">';
			//html += user.username;
			//html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
			//html += '</div>';
			//var section = d.createElement('section');
			//section.className = 'system J-mjrlinkWrap J-cutMsg';
			//section.innerHTML = html;
			//this.msgObj.appendChild(section);
			
			if(user.username == this.username){
				for(var i= 0;i<o.room001.length;i++){
					var contentDiv = '<small>'+o.room001[i].comment+'</small>';
					var usernameDiv = '<p>'+o.room001[i].username+'</p>';

					var section = d.createElement('li');
					section.innerHTML = "<div class='justify-content'>"+usernameDiv + contentDiv+"</div>";
					this.msgObj.appendChild(section);
				}
			}
			this.scrollToBottom();
		},
		//第一个界面用户提交用户名
		usernameSubmit:function(){
			var username = d.getElementById("username").value;
			if(username != ""){
				d.getElementById("username").value = '';
				d.getElementById("loginbox").style.display = 'none';
				d.getElementById("chatbox").style.display = 'block';
				this.init(username);
			}
			return false;
		},
		init:function(username){
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = this.genUid();
			this.username = username;
			
			//d.getElementById("showusername").innerHTML = this.username;
			////this.msgObj.style.minHeight = (this.screenheight - db.clientHeight + this.msgObj.clientHeight) + "px";
			//this.scrollToBottom();
			
			//连接websocket后端服务器
			//this.socket = io.connect('ws://newdirect-comments.daoapp.io');
			this.socket = io.connect('ws://localhost:3000');
			
			//告诉服务器端有用户登录
			this.socket.emit('login', {userid:this.userid, username:this.username});
			
			//监听新用户登录
			this.socket.on('login', function(o){
				CHAT.updateSysMsg(o, 'login');	
			});
			
			//监听用户退出
			this.socket.on('logout', function(o){
				CHAT.updateSysMsg(o, 'logout');
			});
			
			//监听消息发送
			this.socket.on('message', function(obj){
				var isme = (obj.userid == CHAT.userid) ? true : false;

				var contentDiv = '<small>'+obj.content+'</small>';
				var usernameDiv = '<p>'+obj.username+'</p>';
				
				var section = d.createElement('li');
				section.innerHTML = "<div class='justify-content'>"+usernameDiv + contentDiv+"</div>";
				//if(isme){
				//	section.className = 'user';
				//	section.innerHTML = contentDiv + usernameDiv;
				//} else {
				//	section.className = 'service';
				//	section.innerHTML = usernameDiv + contentDiv;
				//}
				CHAT.msgObj.appendChild(section);
				CHAT.scrollToBottom();	
			});

		}
	};
	//通过“回车”提交用户名
	d.getElementById("username").onkeydown = function(e) {
		e = e || event;
		if (e.keyCode === 13) {
			CHAT.usernameSubmit();
		}
	};
	//通过“回车”提交信息
	d.getElementById("content").onkeydown = function(e) {
		e = e || event;
		if (e.keyCode === 13) {
			CHAT.submit();
		}
	};
})();
>>>>>>> 195fcb2b9f6bcce7977787ce05765c7694199f3f
