import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Services from "./components/Services";
import Transaction from "./components/Transaction";

const App = () => {
  return (
    <>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>
        <Services />
        <Transaction />
        <Footer />
      </div>
    </>
  );
};

export default App;
