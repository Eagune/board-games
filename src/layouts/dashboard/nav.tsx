import { useState } from 'react';
import { Menu, MenuProps } from 'antd';


export default function Nav() {
    const [collapsed] = useState(false);

    const menuList: MenuProps['items']  = [{
        label: '游戏列表',
        key: 'game-list',
    }, {
        label: '运营数据',
        key: 'operate-data',
        children: [
            {
                label: '游戏流量',
                key: 'game-traffic',
            },
            {
                label: '用户反馈',
                key: 'user-feedback',
            }
        ]
    }];

    return (
        <div className="flex-shrink-0">
            <Menu
                mode='inline'
                className="h-full !border-none"
                items={menuList}
                inlineCollapsed={collapsed}
            />
        </div>
    )
}
