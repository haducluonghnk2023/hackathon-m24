import { useEffect, useMemo, useState } from "react";
import Product from "./Products";

interface Cards {
  stt: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CardDetail() {
  const [cards, setCards] = useState<Cards[]>([]);
  const [stt, setStt] = useState<number>(1);

  useEffect(() => {
    const storedCards = localStorage.getItem("cart");
    if (storedCards) {
      const parsedCards: Cards[] = JSON.parse(storedCards);
      setCards(parsedCards);
    }
  }, []);

  const totalQuantity = useMemo(() => {
    return cards.reduce((sum, card) => sum + card.quantity, 0);
  }, [cards]);

  const totalPrice = useMemo(() => {
    return cards.reduce((sum, card) => sum + card.price * card.quantity, 0);
  }, [cards]);

  const handleQuantityChange = (stt: number, newQuantity: number) => {
    const updatedCards = cards.map((card) => {
      if (card.stt === stt) {
        return { ...card, quantity: newQuantity };
      }
      return card;
    });
    setCards(updatedCards);
    localStorage.setItem("cart", JSON.stringify(updatedCards));
  };

  const removeFromCart = (id: string) => {
    const confirmation = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (confirmation) {
      const updatedCards = cards.filter((card: any) => card.id !== id);
      setCards(updatedCards);
      localStorage.setItem("cart", JSON.stringify(updatedCards));
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
            {cards.map((card: any) => (
              <tr key={card.stt}>
                <th scope="row">{card.stt}</th>
                <td>{card.name}</td>
                <td>{card.price} USD</td>
                <td>
                  <input
                    name={`cart-item-quantity-${card.stt}`}
                    type="number"
                    defaultValue={card.quantity}
                    onChange={(e) =>
                      handleQuantityChange(card.stt, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>
                  <a
                    className="label label-info update-cart-item"
                    data-product={card.name}
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
    </div>
  );
}
