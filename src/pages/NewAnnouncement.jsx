import { useState } from 'react';
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new announcement to Firestore
      const announcementRef = collection(db, 'announcements');
      await addDoc(announcementRef, {
        title,
        description,
        date,
        location,
        createdAt: new Date(), // Store creation time
      });

      // Show success toast
      toast.success('Announcement created successfully!');
      // Clear form fields
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
    } catch (error) {
      // Show error toast
      toast.error('Failed to create announcement. Please try again.');
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="font-bold text-2xl mb-4 font-poppins">New Announcement</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg p-2 mb-4 font-quicksand"
          required
        />
        <textarea
          placeholder="Announcement Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-lg p-2 mb-4 font-quicksand"
          rows="4"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg p-2 mb-4 font-quicksand"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-lg p-2 mb-4 font-quicksand"
          required
        />
        <div className="flex justify-between">
          <button type="button" className="text-gray-500 font-quicksand">Cancel</button>
          <button type="submit" className="bg-mainOrange text-white rounded-lg px-4 py-2 font-roboto">Post Announcement</button>
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

export default NewAnnouncement;
