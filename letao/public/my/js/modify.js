/**
 * Created by username on 2018/10/26.
 */
//修改密码
$(function(){
    $('#modify-btn').on('click',function(){
        //alert(1)
        var oldPassword = $("[name='oldPassword']").val().trim();
        //console.log(oldPassword);
        var newPassword = $("[name='newPassword']").val().trim();
        var sure_password = $("[name='sure-password']").val().trim();
        var vCode = $("[name='vCode']").val().trim();

        if(!oldPassword) {
            mui.toast("请输入原密码");
            return;
        }
        if(!newPassword) {
            mui.toast("请输入新密码");
            return;
        }
        if(newPassword != sure_password) {
            mui.toast("两次输入密码不一样");
            return;
        }
        $.ajax({
            url:"/user/updatePassword",
            type:"post",
            data:{
                oldPassword:oldPassword,
                newPassword:newPassword,
                vCode:vCode
            },
            success:function(res) {
                console.log(res);
                if(res.success) {
                    mui.toast("修改密码成功");
                    setTimeout(function(){
                        location.href="login.html";
                    },2000)
                }
            }
        })
    });
    //获取验证码
    $('.code').on("tap",function(){
        $.ajax({
            url:"/user/vCodeForUpdatePassword",
            type:"get",
            success:function(res) {
                console.log(res.vCode);
            }
        });
    });
});