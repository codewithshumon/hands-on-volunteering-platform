import { useCallback, useState } from "react";

import { FaPlus } from "react-icons/fa";
import Modal from "../../components/modal/Modal";
import useApi from "../../hooks/useApi";

import CommunityPostCard from "../../components/community/CommunityPostCard";
import CommunityCreateForm from "../../components/community/CommunityCreateForm";

const CommunityFeedPage = () => {
  const { fetchData, resData, loading, error } = useApi();

  const [posts, setPosts] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to fetch events
  const fetchPosts = useCallback(() => {
    fetchData("/event/get-all-events");
  }, []);

  const handleOfferHelp = (requestId) => {
    setPosts(
      posts.map((req) =>
        req.id === requestId ? { ...req, status: "helping" } : req
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-22">
      <div className="max-w-6xl mx-auto">
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

        {showModal && (
          <Modal isOpen={showModal} onModalClose={() => setShowModal(false)}>
            <CommunityCreateForm
              onPostCreated={fetchPosts}
              onCancel={() => setShowModal(false)}
            />
          </Modal>
        )}

        <div className="grid grid-cols-1 gap-6">
          {/* {posts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              onOfferHelp={handleOfferHelp}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default CommunityFeedPage;
