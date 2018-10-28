/**
 * Created by username on 2018/10/28.
 */
$(function(){
    //显示商品信息
    $.ajax({
        url:"/product/queryProductDetailList",
        type:"get",
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){
            console.log(res);
            var html = template('productTpl',res);
            //console.log(html);
            $('#showProduct').html(html);
        }
    });

    //获取二级分类数据
    $.ajax({
        url:"/category/querySecondCategoryPaging",
        type:"get",
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){
            //console.log(res);
            var html = template('showCategorySecondTpl',res);
            //console.log(html);
            $('#showCategorySecond').html(html);
        }
    });

    //上传图片
    var imagesArr = [];
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            //console.log(data.result);
            imagesArr.push(data.result);
        }
    });

    //添加商品
    $('#addProduct').on('click',function(){
        var proName = $.trim($("[name='proName']").val());
        var oldPrice = $.trim($("[name='oldPrice']").val());
        var price = $.trim($("[name='price']").val());
        var proDesc = $.trim($("[name='proDesc']").val());
        var size = $.trim($("[name='size']").val());
        var num = $.trim($("[name='num']").val());
        var brandId = $.trim($("[name='brandId']").val());
        $.ajax({
            url:"/product/addProduct",
            type:"post",
            data:{
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                num: num,
                brandId: brandId,
                statu: 1,
                pic: imagesArr
            },
            success:function(res) {
                //console.log(res);
                if(res.success) {
                    location.reload();
                }else {
                    alert(res.message);
                }
            }
        })
    });
});