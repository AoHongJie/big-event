let form = layui.form;
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (val) {
        if (val === $('input[name=oldPwd]').val()) {
            return '新旧密码不能相同!'
        }
    },
    rePwd: function (val) {
        if (val !== $('input[name=newPwd]').val()) {
            return '两次密码不一致!'
        }
    }
})

$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: res => {
            layer.msg(res.message)
        }
    })
})