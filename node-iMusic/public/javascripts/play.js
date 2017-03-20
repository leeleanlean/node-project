/**
* app Module
*
* Description
*/
var app = angular.module('app', []);

app.controller('play', ['$scope','$http','$location', function($scope,$http,$location){

    // 获取音乐列表
    $scope.getList = !function(){

        var url = "/getMisucList",
            method = "get",
            data = {};
        $http({
            url:url,
            method:method,
            data:data,
        })
        .success(function(data){

            if(data.code){

                // 获取返回的音乐列表
                $scope.musicList = data.data;

                // 随机获取一首歌
                $scope.random = Math.floor(Math.random()*$scope.musicList.length);

                // 默认播放歌曲
                $scope.musicInfo = $scope.musicList[$scope.random];

                // 设置歌名、歌手、歌手图片
                $scope.setInformation();

                // 默认播放随机音乐
                $scope.play($scope.musicInfo.songUrl);

                // 如果在微信中
                wx.config({});
                wx.ready(function() {
                    $scope.play($scope.musicInfo.songUrl);
                });

            }else{
                $.alert(data.msg, '提示信息');
            }
        })
        .error(function(){
            $.alert("error", '提示信息');
        });

    }();

    // 播放音乐
    $scope.play = function(src){

        // 获取audio元素
        var audio = document.getElementById("audio");
        audio.src = src;
        audio.play();

        // 播放速度
        audio.playbackRate = 1;

        // 创建一个定时器
        $scope.timer = null;

        // 播放状态
        audio.oncanplaythrough = function(){

            // 歌手图片进行旋转
            $(".info-img img").addClass("imgRrotate");

            // 设置总时间
            $(".times .pull-left").text($scope.setTime(audio.duration+1));

            $scope.doTimer = function(){
                // 设置当前播放时间
                $(".times .pull-right").text($scope.setTime(audio.currentTime+1));
                // 设置进度条
                $(".percent").css("width",(audio.currentTime/audio.duration*100).toFixed(4) + "%");
            };

            // 定时器
            $scope.timer = setInterval($scope.doTimer,1000);

        };

        // 播放结束方法
        audio.onended = function(){

            // 清除定时器
            clearInterval($scope.timer);

            // 顺序播放下一首
            if($scope.random >= $scope.musicList.length-1){
                $scope.random = 0;
            }else if($scope.random === 0){
                $scope.random = $scope.musicList.length-1;
            }else{
                $scope.random++;
            }
            $scope.musicInfo = $scope.musicList[$scope.random];

            // 重设歌名、歌手、歌手图片
            $scope.setInformation();

            // 播放
            $scope.play($scope.musicInfo.songUrl);

        };

    };

    // 点击播放||暂停按钮
    $scope.controlBtn = function(){

        // 判断暂停还是播放状态
        if(audio.paused){
            // 继续播放
            audio.play();
            $(".info-img img").removeClass("imgRrotatePaused");

            // 按钮设置为播放
            $(".icon-bofang1").removeClass("icon-iconfontbofang");

            // 开启定时器
            $scope.timer = setInterval($scope.doTimer,1000);
        }else{
            // 暂停播放
            audio.pause();
            $(".info-img img").addClass("imgRrotatePaused");

            // 按钮设置为暂停
            $(".icon-bofang1").addClass("icon-iconfontbofang");

            // 清除定时器
            clearInterval($scope.timer);
        }

    };

    // 下一首
    $scope.nextSong = function(){

        // 按钮设置为暂停
        $(".icon-iconfontbofang").addClass("icon-bofang1").removeClass("icon-iconfontbofang");

        // 处理当前是否为最后一首
        if($scope.random >= $scope.musicList.length-1){
            $scope.random = 0;
        }else if($scope.random === 0){
            $scope.random = $scope.musicList.length-1;
        }else{
            $scope.random = $scope.random+1;
        }
        $scope.musicInfo = $scope.musicList[$scope.random];

        // 清除定时器
        clearInterval($scope.timer);

        // 播放下一首
        $scope.play($scope.musicInfo.songUrl);

        // 设置歌名、歌手、图片
        $scope.setInformation();
    };

    // 上一首
    $scope.prevSong = function(){

        // 按钮设置为暂停
        $(".icon-iconfontbofang").addClass("icon-bofang1").removeClass("icon-iconfontbofang");

        // 处理当前是否为第一首
        if($scope.random === 0){
            $scope.random = $scope.musicList.length-1;
        }else{
            $scope.random = $scope.random-1;
        }
        $scope.musicInfo = $scope.musicList[$scope.random];

        // 清除定时器
        clearInterval($scope.timer);

        // 播放上一首
        $scope.play($scope.musicInfo.songUrl);

        // 设置歌名、歌手、图片
        $scope.setInformation();

    };

    // 设置歌名、歌手、图片
    $scope.setInformation = function(){
        $(".songName").text($scope.musicInfo.songName);
        $(".singerName").text($scope.musicInfo.singerName);
        $(".singerUrl").attr("src",$scope.musicInfo.singerUrl);
    };

    // 点击歌曲列表
    $scope.playListMusic = function(index){

        // 按钮设置为暂停
        $(".icon-iconfontbofang").addClass("icon-bofang1").removeClass("icon-iconfontbofang");

        // 播放点击的歌曲
        $scope.random = index;
        $scope.musicInfo = $scope.musicList[$scope.random];
        // 清除定时器
        clearInterval($scope.timer);
        // 播放
        $scope.play($scope.musicInfo.songUrl);
        // 设置歌名、歌手、图片
        $scope.setInformation();
    };

    // 转换为时间格式
    $scope.setTime = function(time){
        // 获取分钟和秒数
        var minuts = parseInt(time/60),
            second = parseInt(time%60);

        // 小于10个位数补0
        if(minuts<10) minuts = "0"+minuts;
        if(second<10) second = "0"+second;

        // 返回出格式化后的时间
        var totalTimes = minuts + ":" + second;
        return totalTimes;
    };

}]);