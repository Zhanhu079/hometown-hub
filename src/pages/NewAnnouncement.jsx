import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate an announcement submission using a Promise
    new Promise((resolve, reject) => {
      // Simulate an API call or some processing
      setTimeout(() => {
        if (title && description && date && location) {
          resolve('Announcement created successfully!');
        } else {
          reject('Failed to create announcement. Please fill in all fields.');
        }
      }, 1000); // Simulating network delay
    })
      .then((message) => {
        // Show success toast
        toast.success(message);
        // Clear form fields
        setTitle('');
        setDescription('');
        setDate('');
        setLocation('');
      })
      .catch((error) => {
        // Show error toast
        toast.error(error);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="font-bold text-2xl mb-4">New Announcement</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg p-2 mb-4"
          required
        />
        <textarea
          placeholder="Announcement Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-lg p-2 mb-4"
          rows="4"
          required
        />
       
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg p-2 mb-4"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-lg p-2 mb-4"
          required
        />
        <div className="flex justify-between">
          <button type="button" className="text-gray-500">Cancel</button>
          <button type="submit" className="bg-mainOrange text-white rounded-lg px-4 py-2">Post Announcement</button>
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
