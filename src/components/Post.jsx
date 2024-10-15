/* eslint-disable react/prop-types */
import { IoHeartOutline, IoChatbubbleOutline } from "react-icons/io5";

const Post = ({
  profilePic,
  username,
  caption,
  createdAt, // Changed from postedOn to createdAt
  content,
  likes,
  commentsCount,
}) => {
  // Format the createdAt timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to Date
    return date.toLocaleString(); // Format to locale string (you can customize this)
  };

  return (
    <div className="rounded-xl overflow-hidden p-5">
      <div className="flex items-center gap-2 mb-4">
        <img className="w-10 h-10 rounded-full" src={profilePic} alt="pfp" />
        <div>
          <h1 className="font-semibold font-poppins">
            {username}{" "}
            <span className="text-slate-400 text-[12px] font-normal">• {formatDate(createdAt)}</span>
          </h1>
          <p className="text-[14px] font-quicksand">{caption}</p>
        </div>
      </div>

      {/* Conditionally render post content */}
      {content && (
        <img
          className="object-contain rounded-xl"
          src={content}
          alt="post_thumbnail"
        />
      )}

      {/* Post actions */}
      <div className="mt-3 flex items-center">
        <div className="flex">
          <IoHeartOutline size={23} className="text-slate-600" />
          <span className="text-slate-600">{likes}</span>
        </div>
        <div className="flex">
          <IoChatbubbleOutline size={23} className="text-slate-600 ml-5" />
          <span className="text-slate-600">{commentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
