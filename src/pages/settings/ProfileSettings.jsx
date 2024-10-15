import { useState } from 'react';
import { db, auth, storage } from '../../firebase'; // Import Firebase services
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadString } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

const ProfileSettings = () => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

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

  // Handle saving the profile information
  const handleSaveProfile = async () => {
    const userId = auth.currentUser?.uid; // Get the current user's ID

    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    try {
      let profilePictureUrl = null;

      // Upload the profile picture to Firebase Storage
      if (profilePicture) {
        const storageRef = ref(storage, `profilePictures/${userId}`);
        await uploadString(storageRef, profilePicture, 'data_url');
        profilePictureUrl = `profilePictures/${userId}`;
      }

      // Prepare profile data to be saved
      const profileData = {};
      if (username) profileData.username = username; // Only update if username is provided
      if (profilePictureUrl) profileData.profilePicture = profilePictureUrl; // Only update if a new profile picture is uploaded
      if (location) profileData.location = location; // Only update if location is provided
      if (bio) profileData.bio = bio; // Only update if bio is provided

      // Save the profile data to Firestore
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, profileData, { merge: true });
      toast.success('Profile saved successfully'); // Show success toast
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Error saving profile'); // Show error toast
    }
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

      {/* Bio Input */}
      <label className="block mb-2 font-semibold" htmlFor="bio">
        Bio
      </label>
      <textarea
        id="bio"
        placeholder="Tell us about yourself"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="border rounded-lg p-3 mb-4 w-full border-gray-300 focus:border-mainOrange focus:ring focus:ring-mainOrange focus:ring-opacity-50"
        rows="4"
        aria-label="Bio"
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

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ProfileSettings;
