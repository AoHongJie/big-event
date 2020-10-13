function initArtCateList() {
    $.ajax({
        url: '/my/article/cates',
        success: res => {
            let htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
        }
    })
}
initArtCateList()
let index = null;
let form = layui.form;
$('#btnAddCate').on('click', function () {
    index = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content:$('#dialog-add').html()
    })
})

$('body').on('submit','.layui-form', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: res => {
            layer.msg(res.message)
            if (res.status === 0) {
                initArtCateList()
            }
            $('.layui-form')[0].reset()
            layer.close(index)
        }
    })
})

// ------------------删除分类功能---------------------
$('tbody').on('click', 'button:contains(删除)', function () {
    let id = $(this).attr('data-id')
    layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            url: '/my/article/deletecate/'+id,
            success: res => {
                layer.msg(res.message)
                if (res.status === 0) {
                    initArtCateList()
                }
            }
        })
        layer.close(index);
      });  
})

// ---------------------编辑--------------------

$('tbody').on('click', 'button:contains(编辑)', function () {
    index = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '修改文章分类',
        content:$('#dialog-editor').html()
    })
    $.ajax({
        url: '/my/article/cates/'+$(this).attr('data-Id'),
        success: res => {
            form.val('formArticle', res.data)
        }
    })
})

$('body').on('submit', '#dialog-edi', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: res => {
            layer.msg(res.message)
            initArtCateList()
            layer.close(index)
        }
    })
})
