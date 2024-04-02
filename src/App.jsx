import VerificationCode from "./components/VerificationCode.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Success from "./components/Success.jsx";

function App() {

  return (
    <>
        {/*<VerificationCode />*/}
        <BrowserRouter>
        <Routes>
            <Route path="/"  element={ <VerificationCode />} />
            <Route path="/success"  element={<Success />}/>
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
