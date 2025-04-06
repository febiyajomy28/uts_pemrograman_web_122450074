import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetchData";
import BeutyCard from "../pages/BeutyCard";

const BeutyList = () => {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");
  const [selectedBeuty, setSelectedBeuty] = useState(null);

  // useCallback untuk memoize fungsi agar tidak berubah setiap render
  const handleBeutyClick = useCallback(
    (id) => {
      const beuty = data?.products.find((b) => b.id === id);
      setSelectedBeuty(beuty);
    },
    [data]
  );

  // useMemo untuk memproses hanya jika data berubah
  const filteredBeuty = useMemo(() => {
    if (!data) return [];
    return data.products.filter(
      (product) =>
        product.category === "beauty" || product.category === "fragrances"
    ); // Contoh filter produk beuty dan parfum
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Beauty List </h2>

      <div className="grid grid-cols-3 gap-4">

        {filteredBeuty.map((beuty) => (
          <Link to={`/beuty/${beuty.id}`} key={beuty.id}>
            <BeutyCard beuty={beuty} />
          </Link>
        ))}
      </div>

      {selectedBeuty && (
        <div className="mt-6 p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Selected Product</h2>
          <img
            src={selectedBeuty.thumbnail}
            alt={selectedBeuty.title}
            className="w-40 h-40 object-cover rounded"
          />
          <p>
            {selectedBeuty.title} - {selectedBeuty.category}
          </p>
          <p>Price: {selectedBeuty.price} USD</p>
          <p>Rating: {selectedBeuty.rating}</p>
          <p>Stock: {selectedBeuty.stock}</p>
        </div>
      )}
    </div>
  );
};

export default BeutyList;