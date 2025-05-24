import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { WebsocketProvider } from "./providers/WebsocketProvider";
import { BetsCartProvider } from "./providers/BetsCartProvider";
import { NotifyProvider } from "./providers/NotifyProvider";
import { DialogProvider } from "./providers/DialogProvider";
import MatchDetail from "./pages/MatchDetail";
import HomeScreen from "./pages/HomeScreen";
import Header from "./components/ui/Header";
import UserCoupons from "./pages/UserCoupons";
import Footer from "./components/ui/Footer";

function App() {
  return (
    <WebsocketProvider>
      <BetsCartProvider>
        <DialogProvider>
          <NotifyProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/match/:id" element={<MatchDetail />} />
                <Route path="/my-coupons" element={<UserCoupons />} />
              </Routes>
              <Footer />
            </Router>
          </NotifyProvider>
        </DialogProvider>
      </BetsCartProvider>
    </WebsocketProvider>
  );
}

export default App;
