import { Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Punks from "./views/punks";
import Punk from "./views/punk";
import MainLayout from "./layouts/main";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/punks" element={<Punks />} exact />
        <Route path="/punk/:tokenId" element={<Punk />} exact />
      </Routes>
    </MainLayout>
  );
}

export default App;
