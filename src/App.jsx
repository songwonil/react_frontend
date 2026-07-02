import Layout from './components/layout/Layout';
import PHM001 from './pages/phm/PHM001';
import CAM030 from './pages/cam/CAM030';

function resolveRoute() {
    const path = window.location.pathname;
    if (path.includes('CAM_030')) return { page: <CAM030 />, menu: 'CAM_030' };
    return { page: <PHM001 />, menu: 'PHM_001' };
}

export default function App() {
    const { page, menu } = resolveRoute();
    return (
        <Layout activeMenu={menu} loginUser="김은경">
            {page}
        </Layout>
    );
}
