import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom"; // To access URL parameters
import Post from "../components/Post";
import AnnouncementCard from "../components/AnnouncementCard";

const CategoryPostsSection = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [posts, setPosts] = useState([]); // State to hold posts
  const [announcements, setAnnouncements] = useState([]); // State to hold announcements
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch posts for the specified category
        const postsQuery = query(
          collection(db, "posts"),
          where("category", "==", id) // Assuming each post has a category field
        );
        const postsSnapshot = await getDocs(postsQuery);
        const postsList = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setPosts(postsList); // Set posts in state

        // Fetch announcements only if the id is 'announcements'
        if (id === "announcements") {
          const announcementsQuery = collection(db, "announcements");
          const announcementsSnapshot = await getDocs(announcementsQuery);
          const announcementsList = announcementsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          setAnnouncements(announcementsList); // Set announcements in state
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData(); // Call the fetch function
  }, [id]); // Depend on category ID to refetch if it changes

  if (loading) {
    return <p>Loading...</p>; // Show loading message
  }

  return (
    <div className="my-5">
      {/* Conditionally render the Posts heading */}
      {id !== "announcements" && <h2 className="text-xl font-semibold">Posts</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
        {id !== "announcements" && posts.length === 0 ? ( // Only show message if not in announcements
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              profilePic={post.profilePicture} // Use profilePicture field
              username={post.username} // Assuming username is a field in your Firestore document
              createdAt={post.createdAt} // Assuming createdAt is a field in your Firestore document
              caption={post.caption} // Assuming caption is a field in your Firestore document
              content={post.content} // Assuming content is a field in your Firestore document
            />
          ))
        )}
      </div>

      {/* Conditionally render announcements if the category is 'announcements' */}
      {id === "announcements" && (
        <>
          <h2 className="text-xl font-semibold">Announcements</h2>
          <div className="flex flex-wrap gap-5">
            {announcements.length === 0 ? (
              <p>No announcements available.</p> // Show message if there are no announcements
            ) : (
              announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  title={announcement.title} // Assuming title is a field in your Firestore document
                  description={announcement.description} // Assuming description is a field in your Firestore document
                  date={announcement.date} // Assuming date is a field in your Firestore document
                  location={announcement.location} // Assuming location is a field in your Firestore document
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPostsSection;
