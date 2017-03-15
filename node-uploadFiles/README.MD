## Node.js + Express + AngularJS 实现多文件上传

#### 1、创建表单
~~~
<!-- form -->
<form ng-controller="form" id="uploadFiles" name="uploadFiles">
    <div class="form-list">
        <input type="file" name="files">
    </div>
    <div class="form-list">
        <input type="file" name="files">
    </div>
    <div class="form-list">
        <button type="button" ng-click="formSubmit()">Submit</button>
    </div>
</form>
<!-- form -->
~~~

#### 2、获取form元素，点击发送post请求
>需要设置请求头为 headers : {'Content-Type': undefined}，让浏览器根据需要默认选择Content-Type

~~~
$scope.formSubmit = function(){

    // 获取form元素
    var formData = new FormData(document.getElementById("uploadFiles"));

    // 发送请求
    var url = "/postFile",
        method = "post",
        data = formData;
    $http({
        url:url,
        method:method,
        headers : {'Content-Type': undefined},
        data:data,
    })
    .success(function(data){
        if(data.code){
            alert("上传成功");
            console.log(data.url);
            window.location.href = window.location.href;
        }else{
            alert(data.msg);
            window.location.href = window.location.href;
        }
    })
    .error(function(){
        alert("error");
    });

};
~~~


#### 3、安装multer
> npm install multer --save

#### 4、添加multer模块依赖
> var multer  = require('multer');

#### 5、设置存放上传文件的临时存放位置
> var upload = multer({dest:'uploads/' + getDay});

#### 6、Node.js处理post请求

upload.single('name');     处理单文件，保存在req.file
upload.array('name',num);  处理多文件，保存在req.files
upload.any();              接受一切文件，保存在req.files

~~~
// postFile
router.post('/postFile', upload.any(), function(req, res, next) {

    // 打印上传的所有文件
    console.log(req.files);

    // 用于存放写入之后的文件地址
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
~~~

7、设置上传的静态文件直接输出到浏览器
> app.use(express.static('uploads'));

8、启动项目,上传成功之后，控制台会打印出返回的url