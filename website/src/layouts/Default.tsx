import { ReactNode } from 'react';
import Header from '../components/Header';

type LayoutProps = { children: ReactNode };

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />

      <hr className="border-gray-300" />

      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
