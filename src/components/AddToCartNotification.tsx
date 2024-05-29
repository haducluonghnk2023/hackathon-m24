import React from "react";

interface AddToCartNotificationProps {
  show: boolean;
}

const AddToCartNotification: React.FC<AddToCartNotificationProps> = ({
  show,
}) => {
  if (!show) return null;

  return (
    <div style={styles.notificationContainer}>
      <div style={styles.notification}> Add to cart successfully</div>
    </div>
  );
};

const styles = {
  notificationContainer: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1000,
  },
  notification: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    marginTop: "20px",
  },
};

export default AddToCartNotification;
