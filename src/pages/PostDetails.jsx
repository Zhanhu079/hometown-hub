import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { db } from "../firebase"; // Import your Firebase Firestore configuration
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions

const PostDetails = () => {
  const { postId } = useParams(); // Get postId from URL parameters
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format the createdAt timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to Date
    return date.toLocaleString(); // Format to locale string (you can customize this)
  };

  useEffect(() => {
    const fetchPostAndUser = async () => {
      if (!postId) {
        setError("Post ID is required.");
        setLoading(false);
        return;
      }

      try {
        const postDocRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postDocRef);

        if (postDoc.exists()) {
          const postData = postDoc.data();

          // Fetch content if exists
          if (postData.content) {
            const storage = getStorage();
            const contentRef = ref(storage, postData.content);
            postData.content = await getDownloadURL(contentRef);
          }

          setPost(postData);

          // Fetch user data using userId from the post data
          if (postData.userId) {
            const userDocRef = doc(db, "users", postData.userId); // Assuming users are stored in a "users" collection
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();

              // Check if profile picture needs to be fetched from storage
              if (userData.profilePicture) {
                const profilePicRef = ref(
                  getStorage(),
                  userData.profilePicture
                );
                userData.profilePicture = await getDownloadURL(profilePicRef);
              }

              setUser(userData);
            } else {
              setError("User not found.");
            }
          }
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        console.error("Error fetching post details: ", err);
        setError("Failed to fetch post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndUser();
  }, [postId]); // Dependency on postId

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg">Error: {error}</div>
    );
  }

  return (
    <div className="flex justify-center p-5 bg-gray-100 min-h-screen">
      {post && (
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
          <img
            className="w-full h-80 object-cover rounded-t-lg"
            src={post.content}
            alt="Post content"
          />
          <div className="p-5">
            <div className="flex items-center mb-4">
              {user && user.profilePicture && (
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src={user.profilePicture}
                  alt={`${user.username}'s profile`}
                />
              )}
              <p className="font-semibold text-gray-800">
                {user ? user.username : "Unknown User"}
              </p>
            </div>
            <p
              className="text-white font-semibold text-xs inline-block px-2 py-1 rounded-full border-2
            border-mainOrange bg-orange-500 bg-opacity-70"
            >
              {post.category}
            </p>
            <p className="font-roboto my-2 text-gray-800 text-sm">
              {post.caption}
            </p>
            <p className="text-gray-500 font-poppins text-xs mt-2">
              {formatDate(post.createdAt)}
            </p>
          </div>
          <div className="p-5">
            <h1 className="font-semibold  font-quicksand">Comments</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
