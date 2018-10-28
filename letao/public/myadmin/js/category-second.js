/**
 * Created by username on 2018/10/28.
 */
$(function(){
    var page= 1;
    var pageSize = 10;
    var total = 0;
    getData();
    function getData(){
        //显示二级分类数据
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res) {
                //console.log(res);
                var html = template("categorySecondTpl",res);
                //console.log(html);
                total = Math.ceil(res.total/pageSize);
                $('#categorySecondShow').html(html);
            }
        })
    }

    //上一页
    $("#prevBtn").on('click',function(){
        page--;
        if(page < 1) {
            page = 1;
            alert('已经是第一页了');
        }
        getData();
    });
    //下一页
    $("#nextBtn").on('click',function(){
        page++;
        if(page > total) {
            page = total;
            alert('已经是最后一页了');
        }
        getData();
    });

    //显示一级分类
    $.ajax({
        url:"/category/queryTopCategoryPaging",
        type:"get",
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){
            //console.log(res);
            var html = template("categoryFirstTpl",res);
            //console.log(html);
            $("#queryCategoryFirst").html(html);
        }
    });

    //上传图片
    var imgSrc = "";
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            //console.log(data.result.picAddr);
            imgSrc = data.result.picAddr;
            //$('.img-thumbnail').src = imgSrc;
            //console.log(imgSrc);
            //显示图片
            $('.img-thumbnail').attr('src',imgSrc);
        }
    });

    //添加二级分类
    $('#saveBtn').on('click',function(){
        var categoryId = $("[name='categoryId']").val().trim();
        var brandName = $("[name='brandName']").val().trim();
        var brandLogo = imgSrc;
        //console.log(brandLogo);
        if(categoryId == -1) {
            alert('请选择商品分类');
            return;
        }
        if(!brandName) {
            alert('请输入商品名称');
            return;
        }
        if(!brandLogo) {
            alert('请选择图片');
            return;
        }
        $.ajax({
            url:"/category/addSecondCategory",
            type:"post",
            data:{
                brandName:brandName,
                categoryId:categoryId,
                brandLogo:brandLogo
            },
            success:function(res) {
                //console.log(res);
                if(res.success) {
                    location.reload();
                }else {
                    alert('添加失败');
                }
            }
        });
    });
});