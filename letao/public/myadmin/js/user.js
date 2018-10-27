/**
 * Created by username on 2018/10/27.
 */
$(function(){
    $.ajax({
        url:"/user/queryUser",
        type:"get",
        data:{
            page:1,
            pageSize:10
        },
        success:function(res) {
            //console.log(res);
            var html = template('userInfo',res);
            //console.log(html);
            $('#showUserInfo').html(html);
        }
    });

    $('#showUserInfo').on('click','#deleteBtn',function(){
        //var isDelete = $(this).data('isDelete');
        var isDelete = $(this).attr('data-isDelete');
        var id = $(this).data('id');
        //console.log(id);
        //console.log(isDelete);//isDelete是字符串，需要转换为数值型再判断
        isDelete = parseInt(isDelete)?0:1;
        $.ajax({
            url:"/user/updateUser",
            type:"post",
            data: {
                id:id,
                isDelete:isDelete
            },
            success:function(res) {
                //console.log(res);
                if(res.success) {
                    location.reload();
                }
            }
        })
    });
});
