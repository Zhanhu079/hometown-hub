/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast

const SignUp = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // State for username
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        username: username, // Save the username
        createdAt: new Date(),
      });

      // Show success toast
      toast.success("Account created successfully!");

      // Set authentication state and navigate
      setIsAuthenticated(true);
      navigate('/'); // Redirect to home or any other page
    } catch (error) {
      console.error("Error signing up:", error);
      // Show error toast
      toast.error("Error signing up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        {/* App Name */}
        <h1 className="font-poppins font-bold text-4xl text-center text-mainOrange mb-6">
          HOMETOWN HUB
        </h1>

        {/* Subtitle */}
        <p className="font-quicksand text-center text-gray-500 mb-6">
          Join us and explore your hometown’s local community!
        </p>

        {/* Sign Up Form */}
        <h2 className="font-poppins text-2xl font-bold mb-4 text-center">Create an Account</h2>
        <form onSubmit={handleSignUp}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="font-roboto block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-roboto"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="font-roboto block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-roboto"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="font-roboto block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-roboto"
              required
            />
          </div>

          <button type="submit" className="w-full bg-mainOrange text-white py-2 rounded-lg font-roboto font-bold">
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-4">
          <span className="text-gray-500">or</span>
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="font-roboto text-gray-700">
            Already have an account?{' '}
            <Link to="/signin" className="text-mainOrange font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
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

export default SignUp;
