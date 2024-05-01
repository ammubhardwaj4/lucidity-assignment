import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import "./style.css";
import Card from "../Card";
import { InventoryManagementContext } from "../../constants";
import EditProduct from "./EditInventory";
import Header from "../Header";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import CustomTable from "../CustomTable";
import { InventoryHeader } from "../../data/InventoryHeaderData";
import useInventoryStats from "../../hooks/useInventoryStats";

const StyledHeading = styled("h1")({
  fontWeight: "400",
});

export default function InventoryManagementView({ rows, setRows }) {
  const [inventoryState, setInventoryState] = useState({
    isVisible: {},
    isChecked: false,
    isEdit: false,
    formData: {},
  });
  const { isAdmin, setIsAdmin } = useContext(InventoryManagementContext);
  const { totalPrice, noOfCategories, zeroStocks, visibleRows } =
    useInventoryStats(rows, inventoryState.isVisible);

  const cardData = [
    {
      icon: LocalGroceryStoreIcon,
      title: "Total Product",
      number: visibleRows?.length,
    },
    {
      icon: CurrencyExchangeIcon,
      title: "Total Store Value",
      number: totalPrice,
    },
    {
      icon: RemoveShoppingCartIcon,
      title: "Out of stocks",
      number: zeroStocks,
    },
    {
      icon: CategoryIcon,
      title: "No of category",
      number: noOfCategories,
    },
  ];

  useEffect(() => {
    setIsAdmin(!inventoryState.isChecked);
  }, [inventoryState.isChecked, setIsAdmin]);

  const handleToggle = () => {
    setInventoryState((prevInventoryState) => ({
      ...prevInventoryState,
      isChecked: !prevInventoryState.isChecked,
    }));
  };

  const handleClickEdit = (item) => {
    setInventoryState((prevInventoryState) => ({
      ...prevInventoryState,
      isEdit: true,
      formData: item,
    }));
  };

  const handleCloseEditForm = () => {
    setInventoryState((prevInventoryState) => ({
      ...prevInventoryState,
      isEdit: false,
    }));
  };

  const handleVisibilityToggle = (rowName) => {
    setInventoryState((prevInventoryState) => ({
      ...prevInventoryState,
      isVisible: {
        ...prevInventoryState.isVisible,
        [rowName]: !prevInventoryState.isVisible[rowName],
      },
    }));
  };

  const handleOnDelete = (item) => {
    const updatedData = rows.filter((row) => row.name !== item.name);
    setRows(updatedData);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInventoryState((prevInventoryState) => ({
      ...prevInventoryState,
      formData: { ...prevInventoryState.formData, [name]: value },
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedData = rows.map((row) => {
      if (row.name === inventoryState.formData.name) {
        return {
          ...row,
          category: inventoryState.formData.category,
          price: inventoryState.formData.price,
          quantity: Number(inventoryState.formData.quantity),
          value: inventoryState.formData.value,
        };
      }
      return row;
    });
    setRows(updatedData);
    setInventoryState((prevInventoryState) => ({
      ...prevInventoryState,
      isEdit: false,
    }));
  };

  return (
    <div className="table-view-with-stats-cards">
      <Header
        isChecked={inventoryState.isChecked}
        handleToggle={handleToggle}
        userType={{ admin: "Admin", user: "User" }}
      />
      <StyledHeading>Inventory stats</StyledHeading>
      <div className="table-view-cards">
        {cardData.map((item) => (
          <Card
            key={item.title}
            icon={item.icon}
            title={item.title}
            number={item.number}
          />
        ))}
      </div>
      <CustomTable
        columns={InventoryHeader}
        data={rows}
        isAdmin={isAdmin}
        isVisible={inventoryState.isVisible}
        handleEdit={handleClickEdit}
        handleVisibilityToggle={handleVisibilityToggle}
        handleDelete={handleOnDelete}
      />
      <EditProduct
        isEdit={inventoryState.isEdit}
        handleCloseEditForm={handleCloseEditForm}
        formData={inventoryState.formData}
        handleOnChange={handleOnChange}
        handleEditSubmit={handleEditSubmit}
      />
    </div>
  );
}


