$(function() {
    //1监听游戏规则的点击
    $(".rules").click(function() {
        $(".rule").stop().fadeIn(100);
    });
    //2监听关闭按钮的点击
    $(".close").click(function() {
        $(".rule").stop().fadeOut(100);
    });
    //监听开始游戏
    $(".start").click(function() {
        $(this).stop().fadeOut(100);
        //调用处理进度条的函数
        progressHandler();
        startWolfAnimation();
    });
    //监听重新开始按钮
    $(".restart").click(function() {
        $(".mask").stop().fadeOut(100);
        progressHandler();
        startWolfAnimation();
    });
    //定义一个处理进度条的方法
    function progressHandler() {
        $(".progress").css({
            width: 180
        });
        //开启定时器
        var timer = setInterval(function() {
            var progressWidth = $(".progress").width();
            progressWidth -= 1;
            $(".progress").css({
                width: progressWidth
            });
            if (progressWidth <= 0) {
                clearInterval(timer);
                $(".mask").stop().fadeIn(100);
                //停止灰太狼动画
                stopWolfAnimation();
            }
        }, 100);
    }
    var wolfTimer;

    function startWolfAnimation() {
        var wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'];
        var wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            { left: "100px", top: "115px" },
            { left: "20px", top: "160px" },
            { left: "190px", top: "142px" },
            { left: "105px", top: "193px" },
            { left: "19px", top: "221px" },
            { left: "202px", top: "212px" },
            { left: "120px", top: "275px" },
            { left: "30px", top: "295px" },
            { left: "209px", top: "297px" }
        ];
        //3、创建一个图片
        var $wolfImage = $("<img src='' class='wolfImage'>");
        //随机获取图片的位置
        var posIndex = Math.round(Math.random() * 8);
        //设置图片显示位置
        $wolfImage.css({
            position: "absolute",
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top
        });
        //随机获取数组类型
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        //设置图片内容
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function() {
            if (wolfIndex > wolfIndexEnd) {
                $wolfImage.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
            $wolfImage.attr("src", wolfType[wolfIndex]);
            wolfIndex++;
        }, 150);
        // $wolfImage.attr("src", wolfType[5]);
        $(".container").append($wolfImage);
        gameRules($wolfImage);
    }

    function gameRules($wolfImage) {

        $wolfImage.one("click", function() {
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            var $src = $(this).attr("src");
            var flag = $src.indexOf("h") >= 0;
            if (flag) {
                $(".score").text(parseInt($(".score").text()) + 10);
            } else {
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }

    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }

});