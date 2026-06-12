import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Join from "./pages/Join";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/join/:room" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;