import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";

// pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

import { useAuthContext } from "./hooks/useAuthContext";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
    const { isAuthReady, user } = useAuthContext();
    return (
        <Container>
            <div className="App">
                {isAuthReady && (
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                                path="/login"
                                element={
                                    !user ? <Login /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    !user ? <Signup /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/blogs/create"
                                element={
                                    user ? (
                                        <BlogForm />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                            <Route path="/blogs/:id" element={<Blog />} />
                        </Routes>
                    </Router>
                )}
            </div>
        </Container>
    );
}
