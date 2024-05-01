import { useEffect, useState } from "react";

function useInventoryStats(rows, isVisible) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [noOfCategories, setNoOfCategories] = useState(0);
  const [zeroStocks, setZeroStocks] = useState(0);
  const [visibleRows, setVisibleRows] = useState([]);

  useEffect(() => {
    const calculateStats = () => {
      const filteredRows = rows.filter((row) => !isVisible[row.name]);
      const totalPrice = calculateTotalPrice(filteredRows);
      const noOfCategories = calculateNumberOfCategories(filteredRows);
      const zeroStocks = filteredRows.filter(
        (row) => row.quantity === 0
      ).length;
      setVisibleRows(filteredRows);
      return { totalPrice, noOfCategories, zeroStocks };
    };

    const calculateTotalPrice = (rows) => {
      return rows.reduce((acc, row) => {
        const price = parseFloat(row.value.replace("$", ""));
        return acc + price;
      }, 0);
    };

    const calculateNumberOfCategories = (rows) => {
      return new Set(rows.map((row) => row.category)).size;
    };

    const { totalPrice, noOfCategories, zeroStocks } = calculateStats();
    setTotalPrice(totalPrice.toLocaleString());
    setNoOfCategories(noOfCategories);
    setZeroStocks(zeroStocks);
  }, [rows, isVisible]);

  return { totalPrice, noOfCategories, zeroStocks, visibleRows };
}

export default useInventoryStats;
