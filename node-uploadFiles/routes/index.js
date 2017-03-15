var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('util');
var multer  = require('multer');
var getDay = new Date().getFullYear() +"-"+ (new Date().getMonth()+1) + "-" +new Date().getDate();
var upload = multer({dest:'uploads/' + getDay});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Node.js 上传文件' });
});

// postFile
router.post('/postFile', upload.any(), function(req, res, next) {

	// 打印上传的所有文件
	console.log(req.files);

	var url = [];

	// 遍历上传的文件
	for(var i=0; i<req.files.length; i++){

		(function(){

			// 获取临时文件地址
			var filename = req.files[i].filename;

			// 获取文件名称
			var originalname = req.files[i].originalname;

			// 读取临时文件
			fs.readFile(process.cwd() + '/uploads/' + getDay + "/" + filename , function(err,data){
				if(err){
					console.log("读取文件失败：" + err);
				}else{

					// 写入文件
					fs.writeFile(process.cwd() + '/uploads/' + getDay + "/" + originalname,data,function(err){

						if(err){
							console.log("写入文件失败" + err);
						}else{
							console.log("写入成功");
							url.push(req.headers.host + "/" + getDay + "/" + originalname);
							// 判断返回的url和传递的文件个数是否相同
							if(url.length === req.files.length){
								res.json({code:1,url:url});
							}
						}
					});

					// 删除临时文件
					fs.unlink(process.cwd() + '/uploads/' + getDay + "/" + filename,function(){
						if(err){
							console.log("临时文件删除失败" + err);
						}else{
							console.log("临时文件删除成功");
						}
					});

				}
			});

		})(i);

	}

});

module.exports = router;