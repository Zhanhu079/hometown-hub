import { Routes, Route } from "react-router-dom";
import Navbar from "./components/SideBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import NewPost from "./pages/NewPost";
import NewAnnouncement from "./pages/NewAnnouncement";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
