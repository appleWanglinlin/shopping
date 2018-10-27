/**
 * Created by username on 2018/10/27.
 */
$(function(){
    //��ʾ��������
    $.ajax({
        url:"/category/queryTopCategoryPaging",
        type:"get",
        data:{
            page:1,
            pageSize:10
        },
        success:function(res) {
            //console.log(res);
            var html = template("categoryFirstTpl",res);
            //console.log(html);
            $('#showCategoryFirst').html(html);
        }
    });

    //��ӷ�������
    $('#saveBtn').on('click',function(){
        var categoryName = $('#categoryName').val().trim();
        if(!categoryName) {
            alert("�������������");
            return;
        }
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            data:{
                categoryName:categoryName
            },
            success:function(res){
                //console.log(res);
                if(res.success) {
                    location.reload();
                    $('.modal-content').hide();
                }
            }
        });
    });

});