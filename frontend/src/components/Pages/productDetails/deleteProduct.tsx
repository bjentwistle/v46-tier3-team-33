import React from "react";
import { useNavigate } from "react-router-dom";

interface DeleteButtonProps {
  id: string;
  onDelete: () => void; // Define the prop type for onDelete callback
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8081/product/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        onDelete(); // Call the onDelete callback to refresh the product list
        navigate("/FarmerProducts");
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("An error occurred during delete:", error);
    }
  };

  return <button className="edit-buttons" onClick={handleDelete}>Delete Product</button>;
};

export default DeleteButton;
