var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('util');
var multer = require('multer');
var upload = multer({dest:'uploads/'});

var mysql = require('mysql');
var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"music"
});

connection.connect(function(err){
	if(err){
		console.log(err);
	}else{
		console.log('connection...');
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'iMusic' });
});

// getMusicList
router.get('/getMisucList', function(req, res, next) {
	var searchSql = 'SELECT * FROM list';
	connection.query(searchSql, function(err, rows, fields) {
		if (err) {
			console.log('[query] - :'+err);
			res.json({code:0,msg:"查询失败"});
			return;
		}else{
			console.log('search success!');
			res.json({code:1,data:rows});
		}
	});
});

// upload
router.get('/upload', function(req, res, next) {
	res.render('upload', { title: 'Upload iMusic' });
});

// uploadSinger
router.post('/uploadSinger',upload.single("singer"), function(req, res, next) {

	// 获取临时文件地址
	var filename = req.file.filename;
	// 获取文件名称
	var originalname = req.file.originalname;

	// 判断是否为图片
	var imgType = originalname.split(".")[1];
	if(imgType == "jpg" || imgType == "JPG" || imgType == "png" || imgType == "PNG"){
		// 读取临时文件
		fs.readFile(process.cwd() + '/uploads/' + filename , function(err,data){
			if(err){
				console.log("读取文件失败：" + err);
			}else{

				// 写入文件
				fs.writeFile(process.cwd() + '/uploads/' + originalname,data,function(err){

					if(err){
						console.log("写入文件失败" + err);
					}else{
						console.log("写入成功");
						var url = "http://" + req.headers.host + "/" + originalname;
						res.json({code:1,url:url});
					}
				});

				// 删除临时文件
				fs.unlink(process.cwd() + '/uploads/' + filename,function(){
					if(err){
						console.log("临时文件删除失败" + err);
					}else{
						console.log("临时文件删除成功");
					}
				});

			}
		});
	}else{
		// 删除临时文件
		filename = process.cwd() + '/uploads/' + filename;
		fs.unlink(filename,function(){
			if(err){
				console.log("临时文件删除失败" + err);
			}else{
				console.log("临时文件删除成功");
			}
		});
		res.json({code:0,msg:"请上传图片！"});
	}

});

// uploadSinger
router.post('/uploadSong',upload.single("song"), function(req, res, next) {

	console.log(req.file);

	// 获取临时文件地址
	var filename = req.file.filename;
	// 获取文件名称
	var originalname = req.file.originalname;

	// 判断是否为图片
	var imgType = originalname.split(".")[1];
	if(imgType == "mp3" || imgType == "MP3" || imgType == "wav" || imgType == "WAV"){
		// 读取临时文件
		fs.readFile(process.cwd() + '/uploads/' + filename , function(err,data){
			if(err){
				console.log("读取文件失败：" + err);
			}else{

				// 写入文件
				fs.writeFile(process.cwd() + '/uploads/' + originalname,data,function(err){

					if(err){
						console.log("写入文件失败" + err);
					}else{
						console.log("写入成功");
						var url = "http://" + req.headers.host + "/" + originalname;
						res.json({code:1,url:url});
					}
				});

				// 删除临时文件
				fs.unlink(process.cwd() + '/uploads/' + filename,function(){
					if(err){
						console.log("临时文件删除失败" + err);
					}else{
						console.log("临时文件删除成功");
					}
				});

			}
		});
	}else{
		// 删除临时文件
		filename = process.cwd() + '/uploads/' + filename;
		fs.unlink(filename,function(){
			if(err){
				console.log("临时文件删除失败" + err);
			}else{
				console.log("临时文件删除成功");
			}
		});
		res.json({code:0,msg:"请上传音乐文件！"});
	}

});

// saveSong
router.post('/saveSong', function(req, res, next) {

	var addSql = 'INSERT INTO list(songName,singerName,musicType,singerUrl,songUrl) VALUES(?,?,?,?,?)';
	var addSql_Params = [req.body.songName,req.body.singerName,req.body.musicType,req.body.singerUrl,req.body.songUrl];
	connection.query(addSql, addSql_Params , function(err, rows, fields) {
		if (err) {
			console.log('[query] - :'+err);
			return;
		}else{
			console.log('insert success!');
			res.json({code:1,msg:"上传成功！"});
		}
	});

});

module.exports = router;
