import { useEffect, useMemo, useState } from "react";

interface Cards {
  name: string;
  price: number;
  quantity: number;
  id: number;
}

export default function CardDetail() {
  // khai báo các state
  const [cards, setCards] = useState<Cards[]>([]);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);

  // cập nhật trạng thái
  useEffect(() => {
    if (cartUpdated) {
      setCartUpdated(false);
    }
  }, [cartUpdated]);

  // lấy dữ liệu từ localStorage
  useEffect(() => {
    const storedCards = localStorage.getItem("cart");
    if (storedCards) {
      const parsedCards: Cards[] = JSON.parse(storedCards);
      setCards(parsedCards);
    }
  }, []);

  // tính tổng số lượng
  const totalQuantity = useMemo(() => {
    return cards.reduce((sum, card) => sum + card.quantity, 0);
  }, [cards]);

  // tính tổng giá
  const totalPrice = useMemo(() => {
    return cards.reduce((sum, card) => sum + card.price * card.quantity, 0);
  }, [cards]);

  // thay dổi số lượng và sản phẩm
  const handleQuantityChange = (id: number, newQuantity: number) => {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          quantity: newQuantity < 0 ? card.quantity : newQuantity,
        };
      }
      return card;
    });
    setCards(updatedCards);
    localStorage.setItem("cart", JSON.stringify(updatedCards));
    setCartUpdated(true);
  };

  // cập nhật lại giỏ hàng
  const handleUpdate = () => {
    setShowUpdateNotification(true);
    localStorage.setItem("cart", JSON.stringify(cards));
    setTimeout(() => {
      setShowUpdateNotification(false);
    }, 2000); // Đặt thời gian cho thông báo biến mất sau 2 giây
  };

  // xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: number) => {
    const confirmation = window.confirm(
      "bạn muốn xóa sản phầm khỏi giỏ hàng không?"
    );
    if (confirmation) {
      const updatedCards = cards.filter((card: any) => card.id !== id);
      setCards(updatedCards);
      localStorage.setItem("cart", JSON.stringify(updatedCards));
      setShowDeleteNotification(true);
      // Đặt thời gian cho thông báo biến mất sau 2 giây
      setTimeout(() => {
        setShowDeleteNotification(false);
      }, 2000);
      setCartUpdated(true);
    }
  };

  return (
    <div>
      <div className="panel-body">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "4%" }}>STT</th>
              <th>Name</th>
              <th style={{ width: "15%" }}>Price</th>
              <th style={{ width: "4%" }}>Quantity</th>
              <th style={{ width: "25%" }}>Action</th>
            </tr>
          </thead>
          <tbody id="my-cart-body">
            {cards.map((card: any, index: number) => (
              <tr key={card.id}>
                <th scope="row">{index + 1}</th>
                <td>{card.name}</td>
                <td>{card.price} USD</td>
                <td>
                  <input
                    name={`cart-item-quantity-${card.id}`}
                    type="number"
                    defaultValue={card.quantity}
                    onChange={(e) =>
                      handleQuantityChange(card.id, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>
                  <a
                    className="label label-info update-cart-item"
                    data-product={card.name}
                    onClick={handleUpdate}
                  >
                    Update
                  </a>
                  <a
                    className="label label-danger delete-cart-item"
                    data-product={card.name}
                    onClick={() => removeFromCart(card.id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot id="my-cart-footer">
            <tr>
              <td colSpan={4}>
                There are <b>{totalQuantity}</b> items in your shopping cart.
              </td>
              <td colSpan={2} className="total-price text-left">
                {totalPrice} USD
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {showDeleteNotification && (
        <div className="notification" style={{ backgroundColor: "red" }}>
          Delete successfully
        </div>
      )}

      {showUpdateNotification && (
        <div className="notification" style={{ backgroundColor: "orange" }}>
          Update successfully
        </div>
      )}
    </div>
  );
}
