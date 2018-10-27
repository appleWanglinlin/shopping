/**
 * Created by username on 2018/10/26.
 */
$(function(){
    //var address = null;
    //console.log(getParamsByUrl(location.search, 'isEdit'));
    var isEdit = Number(getParamsByUrl(location.search, 'isEdit'));
    //isEdit是字符串类型，直接放在if判断里都是true
    if(isEdit){
        //编辑操作
        //编辑收货地址，获取从address页面传过来的数据
        if(localStorage.getItem("editAddress")){
            var address = JSON.parse(localStorage.getItem("editAddress"));
            //console.log(address);
            var html = template("editAddress",address);
            $('#editForm').html(html);
            $('.mui-title').html("编辑收货地址");
        }
    }else {
        //添加操作
        var html = template("editAddress",{});
        $('#editForm').html(html);
        $('.mui-title').html("添加收货地址");
    }
    //创建picker选择器
    var picker = new mui.PopPicker({layer:3});
    //为picker选择器添加数据
    picker.setData(cityData);
    $("#selectCity").on('tap',function(){
        picker.show(function(selectItems){
            //console.log(selectItems[0].text);
            //此处不能用$(this)代替
            $("#selectCity").val(selectItems[0].text+selectItems[1].text+selectItems[2].text);
        });
    });

    //添加收货地址
    $('#sure').on("tap",function(){
        var recipients = $("[name='recipients']").val().trim();
        var postcode  = $("[name='postcode']").val().trim();
        var address   = $("[name='address']").val().trim();
        var addressDetail   = $("[name='addressDetail']").val().trim();
        //console.log(recipients);
        //console.log(postcode);
        //console.log(address);
        //console.log(addressDetail);
        //if(!recipients) {
        //    mui.toast("请输入收货人");
        //    return;
        //}
        var data = {
            recipients: recipients,
            postcode: postcode,
            address: address,
            addressDetail: addressDetail
        };
        console.log(data);
        if(isEdit) {
            var url = "/address/updateAddress";
            data.id = address.id;
        }else {
            var url = "/address/addAddress";
        }
        $.ajax({
            url:url,
            type:"post",
            data:data,
            success:function(res){
                console.log(res);
                if(res.success) {
                    if(isEdit){
                        //console.log(isEdit);
                        mui.toast("地址修改成功");
                    }else{
                        mui.toast("地址添加成功");
                    }
                    setTimeout(function(){
                        location.href="address.html";
                    },2000);
                }
            }
        })
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