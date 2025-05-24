import { FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeaderMessages = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/chats");
      }}
      className="text-gray-600 hover:text-blue-600 relative hover:cursor-pointer"
    >
      <FaCommentDots className="h-5 w-5" />
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        2
      </span>
    </button>
  );
};

export default HeaderMessages;
