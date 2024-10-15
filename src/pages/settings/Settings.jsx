import { NavLink, Route, Routes } from 'react-router-dom';
import ProfileSettings from './ProfileSettings';
import PrivacyAndSecurity from './PrivacyAndSecurity';
import AccountManagement from './AccountManagement';
import HelpAndSupport from './HelpAndSupport';
import { FaUserEdit, FaLock, FaTrashAlt, FaFlag } from 'react-icons/fa';

const mainOrange = "#E75C62";

const Settings = () => {
  return (
    <div className="flex max-w-screen-xl mx-auto p-5">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-200 pr-5">
        <h1 className="font-bold text-2xl mb-6">Settings</h1>
        <ul className="space-y-4">
          <li className="flex items-center text-lg">
            <NavLink 
              to="/settings/profile_settings" 
              className="flex items-center"
              style={({ isActive }) => ({
                color: isActive ? mainOrange : 'inherit',
                fontWeight: isActive ? 'bold' : 'normal'
              })}
            >
              <FaUserEdit className="mr-2" style={{ color: mainOrange }} />
              Profile Settings
            </NavLink>
          </li>
          <li className="flex items-center text-lg">
            <NavLink 
              to="/settings/privacy" 
              className="flex items-center"
              style={({ isActive }) => ({
                color: isActive ? mainOrange : 'inherit',
                fontWeight: isActive ? 'bold' : 'normal'
              })}
            >
              <FaLock className="mr-2" style={{ color: mainOrange }} />
              Privacy and Security
            </NavLink>
          </li>
          <li className="flex items-center text-lg">
            <NavLink 
              to="/settings/account" 
              className="flex items-center"
              style={({ isActive }) => ({
                color: isActive ? mainOrange : 'inherit',
                fontWeight: isActive ? 'bold' : 'normal'
              })}
            >
              <FaTrashAlt className="mr-2" style={{ color: mainOrange }} />
              Account Management
            </NavLink>
          </li>
          <li className="flex items-center text-lg">
            <NavLink 
              to="/settings/help" 
              className="flex items-center"
              style={({ isActive }) => ({
                color: isActive ? mainOrange : 'inherit',
                fontWeight: isActive ? 'bold' : 'normal'
              })}
            >
              <FaFlag className="mr-2" style={{ color: mainOrange }} />
              Help and Support
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Settings Area */}
      <div className="w-3/4 pl-5">
        <Routes>
          <Route path="profile_settings" element={<ProfileSettings />} />
          <Route path="privacy" element={<PrivacyAndSecurity />} />
          <Route path="account" element={<AccountManagement />} />
          <Route path="help" element={<HelpAndSupport />} />
          <Route path="*" element={<h2 className="text-lg">Select a setting to view</h2>} /> {/* Fallback route */}
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
