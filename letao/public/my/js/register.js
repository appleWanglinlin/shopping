/**
 * Created by username on 2018/10/26.
 */
//实现登录功能
//1.添加点击事件
//2.获取输入的内容
//3.判断输入是否合法
//4.调用注册接口，实现注册功能
//5.返回注册状态信息
//6.成功后跳转到登录界面
$(function(){
    //获取验证码
    //1.添加点击事件
    //2.调用接口获取
    //3.在控制台输出
    var code = "";
    $('.code').on('click',function(){
        //alert(1);
        $.ajax({
            url:"/user/vCode",
            type:"get",
            success:function(result){
                console.log(result.vCode);
                code = result.vCode;
            }
        });
    });

   $('#register-btn').on('click',function(){
       //alert(1);
        var username = $('[name=username]').val();
       var mobile = $('[name=mobile]').val();
       var password = $('[name=password]').val();
       var surePassword = $('[name=sure-password]').val();
       var vCode = $('[name=vCode]').val();
       //console.log(username);
       //console.log(mobile);
       //console.log(password);
       //console.log(sure_password);
       //console.log(vCode);
       if(!username.trim()) {
           mui.toast('用户名不能为空');
           return;
       }
       if(mobile.trim().length<3) {
           mui.toast('手机号格式不正确');
           return;
       }
       if(password!=surePassword) {
           mui.toast('两次密码输入不一样');
           return;
       }
       if(vCode!=code) {
           mui.toast('验证码输入错误');
           return;
       }
       $.ajax({
           url:"/user/register",
           type:"post",
           data: {
               username:username,
               password:password,
               mobile:mobile,
               vCode:vCode
           },
           success:function(result){
               console.log(result);
               if(result.success) {
                   alert("注册成功");
                   location.href="login.html";
               }
           }
       })
   });
});