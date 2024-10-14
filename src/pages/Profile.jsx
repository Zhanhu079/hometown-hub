import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [profilePicture, setProfilePicture] = useState(
    "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
  );
  const [location, setLocation] = useState("San Francisco, CA");
  const [bio, setBio] = useState(
    "This is a brief bio about the user. Here, you can include interests, hobbies, or any relevant personal information."
  );

  // Sample posts data
  const posts = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    image: 'https://images.pexels.com/photos/18936031/pexels-photo-18936031/free-photo-of-korean-bbq-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  }));

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
          <h1 className="font-bold text-3xl mb-1">{username}</h1>
          <p className="text-gray-600 mb-1">{location}</p>
          <Link to={"/settings/profile_settings"}>
            <button className="bg-mainOrange text-white rounded-lg px-4 py-2 transition duration-200 hover:bg-opacity-90">
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
        <p className="text-gray-700">Email: johndoe@example.com</p>
        <p className="text-gray-700">Phone: +123456789</p>
      </div>

      {/* Posts Section */}
      <h2 className="font-semibold text-2xl mb-4">Posts</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`} className="block">
            <img
              src={post.image}
              alt={`Post Thumbnail ${post.id}`}
              className="w-full h-52 rounded-lg object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
