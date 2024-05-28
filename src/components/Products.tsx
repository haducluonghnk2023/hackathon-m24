import cake from "../images/Cake.jpg";
import pizza from "../images/pizza.jpg";
import bread from "../images/bread.jpg";
import Hamburger from "../images/Hamburger.jpg";
import AddToCartNotification from "./AddToCard";
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
  //   localStorage.setItem("products", JSON.stringify(initialProducts));

  const [showNotification, setShowNotification] = useState(false);

  const [products, setProducts] = useState<Products[]>(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "products") {
        const updatedProducts = JSON.parse(event.newValue || "[]");
        setProducts(updatedProducts);
      }
    };

    window.addEventListener("add", addToCart);

    return () => {
      window.removeEventListener("add", addToCart);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addToCart = (event: any) => {
    const productId = Number(event.target.dataset.product);
    const productToAdd = products.find((product) => product.id === productId);

    if (productToAdd && productToAdd.quantity > 0) {
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });

      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const productIndex = cart.findIndex(
        (item: Products) => item.id === productId
      );

      if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
      } else {
        cart.push({ ...productToAdd, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 1000);
    }
  };
  window.addEventListener("add", addToCart);

  return (
    <div>
      <AddToCartNotification show={showNotification} />
      {products.map((item: any, index: any) => {
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
                <a data-product={item.id} className="price" onClick={addToCart}>
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
