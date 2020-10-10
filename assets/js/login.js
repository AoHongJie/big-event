$(function () {
    // ----------------------切换表单功能------------------------
    $('.link_register a').on('click', function () {
        $('.login-box').hide()
        $('.register-box').show()
    })

    $('.link_login a').on('click', function () {
        $('.register-box').hide()
        $('.login-box').show()
    })

    // -----------------------登录功能------------------------
    $('.login-box form').on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data,
            success: res => {
                if (res.status === 0) {
                    location.href = 'index.html'
                } else {
                    layer.msg('用户名或密码错误');
                }
            }
        })
        this.reset()
    })

    // --------------------------注册功能--------------------------------
    $('.register-box form').on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data,
            success: res => {
                layer.msg(res.message)
                if (res.status === 0) {
                    $('.register-box').hide()
                    $('.login-box').show() 
                }
            }
        })
        this.reset()
    })
})