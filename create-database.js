import mongoose, { connect } from "mongoose";
import {
  OrdersModel,
  ProductsModel,
  OffersModel,
  SuppliersModel,
  CategoriesModel,
} from "./models.js";
import {
  sampleOffers,
  sampleProducts,
  sampleOrders,
  sampleSuppliers,
  sampleCategories,
} from "./SampleData.js";
await connect("mongodb://127.0.0.1:27017/product-management-system");

const orderModelCol = await OrdersModel.createCollection();
const productModelCol = await ProductsModel.createCollection();
const offersModelCol = await OffersModel.createCollection();
const suppliersModelCol = await SuppliersModel.createCollection();
const categoriesModelCol = await CategoriesModel.createCollection();

orderModelCol.insertMany(sampleOrders);
productModelCol.insertMany(sampleProducts);
offersModelCol.insertMany(sampleOffers);
suppliersModelCol.insertMany(sampleSuppliers);
categoriesModelCol.insertMany(sampleCategories);
