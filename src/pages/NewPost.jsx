import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const NewPost = () => {
  const [caption, setCaption] = useState("");
  const [content, setContent] = useState(null);
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a post submission using a Promise
    new Promise((resolve, reject) => {
      // Simulate an API call or some processing
      setTimeout(() => {
        if (caption && category) {
          resolve("Post created successfully!");
        } else {
          reject("Failed to create post. Please fill in all fields.");
        }
      }, 1000); // Simulating network delay
    })
      .then((message) => {
        // Show success toast
        toast.success(message);
        // Clear form fields
        setCaption("");
        setContent(null);
        setCategory("");
      })
      .catch((error) => {
        // Show error toast
        toast.error(error);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="font-bold text-2xl mb-4 font-poppins">Create a New Post</h1>
      <div className="flex items-center mb-4">
        <img 
          src="https://th.bing.com/th/id/OIP.PztowP3ljup0SM75tkDimQHaHa?rs=1&pid=ImgDetMain" 
          alt="Profile" 
          className="w-10 h-10 rounded-full mr-2" 
        />
        <h2 className="font-semibold font-poppins">Username</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          className="border rounded-lg p-2 mb-4 font-quicksand"
          placeholder="What’s on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          maxLength={250}
        />
        {content && (
          <img 
            src={URL.createObjectURL(content)} 
            alt="Preview" 
            className="mb-4" 
          />
        )}
        <input
          type="file"
          accept="image/*, video/*"
          onChange={(e) => setContent(e.target.files[0])}
          className="mb-4"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg mb-4 p-2 font-quicksand"
        >
          <option value="">Select a Category</option>
          <option value="announcements">Announcements</option>
          <option value="events">Events</option>
          <option value="help">Help</option>
          <option value="trade">Trade</option>
        </select>
        <div className="flex justify-between">
          <button type="button" className="text-gray-500 font-quicksand">Cancel</button>
          <button type="submit" className="bg-mainOrange text-white rounded-lg px-4 py-2 font-roboto">Post</button>
        </div>
      </form>
      <ToastContainer 
        position="top-right" // Positioning the toast in the top right corner
        autoClose={5000} // Auto-close after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={true} // New toasts appear on top
        closeOnClick // Allow closing on click
        pauseOnHover // Pause on hover
        draggable // Allow dragging
        pauseOnFocusLoss // Pause on focus loss
      />
    </div>
  );
};

export default NewPost;
