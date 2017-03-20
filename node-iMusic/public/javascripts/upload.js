/**
* app Module
*
* Description
*/
var app = angular.module('app', []);

app.controller('upload', ['$scope','$http','$location', function($scope,$http,$location){

	// 歌手照片上传
	$scope.singerUpload = function(img){
		// 获取form元素
		var formData = new FormData(document.getElementById("singerForm"));

		// 发送请求
		var url = "/uploadSinger",
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
				$.alert('上传成功', '提示信息');
				$scope.singerUrl = data.url;
			}else{
				$.alert(data.msg, '提示信息');
			}
		})
		.error(function(){
			$.alert("error", '提示信息');
		});

	};

	// 歌曲上传
	$scope.songUpload = function(img){
		// 获取form元素
		var formData = new FormData(document.getElementById("songForm"));

		// 发送请求
		var url = "/uploadSong",
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
				$.alert('上传成功', '提示信息');
				$scope.songUrl = data.url;
			}else{
				$.alert(data.msg, '提示信息');
			}
		})
		.error(function(){
			$.alert("error", '提示信息');
		});

	};

	// 上传歌曲
	$scope.uploadMusic = function(){
		
		// 获取类型
		var songName = $scope.songName,
			singerName = $scope.singerName,
			musicType = angular.element(document.getElementById("musicType"))[0].selectedIndex+1,
			singerUrl = $scope.singerUrl,
			songUrl = $scope.songUrl;

		// 验证表单
		if(songName && singerName && musicType && singerUrl && songUrl){

			console.log(songName);
			console.log(singerName);
			console.log(musicType);
			console.log(singerUrl);
			console.log(songUrl);

			// 保存歌曲
			var url = "/saveSong",
				method = "post",
				data = {
					songName:songName,
					singerName:singerName,
					musicType:musicType,
					singerUrl:singerUrl,
					songUrl:songUrl
				};
			$http({
				url:url,
				method:method,
				data:data,
			})
			.success(function(data){
				if(data.code){
					$.alert('上传成功', '提示信息',function(){
						$scope.songUrl = data.url;
						window.location.href = window.location.href;
					});
				}else{
					$.alert(data.msg, '提示信息');
				}
			})
			.error(function(){
				$.alert("error", '提示信息');
			});
		}else if(!$scope.songName){
			$.alert('歌曲名称不能为空', '提示信息');
		}else if(!$scope.singerName){
			$.alert('歌手不能为空', '提示信息');
		}else if(!musicType){
			$.alert('歌曲类型不能为空', '提示信息');
		}else if(!$scope.singerUrl){
			$.alert('请上传歌手图片', '提示信息');
		}else if(!$scope.songUrl){
			$.alert('请上传歌曲', '提示信息');
		}

	};

}]);