
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReportPage from "./Pages/ReportPage";
import ReportUploadPage from "./Pages/ReportUploadPage";
import NavigationComponent from "./Components/NavigationComponent";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import {AuthProvider} from "./api/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";
import ReportConfirmationPage from "./Pages/ConfirmationPage";
import ReportClaimPage from "./Pages/reportClaimPage";
import RegisterConfirmationPage from "./Pages/RegisterConfirmationPage";



function App() {
  return (
    <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <NavigationComponent/>
                    <Routes>

                        <Route path="/" element={<ProtectedRoute><ReportPage/></ProtectedRoute>} />
                        <Route path="/reports" element={<ProtectedRoute><ReportPage/></ProtectedRoute>} />
                        <Route path="/reports/upload" element={<ProtectedRoute><ReportUploadPage/></ProtectedRoute>} />
                        <Route path="/report/confirmation/:status" element={<ProtectedRoute><ReportConfirmationPage/></ProtectedRoute>} />
                        <Route path="/report/claim/:status" element={<ProtectedRoute><ReportClaimPage/></ProtectedRoute>} />
                        <Route path="/register/confirmation" element={<RegisterConfirmationPage/>} />
                        <Route path="/register" element={<RegisterPage/>} />
                        <Route path="/login" element={<LoginPage/>} />

                    </Routes>
                </BrowserRouter>
            </AuthProvider>


    </div>
  );
}

export default App;
