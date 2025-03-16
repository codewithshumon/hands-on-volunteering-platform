/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaUser, FaHeart, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import useApi from "../../hooks/useApi";

const Profile = () => {
  const { resData: user, loading, error, fetchData, updateData } = useApi();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [skills, setSkills] = useState("");
  const [causes, setCauses] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    fetchData("/user/single-user");
  }, []);

  // Update local state when user data is fetched
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setProfileImage(user.profileImage || "");
      setSkills(user.skills?.join(", ") || "");
      setCauses(user.causes?.join(", ") || "");
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // Prepare the updated user data
    const updatedUser = {
      ...user,
      name,
      profileImage,
      skills: skills.split(",").map((skill) => skill.trim()),
      causes: causes.split(",").map((cause) => cause.trim()),
    };

    // Call the updateData function from useApi to update the user data
    try {
      await updateData("/user/single-user", "PUT", updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleCancelClick = () => {
    // Discard changes and exit edit mode
    setName(user?.name || "");
    setProfileImage(user?.profileImage || "");
    setSkills(user?.skills?.join(", ") || "");
    setCauses(user?.causes?.join(", ") || "");
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="md:col-span-1 bg-[#faf9f9] rounded-xl shadow-md p-6 h-fit relative">
      {/* Edit/Save and Cancel Buttons - Top Corners */}
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        {isEditing ? (
          <>
            {/* Cancel Button - Left Corner */}
            <button
              onClick={handleCancelClick}
              className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
            {/* Save Button - Right Corner */}
            <button
              onClick={handleSaveClick}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <FaSave className="mr-2" />
              Save
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center ml-auto"
          >
            <FaEdit className="mr-2" />
            Edit
          </button>
        )}
      </div>

      {/* Profile Content */}
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={profileImage || "https://placehold.co/400"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          {isEditing && (
            <label
              htmlFor="profile-image-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <span className="text-white text-sm">Upload</span>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xl font-bold mb-2 text-center border border-gray-300 rounded-lg p-2"
          />
        ) : (
          <h2 className="text-xl font-bold mb-2">{name}</h2>
        )}

        <div className="bg-blue-100 rounded-lg p-3">
          <p className="font-semibold text-blue-600">
            {user?.hoursVolunteered || "0"} Hours
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2 flex items-center">
            <FaUser className="mr-2 text-blue-600" />
            Skills
          </h3>
          {isEditing ? (
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter skills, separated by commas"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2 flex items-center">
            <FaHeart className="mr-2 text-red-600" />
            Supported Causes
          </h3>
          {isEditing ? (
            <input
              type="text"
              value={causes}
              onChange={(e) => setCauses(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter causes, separated by commas"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {causes.split(",").map((cause, index) => (
                <span
                  key={index}
                  className="bg-red-100 px-3 py-1 rounded-full text-sm"
                >
                  {cause.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
