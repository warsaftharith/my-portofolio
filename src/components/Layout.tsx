import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;