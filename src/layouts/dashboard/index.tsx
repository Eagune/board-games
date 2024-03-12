import Header from './header';
import Nav from './nav';
import Main from './main';
import BreadCrumb from './bread-crumb';
import { Layout } from 'antd';

function DashboardLayout() {
    return (
        <Layout style={{height: '100vh'}}>
            <Header />
            <BreadCrumb />
            <div className='h-full flex p-5'>
                <Nav />
                <Main />
            </div>
        </Layout>
    );
}
export default DashboardLayout;