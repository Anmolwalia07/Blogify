import React from 'react';

interface DeleteBlogModalProps {
  onClose: () => void;
  handleDelete: () => void;
}

const DeleteBlogModal: React.FC<DeleteBlogModalProps> = ({ onClose, handleDelete }) => {
  return (
    <div className="fixed inset-0  flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Do you want to delete this blog?
        </h2>
        <div className="flex justify-end space-x-3">
            <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            No
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
