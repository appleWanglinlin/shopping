/**
 * Created by username on 2018/10/21.
 */
//��domԪ�ؼ������֮��ִ�лص������еĴ���
$(function(){
    //��ʼ������������
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick ����ϵ����ϵ��Խ�󣬹����ٶ�Խ������������ԽС��Ĭ��ֵ0.0006
    });
    //��ȡһ���˵���������
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        success:function(result) {
            //console.log(result);
            var html = template("category-first",result);
            $(".links").html(html);

            //ҳ��һ���ص�Ĭ����ʾ---����һ
            //���һ�����������ݵĻ�
            //if(result.rows.length) {
            //    //Ĭ��ѡ�е�һ��һ�����������
            //    var id = result.rows[0].id;
            //    getSecondCategory(id);
            //    //������ʾ��Ӧ����ʽ
            //    $('.links').find('a').eq(0).addClass("active");
            //}
            //ҳ��һ���ص�Ĭ����ʾ---������
            $('.links').on("click","a",function(){
            }).find("a").eq(0).trigger("click");
        }
    });

    //���һ���˵������ʽ�仯
    $('.links').on("click","a",function(){
        //alert(1);
        $(this).addClass("active").siblings().removeClass("active");
        //console.log($(this).data('id'));
       var id  = $(this).data('id');
        //�����˵��������ݣ���Ҫ��ȡһ���˵���Ӧ��id�����Ը�һ���˵�����Զ�������
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