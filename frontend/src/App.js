
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReportPage from "./Pages/ReportPage";
import ReportUploadPage from "./Pages/ReportUploadPage";
import NavigationComponent from "./Components/NavigationComponent";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavigationComponent/>
            <Routes>
                <Route path="/" element={<ReportPage/>} />
                <Route path="/reports" element={<ReportPage/>} />
                <Route path="/reports/upload" element={<ReportUploadPage/>} />

            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
