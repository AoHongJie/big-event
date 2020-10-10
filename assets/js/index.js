$(function () {
        // -------------------------渲染头像----------------------
    function getUserinfo() { // 获取用户信息
            $.ajax({
                url: '/my/userinfo',
                headers: { Authorization: localStorage.getItem('token') },
                success: res => {
                    renderAvatar(res.data)
                }
            })
    }
    function renderAvatar(data) { // 判断用户是否设置头像和昵称,没有就渲染文字头像和用户名
        userName = data.username || data.nickname
        $('span.username').html(userName)
        if (data.user_pic) {
            $('.layui-nav-img').prop('src',data.user_pic).show()
        } else {
            $('.text-avatar').html(userName[0].toUpperCase()).css('display','inline-block')
        }
    }
    getUserinfo()
})