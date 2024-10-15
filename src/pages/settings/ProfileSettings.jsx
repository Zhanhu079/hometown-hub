import { useState } from 'react';

const ProfileSettings = () => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [location, setLocation] = useState('');

  // Handle file input and preview the image
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Store the base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', { username, profilePicture, location });
    // Here you would typically send the data to a backend or storage
  };

  return (
    <div className="mb-8 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-semibold text-xl mb-4">Profile Settings</h2>

      {/* Username Input */}
      <label className="block mb-2 font-semibold" htmlFor="username">
        Change Username
      </label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded-lg p-3 mb-4 w-full border-gray-300 focus:border-mainOrange focus:ring focus:ring-mainOrange focus:ring-opacity-50"
        aria-label="Username"
      />

      {/* Location Input */}
      <label className="block mb-2 font-semibold" htmlFor="location">
        Update Location
      </label>
      <input
        id="location"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border rounded-lg p-3 mb-4 w-full border-gray-300 focus:border-mainOrange focus:ring focus:ring-mainOrange focus:ring-opacity-50"
        aria-label="Location"
      />

      {/* Profile Picture Input */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold" htmlFor="profilePicture">
          Change Profile Picture
        </label>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="border rounded-lg p-2 w-full border-gray-300"
          aria-label="Profile Picture"
        />

        {/* Preview the selected profile picture */}
        {profilePicture && (
          <div className="mt-4">
            <img
              src={profilePicture}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          </div>
        )}
      </div>

      {/* Save Profile Button */}
      <button
        onClick={handleSaveProfile}
        className="bg-mainOrange font-roboto text-white rounded-lg px-4 py-2 w-full transition duration-200 hover:bg-opacity-90"
      >
        Save Profile
      </button>
    </div>
  );
};

export default ProfileSettings;
