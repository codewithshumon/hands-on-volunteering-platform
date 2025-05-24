/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { FaUser, FaHeart, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import useApi from "../../hooks/useApi";
import ProfileSkeleton from "../skeleton/ProfileSkeleton";
import { updateUserData } from "../../store/slices/authSlice";
import ImageUpload from "../global/ImageUpload";

const Profile = () => {
  const { resData: user, loading, error, fetchData, updateData } = useApi();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [skills, setSkills] = useState("");
  const [causes, setCauses] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const imgRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setImageLoaded(false);
  }, [imagePreview, profileImage]);

  useEffect(() => {
    fetchData(`/user/single-user/${currentUser._id}`);
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setProfileImage(user.profileImage || "");
      setSkills(user.skills?.join(", ") || "");
      setCauses(user.causes?.join(", ") || "");
    }
  }, [user]);

  if (loading || error) {
    return <ProfileSkeleton />;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    setSaveError(null);

    const updatedUser = {
      ...user,
      name,
      profileImage,
      skills: skills.split(",").map((skill) => skill.trim()),
      causes: causes.split(",").map((cause) => cause.trim()),
    };

    const formData = new FormData();
    formData.append("name", updatedUser.name);
    formData.append("skills", updatedUser.skills.join(", "));
    formData.append("causes", updatedUser.causes.join(", "));
    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    try {
      const response = await updateData("/user/update-user", "PUT", formData);
      setIsEditing(false);
      setImageFile(null);

      if (response.data.profileImage) {
        setProfileImage(response.data.profileImage);
        setImagePreview("");
      }

      dispatch(updateUserData(response.data));
    } catch (err) {
      console.error("Failed to update user:", err);
      setSaveError("Failed to update user. Please try again.");
      setTimeout(() => {
        fetchData("/user/single-user");
      }, 1000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    setName(user?.name || "");
    setProfileImage(user?.profileImage || "");
    setSkills(user?.skills?.join(", ") || "");
    setCauses(user?.causes?.join(", ") || "");
    setIsEditing(false);
    setImageFile(null);
    setImagePreview("");
    setSaveError(null);
  };

  const formattedHours =
    user?.volunteerHours !== null && user?.volunteerHours !== undefined
      ? user.volunteerHours % 1 === 0
        ? user.volunteerHours.toFixed(0)
        : user.volunteerHours.toFixed(1)
      : "0";

  return (
    <div className="md:col-span-1 bg-[#faf9f9] rounded-xl shadow-md p-6 h-fit relative">
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        {isEditing ? (
          <>
            <button
              onClick={handleCancelClick}
              className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              disabled={isSaving}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              {isSaving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save
                </>
              )}
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

      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
          <ImageUpload
            image={imagePreview || profileImage || "https://placehold.co/400"}
            alt="Profile Image"
            imgRef={imgRef}
            isImageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
            isEditing={isEditing}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            setImageFile={setImageFile}
          />
        </div>

        {saveError && (
          <div className="text-red-600 text-sm mt-2">{saveError}</div>
        )}

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
          <p className="font-semibold text-blue-600">{formattedHours} Hours</p>
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
