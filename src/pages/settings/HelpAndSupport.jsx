
const HelpAndSupport = () => {
  const handleReportProblem = () => {
    console.log('Problem reported');
  };

  return (
    <div className="mb-8 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-semibold text-xl mb-4">Help and Support</h2>
      <button
        onClick={handleReportProblem}
        className="bg-mainOrange text-white rounded-lg px-4 py-2 w-full transition duration-200 hover:bg-opacity-90"
      >
        Report a Problem
      </button>
    </div>
  );
};

export default HelpAndSupport;
