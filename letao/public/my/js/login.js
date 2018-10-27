/**
 * Created by username on 2018/10/26.
 */
$(function(){
    $('#login-btn').on('click',function(){
        //alert(1)
        var username = $('[name=username]').val();
        //console.log(username);
        var password = $('[name=password]').val();

        if(!username.trim()) {
            mui.toast('用户名不能为空');
        }
        if(!password.trim()) {
            mui.toast('密码不能为空');
        }
        $.ajax({
            url:"/user/login",
            type:"post",
            data:{
                username:username,
                password:password
            },
            beforeSend:function(){
                $('#login-btn').html("正在登录...");
            },
            success:function(res){
                if(res.success) {
                    mui.toast("用户登录成功");
                    $('#login-btn').html("登录");
                    console.log(res);
                    setTimeout(function(){
                        location.href="user.html";
                    },2000);
                }
            }
        })
    });
});
