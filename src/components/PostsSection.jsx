import { useEffect, useState } from "react";
import { db } from "../firebase"; // Import your Firestore configuration
import { collection, getDocs, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import Post from "./Post";
import { Link } from "react-router-dom";

const PostsSection = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts"); // Reference to the posts collection
        const postsSnapshot = await getDocs(postsCollection); // Fetch the posts
        const postsList = [];

        // Loop through posts and fetch the latest username and comments
        for (const postDoc of postsSnapshot.docs) {
          const postData = postDoc.data();

          // Fetch the latest username from the "users" collection
          const userDocRef = doc(db, "users", postData.userId); // Assuming the post contains a userId field
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Store comments in a state variable
            const comments = postData.comments || []; // Initialize comments as an empty array if not present

            postsList.push({
              id: postDoc.id,
              username: userData.username, // Use the up-to-date username
              comments, // Store comments array in the post data
              commentsCount: comments.length, // Calculate the number of comments
              ...postData, // Include the rest of the post data
            });
          } else {
            console.error("User not found for post:", postDoc.id);
          }
        }

        setPosts(postsList); // Set the posts in state
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return <p>Loading posts...</p>; // Show loading message
  }

  return (
    <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {posts.map((post) => (
        <Link key={post.id} to={`/post/${post.id}`}>
          <Post
            key={post.id} // Use the document ID as the key
            profilePic={post.profilePicture} // Use profilePicture field
            username={post.username} // Use up-to-date username
            createdAt={post.createdAt} // Assuming createdAt is a field in your Firestore document
            caption={post.caption} // Assuming caption is a field in your Firestore document
            content={post.content} // Assuming content is a field in your Firestore document
            commentsCount={post.commentsCount} // Pass the calculated commentsCount to Post component
          />
        </Link>
      ))}
    </div>
  );
};

export default PostsSection;
