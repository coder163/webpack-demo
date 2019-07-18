/*
 * 引入login页面样式文件
 */

//引入公共样式
import 'common/base.css';

//引入登录页面样式
import "./login.css";

//引入easyUI
import 'common/easyui/jquery.easyui.min.js';
import 'common/easyui/themes/icon.css'

//获取验证码图片的请求
$.ajax({
    type: "get",
    url: "/api/login",
    data: ""+new Date().getTime(),
    success: function () {
        $("a>img").attr("src","/api/login")
    }
});

$(".changeImg").on("click", function () {
    let src = "/api/login?" + new Date().getTime();
    $("a>img").attr("src", src);
});

$("#login-btn").on("click", function () {
    console.log("登录请求");

    $.ajax({
        type: "POST",
        url: "/api/login",
        data: $("form:first").serialize(),
        success: function (result) {
            console.log(result.message);
            if (result.status === 0) {
                location.href = "../index/index.html";
            } else {
                $(".tips").css("display","inline-block");
                $(".tips").html(result.message);
            }

        }
    })

});

