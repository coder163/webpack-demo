// 引入indexTop样式
import './indexTop.css';

//添加导航li的同一属性
$(".firstNav>ul li").attr("class", "fl");


$(".firstNav>ul>li>a").on("click", function (event) {
    $(".firstNav>ul>li>a").removeClass("action");
    $(this).addClass("action");
});