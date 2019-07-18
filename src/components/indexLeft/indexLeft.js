//引入公共样式
import 'common/base.css';

// 引入indexLeft样式文件
import './indexLeft.css';

//二级菜单公共属性
$(".secondNav>ul li").attr("class", "fl");


$('#tt').tree({
    onClick: function (node) {

        $("#center").panel({
            href: node.attributes.url
        })
    },
    data: [{
        text: '管理系统首页',
        attributes: {
            url: '/page1.2/page1.2.html'
        }

    }, {
        text: '栏目菜单设置',
        attributes: {
            url: '/page1.1/page1.1.html'
        }
    }]
});