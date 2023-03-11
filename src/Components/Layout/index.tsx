import Navbar from '../Navi/Navbar';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
export default Layout;
