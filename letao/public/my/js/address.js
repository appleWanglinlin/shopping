/**
 * Created by username on 2018/10/27.
 */
$(function(){
    //获取用户存储的收货地址
    var address = null;
    $.ajax({
        url:"/address/queryAddress",
        type:"get",
        success:function(res){
            console.log(res);
            address = res;
            var html = template('queryAddress',{data:res});
            $('#showInfo').html(html);
        }
    });

    //删除收货地址
    $("#showInfo").on("tap","#delBtn",function(){
        //获取id
        var id = $(this).data('id');
        //console.log(id);
        mui.confirm("确定要删除吗？",function(message){
            //console.log(message);确定1，取消0
        //var li = this.parentNode.parentNode;
            //确定删除
            if(message.index == 1) {
                $.ajax({
                    url:"/address/deleteAddress",
                    type:"post",
                    data:{
                        id:id
                    },
                    success:function(res){
                        //console.log(res);
                        if(res.success) {
                            mui.toast("删除成功");
                            location.reload();
                        }
                    }
                })
            }else {
                //取消删除
                //关闭列表滑出效果
                mui.swipeoutClose($("#li")[0]);//此处需要传dom元素
            }
        });
    });

    //编辑收货地址
    $('#showInfo').on('tap','#editBtn',function(){
        var id = $(this).data('id');
        for(var i=0;i<address.length;i++) {
            if(address[i].id == id) {
                localStorage.setItem("editAddress",JSON.stringify(address[i]));
                break;
            }
        }
        location.href="addAddress.html?isEdit=1";
    });
});