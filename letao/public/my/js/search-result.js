/**
 * Created by username on 2018/10/25.
 */
//获取地址栏中的参数
//用关键字去调取搜索接口
//将搜索结果展示页面中

var keyword = getParamsByUrl(location.search, 'keyword');
//当前页
var page = 1;
//页面中的数据
var html = "";
//默认为升序,按价格
var price = 1;
//按库存排序，默认为升序
var num = 1;

var This = null;
$(function(){
    //console.log(location.search);//?后面的字符串
    //var str = "?keyword=121&age=17";
    //console.log(keyword);

    //实现上拉加载功能
    mui.init({
        pullRefresh : {
            container:".mui-content",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次,为true表示页面一加载自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                //页面上拉到底部时，还会继续调用callback方法
                //getData()函数里面的this是组件里面的，因为是有组件调用的这个方法
                callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //按照价格排序
    //1.添加价格排序的轻敲事件
    //2.在ajax中添加价格参数
    //3.初始化页面
    //    1.page为1
    //    2.清空数据
    //    3.重置上拉加载
    //4.重新加载数据
    $('#price-sort').on("tap",function(){
        //改变升序，降序
        price = price == 1 ? 2 : 1;
        //console.log(price);
        page = 1;
        html = "";
        mui('.mui-content').pullRefresh().refresh(true);
        //这个点击事件里面的this不是由组件调用的，指向的是window而不是组件
        getData();
    });

    //按照销量排序
    $('#sale-sort').on("tap",function(){
        num = num == 1 ? 2 :1;
        page = 1;
        html = "";
        mui('.mui-content').pullRefresh().refresh(true);
        getData();
    });
});

//封装获取参数的函数,参数为url地址和哪一个地址中的字段
function getParamsByUrl(url,name){
    //console.log(url.indexOf('?'));
    //console.log(url.substr(url.indexOf('?')+1));
    var params = url.substr(url.indexOf('?')+1);//keyword=121&age=17
    var paramArr = params.split('&');
    //console.log(paramArr);
    for(var i=0;i<paramArr.length;i++) {
        var current = paramArr[i].split('=');
        //console.log(current);
        if(current[0] = name) {
            return current[1];
        }
    }
}

function getData(){
    //当This为空时，把this的值给This,由于第一次是由组件去调用this的，
    //所以之后this的不为空，并且指向组件而不是window,下面的处理保证了this的指向是组件
    if(!This) {
        This = this;
    }
    $.ajax({
        url:"/product/queryProduct",
        type:"get",
        data:{
            page:page++,
            pageSize:3,
            proName:keyword,
            price:price,
            num:num
        },
        success:function(result){
            //if (result.data.length>0) {
            //    //console.log(result);
            //    //var一个变量的时候不能加等
            //    html += template("searchResultTpl",result);
            //    $('#product').html(html);
            //    This.endPullupToRefresh(false);//true表示没有更多数据了
            //}else {
            //    This.endPullupToRefresh(true);//true表示没有更多数据了
            //}

            html += template("searchResultTpl",result);
            $('#product').html(html);
            //result.data.length == 0说明没有数据也就是为true的情况
            This.endPullupToRefresh(result.data.length == 0);
        }
    });
}