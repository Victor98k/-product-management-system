import mongoose, { connect } from "mongoose";

const createDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/product-management-system"
    );
    const { db } = mongoose.connection;

    const categorySchema = mongoose.Schema({
      name: { type: String, required: true },
      description: String,
    });

    const offersSchema = mongoose.Schema({
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      price: { type: Number, required: true },
      active: { type: Boolean, default: true },
    });

    const suppliersSchema = mongoose.Schema({
      name: { type: String, required: true },
      contact: { type: String, required: true },
    });

    const productSchema = mongoose.Schema({
      name: { type: String, required: true },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      price: { type: Number, required: true },
      cost: { type: Number, required: true },
      stock: { type: Number, required: true },
      supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    });

    const ordersSchema = mongoose.Schema({
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      price: { type: Number, required: true },
      active: { type: Boolean, default: true },
    });

    const Category = new mongoose.model("Category", categorySchema);
    const Offer = new mongoose.model("Offer", offersSchema);
    const Supplier = new mongoose.model("Supplier", suppliersSchema);
    const Product = new mongoose.model("Product", productSchema);
    const Order = new mongoose.model("Order", ordersSchema);

    // const categoryCol = await db.collection("category");
    // const productCol = await db.collection("products");
    // const offersCol = await db.collection("offers");
    // const suppliersCol = await db.collection("suppliers");
    // const ordersCol = await db.collection("orders");

    let insertCategories = await Category.insertMany([
      { name: "Electronics", description: "Description of electronics" },
      { name: "Clothing", description: "Description of clothes" },
      {
        name: "Home Appliances",
        description: "Description of home appliances",
      },
      {
        name: "Beauty & Personal Care",
        description: "Description of Beauty & Personal Care",
      },
      {
        name: "Sports & Outdoors",
        description: "Description of Sports & Outdoors",
      },
    ]);

    let insertProducts = await Product.insertMany([
      {
        name: "Laptop",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 1000,
        cost: 800,
        stock: 50,
      },
      {
        name: "Smartphone",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 800,
        cost: 600,
        stock: 40,
      },
      {
        name: "T-shirt",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 20,
        cost: 10,
        stock: 100,
      },
      {
        name: "Refrigerator",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 1200,
        cost: 1000,
        stock: 30,
      },
      {
        name: "Shampoo",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 10,
        cost: 5,
        stock: 80,
      },
      {
        name: "Soccer Ball",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 30,
        cost: 20,
        stock: 60,
      },
    ]);

    let insertOffers = await Offer.insertMany([
      {
        products: [insertProducts[0]._id, insertProducts[1]._id],
        price: 1800,
        active: true,
      },
    ]);

    let insertSuppliers = await Supplier.insertMany([
      {
        name: "Electronics Supplier Inc.",
        contact: "John Doe (john@electronicsupplier.com)",
      },
      {
        name: "Fashion Supplier Co.",
        contact: "Jane Smith (jane@fashionsupplier.com)",
      },
      {
        name: "Home Appliance AB.",
        contact: "Anders Anderssonn (anders@homeappliance.com)",
      },
    ]);

    let insertOrders = await Order.insertMany([
      {
        products: [insertProducts[0]._id, insertProducts[1]._id],
        price: 1800,
        active: true,
      },
      {
        products: [insertProducts[2]._id, insertProducts[4]._id],
        price: 30,
        active: true,
      },
      {
        products: [
          insertProducts[3]._id,
          insertProducts[1]._id,
          insertProducts[5]._id,
        ],
        price: 1830,
        active: false,
      },
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
createDatabase();
