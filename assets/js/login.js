$(function () {
    $('.link_register a').on('click', function () {
        $('.login-box').hide()
        $('.register-box').show()
    })

    $('.link_login a').on('click', function () {
        $('.register-box').hide()
        $('.login-box').show()
    })
})