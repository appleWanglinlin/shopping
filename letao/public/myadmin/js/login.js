/**
 * Created by username on 2018/10/27.
 */
$(function(){
    //判断管理员是否登录
    $.ajax({
        url:"/employee/checkRootLogin",
        type:"get",
        success:function(res) {
            //console.log(res);
            if(res.success) {
                location.href="user.html";
            }
        }
    });

    $('#loginBtn').on("click",function(){
        var username = $("[name='username']").val().trim();
        var password = $("[name='password']").val().trim();
        if(!username) {
            alert("请输入用户名");
        }
        if(!password) {
            alert("请输入密码");
        }

        $.ajax({
            url:"/employee/employeeLogin",
            type:"post",
            data:{
                username:username,
                password:password
            },
            success:function(res) {
                console.log(res);
                if(res.success) {
                    location.href = "user.html";
                }else {
                    if(res.error) {
                        alert(res.message);
                    }
                }
            }
        })
    });

});