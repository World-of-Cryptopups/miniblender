import WaxAuthProvider from '@cryptopuppie/next-waxauth';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ATOMICASSETS_ENDPOINT, CHAIN_ID, ENDPOINT } from '../lib/config';

import { UseAtomicAssetsProvider } from '@cryptopuppie/useatomicassets';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/tailwind.css';

export default function CryptoPups({ Component, pageProps }: AppProps) {
  return (
    <WaxAuthProvider net={{ endpoint: ENDPOINT, chainId: CHAIN_ID, dApp: 'miniblender' }}>
      <UseAtomicAssetsProvider endpoint={ATOMICASSETS_ENDPOINT}>
        <Component {...pageProps} />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnHover
          theme="colored"
        />
      </UseAtomicAssetsProvider>
    </WaxAuthProvider>
  );
}
