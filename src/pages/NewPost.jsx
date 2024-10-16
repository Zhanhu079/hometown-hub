import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { db } from "../firebase";
import { collection, addDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth"; 

const NewPost = () => {
  const [caption, setCaption] = useState("");
  const [content, setContent] = useState(null);
  const [category, setCategory] = useState("");
  const [user, setUser] = useState(null); // State to hold the current user

  // Fetch the current user and their profile picture
  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth(); // Initialize Firebase Authentication
      const currentUser = auth.currentUser; // Get the current user

      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid)); // Assuming user data is stored in 'users' collection

        if (userDoc.exists()) {
          const userData = { ...userDoc.data(), uid: currentUser.uid };

          // Get the download URL for the profile picture
          if (userData.profilePicture) {
            const storage = getStorage();
            const profilePicRef = ref(storage, userData.profilePicture);
            
            try {
              const url = await getDownloadURL(profilePicRef);
              userData.profilePicture = url; // Set the full URL
            } catch (error) {
              console.error("Error getting profile picture URL:", error);
              userData.profilePicture = 'path/to/default/profile-pic.png'; // Fallback URL if there's an error
            }
          }

          console.log("Fetched User Data:", userData); // Log user data
          setUser(userData); // Set user data in state
        } else {
          console.error("No such user document!");
        }
      } else {
        console.error("No current user found!");
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all fields are filled
    if (!caption || !category || !user) {
      toast.error("Failed to create post. Please fill in all fields.");
      return;
    }
  
    try {
      // Create a new post object
      const newPost = {
        caption,
        category,
        createdAt: new Date(),
        userId: user.uid,
        username: user.username || "",
        profilePicture: user.profilePicture || "", // Use profilePicture
        likes: 0,
        commentsCount: 0,
      };
  
      // Log the new post to inspect its structure and values
      console.log("New Post Object:", newPost);
  
      // If there is content (image or video), handle it
      if (content) {
        const fileURL = await uploadContent(content);
        newPost.content = fileURL;
      }
  
      // Add the new post to the Firestore "posts" collection
      const postDocRef = await addDoc(collection(db, "posts"), newPost);
      
      // Now, update the user's document to include the post ID
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        posts: arrayUnion(postDocRef.id), // Use arrayUnion to add the new post ID
      });
  
      // Show success toast
      toast.success("Post created successfully!");
  
      // Clear form fields
      setCaption("");
      setContent(null);
      setCategory("");
    } catch (error) {
      console.error("Error creating post: ", error);
      toast.error(`Failed to create post. Error: ${error.message || "unknown"}`);
    }
  };

  const uploadContent = async (file) => {
    const storage = getStorage(); // Initialize Firebase Storage
    const storageRef = ref(storage, `posts/${file.name}`); // Create a reference for the file

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the download URL
    return await getDownloadURL(storageRef);
  };

  console.log(user); // Log the user object

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="font-bold text-2xl mb-4 font-poppins">Create a New Post</h1>
      {user && (
        <div className="flex items-center mb-4">
          <img 
            src={user.profilePicture} // Use user's profile picture
            alt="Profile" 
            className="w-10 h-10 rounded-full mr-2" 
            onError={(e) => {
              e.target.onerror = null; // Prevents infinite loop
              e.target.src = 'path/to/default/profile-pic.png'; // Use a default image if the user's image fails to load
            }}
          />
          <h2 className="font-semibold font-poppins">{user.username}</h2> {/* Use user's username */}
        </div>
      )}
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
          <option value="events">Events</option>
          <option value="services">Services</option>
          <option value="jobs">Jobs</option>
          <option value="marketplace">Marketplace</option>
          <option value="help">Help</option>
          <option value="community">Community</option>
        </select>
        <div className="flex justify-between">
          <button type="button" className="text-gray-500 font-quicksand">Cancel</button>
          <button type="submit" className="bg-mainOrange text-white rounded-lg px-4 py-2 font-roboto">Post</button>
        </div>
      </form>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div>
  );
};

export default NewPost;
