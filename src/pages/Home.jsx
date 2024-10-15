import { useEffect, useState } from "react";
import { db } from "../firebase"; // Import your Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import AnnouncementCard from "../components/AnnouncementCard";
import PostsSection from "../components/PostsSection";

const Home = () => {
  const [announcements, setAnnouncements] = useState([]); // State for announcements
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsCollection = collection(db, "announcements");
        const announcementSnapshot = await getDocs(announcementsCollection);
        const announcementList = announcementSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));

        // Sort by date and limit to 10 most recent announcements
        const sortedAnnouncements = announcementList.sort((a, b) => new Date(b.date) - new Date(a.date));
        const recentAnnouncements = sortedAnnouncements.slice(0, 10);

        setAnnouncements(recentAnnouncements);
      } catch (error) {
        console.error("Error fetching announcements: ", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAnnouncements();
  }, []); // Empty dependency array to run effect only once

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  return (
    <div className="pb-10">
      <h1 className="font-bold font-poppins text-4xl text-center text-mainOrange mb-11">
        HOMETOWN HUB
      </h1>

      <div>
        <h3 className="font-semibold font-poppins text-xl">Recent Announcements</h3>

        {/* Container for horizontal scrolling */}
        <div className="flex overflow-x-auto my-5 space-x-5 p-5">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id} // Use document ID as key
              title={announcement.title}
              description={announcement.description}
              date={announcement.date}
              location={announcement.location}
              featured={announcement.featured} // Pass the featured prop if necessary
            />
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="mt-10">
        <h3 className="font-semibold font-poppins text-xl">Posts</h3>
        <PostsSection />
      </div>
    </div>
  );
};

export default Home;
