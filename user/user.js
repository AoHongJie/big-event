$(function () {
    let form = layui.form
    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间'
            }
        }
    })
    function rendersFrom() { // 向填入数据
        $.ajax({
            url: '/my/userinfo',
                success: res => {
                    if (res.status === 0) {
                        form.val('formUserInfo', res.data)
                    }
                }
        })
    }
    rendersFrom()
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: res => {
                if (res.status === 0) {
                    layer.msg('修改成功!')
                    window.parent.getUserinfo()
                }
            }
        })
    })
    // ---------------重置功能----------------
    $('button:contains(重置)').on('click', function (e) {
        e.preventDefault()
        rendersFrom()
    })
})