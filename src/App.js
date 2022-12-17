import { Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Punks from "./views/punks";
import MainLayout from "./layouts/main";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/punks" element={<Punks />} exact />
      </Routes>
    </MainLayout>
  );
}

export default App;
