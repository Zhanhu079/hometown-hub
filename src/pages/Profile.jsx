/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth, storage } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage"; // Importing getDownloadURL
import SkeletonLoader from "../components/SkeletonLoader";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState(""); // State for email
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the current user's ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the user ID if the user is logged in
      } else {
        setUserId(null); // No user is signed in
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch profile data and posts from Firestore
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) return; // Wait until we have the userId

      try {
        // Fetch user profile data
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username || "User"); // Default username
          setLocation(data.location || "Location not set");
          setBio(data.bio || "No bio available");
          setEmail(data.email || "No email available"); // Fetch email from user data

          // Fetch profile picture URL from Firebase Storage
          const profilePicRef = ref(storage, `profilePictures/${userId}`);
          const url = await getDownloadURL(profilePicRef);
          setProfilePicture(url); // Set the profile picture URL
        }

        // Fetch user posts
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
        const userPosts = postsSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((post) => post.userId === userId); // Filter posts by user ID

        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]); // Depend on userId to re-fetch data when it changes

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <SkeletonLoader /> {/* Show skeleton loader while loading */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center mb-6">
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
          />
        </div>
        <div className="flex-grow md:ml-6">
          <h1 className="font-bold font-poppins text-3xl mb-1">{username}</h1>
          <p className="text-gray-600 font-quicksand mb-1">{location}</p>
          <Link to={"/settings/profile_settings"}>
            <button className="bg-mainOrange font-roboto text-white rounded-lg px-4 py-2 transition duration-200 hover:bg-opacity-90">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
        <h2 className="font-semibold text-2xl mb-2">Bio</h2>
        <p className="text-gray-700">{bio}</p>
      </div>

      {/* Contact Information Section */}
      <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
        <h2 className="font-semibold text-2xl mb-2">Contact Information</h2>
        <p className="text-gray-700">Email: {email}</p> {/* Display user email */}
      </div>

      {/* Posts Section */}
      <h2 className="font-semibold text-2xl mb-4">Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-700">You have no posts</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`} className="block">
              <img
                src={post.content || post.content} // Use the correct field for the post image
                alt={`Post Thumbnail ${post.id}`}
                className="w-full h-52 rounded-lg object-cover"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
