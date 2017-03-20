/**
* app Module
*
* Description
*/
var app = angular.module('app', []);

app.controller('play', ['$scope','$http', function($scope,$http){

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
                $scope.musicList = data.data;

                // 随机获取一首歌
                var random = Math.floor(Math.random()*$scope.musicList.length);
                // 默认播放歌曲
                $scope.musicInfo = $scope.musicList[random];

            }else{
                $.alert(data.msg, '提示信息');
            }
        })
        .error(function(){
            $.alert("error", '提示信息');
        });

    }();


    // 播放列表音乐
    $scope.playMusic = function(list){
        $scope.musicInfo = list;
        aaa();
    };

    // 获取audio元素
    var audio = document.getElementById("audio");

    function aaa(){
        

        // 加载完成后播放
        audio.play();

        // 获取时间
        $scope.duration = $scope.setTime(audio.duration);
        $scope.currentTime = $scope.setTime(audio.currentTime+1);

        // 添加旋转图片
        $(".info-img img").addClass("imgRrotate");


        // // 设置当前音乐的时间
        // $scope.setMusicTime = !function(){
        //     // 设置总时长
        //     $(".times .pull-left")[0].innerText = $scope.setTime(audio.duration);

        //     // 点击播放、暂停按钮
        //     $scope.bofang =  function(ev){
        //         var _this = $(this),
        //             status = angular.element(ev.target).attr("status"),
        //             ele_target = angular.element(ev.target);

        //         // 设置定时器
        //         function setTimer(){

        //             // 歌曲时间倒计时
        //             $(".times .pull-right")[0].innerText = $scope.setTime(audio.currentTime+1);

        //             // 进度条
        //             var percent = (audio.currentTime/audio.duration).toFixed(3)*100;
        //             $(".progress .percent").css("width",percent);

        //         }

        //         // 判断暂停、播放
        //         if(angular.element(ev.target).attr("status") == 1){

        //             // 清除计时器
        //             clearInterval(timer);

        //             // 暂停播放
        //             audio.pause();
        //             angular.element(ev.target).attr("status","0")

        //             // 改变为按钮
        //             ele_target.removeClass("icon-bofang1");
        //             ele_target.addClass("icon-iconfontbofang");

        //             // 暂停图片旋转
        //             $(".info-img img").addClass("imgRrotatePaused");

        //         }else{

        //             // 播放
        //             audio.play();
        //             angular.element(ev.target).attr("status","1")

        //             // 改变为按钮
        //             ele_target.addClass("icon-bofang1");
        //             ele_target.removeClass("icon-iconfontbofang");

        //             // 启动定时器
        //             timer = setInterval(setTimer,1000);

        //             // 添加旋转图片
        //             $(".info-img img").addClass("imgRrotate");

        //             // 继续旋转图片
        //             $(".info-img img").removeClass("imgRrotatePaused");

        //         }
        //     };
        // }();
    }

    // 歌曲加载完成
    audio.oncanplay = function(){
        aaa();
    };


    // 设置时间
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