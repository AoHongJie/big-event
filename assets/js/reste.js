$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    if (options.url.indexOf('/my/') !== -1) {
        options.headers= { Authorization: localStorage.getItem('token') || '' }
    }
    options.complete= xhr => {
        if (xhr.responseJSON && xhr.responseJSON.status === 1) {
            localStorage.removeItem('token')
            location.href = 'login.html'
        }
    }
})