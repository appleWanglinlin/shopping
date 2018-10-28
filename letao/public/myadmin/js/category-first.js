/**
 * Created by username on 2018/10/27.
 */
$(function(){
    var page = 1;
    var pageSize = 10;
    var total = 0;
    function getData(){
        //显示分类数据
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res) {
                //console.log(res);
                var html = template("categoryFirstTpl",res);
                //console.log(html);
                total = Math.ceil(res.total/pageSize);
                //console.log(total);
                $('#showCategoryFirst').html(html);
            }
        });
    }
    getData();
    //添加分类数据
    $('#saveBtn').on('click',function(){
        var categoryName = $('#categoryName').val().trim();
        if(!categoryName) {
            alert("请输入分类名称");
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

    //上一页
    $("#prev").on('click',function(){
        page--;
        if(page < 1) {
            page = total;
            //console.log(page);
            alert('已经是第一页了');
        }
        getData();
    });

    //下一页
    $("#next").on('click',function(){
        page++;
        if(page > total) {
            page = total;
            //console.log(page);
            alert('已经是最后一页了');
        }
        getData();
    });
});
