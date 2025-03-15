import { FaUser, FaHeart, FaEdit } from "react-icons/fa";

const Profile = ({ user, onEdit }) => {
  return (
    <div className="md:col-span-1 bg-white rounded-xl shadow-md p-6 h-fit">
      <div className="text-center mb-6">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-4">{user.email}</p>
        <div className="bg-blue-100 rounded-lg p-3">
          <p className="font-semibold text-blue-600">
            {user.hoursVolunteered} Volunteer Hours
          </p>
        </div>
        <button
          onClick={onEdit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center mx-auto"
        >
          <FaEdit className="mr-2" />
          Edit Profile
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2 flex items-center">
            <FaUser className="mr-2 text-blue-600" />
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 flex items-center">
            <FaHeart className="mr-2 text-red-600" />
            Supported Causes
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.causes.map((cause, index) => (
              <span
                key={index}
                className="bg-red-100 px-3 py-1 rounded-full text-sm"
              >
                {cause}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
