/**
 * Created by username on 2018/10/25.
 */
$(function(){
    //mui框架中阻止的a标签的跳转，下面要恢复跳转
    $('body').on('tap','a',function(){
        mui.openWindow({
            url:$(this).attr('href')
        });
    });
});