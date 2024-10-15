/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true); // Update the authentication state
      toast.success('Sign in successful!'); // Show success toast
      navigate('/'); // Redirect to home or another page after sign-in
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error('Failed to sign in. Please check your credentials.'); // Show error toast
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
          Welcome back! Sign in to continue exploring your local community.
        </p>

        {/* Sign In Form */}
        <h2 className="font-poppins text-2xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSignIn}>
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
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-4">
          <span className="text-gray-500">or</span>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="font-roboto text-gray-700">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-mainOrange font-semibold hover:underline">
              Sign Up
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

export default SignIn;
