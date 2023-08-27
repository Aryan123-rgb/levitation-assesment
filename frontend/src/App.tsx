import { Route,Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/SIgnup";
import FormPage from "./Pages/FormPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/form/:id" element={<FormPage/>}/>
      </Routes>
    </>
  );
}

export default App;
