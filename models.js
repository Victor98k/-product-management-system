import mongoose from "mongoose";

const OffersSchema = mongoose.Schema({
  products: { type: [String] },
  price: { type: Number },
  active: { type: Boolean },
  category: { type: [String] },
});

const SuppliersSchema = mongoose.Schema({
  name: { type: String },
  contact: {
    name: { type: String },
    email: { type: String },
  },
});

const ProductsSchema = mongoose.Schema({
  name: { type: String },
  category: { type: String },
  price: { type: Number },
  cost: { type: Number },
  stock: { type: Number },
  supplier: SuppliersSchema,
});

const SalesOrdersSchema = mongoose.Schema({
  order: {
    type: [String],
    required: true,
  },
  offer: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  additional_detail: {
    type: String,
  },
});

const CategoriesSchema = mongoose.Schema({
  name: { type: String, required: true },
  categoryDescription: { type: String },
});

export const ProductsModel = mongoose.model("Product", ProductsSchema);
export const OffersModel = mongoose.model("Offers", OffersSchema);
export const SuppliersModel = mongoose.model("Suppliers", SuppliersSchema);
export const OrdersModel = mongoose.model("SalesOrder", SalesOrdersSchema);
export const CategoriesModel = mongoose.model("Category", CategoriesSchema);
