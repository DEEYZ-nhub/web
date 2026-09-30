import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { CursorFx } from './components/CursorFx/CursorFx';
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';
import { Preloader } from './components/Preloader/Preloader';
import { ScrollToTop } from './components/ScrollToTop';
import { Toast } from './components/widgets/Toast';
import { ModalsContainer } from './components/modals/ModalsContainer';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/Store/ProductDetailPage';
import { StorePage } from './pages/Store/StorePage';

function App() {
  return (
    <AppProvider>
      <CartProvider>
        <Preloader />
        <CursorFx />
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/store/:productId" element={<ProductDetailPage />} />
          </Routes>
        </main>
        <Footer />
        <Toast />
        <ModalsContainer />
      </CartProvider>
    </AppProvider>
  );
}

export default App;
