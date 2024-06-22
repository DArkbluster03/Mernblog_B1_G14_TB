import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Sigin from './pages/Sigin';
import SignUp from './pages/SignUp';
import DashBoard from './pages/DashBoard';
import Projects from './pages/Projects';

export default function App() {
  return (
    <BrowserRouter>
      
      
      <Routes>
      <Route path="/"element={<Home/>}></Route>
      <Route path="/about"element={<About/>}></Route>
      <Route path="/sign-in"element={<Sigin/>}></Route>
      <Route path="/sign-up"element={<SignUp/>}></Route>
      <Route path="/dashboard"element={<DashBoard/>}></Route>
      <Route path="/project"element={<Projects/>}></Route>
      
      </Routes>
    
    </BrowserRouter>
  );
}
