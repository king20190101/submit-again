// index --lunbo
$(function () {
    $(".imgs img:not(:first)").hide();
    var index = 0;
    var images = $(".imgs img").length;
    var timer;
    for (var i = 1; i <images+1 ; i++) {
        $(".log").append("<span>"+"</span>");
    }
    $(".log span:first").addClass("current");
    $(".log span").on("click",function(){
        index = $(this).index();
        move();
    });
    function autoplay(){
        timer = setInterval(function(){
            index++;
            if(index == images){
                index = 0;
            }
            move();
        },3000);
    }
    autoplay();
    function move(){
        $(".log span").eq(index).addClass("current").siblings().removeClass("current");
        $(".imgs img").eq(index).stop(true,true).fadeIn().siblings().stop(true,true).fadeOut();
    }
    $("#left").click(function(){
        clearInterval(timer);
        index--;
        if (index <= -1){
            index = images-1;
        }
        move();
        autoplay();
    });
    $("#right").click(function(){
        clearInterval(timer);
        index++;
        if (index == images){
            index = 0;
        }
        move();
        autoplay();
    });
    $(".imgs img,.log span").mouseover(function(){
        clearInterval(timer);
    }).mouseout(function(){
        autoplay();
    })
});

// 搜索框
window.onload = function(){
var btn012 = document.getElementById("btn012");
var sousuo = document.getElementById("sousuo");
var find = document.getElementById("find");


sousuo.onclick = function(){
    find.style.display = "block";
    find.style.display= "flex";
}

btn012.onclick = function(){
    find.style.display = "none";
}

}
//index-二级导航
