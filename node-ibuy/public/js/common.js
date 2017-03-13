/**
* app Module
*
* Description
*/
var app = angular.module('app', []);

/**
**
** 列表页面
**
**
**/
app.controller('list', ['$scope','$http','$window','$location', function($scope,$http,$window,$location){

	// 请求数据
	var url = "/getList", 
		method = "get", 
		params = {};
	$http({ 
		url:url,
		method:method,
		params:params,
		timeout:3000
	}) 
	.success(function(data){
		if(data.code){
			$scope.buy = data.data;
		}else{
			$.alert(data.msg);
		}
	}).error(function(){
		$.alert('加载超时',function(){
			$window.location.href = $window.location.href;
		});
    });

	// 跳转到详情页
	$scope.goDetail = function(tid,type){
		$window.location.href = '/detail?type='+type+'&tid='+tid;
	};

}]);

/**
**
** 我的列表
**
**
**/
app.controller('myList', ['$scope','$http','$window','$location', function($scope,$http,$window,$location){

	var hash = $location.absUrl().split("?")[1].split("&"),
		type = hash[0].split("=")[1],
		token = hash[1].split("=")[1];

	// 请求数据
	var url = "/getMyList", 
		method = "get", 
		params = {
			type:type,
			token:token
		};
	$http({ 
		url:url,
		method:method,
		params:params,
		timeout:3000
	}) 
	.success(function(data){
		if(data.code){
			$scope.list = data.data;
			console.log($scope.list);
		}else{
			$.alert(data.msg);
		}
	}).error(function(){
		$.alert('加载超时',function(){
			$window.location.href = $window.location.href;
		});
    });

	// 跳转到详情页
	$scope.goDetail = function(tid,type){
		$window.location.href = '/detail?type='+type+'&tid='+tid;
	};

}]);

/**
**
** 详情页面
**
**
**/
app.controller('detail', ['$scope','$http','$window','$location', function($scope,$http,$window,$location){

	// 获取url参数
	var absUrl = $location.absUrl(),
		tid = absUrl.split("?")[1].split("&")[1].split("=")[1];

	// 请求数据
	var url = "/getDetail", 
		method = "get", 
		params = {
			tid:tid
		};
	$http({ 
		url:url,
		method:method,
		params:params,
		timeout:3000
	}) 
	.success(function(data){
		$.showPreloader("加载中");
		if(data.code){
			$scope.detail = data.data;
			$.hidePreloader();
		}else{
			$.alert(data.msg);
		}
	}).error(function(){
		$.alert('加载超时',function(){
			$window.location.href = $window.location.href;
		});
    });

}]);

/**
**
** 发布信息页面
**
**
**/
app.controller('issue', ['$scope','$http','$window', function($scope,$http,$window){

	// 获取日期
	$scope.today = new Date();

	// 发布信息按钮
	$scope.saveIssue = function(){

		if(!$scope.issueForm.$invalid){
			
			// 获取类型
			$scope.type = document.querySelector("#type").value;
			// 获取地区
			$scope.location = document.querySelector("#location").value;
			// 获取单位
			$scope.unit = document.querySelector("#unit").value;
			// 获取时间
			$scope.date = document.querySelector("#date").value;
			// 获取tid
			$scope.tid = document.querySelector("#tid").value;

			// 请求数据
			var url = "/saveIssue", 
				method = "post", 
				data = {
					tid:$scope.tid,
					creatDate:$scope.date,
					type:$scope.type,
					title:$scope.title,
					location:$scope.location,
					price:$scope.price,
					unit:$scope.unit,
					demand:$scope.demand,
					contact:$scope.contact,
					mobilePhone:$scope.mobilePhone,
					detail:$scope.detail,
					token:getCookie("token")
				};
			$http({ 
				url:url,
				method:method,
				data:data,
				timeout:3000
			}) 
			.success(function(data){
				if(data.code){
					$.alert(data.msg,'提示信息',function(){
						$window.location.href = "/list";
					});
				}else{
					$.alert(data.msg);
				}
			}).error(function(){
				$.alert(data.msg,'加载超时',function(){
					$window.location.href = $window.location.href;
				});
            });
		}
	};
}]);

