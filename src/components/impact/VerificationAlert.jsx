const VerificationAlert = ({ count }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
    <div className="flex items-center">
      <span className="text-yellow-700">
        You have {count} hour{count > 1 ? "s" : ""} needing verification
      </span>
    </div>
  </div>
);

export default VerificationAlert;
