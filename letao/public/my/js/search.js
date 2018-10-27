/**
 * Created by username on 2018/10/24.
 */
$(function(){
    //实现用户点击搜索按钮跳转到搜索结果界面
    //1.添加搜索按钮的点击事件
    //2.获取搜索框中的内容
    //3.如果用户输入信息则跳转到搜索结果页面，并带去关键字，若没有输入则阻止跳转
    $('#search-btn').on('click',function(){
        var keyword = $(this).siblings('input').val();
        //console.log(keyword);
        //去除输入中的空格
        if(keyword.trim()) {
            location.href = "search-result.html?keyword="+keyword;
            keyArr.unshift(keyword);//应该把最新的搜索记录放在数组的最前面
            //JSON.stringify,js中将数组转换成字符串的方法
            localStorage.setItem("keyArr",JSON.stringify(keyArr));
        }else {
            return;
        }
    });

    //将搜索的记录存在本地，再次搜索时，显示之前的搜索历史，通过模板引擎渲染
    //存储关键字的数组
    var keyArr = [];
    if(localStorage.getItem("keyArr")) {
        //JSON.parse，js 中将字符串转换为数组的方法
        keyArr = JSON.parse(localStorage.getItem("keyArr"));
        console.log(keyArr);
        var html = template("search-history",{keyArr:keyArr});
        $('.mui-table-view').html(html);
    }

    //清空历史记录，页面上的和本地上的
    $('.clear-history').on('click',function(){
        keyArr = [];
        $('.mui-table-view').html("");
        localStorage.removeItem("keyArr");
    });
});