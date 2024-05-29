import cake from "../images/Cake.jpg";
import pizza from "../images/pizza.jpg";
import bread from "../images/bread.jpg";
import Hamburger from "../images/Hamburger.jpg";
import AddToCartNotification from "./AddToCartNotification";
import { useEffect, useState } from "react";

interface Products {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  status: boolean;
}

export default function Products() {
  // Khởi tạo sản phẩm và state
  const initialProducts: Products[] = [
    {
      id: Math.ceil(Math.random() * 99999999999),
      name: "pizza",
      image: pizza,
      status: false,
      price: 30,
      quantity: 10,
    },
    {
      id: Math.ceil(Math.random() * 99999999999),
      name: "Hamburger",
      image: Hamburger,
      price: 15,
      quantity: 10,
      status: false,
    },
    {
      id: Math.ceil(Math.random() * 99999999999),
      name: "bread",
      image: bread,
      price: 20,
      quantity: 10,
      status: false,
    },
    {
      id: Math.ceil(Math.random() * 99999999999),
      name: "cake",
      image: cake,
      price: 10,
      quantity: 10,
      status: false,
    },
  ];

  const [showNotification, setShowNotification] = useState(false);

  const [products, setProducts] = useState<Products[]>(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });

  // Lấy và cập nhật dữ liệu
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
    }

    return () => {
      window.removeEventListener("click", addToCart);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Thêm vào giỏ hàng
  const addToCart = (event: any) => {
    // lấy id sản phẩm , sau đó tìm sp dựa trên id
    const productId = Number(event.target.dataset.product);
    const productToAdd = products.find((product) => product.id === productId);

    // kiểm tra và cập nhật số lượng
    if (productToAdd && productToAdd.quantity > 0) {
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });

      // cập nhật lại ds sp
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // cập nhạt lại giỏ hàng trong local
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const productIndex = cart.findIndex(
        (item: Products) => item.id === productId
      );

      // thêm sp vào giỏ hoặc cập nhật số lượng hàng trong giỏ
      if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
      } else {
        cart.push({ ...productToAdd, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      // hiển thị thông báo
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 1000);
    }
  };

  return (
    <div>
      <AddToCartNotification show={showNotification} />
      {products.map((item: Products, index: number) => {
        return (
          <div key={index}>
            <div className="media product">
              <div className="media-left">
                <a href="#">
                  <img
                    className="media-object"
                    src={item.image}
                    alt={item.name}
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{item.name}</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  dicta asperiores veniam repellat unde debitis quisquam magnam
                  magni ut deleniti!
                </p>
                <input
                  name={`quantity-product-${item.id}`}
                  type="number"
                  value={item.quantity}
                  readOnly
                />
                <a
                  data-product={item.id}
                  className={`price ${item.quantity === 0 ? "disabled" : ""}`}
                  onClick={item.quantity > 0 ? addToCart : undefined}
                  style={{
                    cursor: item.quantity === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {item.price} USD{" "}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
