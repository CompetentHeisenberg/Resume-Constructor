import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Mpage";
import Reg from "./pages/Registration";
import Auth from "./pages/Authentification";
import Mak from "./pages/Makets";
import UsRes from "./pages/UserResumes";
import Prof from "./pages/Profile";
import Test from "./pages/ResumeEditor";
import TemplateDetail from "./pages/TemplateDetail";
import GuidePage from "./pages/GuidePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/registration" element={<Reg></Reg>}></Route>
        <Route path="/profile" element={<Prof></Prof>}></Route>
        <Route path="/auth" element={<Auth></Auth>}></Route>
        <Route path="/user_resumes" element={<UsRes></UsRes>}></Route>
        <Route path="/makets" element={<Mak></Mak>}></Route>
        <Route path="/editor" element={<Test></Test>}></Route>
        <Route path="/templates/:id" element={<TemplateDetail />} />
        <Route path="/guide" element={<GuidePage />} />
      </Routes>
    </Router>
  );
}

export default App;
