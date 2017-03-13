var express = require('express');
var router = express.Router();

/*
** 配置数据库
**
**
**/
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"leelean"
});

/*
** 链接数据库
**
**
**/
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('connection...');
    }
});

/*
** list
**
**
**/
router.get(['/','/list'], function(req, res, next) {
    res.render('index',{title :'信息',navbar:'message'});
});
router.get('/getList', function(req, res, next) {

    // 查询数据
    var searchSql = 'SELECT * FROM list';
    connection.query(searchSql, function(err, rows, fields) {
        if (err) {
            console.log('[query] - :'+err);
            return;
        }else{
            res.json({code:1,data:rows});
        }
    });

});

// getMyList
router.get('/getMyList', function(req, res, next) {

    // 查询数据
    var searchSql = 'SELECT * from list where type=? AND token=?';
    var searchSql_Params = [req.query.type,req.query.token];
    connection.query(searchSql,searchSql_Params, function(err, rows, fields) {
        if (err) {
            console.log('[query] - :'+err);
            res.json({code:0,msg:err});
            return;
        }else{
            console.log('getMyList success!');
            res.json({code:1,data:rows});
        }
    });

});

/*
** detail
**
**
**/
router.get('/detail', function(req, res, next) {

    res.render('detail',{title :'信息',navbar:'message'});

});
router.get('/getDetail', function(req, res, next) {

    // 根据tid获取详细数据
    var searchSql = 'SELECT * from list where tid=? LIMIT 1';
    var searchSql_Params = req.query.tid;
    connection.query(searchSql,searchSql_Params, function(err, rows, fields) {
        if (err) {
            console.log('[query] - :'+err);
            res.json({code:0,msg:err});
            return;
        }else{
            console.log('search success!');
            res.json({code:1,data:rows[0]});
        }
    });

});

/*
** issue
**
**
**/
router.get('/issue', function(req, res, next) {

    if(req.cookies.token){
        res.render('issue',{title :'发布信息',navbar:'edit'});
    }else{
        res.render('login',{title :'登录',navbar:'settings'});
    }

});

/*
** user
**
**
**/
router.get('/user', function(req, res, next) {

    if(req.cookies.token){

        // 查询用户名、电话、地区
        var searchSql = 'SELECT * from user where token=? LIMIT 1';
        var searchSql_Params = req.cookies.token;
        connection.query(searchSql,searchSql_Params, function(err, rows, fields) {
            if (err) {
                console.log('[query] - :'+err);
                res.json({code:0,msg:err});
                return;
            }else{
                res.render('user',{
                            title :'个人中心',
                            navbar:'settings',
                            userName:rows[0].userName,
                            mobilePhone:rows[0].mobilePhone,
                            adress:rows[0].adress
                        });
            }
        });
    }else{
        res.render('login',{title :'登录',navbar:'settings'});
    }

});

/*
** edit
**
**
**/
router.get('/edit', function(req, res, next) {
    res.render('edit',{title :'修改资料',navbar:'settings',token:req.cookies.token});
});
router.post('/editUser', function(req, res, next) {

    // 检验用户名
    if(!req.body.userName){
        res.json({code:0,msg:"用户名不能为空"});
    }

    // 检验密码
    if(!req.body.userName){
        res.json({code:0,msg:"密码不能为空"});
    }

    // 校验通过
    if(req.body.userName && req.body.password){
        var updateSql = 'UPDATE user SET UserName = ?,password = ?,mobilePhone = ?,adress = ? WHERE token = ?';
        var updateSql_Params = [req.body.userName,req.body.password,req.body.mobilePhone,req.body.adress,req.body.token];
        connection.query(updateSql, updateSql_Params , function(err, rows, fields) {
            if (err) {
                console.log('[query] - :'+err);
                res.json({code:0,msg:err});
                return;
            }else{
                res.json({code:1,msg:"修改成功"});
            }
        });
    }else{
        res.json({code:0,msg:"表单信息有误"});
    }

});

/*
** 我的求购&供应列表
**
**
**/
router.get('/myList', function(req, res, next) {
    res.render('myList',{title :'我的列表',navbar:'message',token:req.cookies.token});
});

/*
** about
**
**
**/
router.get('/about', function(req, res, next) {

    res.render('about',{title :'关于我们',navbar:'settings'});

});

