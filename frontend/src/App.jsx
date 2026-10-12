import { useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import Toast from './components/common/Toast.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import { AppProvider } from './context/AppContext.jsx';

function AppShell() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/customize-jersey') || location.pathname.startsWith('/admin');

  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer hidden={hideFooter} />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
