import 'react-big-calendar/lib/css/react-big-calendar.css'
import MyCalendar from "./components/MyCalendar";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
          <Routes>
            <Route path ='/' element={<Login/>} />
            <Route path ='/calendar' element={<MyCalendar/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
