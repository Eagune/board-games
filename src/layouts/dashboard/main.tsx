import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export default function Main() {
    return (
        <Content className='bg-white ml-5 p-5 overflow-hidden'>
            <Outlet />
        </Content>
    )
}
