import { 
  IoMegaphoneOutline, 
  IoCalendarOutline, 
  IoCartOutline, 
  IoHammerOutline, 
  IoPeopleOutline, 
  IoBriefcaseOutline,
  IoHelpOutline,
} from "react-icons/io5";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";

const Categories = () => {
  // Array of category data
  const categories = [
    {
      title: "Announcements",
      icon: IoMegaphoneOutline,
      bgColor: "bg-blue-500",
      description: "Stay updated with the latest news and important announcements."
    },
    {
      title: "Events",
      icon: IoCalendarOutline,
      bgColor: "bg-green-500",
      description: "Discover upcoming events, gatherings, and activities."
    },
    {
      title: "Services",
      icon: IoHammerOutline,
      bgColor: "bg-red-500",
      description: "Browse a variety of services offered by community members."
    },
    {
      title: "Jobs",
      icon: IoBriefcaseOutline,
      bgColor: "bg-purple-500",
      description: "Find job opportunities, freelance work, and collaborations."
    },
    {
      title: "Marketplace",
      icon: IoCartOutline,
      bgColor: "bg-orange-500",
      description: "Explore trading opportunities within our community."
    },
    {
      title: "Help",
      icon: IoHelpOutline,
      bgColor: "bg-teal-500",
      description: "Click here to see posts from people asking for help."
    },
    {
      title: "Community",
      icon: IoPeopleOutline,
      bgColor: "bg-pink-500",
      description: "Connect with others in the community and build relationships."
    },
  ];

  return (
    <div>
      <h1 className="font-bold font-poppins text-2xl">Categories</h1>

      <div className="mt-20 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-screen-xl">
        {categories.map((category, index) => (
          <Link key={index} to={`/categories/${category.title.toLowerCase()}`}>
            <CategoryCard
            key={index}
            title={category.title}
            icon={category.icon}
            bgColor={category.bgColor}
            description={category.description}
          />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
