import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../../components/modal/Modal";
import useApi from "../../hooks/useApi";
import CommunityCreateForm from "../../components/community/CommunityCreateForm";
import CommunityCard from "../../components/community/CommunityCard";

const CommunityPage = () => {
  const { fetchData, resData, loading, error } = useApi();
  const [communitys, setCommunity] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch communities on component mount
  useEffect(() => {
    fetchData("/community/get-all-Communities");
  }, [fetchData]);

  // Update posts state when resData changes
  useEffect(() => {
    if (resData) {
      setCommunity(resData);
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

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-22">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
            Community Help Board
          </h1>

          {/* New Community Button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="mr-2" />
            <span>New Community</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communitys.map((community, index) => (
              <CommunityCard
                key={index}
                community={community}
                onOfferHelp={handleOfferHelp}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
