import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebase"; // Import `auth` if not done already
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; 

const PostDetails = () => {
  const { postId } = useParams(); // Get postId from URL parameters
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null); // State to hold post's user data
  const [currentUser, setCurrentUser] = useState(null); // State to hold current logged-in user
  const [comment, setComment] = useState(''); // State to hold new comment input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format the createdAt timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to Date
    return date.toLocaleString(); // Format to locale string (you can customize this)
  };

  // Fetch post and current user data when component mounts
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

          // Fetch post author's user data
          if (postData.userId) {
            const userDocRef = doc(db, "users", postData.userId); // Assuming users are stored in a "users" collection
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();

              // Fetch profile picture if exists
              if (userData.profilePicture) {
                const profilePicRef = ref(getStorage(), userData.profilePicture);
                userData.profilePicture = await getDownloadURL(profilePicRef);
              }

              setUser(userData);
            } else {
              setError("User not found.");
            }
          }

          // Fetch current logged-in user's data
          const currentUser = auth.currentUser;
          if (currentUser) {
            const currentUserDocRef = doc(db, "users", currentUser.uid);
            const currentUserDoc = await getDoc(currentUserDocRef);

            if (currentUserDoc.exists()) {
              setCurrentUser(currentUserDoc.data()); // Save current user's data, including username
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
  }, [postId]);

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!comment) return; // Ensure comment is not empty

    const username = currentUser?.username || "Anonymous"; // Use current user's username or fallback to "Anonymous"

    try {
      const postRef = doc(db, "posts", postId); // Reference to the post document

      // Update the post document to add a new comment to the "comments" array
      await updateDoc(postRef, {
        comments: arrayUnion({
          username, // Save the current user's username
          comment,
          createdAt: Timestamp.now(), // Save current timestamp
        }),
      });

      // Clear comment input field after submission
      setComment("");

      // Optionally, update the comments state after submission to reflect the new comment
      setPost((prevPost) => ({
        ...prevPost,
        comments: [
          ...(prevPost.comments || []), // Ensure comments array exists
          { username, comment, createdAt: Timestamp.now() },
        ],
      }));
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

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
            <h1 className="font-semibold mb-2 font-quicksand">Comments</h1>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>{comment.username}:</strong> {comment.comment}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
            {/* Comment Input */}
            <div className="mt-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-mainOrange"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-mainOrange text-white px-4 py-2 mt-2 rounded-lg w-full"
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
