import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { WebsocketProvider } from "./providers/WebsocketProvider";
import { BetsCartProvider } from "./providers/BetsCartProvider";
import { NotifyProvider } from "./providers/NotifyProvider";
import { DialogProvider } from "./providers/DialogProvider";
import MatchDetail from "./pages/MatchDetail";
import HomeScreen from "./pages/HomeScreen";
import Header from "./components/ui/Header";

function App() {
  return (
    <WebsocketProvider>
      <BetsCartProvider>
        <DialogProvider>
          <NotifyProvider>
            <Header />
            <Router>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/match/:id" element={<MatchDetail />} />
              </Routes>
            </Router>
          </NotifyProvider>
        </DialogProvider>
      </BetsCartProvider>
    </WebsocketProvider>
  );
}

export default App;
