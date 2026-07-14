import { useMemo } from "react";
import PropTypes from "prop-types";
import "./DesignDisplay.css";
import DesignItem from "../DesignItem/DesignItem";
import { UseProducts } from "../../context/ProductContext";

const DesignDisplay = ({ category }) => { 
  const { product, searchTerm } = UseProducts();

  const term = searchTerm?.toLowerCase() || "";

  const filteredProducts = useMemo(() => {
    if (!product) return [];

    return product.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";

      const matchesCategory = category === "All" || category === item.category;

      const matchesSearch = name.includes(term) || description.includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [product, category, term]);

  if (!product) {
    return <p style={{ margin: 50, fontSize: 18 }}>Loading items...</p>;
  }

  return (
    <div className="design-display" id="design-display">
      <h2>Featured Products</h2>
      <p>Popular wedding lights and electrical gadgets</p>

      <div className="design-display-list">
        {filteredProducts.length ? (
          filteredProducts.map((item) => (
            <DesignItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
            />
          ))
        ) : (
          <p className="error-message">
            Oops! ... <br />
            No items found for "{searchTerm}" ❗
          </p>
        )}
      </div>
    </div>
  );
};

DesignDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default DesignDisplay;
