import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import BackgroundCanvas from "../components/background";

export default function MainLayout() {
  return (
    <>     
      <BackgroundCanvas /> 
      <Header />
      <main>
        <Outlet /> {}
      </main>
      <Footer />
    </>
  );
}