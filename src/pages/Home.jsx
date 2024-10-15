import AnnouncementCard from "../components/AnnouncementCard";
import PostsSection from "../components/PostsSection";

const Home = () => {
  // Array of announcement data
  const announcements = [
    {
      title: "Free Food Giveaway",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis eligendi doloremque repellat quidem sapiente quos veniam nostrum architecto dolorem odit laboriosam, est odio quibusdam nemo illum distinctio. Illo, quasi doloremque.",
      date: "10 Oct 2024",
      location: "123 Main St.",
      featured: true,
    },
    {
      title: "Job Fair Next Week",
      description:
        "Join us for a job fair with local employers. Bring your resume and get ready to interview!",
      date: "12 Oct 2024",
      location: "123 Main St.",
      featured: false,
    },
    {
      title: "Community Clean-Up Day",
      description:
        "Help us keep our community clean! Join us this Saturday for a clean-up event.",
      date: "15 Oct 2024",
      location: "123 Main St.",
      featured: true,
    },
    {
      title: "Local Farmers Market",
      description:
        "Visit our local farmers market every Saturday for fresh produce and homemade goods!",
      date: "20 Oct 2024",
      location: "123 Main St.",
      featured: false,
    },
    {
      title: "Volunteer Opportunity",
      description:
        "Looking for volunteers to help with our community garden. Join us every Saturday!",
      date: "25 Oct 2024",
      location: "123 Main St.",
      featured: false,
    },
  ];

  return (
    <div className="pb-10">
      <h1 className="font-bold font-poppins text-4xl text-center text-mainOrange mb-11">
        HOMETOWN HUB
      </h1>

      <div>
        <h3 className="font-semibold font-poppins text-xl">Featured Announcements</h3>

        {/* Container for horizontal scrolling */}
        <div className="flex overflow-x-auto my-5 space-x-5 p-5">
          {announcements.map((announcement, index) => (
            <AnnouncementCard
              key={index}
              title={announcement.title}
              description={announcement.description}
              date={announcement.date}
              location={announcement.location}
              featured={announcement.featured} // Pass the featured prop if necessary
            />
          ))}
        </div>
      </div>

      {/* Posts  */}
      <div className="mt-10">
        <h3 className="font-semibold font-poppins text-xl">Posts</h3>
        <PostsSection />
      </div>
    </div>
  );
};

export default Home;
