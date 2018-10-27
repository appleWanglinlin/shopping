/**
 * Created by username on 2018/10/26.
 */
//保存用户信息
var userInfo = null;
    //未登录则跳转到登录页面
$.ajax({
    url:"/user/queryUserMessage",
    type:"get",
    //同步,要进入会员中心时，如果没有登录直接到登录页面的状态，没有会员中心页面一闪而过
    //因为ajax是异步的，要让它变成同步，阻止页面的加载，达到先跳转再加载
    async:false,
    success:function(res){
        console.log(res);
        if(res.error && res.error == 400) {
            //说明未登录
            location.href = "login.html";
        }
        userInfo = res;
    }
});
$(function(){
    //退出登录
    $('.exit-login').on('click',function(){
        //alert(1)
        $.ajax({
            url:"/user/logout",
            type:"get",
            success:function(res){
                //console.log(res);
                if(res.success) {
                    mui.toast("退出登录成功！");
                    setTimeout(function(){
                        location.href="index.html";
                    },2000);
                }
            }
        })
    });
    var html = template("showUserInfo",userInfo);
    //console.log(html);
    $('#userInfoBox').html(html);
});