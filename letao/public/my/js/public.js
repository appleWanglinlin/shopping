/**
 * Created by username on 2018/10/25.
 */
$(function(){
    //mui�������ֹ��a��ǩ����ת������Ҫ�ָ���ת
    $('body').on('tap','a',function(){
        mui.openWindow({
            url:$(this).attr('href')
        });
    });
});