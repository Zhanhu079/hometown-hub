import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign-up logic (e.g., call API)
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
    </div>
  );
};

export default SignUp;
