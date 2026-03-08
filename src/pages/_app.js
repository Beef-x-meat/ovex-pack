import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { ToastProvider } from '@/components/Toast';
import CookieBanner from '@/components/CookieBanner';

export default function App({ Component, pageProps }) {
  return (
    <ToastProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <CookieBanner />
    </ToastProvider>
  );
}
