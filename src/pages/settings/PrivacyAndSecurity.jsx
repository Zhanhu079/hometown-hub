import { useState } from 'react';

const PrivacyAndSecurity = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming the password
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages

  const handleChangePassword = () => {
    if (password === '') {
      setError('Password cannot be empty.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log('Password changed:', password);
    setSuccess('Password changed successfully!');
    setError(''); // Clear any existing error messages
    setPassword(''); // Clear password input
    setConfirmPassword(''); // Clear confirm password input
  };

  return (
    <div className="mb-8 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-semibold text-xl mb-4">Privacy and Security</h2>
      <label className="block mb-2 font-semibold" htmlFor="newPassword">
        Change Password
      </label>
      <input
        id="newPassword"
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-lg p-3 mb-4 w-full border-gray-300 focus:border-mainOrange focus:ring focus:ring-mainOrange focus:ring-opacity-50"
        aria-label="New Password"
      />
      
      {/* Confirm Password Input */}
      <label className="block mb-2 font-semibold" htmlFor="confirmPassword">
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border rounded-lg p-3 mb-4 w-full border-gray-300 focus:border-mainOrange focus:ring focus:ring-mainOrange focus:ring-opacity-50"
        aria-label="Confirm Password"
      />

      {/* Display error or success messages */}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <button
        onClick={handleChangePassword}
        className="bg-mainOrange font-roboto text-white rounded-lg px-4 py-2 w-full transition duration-200 hover:bg-opacity-90"
      >
        Change Password
      </button>
    </div>
  );
};

export default PrivacyAndSecurity;
