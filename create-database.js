import mongoose, { connect } from "mongoose";

const con = await connect(
  "mongodb://localhost:27017/product-management-system"
);

const { db } = mongoose.connection;

const categoryCol = await db.collection("category");
const productCol = await db.collection("products");
const offersCol = await db.collection("offers");
const suppliersCol = await db.collection("suppliers");
const ordersCol = await db.collection("orders");

const categorySchema = mongoose.Schema({
  categoryName: String,
  catergoryType: String,
});

const offersSchema = mongoose.Schema({
  Products: String,
  Price: String,
  Active: Boolean,
});

const suppliersSchema = mongoose.Schema({
  Name: String,
  Contact: String,
});

const productSchema = mongoose.Schema({
  Namee: String,
  Category: String,
  Price: Number,
  Cost: Number,
  Stock: Number,
});

const ordersSchema = mongoose.Schema({
  Offer: String,
  Quntity: Number,
  Status: String,
});

productcol.insertMany([
  {
    Namee: "Laptop",
    Category: "Electronics",
    Price: 1000,
    Cost: 800,
    Stock: 50,
  },
  {
    Namee: "Smartphone",
    Category: "Electronics",
    Price: 800,
    Cost: 600,
    Stock: 40,
  },
  { Namee: "T-shirt", Category: "Clothing", Price: 20, Cost: 10, Stock: 100 },
  {
    Namee: "Refrigerator",
    Category: "Home Appliances",
    Price: 1200,
    Cost: 1000,
    Stock: 30,
  },
  {
    Namee: "Shampoo",
    Category: "Beauty & Personal Care",
    Price: 10,
    Cost: 5,
    Stock: 80,
  },
  {
    Namee: "Soccer Ball",
    Category: "Sports & Outdoors",
    Price: 30,
    Cost: 20,
    Stock: 60,
  },
]);

offerscol.insertMany([
  { Products: "Laptop, Smartphone", Price: "1800", Active: true },
  { Products: "T-shirt, Shampoo", Price: "30", Active: true },
  {
    Products: "Refrigerator, Smartphone, Soccer Ball",
    Price: "1830",
    Active: false,
  },
]);

supplierscol.insertMany([
  {
    Name: "Electronics Supplier Inc.",
    Contact: "John Doe (john@electronicsupplier.com)",
  },
  {
    Name: "Fashion Supplier Co.",
    Contact: "Jane Smith (jane@fashionsupplier.com)",
  },
]);

orderscol.insertMany([
  { Offer: "Offer 1", Quntity: 2, Status: "pending" },
  { Offer: "Offer 3", Quntity: 1, Status: "pending" },
]);
