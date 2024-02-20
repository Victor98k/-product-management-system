import mongoose, { connect } from "mongoose";

const createDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/product-management-system"
    );
    // const { db } = mongoose.connection;

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
      {
        name: "Beauty Supplies LTD.",
        contact: "Jefferey Star (jefferey@beautysupplies.com)",
      },
      {
        name: "Sports & Outdoors Activities AB",
        contact: "Hugo Hurtig (hurtig@soa.com)",
      },
    ]);

    let insertProducts = await Product.insertMany([
      // Electronics
      {
        name: "Tablet",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 600,
        cost: 400,
        stock: 30,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Electronics Supplier Inc."
        )._id,
      },
      {
        name: "Headphones",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 150,
        cost: 100,
        stock: 70,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Electronics Supplier Inc."
        )._id,
      },
      {
        name: "Smart Watch",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 200,
        cost: 150,
        stock: 50,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Electronics Supplier Inc."
        )._id,
      },
      {
        name: "Bluetooth Speaker",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 120,
        cost: 80,
        stock: 40,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Electronics Supplier Inc."
        )._id,
      },
      {
        name: "Digital Camera",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 500,
        cost: 350,
        stock: 25,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Electronics Supplier Inc."
        )._id,
      },
      {
        name: "Gaming Console",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 400,
        cost: 300,
        stock: 30,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Electronics Supplier Inc."
        )._id,
      },
      {
        name: "E-Reader",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 130,
        cost: 90,
        stock: 60,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Electronics Supplier Inc."
        )._id,
      },
      {
        name: "Drone",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 700,
        cost: 500,
        stock: 20,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Electronics Supplier Inc."
        )._id,
      },
      {
        name: "VR Headset",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 300,
        cost: 200,
        stock: 35,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Electronics Supplier Inc."
        )._id,
      },
      {
        name: "Action Camera",
        category: insertCategories.find(
          (category) => category.name === "Electronics"
        )._id,
        price: 250,
        cost: 150,
        stock: 45,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Electronics Supplier Inc."
        )._id,
      },

      // Clothing
      {
        name: "Jeans",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 50,
        cost: 30,
        stock: 100,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Fashion Supplier Co."
        )._id,
      },
      {
        name: "Hoodie",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 35,
        cost: 20,
        stock: 90,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Fashion Supplier Co."
        )._id,
      },
      {
        name: "Sneakers",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 80,
        cost: 50,
        stock: 80,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Fashion Supplier Co."
        )._id,
      },
      {
        name: "Dress",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 70,
        cost: 45,
        stock: 70,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Fashion Supplier Co."
        )._id,
      },
      {
        name: "Suit",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 200,
        cost: 150,
        stock: 30,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Fashion Supplier Co."
        )._id,
      },
      {
        name: "Scarf",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 25,
        cost: 10,
        stock: 120,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Fashion Supplier Co."
        )._id,
      },
      {
        name: "Hat",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 20,
        cost: 8,
        stock: 100,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Fashion Supplier Co."
        )._id,
      },
      {
        name: "Sunglasses",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 90,
        cost: 45,
        stock: 60,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Fashion Supplier Co."
        )._id,
      },
      {
        name: "Backpack",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 60,
        cost: 40,
        stock: 50,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Fashion Supplier Co."
        )._id,
      },
      {
        name: "Watch",
        category: insertCategories.find(
          (category) => category.name === "Clothing"
        )._id,
        price: 150,
        cost: 100,
        stock: 40,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Fashion Supplier Co."
        )._id,
      },

      // Home Appliances
      {
        name: "Microwave Oven",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 100,
        cost: 70,
        stock: 50,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Home Appliance AB."
        )._id,
      },
      {
        name: "Coffee Maker",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 90,
        cost: 60,
        stock: 40,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Home Appliance AB."
        )._id,
      },
      {
        name: "Blender",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 50,
        cost: 30,
        stock: 60,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Home Appliance AB."
        )._id,
      },
      {
        name: "Dishwasher",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 400,
        cost: 300,
        stock: 25,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Home Appliance AB."
        )._id,
      },
      {
        name: "Vacuum Cleaner",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 150,
        cost: 100,
        stock: 40,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Home Appliance AB."
        )._id,
      },
      {
        name: "Air Purifier",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 200,
        cost: 150,
        stock: 30,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Home Appliance AB."
        )._id,
      },
      {
        name: "Electric Kettle",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 40,
        cost: 25,
        stock: 70,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Home Appliance AB."
        )._id,
      },
      {
        name: "Washing Machine",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 500,
        cost: 350,
        stock: 20,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Home Appliance AB."
        )._id,
      },
      {
        name: "Dryer",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 450,
        cost: 300,
        stock: 20,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Home Appliance AB."
        )._id,
      },
      {
        name: "Toaster",
        category: insertCategories.find(
          (category) => category.name === "Home Appliances"
        )._id,
        price: 30,
        cost: 20,
        stock: 80,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Home Appliance AB."
        )._id,
      },

      // Beauty & Personal Care
      {
        name: "Lipstick",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 15,
        cost: 7,
        stock: 90,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Beauty Supplies LTD."
        )._id,
      },
      {
        name: "Moisturizer",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 25,
        cost: 12,
        stock: 80,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Beauty Supplies LTD."
        )._id,
      },
      {
        name: "Perfume",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 100,
        cost: 50,
        stock: 60,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Beauty Supplies LTD."
        )._id,
      },
      {
        name: "Hair Dryer",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 60,
        cost: 40,
        stock: 50,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Beauty Supplies LTD."
        )._id,
      },
      {
        name: "Shaving Kit",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 30,
        cost: 20,
        stock: 70,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Beauty Supplies LTD."
        )._id,
      },
      {
        name: "Nail Polish",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 10,
        cost: 5,
        stock: 100,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Beauty Supplies LTD."
        )._id,
      },
      {
        name: "Facial Cleanser",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 20,
        cost: 10,
        stock: 80,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Beauty Supplies LTD."
        )._id,
      },
      {
        name: "Sunscreen",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 35,
        cost: 18,
        stock: 75,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Beauty Supplies LTD."
        )._id,
      },
      {
        name: "Conditioner",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 15,
        cost: 7.5,
        stock: 85,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Beauty Supplies LTD."
        )._id,
      },
      {
        name: "Makeup Kit",
        category: insertCategories.find(
          (category) => category.name === "Beauty & Personal Care"
        )._id,
        price: 200,
        cost: 100,
        stock: 40,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Beauty Supplies LTD."
        )._id,
      },

      // Sports & Outdoors
      {
        name: "Yoga Mat",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 20,
        cost: 12,
        stock: 80,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Sports & Outdoors Activities AB"
        )._id,
      },
      {
        name: "Tennis Racket",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 80,
        cost: 50,
        stock: 40,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Sports & Outdoors Activities AB"
        )._id,
      },
      {
        name: "Basketball",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 25,
        cost: 15,
        stock: 70,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Sports & Outdoors Activities AB"
        )._id,
      },
      {
        name: "Fitness Tracker",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 100,
        cost: 60,
        stock: 50,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Sports & Outdoors Activities AB"
        )._id,
      },
      {
        name: "Camping Tent",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 150,
        cost: 100,
        stock: 30,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Sports & Outdoors Activities AB"
        )._id,
      },
      {
        name: "Hiking Backpack",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 120,
        cost: 80,
        stock: 35,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Sports & Outdoors Activities AB"
        )._id,
      },
      {
        name: "Swimming Goggles",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 15,
        cost: 9,
        stock: 90,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Sports & Outdoors Activities AB"
        )._id,
      },
      {
        name: "Cycling Helmet",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 50,
        cost: 30,
        stock: 60,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Sports & Outdoors Activities AB"
        )._id,
      },
      {
        name: "Golf Clubs Set",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 300,
        cost: 200,
        stock: 20,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Sports & Outdoors Activities AB"
        )._id,
      },
      {
        name: "Skateboard",
        category: insertCategories.find(
          (category) => category.name === "Sports & Outdoors"
        )._id,
        price: 60,
        cost: 40,
        stock: 50,
        supplier: insertSuppliers.find(
          (supplier) => supplier.name === "Sports & Outdoors Activities AB"
        )._id,
      },
    ]);

    let insertOffers = await Offer.insertMany([
      {
        products: [insertProducts[0]._id, insertProducts[1]._id],
        price: 1800,
        active: true,
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
