import './App.css';
import {Outlet, Route, Routes} from "react-router";
import Header from './component/Header'
import Footer from './component/Footer'
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";


const Layout = () =>{
  return(
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
  )

}

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />}></Route>
                <Route path="login" element={<LoginPage />}></Route>
                <Route path="join" element={<JoinPage />}></Route>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
