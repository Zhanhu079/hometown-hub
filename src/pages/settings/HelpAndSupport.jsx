import { useState } from 'react';

const HelpAndSupport = () => {
  const [issueDescription, setIssueDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleReportProblem = () => {
    if (issueDescription.trim() === '') {
      setErrorMessage('Please describe the issue before submitting.');
      setSuccessMessage('');
      return;
    }

    console.log('Problem reported:', issueDescription);
    setSuccessMessage('Your problem has been reported successfully!');
    setErrorMessage('');
    setIssueDescription(''); // Clear the input field
  };

  return (
    <div className="mb-8 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-semibold text-xl mb-4">Help and Support</h2>

      <label className="block mb-2 font-semibold">Describe your issue:</label>
      <textarea
        value={issueDescription}
        onChange={(e) => setIssueDescription(e.target.value)}
        placeholder="Describe the problem you encountered..."
        className="border rounded-lg p-3 mb-4 w-full border-gray-300 focus:border-mainOrange focus:ring focus:ring-mainOrange focus:ring-opacity-50"
        rows="4"
      />

      {/* Display error or success messages */}
      {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}

      <button
        onClick={handleReportProblem}
        className="bg-mainOrange font-roboto text-white rounded-lg px-4 py-2 w-full transition duration-200 hover:bg-opacity-90"
      >
        Report a Problem
      </button>
    </div>
  );
};

export default HelpAndSupport;
