
const AccountManagement = () => {
  const handleDeleteAccount = () => {
    console.log('Account deleted');
  };

  return (
    <div className="mb-8 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-semibold text-xl mb-4">Account Management</h2>
      <button
        onClick={handleDeleteAccount}
        className="text-red-500 underline mb-2"
      >
        Delete Account
      </button>
      <p className="text-gray-600">View your activity history</p>
    </div>
  );
};

export default AccountManagement;