/**
**
** 个人中心
**
**
**/
app.controller('user', ['$scope','$http','$window', function($scope,$http,$window){

	$scope.token = getCookie("token");

	// 点击进入修改资料页面
	$scope.goEdit = function(){
		$window.location.href = "/edit";
	};

	// 点击跳转到供应列表
	$scope.mySupply = function(){
		$window.location.href = "/myList?type=1&token="+$scope.token;
	};

	// 点击跳转到求购列表
	$scope.myBuy = function(){
		$window.location.href = "/myList?type=2&token="+$scope.token;
	};

	// 点击登录
	$scope.goLogin = function(){
		$window.location.href = "/login";
	};

	// 点击注册
	$scope.goRegister = function(){
		$window.location.href = "/register";
	};

	// 点击关于我们
	$scope.goAbout = function(){
		$window.location.href = "/about";
	};

	// 退出登录按钮
	$scope.logOut = function(token){
		$.confirm("确定退出账号？",'提示信息',function(){
			document.cookie="token=";
			$window.location.href = $window.location.href;
		});
	};

}]);


/**
**
** 修改资料
**
**
**/
app.controller('edit', ['$scope','$http','$window', function($scope,$http,$window){

	// 点击修改资料按钮
	$scope.editUser = function(token){

		// 请求数据
		var url = "/editUser", 
			method = "post", 
			data = {
				userName:$scope.userName,
				password:$scope.password,
				mobilePhone:$scope.mobilePhone || "",
				adress:$scope.adress || "",
				token:getCookie("token")
			};
		$http({ 
			url:url,
			method:method,
			data:data,
			timeout:3000
		}) 
		.success(function(data){
			if(data.code){
				$.alert(data.msg,'提示信息',function(){
					$window.location.href = "/user";
				});
			}else{
				$.alert(data.msg);
			}
		}).error(function(){
			$.alert(data.msg,'加载超时',function(){
				$window.location.href = $window.location.href;
			});
        });

	};

}]);


/**
**
** 登录
**
**
**/
app.controller('login', ['$scope','$http','$window', function($scope,$http,$window){

	// 跳转注册
	$scope.goRegister = function(){
		$window.location.href = "/register";
	};

	// 点击登录按钮
	$scope.toLogin = function(){
		// 请求数据
		var url = "/toLogin", 
			method = "post", 
			data = {
				userName:$scope.userName,
				password:$scope.password
			};
		$http({ 
			url:url,
			method:method,
			data:data
		}) 
		.success(function(data){
			if(data.code){
				$.alert(data.msg,'提示信息',function(){
					if(data.token){
						document.cookie="token="+data.token;
					}
					$window.location.href = "/list";
				});
			}else{
				$.alert(data.msg,'提示信息');
			}
		}).error(function(){
			$.alert(data.msg,'加载超时',function(){
				$window.location.href = $window.location.href;
			});
        });
	};

}]);

/**
**
** 注册
**
**
**/
app.controller('register', ['$scope','$http','$window', function($scope,$http,$window){

	// 跳转登录
	$scope.goLogin = function(){
		$window.location.href = "/login";
	};

	// 点击注册按钮
	$scope.toRegister = function(){
		// 请求数据
		var url = "/toRegister", 
			method = "post", 
			data = {
				userName:$scope.userName,
				password:$scope.password,
				passwordRepeat:$scope.passwordRepeat
			};
		$http({ 
			url:url,
			method:method,
			data:data
		}) 
		.success(function(data){
			if(data.code){
				$.alert(data.msg,'提示信息',function(){
					if(data.token){
						document.cookie="token="+data.token;
					}
					$window.location.href = "/list";
				});
			}else{
				$.alert(data.msg,'提示信息');
			}
		}).error(function(){
			$.alert(data.msg,'加载超时',function(){
				$window.location.href = $window.location.href;
			});
        });
	};

}]);


// 获取cookie
function getCookie(name){
	var arr,
		reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	}
}