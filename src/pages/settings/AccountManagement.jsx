import { useState } from 'react';

const AccountManagement = () => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDeleteAccount = () => {
    // Simulating account deletion
    console.log('Account deleted');
    setShowConfirmDelete(false);
    // Here you would typically send a request to delete the account
  };

  const handleConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className="mb-8 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-semibold text-xl mb-4">Account Management</h2>
      
      {/* Delete Account Section */}
      {!showConfirmDelete ? (
        <div>
          <button
            onClick={handleConfirmDelete}
            className="text-red-500 underline mb-2"
          >
            Delete Account
          </button>
          <p className="text-gray-600">View your activity history</p>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-red-600 mb-2">Are you sure you want to delete your account? This action cannot be undone.</p>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white rounded-lg px-4 py-2 mr-2"
          >
            Yes, Delete
          </button>
          <button
            onClick={handleCancelDelete}
            className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
