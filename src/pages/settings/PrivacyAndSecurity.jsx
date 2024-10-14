import { useState } from 'react';

const PrivacyAndSecurity = () => {
  const [password, setPassword] = useState('');

  const handleChangePassword = () => {
    console.log('Password changed:', password);
  };

  return (
    <div className="mb-8 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-semibold text-xl mb-4">Privacy and Security</h2>
      <label className="block mb-2 font-semibold">Change Password</label>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-lg p-3 mb-4 w-full border-gray-300 focus:border-mainOrange focus:ring focus:ring-mainOrange focus:ring-opacity-50"
      />
      <button
        onClick={handleChangePassword}
        className="bg-mainOrange text-white rounded-lg px-4 py-2 w-full transition duration-200 hover:bg-opacity-90"
      >
        Change Password
      </button>
    </div>
  );
};

export default PrivacyAndSecurity;
