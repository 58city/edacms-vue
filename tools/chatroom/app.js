var io=require("socket.io");
var db=require("mysql");
var http=require("http");
var url=require("url");
var path=require("path");
var fs=require("fs");
// 链接数据库
var database=db.createPool({host:"localhost",user:"root",password:"123456",database:"chat",port:"3306"});
// 创建http服务
var http_server=http.createServer(function (req,res) {
	fs.readFile("www"+req.url,function(err,data){
		if(err){
			res.writeHeader("404");
			res.write(JSON.stringify(err));
		}else{
			var extname=path.parse(req.url).ext;
			if(extname==".html"){
				res.writeHeader(200, {'Content-Type' : 'text/html ; charset=utf-8'});
			}else if(extname==".js"){
				res.writeHeader(200, {'Content-Type' : 'text/javascript; charset=UTF-8'});
			}else if(extname==".css"){
				res.writeHeader(200, {'Content-Type' : 'text/css; charset=UTF-8'});
			}else if(extname==".png"){
				res.writeHeader(200, {'Content-Type' : 'image/png'});
			}else if(extname==".jpg"){
				res.writeHeader(200, {'Content-Type' : 'image/jpeg'});
			}else if(extname==".png"){
				res.writeHeader(200, {'Content-Type' : 'image/gif'});
			}
			res.write(data);
		}
		res.end();
	})
}).listen(8080);
// 创建socket服务
var socket_server=io.listen(http_server);
var sock_list=[];
/* 可以在这里缓存聊天数据 */ 
socket_server.on("connection",function(sock){
	var cur_username="";
	var cur_userid="";
	/* 可以在这里emit缓存的聊天数据给当前这个socket */ 
	sock_list.push(sock);
	// 登录
	sock.on("login",function(user,pass){
		if(!/^[a-zA-Z0-9_-]{4,16}$/.test(user)){
			sock.emit("login_ret",0,"用户名必须是4到16位（字母，数字，下划线，减号）");
			return false;
		}
		if(!/^[a-zA-Z\d_]{8,}$/.test(pass)){
			sock.emit("login_ret",0,"密码必须最少是8位（字母，数字，下划线）");
			return false;
		}
		database.query("select * from user_table where username='"+user+"'",function(err,udata){
			if(err){
				sock.emit("login_ret",0,JSON.stringify(err));
			}else if(udata.length==0){
				sock.emit("login_ret",0,"用户不存在");
			}else{
				if(pass!=udata[0].password){
					sock.emit("login_ret",0,"密码不正确");
				}else{
					database.query("update user_table set online=1 where id="+udata[0].id,function(err,data){
						if(err){
							sock.emit("login_ret",0,JSON.stringify(err));
						}else{
							cur_username=udata[0].username;
							cur_userid=udata[0].id;
							sock.emit("login_ret",1,"登录成功",cur_userid,cur_username);
						}
					});
				};
			}
		});
	});
	// 注册
	sock.on("reg",function(user,pass){
		if(!/^[a-zA-Z0-9_-]{4,16}$/.test(user)){
			sock.emit("login_ret",0,"用户名必须是4到16位（字母，数字，下划线，减号）");
			return false;
		}
		if(!/^[a-zA-Z\d_]{8,}$/.test(pass)){
			sock.emit("login_ret",0,"密码必须最少是8位（字母，数字，下划线）");
			return false;
		}
		database.query("select * from user_table where username='"+user+"'",function(err,udata){
			if(err){
				sock.emit("reg_ret",0,JSON.stringify(err));
			}else if(udata.length>0){
				sock.emit("reg_ret",0,"用户名重复");
			}else{
				database.query("insert into user_table (username,password,online) values ('"+user+"','"+pass+"',0)",function(err,data){
					if(err){
						sock.emit("reg_ret",0,JSON.stringify(err));
					}else{
						sock.emit("reg_ret",1,"注册成功");
					}
				});
			}
		});
	});
	// 接收消息
	sock.on("cur_msg",function(msg){
		if(!msg){
			sock.emit("cur_msg_ret",0,"内容不能为空");
		}else{
			// 广播消息
			sock_list.forEach(function(item){
				if(item==sock) return;
				item.emit("broad_cast_msg",cur_username,msg);
			});
			sock.emit("cur_msg_ret",1,"发送成功");
		}
	});
	// 用户离线
	sock.on("disconnect",function(){
		console.log("离线");
		// 以下判断，防止掉线后，再次刷新页面，找不到cur_userid，sql查询报错
		if(!cur_userid) return;
		database.query("update user_table set online=0 where id="+cur_userid,function(err){
			if(err) console.log(err);
			cur_username="";
			cur_userid="";
			sock_list=sock_list.filter(function(item){
				return item !=sock;
			})
		});
	})
});