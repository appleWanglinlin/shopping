$(function(){

	var navLi = $('.navs li');

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

	//�ж��Ƿ��¼
	$.ajax({
		url:"/employee/checkRootLogin",
		type:"get",
		success:function(res) {
			//console.log(res);
			if(res.error && res.error == 400) {
				location.href = "login.html";
			}
		}
	});

	//�˳���¼
	$('#loginOut').on('click',function(){
		$.ajax({
			url:"/employee/employeeLogout",
			type:"get",
			success:function(res){
				//console.log(res);
				if(res.success) {
					location.href="login.html";
				}
			}
		});
	});
});