$(function() {
    $(".content_list").mCustomScrollbar();
    //监听移入移出事件
    //事件委托
    $(".content_list").delegate(".list_music", "mouseenter", function() {
        $(this).find(".list_menu").stop().fadeIn(100);
        $(this).find(".list_time a").stop().fadeIn(100);
        $(this).find(".list_time span").stop().fadeOut(100);
    });
    $(".content_list").delegate(".list_music", "mouseleave", function() {
        $(this).find(".list_menu").stop().fadeOut(100);
        $(this).find(".list_time a").stop().fadeOut(100);
        $(this).find(".list_time span").stop().fadeIn(100);
    });
    $(".content_list").delegate(".list_check", "click", function() {
        $(this).toggleClass("list_checked");
    });
    //添加子菜单播放按钮的监听
    var $musicPlay = $(".music_play");
    $(".content_list").delegate(".list_menu_play", "click", function() {
        //切换播放图标
        $(this).toggleClass("list_menu_play2");
        //复原其他的播放图标
        $(this).parents(".list_music").siblings().find(".list_menu_play").removeClass("list_menu_play2");
        if ($(this).attr("class").indexOf("list_menu_play2") != -1) {
            //当前子菜单播放按钮是播放状态
            $musicPlay.addClass("music_play2");
        } else {
            $musicPlay.removeClass("music_play2");
        }

    });
    //3.加载歌曲列表
    getPlayerList();

    function getPlayerList() {
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json",
            success: function(data) {
                var $musicList = $(".content_list ul");
                $.each(data, function(index, ele) {
                    var $item = createMusicItem(index, ele);
                    $musicList.append($item);
                })
            },
            error: function(e) {
                console.log(e);
            }
        });
    }
    // 定义一个方法创建一条音乐
    function createMusicItem(index, music) {
        var $item = $("" +
            "<li class=\"list_music\">\n" +
            "<div class=\"list_check\"><i></i></div>\n" +
            "<div class=\"list_number\">" + (index + 1) + "</div>\n" +
            "<div class=\"list_name\">" + music.name + "" +
            "     <div class=\"list_menu\">\n" +
            "          <a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>\n" +
            "          <a href=\"javascript:;\" title=\"添加\"></a>\n" +
            "          <a href=\"javascript:;\" title=\"下载\"></a>\n" +
            "          <a href=\"javascript:;\" title=\"分享\"></a>\n" +
            "     </div>\n" +
            "</div>\n" +
            "<div class=\"list_singer\">" + music.singer + "</div>\n" +
            "<div class=\"list_time\">\n" +
            "     <span>" + music.time + "</span>\n" +
            "     <a href=\"javascript:;\" title=\"删除\" class='list_menu_del'></a>\n" +
            "</div>\n" +
            "</li>");
        $item.get(0).index = index;
        $item.get(0).music = music;
        return $item;
    }
});