/*
** login
**
**
**/
router.get('/login', function(req, res, next) {
    res.render('login',{title :'登录',navbar:'settings'});
});
router.post('/toLogin', function(req, res, next) {
    // 如果没有用户名
    if(!req.body.userName){
        res.json({code:0,msg:"用户名不能为空"});
    }

    // 如果没有密码
    if(!req.body.password){
        res.json({code:0,msg:"密码不能为空"});
    }

    // 如果表单验证通过
    if(req.body.userName && req.body.password){

        // 查询是否有此用户
        var searchSql = 'SELECT * from user where userName=? AND password=? LIMIT 1';
        var searchSql_Params = [req.body.userName,req.body.password];
        connection.query(searchSql,searchSql_Params, function(err, rows, fields) {
            if (err) {
                console.log('[query] - :'+err);
                res.json({code:0,msg:err});
                return;
            }else{
                console.log('login search userName success!');
                if(rows.length>0){
                    console.log(rows[0].token);
                    res.json({code:1,msg:"登录成功",token:rows[0].token});
                }else{
                    res.json({code:0,msg:"用户名或密码不对"});
                }
            }
        });

    }else{
        res.json({code:0,msg:"表单信息有误"});
    }
});

/*
** register
**
**
**/
router.get('/register', function(req, res, next) {
    res.render('register',{title :'注册',navbar:'settings'});
});
router.post('/toRegister', function(req, res, next) {

    // 如果没有用户名
    if(!req.body.userName){
        res.json({code:0,msg:"用户名不能为空"});
    }

    // 如果没有密码
    if(!req.body.password){
        res.json({code:0,msg:"密码输入有误"});
    }

    // 如果两次密码不一致
    if(req.body.password !== req.body.passwordRepeat){
        res.json({code:0,msg:"两次密码输入不一致"});
    }

    // 输入信息验证通过
    if(req.body.userName && req.body.password && req.body.password === req.body.passwordRepeat){

        // 生成随机十六位字符串
        var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var token = "";
        !function(n){
            for(var i=0; i<n; i++){
                token += str.charAt(Math.floor(Math.random()*str.length));
            }
        }(22);

        // 查询用户名是否已经注册过
        var searchSql = 'SELECT * from user where userName=? LIMIT 1';
        var searchSql_Params = req.body.userName;
        connection.query(searchSql,searchSql_Params, function(err, rows, fields) {
            if (err) {
                console.log('[query] - :'+err);
                res.json({code:0,msg:err});
                return;
            }else{
                console.log('register search userName success!');
                if(rows.length>0){
                    res.json({code:0,msg:"用户名已经被注册"});
                }else{
                    // 插入数据库的user表
                    var addSql = 'INSERT INTO user(userName,password,token) VALUES(?,?,?)';
                    var addSql_Params = [req.body.userName,req.body.password,token];
                    connection.query(addSql, addSql_Params , function(err, rows, fields) {
                        if (err) {
                            console.log('[query] - :'+err);
                            return;
                        }else{
                            res.json({code:1,msg:"注册成功",token:token});
                        }
                    });
                }
            }
        });

    }else{
        res.json({code:0,msg:"表单信息有误"});
    }

});

/*
** 发布信息
**
**
**/
router.post('/saveIssue',function(req, res, next){

    // 验证信息
    if(req.body.type && req.body.location && req.body.unit && req.body.title && req.body.price && req.body.demand && req.body.contact && req.body.mobilePhone){

        var addSql = 'INSERT INTO list(tid,token,creatDate,type,title,location,price,unit,demand,contact,mobilePhone,detail) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        var addSql_Params = [req.body.tid,req.body.token,req.body.creatDate,req.body.type,req.body.title,req.body.location,req.body.price,req.body.unit,req.body.demand,req.body.contact,req.body.mobilePhone,req.body.detail];
        connection.query(addSql, addSql_Params , function(err, rows, fields) {
            if (err) {
                console.log('[query] - :'+err);
                return;
            }else{
                res.json({code:1,msg:"信息发布成功"});
            }
        });

    }else{
        if(!req.body.title){
            req.json({cods:0,msg:"标题不能为空"});
        }else if(!req.body.type){
            res.json({code:0,msg:"请选择类型"});
        }else if(!req.body.location){
            res.json({code:0,msg:"请选择地区"});
        }else if(!req.body.price){
            res.json({code:0,msg:"价格不能为空"});
        }else if(!req.body.demand){
            res.json({code:0,msg:"销售量不能为空"});
        }else if(!req.body.unit){
            res.json({code:0,msg:"请选择单位"});
        }else if(!req.body.contact){
            res.json({code:0,msg:"联系人不能为空"});
        }else if(!req.body.mobilePhone){
            res.json({code:0,msg:"联系电话不能为空"});
        }else if(!req.body.detail){
            res.json({code:0,msg:"请填写详细说明"});
        }
    }

});

/*
** 404
**
**
**/
router.get('*', function(req, res){
    res.render('404',{title:"404"});
});

module.exports = router;
