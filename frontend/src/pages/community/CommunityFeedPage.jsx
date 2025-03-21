import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../../components/modal/Modal";
import useApi from "../../hooks/useApi";
import CommunityCreateForm from "../../components/community/CommunityCreateForm";
import CommunityCard from "../../components/community/CommunityCard";

const CommunityFeedPage = () => {
  const { fetchData, resData, loading, error } = useApi();
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch communities on component mount
  useEffect(() => {
    fetchData("/community/get-all-Communities");
  }, [fetchData]);

  // Update posts state when resData changes
  useEffect(() => {
    if (resData) {
      setPosts(resData);
    }
  }, [resData]);

  // Function to fetch communities
  const fetchCommunities = useCallback(() => {
    fetchData("/community/get-all-Communities");
  }, [fetchData]);

  // Handle offer help button click
  const handleOfferHelp = useCallback(() => {
    console.log("handleOfferHelp");
  }, []);

  console.log("[posts]", posts);
  console.log("[loading]", loading);
  console.log("[error]", error);

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-22">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Community Help Board
          </h1>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="mr-2" />
            New Community
          </button>
        </div>

        {/* Modal for creating a new community */}
        {showModal && (
          <Modal isOpen={showModal} onModalClose={() => setShowModal(false)}>
            <CommunityCreateForm
              onCommunityCreated={fetchCommunities}
              onCancel={() => setShowModal(false)}
            />
          </Modal>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Loading communities...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-600">Error loading communities: {error}</p>
          </div>
        )}

        {/* Display communities */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-4">
            {posts.map((post) => (
              <CommunityCard
                key={post.id}
                post={post}
                onOfferHelp={handleOfferHelp}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeedPage;
