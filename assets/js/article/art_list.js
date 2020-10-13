let q = { // 查询参数对象
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
}
let form = layui.form;
let laypage = layui.laypage;
template.defaults.imports.dataFormat = function(date) { // 格式化时间
    const dt = new Date(date)
  
    let y = dt.getFullYear()
    let m = padZero(dt.getMonth() + 1)
    let d = padZero(dt.getDate())
  
    let hh = padZero(dt.getHours())
    let mm = padZero(dt.getMinutes())
    let ss = padZero(dt.getSeconds())
  
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }
  
  // 定义补零的函数
  function padZero(n) {// 补零
    return n > 9 ? n : '0' + n
  }
function initTable() {
    $.ajax({
        url: '/my/article/list',
        data: q,
        success: res => {
            if (res.status === 0) {
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        }
    })
}
initTable()

// ------------------初始化文章分类------------------
function initCate() {
    $.ajax({
        url: '/my/article/cates',
        success: res => {
            let htmlStr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlStr)
            form.render()
        }
    })
}
initCate()

// ------------------筛选功能--------------------
$('#form-search').on('submit', function (e) {
    e.preventDefault()
    // 获取表单中选中项的值
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    q.cate_id = cate_id;
    q.state = state;
    initTable()
})

// ----------------------分页功能------------------------
function renderPage(total) {
    laypage.render({
        elem: 'page',
        count: total, //数据总数，从服务端得到
        limit: q.pagesize, // 每页显示几条数据
        curr: q.pagenum, // 设置默认被选中的分页
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],// 每页展示多少条
        jump: function (obj, first) {
            q.pagenum = obj.curr;
            q.pagesize = obj.limit;
            if (!first) {
                initTable()
            }
        }
      });
}

// ---------------------删除文章------------------------
$('tbody').on('click', 'button:contains(删除)', function () {
    let id = $(this).attr('data-id')
    let len = $('button:contains(删除)').length
    layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            url: '/my/article/delete/' + id,
            success: res => {
                layer.msg(res.message)
                if (res.status === 0) {
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            }
        })
        
        layer.close(index);
      });
    
})

