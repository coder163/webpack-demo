import 'common/easyui/jquery.easyui.min.js';
import 'common/easyui/themes/icon.css';
import 'common/easyui/themes/default/easyui.css';


$("#dg").datagrid({
    data: [{
            "productid": "FI-SW-01",
            "productname": "Koi"


        },
        {
            "productid": "K9-DL-01",
            "productname": "Dalmation"

        }
    ],
    columns: [
        [ /*表格的列.field需要和返回的数据中的key完全匹配*/ {
                field: "productid",
                title: "编号",
                width: 100

            },
            {
                field: "productname",
                title: "账号",
                width: 100
            }

        ]
    ],
    "fitColumns": true,
    /*自动调整列宽*/
    "pagination": true,
    /*在底部显示一个分页的工具栏*/
})