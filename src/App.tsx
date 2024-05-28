import Card from "./components/Card";
import ListProducts from "./components/ListProducts";

export default function App() {
  return (
    <div>
      <>
        <div className="container">
          <div className="page-header">
            <h1>Shopping Cart</h1>
          </div>
          <div className="row">
            <ListProducts></ListProducts>
            <div>
              <Card></Card>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
