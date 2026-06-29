import Layout from './components/layout/Layout';
import PHM001 from './pages/phm/PHM001';

export default function App() {
    return (
        <Layout activeMenu="PHM_001" loginUser="김은경">
            <PHM001 />
        </Layout>
    );
}
