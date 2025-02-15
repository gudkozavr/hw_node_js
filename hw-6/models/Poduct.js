import { DataTypes } from "sequelize";
import sequelize from "../config/bd.js";

console.log("inizilization products startind...");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "ProductsDb",
    timestamps: false,
  }
);
console.log("vertig initialization");

export default Product;
