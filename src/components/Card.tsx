import { useState } from "react";
import CardDetail from "./CardDetail";
import AddToCartNotificationProps from "./DeleAndUpdate";
interface AddToCartNotificationProps {
  show: boolean;
}
export default function Card() {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <div>
      <div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h1 className="panel-title">Your Cart</h1>
            </div>
            <CardDetail></CardDetail>
          </div>
          <AddToCartNotificationProps
            show={showNotification}
          ></AddToCartNotificationProps>
        </div>
      </div>
    </div>
  );
}
