import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";

const SearchItem = ({ cart, setCart, items }) => {
  const { term } = useParams();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (!term) return;

    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase()),
    );

    setFilterData(filtered);
  }, [term, items]);
  return (
    <>
      {filterData.length === 0 ? (
        <h2 className="text-center mt-5">No Product Found</h2>
      ) : (
        <Product cart={cart} setCart={setCart} items={filterData} />
      )}
    </>
  );
};

export default SearchItem;
