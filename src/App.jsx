import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/SideBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import NewPost from "./pages/NewPost";
import NewAnnouncement from "./pages/NewAnnouncement";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import 'react-toastify/dist/ReactToastify.css';
import PostDetails from "./pages/PostDetails";

function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Changed to false for initial state

  return (
    <Routes>
      {/* If not authenticated, show SignIn or SignUp page */}
      {!isAuthenticated ? (
        <>
          {/* Default to SignIn */}
          <Route path="/*" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
        </>
      ) : (
        <Route
          path="*"
          element={
            <div className="flex h-screen">
              {/* Sidebar */}
              <div className="w-[100px]">
                <Navbar />
              </div>

              {/* Main Content */}
              <div className="flex-1 p-5">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/create" element={<NewPost />} />
                  <Route path="/new_announcement" element={<NewAnnouncement />} />
                  <Route path="/settings/*" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/notfound" element={<NotFound />} />
                  <Route path="/post/:postId" element={<PostDetails />} />
                </Routes>
              </div>
            </div>
          }
        />
      )}
    </Routes>
  );
}

export default App;
