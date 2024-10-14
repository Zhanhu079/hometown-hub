import Post from "./Post";

const PostsSection = () => {
  // Array of post data
  const posts = [
    {
      profilePic: "https://th.bing.com/th/id/R.d064a09d90d5c177c4813b582941c189?rik=oRNqtsfDamTI7Q&pid=ImgRaw&r=0",
      username: "BagHead",
      postedOn: "2h",
      caption: "This is a caption🤪",
      content: "https://images.pexels.com/photos/18936031/pexels-photo-18936031/free-photo-of-korean-bbq-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 23,
      commentsCount: 5,
    },
    {
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "JohnDoe",
      postedOn: "3h",
      caption: "Check out this awesome view! 🏞️",
      content: "https://images.pexels.com/photos/27638606/pexels-photo-27638606/free-photo-of-portrait-of-newlyweds-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 34,
      commentsCount: 8,
    },
    {
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
      username: "JaneSmith",
      postedOn: "1h",
      caption: "Had a great time at the beach! 🏖️",
      content: "https://images.pexels.com/photos/28759795/pexels-photo-28759795/free-photo-of-cozy-autumn-setup-with-camera-and-coffee.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 45,
      commentsCount: 10,
    },
    {
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
      username: "MikeJordan",
      postedOn: "4h",
      caption: "Just got a new car! 🚗",
      content: "https://images.pexels.com/photos/28101335/pexels-photo-28101335/free-photo-of-a-church-tower-in-the-middle-of-a-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 55,
      commentsCount: 12,
    },
    {
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
      username: "SamanthaSmith",
      postedOn: "5h",
      caption: "Loving this new camera gear! 📸",
      content: "https://images.pexels.com/photos/2582937/pexels-photo-2582937/free-photo-of-professional-camera-on-a-tripod-near-the-beach.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 78,
      commentsCount: 20,
    },
    {
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
      username: "AlexD",
      postedOn: "6h",
      caption: "A quick hike before sunset 🌄",
      content: "https://images.pexels.com/photos/6352797/pexels-photo-6352797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 40,
      commentsCount: 15,
    },
  ];

  return (
    <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {posts.map((post, index) => (
        <Post
          key={index}
          profilePic={post.profilePic}
          username={post.username}
          postedOn={post.postedOn}
          caption={post.caption}
          content={post.content}
          likes={post.likes}
          commentsCount={post.commentsCount}
        />
      ))}
    </div>
  );
};

export default PostsSection;
