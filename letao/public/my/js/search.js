/**
 * Created by username on 2018/10/24.
 */
$(function(){
    //ʵ���û����������ť��ת�������������
    //1.���������ť�ĵ���¼�
    //2.��ȡ�������е�����
    //3.����û�������Ϣ����ת���������ҳ�棬����ȥ�ؼ��֣���û����������ֹ��ת
    $('#search-btn').on('click',function(){
        var keyword = $(this).siblings('input').val();
        //console.log(keyword);
        //ȥ�������еĿո�
        if(keyword.trim()) {
            location.href = "search-result.html?keyword="+keyword;
            keyArr.unshift(keyword);//Ӧ�ð����µ�������¼�����������ǰ��
            //JSON.stringify,js�н�����ת�����ַ����ķ���
            localStorage.setItem("keyArr",JSON.stringify(keyArr));
        }else {
            return;
        }
    });

    //�������ļ�¼���ڱ��أ��ٴ�����ʱ����ʾ֮ǰ��������ʷ��ͨ��ģ��������Ⱦ
    //�洢�ؼ��ֵ�����
    var keyArr = [];
    if(localStorage.getItem("keyArr")) {
        //JSON.parse��js �н��ַ���ת��Ϊ����ķ���
        keyArr = JSON.parse(localStorage.getItem("keyArr"));
        console.log(keyArr);
        var html = template("search-history",{keyArr:keyArr});
        $('.mui-table-view').html(html);
    }

    //�����ʷ��¼��ҳ���ϵĺͱ����ϵ�
    $('.clear-history').on('click',function(){
        keyArr = [];
        $('.mui-table-view').html("");
        localStorage.removeItem("keyArr");
    });
});