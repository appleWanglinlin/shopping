/**
 * Created by username on 2018/10/21.
 */
//当dom元素加载完成之后，执行回调函数中的代码
$(function(){
    //初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //获取一级菜单分类数据
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        success:function(result) {
            //console.log(result);
            var html = template("category-first",result);
            $(".links").html(html);

            //页面一加载的默认显示---方法一
            //如果一级分类有数据的话
            //if(result.rows.length) {
            //    //默认选中第一个一级分类的数据
            //    var id = result.rows[0].id;
            //    getSecondCategory(id);
            //    //让其显示对应的样式
            //    $('.links').find('a').eq(0).addClass("active");
            //}
            //页面一加载的默认显示---方法二
            $('.links').on("click","a",function(){
            }).find("a").eq(0).trigger("click");
        }
    });

    //点击一级菜单后的样式变化
    $('.links').on("click","a",function(){
        //alert(1);
        $(this).addClass("active").siblings().removeClass("active");
        //console.log($(this).data('id'));
       var id  = $(this).data('id');
        //二级菜单分类数据，需要获取一级菜单对应的id，所以给一级菜单添加自定义属性
        getSecondCategory(id);
    });
});
function getSecondCategory(id) {
    $.ajax({
        url:"/category/querySecondCategory",
        type:"get",
        data:{
            id:id
        },
        success:function(result){
            //console.log(result);
            var html = template("category-second",result);
            //console.log(html);
            $(".brand-list").html(html);
        }
    });
}