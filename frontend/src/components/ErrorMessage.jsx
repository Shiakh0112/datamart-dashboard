const ErrorMessage = ({ message }) => {
  return (
    <div className="animate-slide-down">
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <span className="text-3xl">⚠️</span>
          </div>
          <div className="flex-1">
            <h3 className="text-red-800 font-semibold mb-1">Error Occurred</h3>
            <p className="text-red-700">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
