function getUserinfo() { // 获取用户信息
        $.ajax({
            url: '/my/userinfo',
            success: res => {
                if (res.status === 0) {
                    renderAvatar(res.data)
                }
            } 
        })
}
// -------------------------渲染头像----------------------
function renderAvatar(data) { // 判断用户是否设置头像和昵称,没有就渲染文字头像和用户名
userName =data.nickname || data.username
$('span.username').html(userName)
if (data.user_pic) {
    $('.layui-nav-img').prop('src',data.user_pic).show()
} else {
    $('.text-avatar').html(userName[0].toUpperCase()).css('display','inline-block')
}
}
$(function () {
    getUserinfo()
    // --------------------注销功能--------------------
    $('#logout').on('click', function () {
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            // 删除token
            localStorage.removeItem('token')
            // 跳转到index页面
            location.href = 'login.html'
            layer.close(index);
          });
        
    })
})