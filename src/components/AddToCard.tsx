import React from "react";
import "./Atc.css";

interface AddToCartNotificationProps {
  show: boolean;
}

const AddToCartNotification: React.FC<AddToCartNotificationProps> = ({
  show,
}) => {
  return (
    <div>
      {show && (
        <div className="alert alert-success" role="alert">
          Add to cart successfully
        </div>
      )}
    </div>
  );
};

export default AddToCartNotification;
