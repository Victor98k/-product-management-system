import promptSync from "prompt-sync";
import mongoose from "mongoose";
import {
  CategoriesModel,
  SuppliersModel,
  ProductsModel,
  OffersModel,
  OrdersModel,
} from "./models.js";

const p = promptSync();

export async function addNewCategory() {
  console.log("Add new category");
  let name = p("Enter category name: ");
  let categoryDescription = p("Enter category description: ");

  let newCategory = {
    name,
    categoryDescription,
  };

  await CategoriesModel.create(newCategory);

  console.log("You have added a new category");
  console.log(newCategory);
}

// Function to add new product
export async function addNewProduct() {
  console.log("Add new product");

  let Namee = p("Enter name of product: ");
  let Category = p("Enter Category: ");
  let Price = p("Enter Price: ");
  let Cost = p("Enter Cost: ");
  let Stock = p("Enter Stock: ");

  let newProduct = {
    name: Namee,
    category: Category,
    price: Price,
    cost: Cost,
    stock: Stock,
  };
  await ProductsModel.create(newProduct);
  console.log("You have added a new product");
  console.log(newProduct);
}

// Function to view products by category
export async function viewProductsByCategory() {
  console.log("You have chosen to view products based on Category.");

  try {
    const categories = await CategoriesModel.find();
    console.log(
      "You can choose to view products out of following categories:\n "
    );
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.name}`);
    });
    console.log("\n");
    const choice = parseInt(p("Choose category by entering the number: "));
    const selectedCategory = categories[choice - 1];

    const products = await ProductsModel.find({
      category: selectedCategory.name,
    });
    console.log(`\nProducts in category "${selectedCategory.name}":\n`);
    products.forEach((product, index) => {
      console.log(
        `${index + 1}. ${product.name} - Price: $${product.price}, Stock: ${
          product.stock
        }`
      );
    });
  } catch (error) {
    console.error("Error viewing products by category:", error);
  }
}

// Function to view products by supplier
export async function viewProductsBySupplier() {
  console.log("You have chosen to view products based on supplier.");

  try {
    const supplier = await SuppliersModel.find();
    console.log(
      "You can choose to view products from the following suppliers:\n "
    );
    supplier.forEach((supplier, index) => {
      console.log(`${index + 1}. ${supplier}`);
    });
    console.log("\n");
    const choice = parseInt(p("Choose supplier by entering a number: "));
    const selectedSupplier = supplier[choice - 1];

    const products = await ProductsModel.find({
      supplier: selectedSupplier.name,
    });
    console.log(`\nProducts of Supplier "${selectedSupplier.name}":\n`);
    products.forEach((product, index) => {
      console.log(
        `${index + 1}. ${product.name} - Price: $${product.price}, Stock: ${
          product.stock
        }`
      );
    });
  } catch (error) {
    console.error("Error viewing products by supplier:", error);
  }
}

// Function to view all orders in a specific price range
export async function viewAllOffersInPriceRange(lowerLimit, upperLimit) {
  console.log("View all orders within a price range");

  const orders = await ordersModel.find({
    price: {
      $gte: lowerLimit,
      $lte: upperLimit,
    },
  });
  console.log(
    `orders within the price range of ${lowerLimit} and ${upperLimit}`
  );
  orders.forEach((offer) => {
    console.log(
      ` Products: ${offer.products.join(", ")},  
        Price: ${offer.price}, Active: ${offer.active}`
    );
  });
}

// Function to view offers from category
export async function offersFromCategory() {
  console.log("You have chosen to view offers based on Category.");

  try {
    const categories = await CategoriesModel.find();
    console.log(
      "You can choose to view products out of following categories:\n "
    );
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.name}`);
    });
    console.log("\n");
    const choice = parseInt(p("Choose category by entering the number: "));
    const selectedCategory = categories[choice - 1];

    const offers = await OffersModel.find({
      category: selectedCategory.name,
    });
    console.log(`\nProducts in category "${selectedCategory.name}":\n`);
    offers.forEach((offer, index) => {
      console.log(
        `${index + 1}. ${offer.products} - Price: $${offer.price}, Active: ${
          offer.active
        }`
      );
    });
  } catch (error) {
    console.error("Error viewing offers by category:", error);
  }
}

export async function viewordersBasedOnStock() {
  // Function to view the number of orders based on the number of its products in stock
}

export async function createOrderForProducts() {
  console.log("Create order for products");
  let productName = p("Enter the product name: ");
  let quantity = p("Enter the quantity: ");
  let additionalDetail = p("Enter additional detail: ");

  let product = await OrdersModel.findOne({
    name: { $regex: new RegExp(productName, "i") },
  });
  console.log(
    `Product: ${productName},
     Quantity: ${quantity}, 
     Additional Detail: ${additionalDetail}`
  );
  // Function to create order for individual products
}

// // Function to create order for offers
export async function createOrderForOffers() {
  try {
    const offers = await OffersModel.find({ active: true });
    console.log("Available Offers: \n");
    offers.forEach((offer, index) => {
      console.log(
        `${index + 1}. Offer ID: ${offer._id} \n - Products: ${
          offer.products
        } \n - Price: $${offer.price} \n`
      );
    });

    const selectedIndex =
      parseInt(p("Enter the index of the offer to include in the order: ")) - 1;

    if (
      isNaN(selectedIndex) ||
      selectedIndex < 0 ||
      selectedIndex >= offers.length
    ) {
      console.log("Invalid offer index.");
      return;
    }

    const selectedOffer = offers[selectedIndex];

    const quantity = parseInt(
      p(`Enter the quantity of Offer ${selectedOffer._id} to order: `)
    );
    if (isNaN(quantity) || quantity <= 0) {
      console.log(`Invalid quantity for Offer ${selectedOffer._id}.`);
      return;
    }

    const newOrder = new OrdersModel({
      offer: selectedOffer._id,
      quantity,
      status: "pending",
    });
    await newOrder.save();

    console.log(`Order created successfully for Offer ${selectedOffer._id}.`);
  } catch (error) {
    console.error("Error creating order for offers:", error);
  }
}

export async function shipOrders() {
  // Function to ship orders
}

export async function addNewSupplier() {
  // Function to add new supplier
}

export async function viewAllSuppliers() {
  // Function to view all suppliers
  console.log("View all suppliers");
  const suppliers = await SuppliersModel.find();
  console.log("All suppliers");
  suppliers.forEach((supplier) => {
    console.log(
      `Name: ${supplier.name}, 
      Contact: ${supplier.contact.name}`
    );
  });
}
// Function to view all sales
export async function viewAllSales() {}

export async function viewSumOfProfits() {
  // Function to view the sum of all profits
  console.log("View sum of all profits");

  let choice = p(
    "Enter 'all' to view all orders\nor 'product' to view orders for a specific product: "
  );

  let orders;
  let productName;

  if (choice.toLowerCase() === "product") {
    productName = p("Enter the name of the product: ");
    orders = await SalesOrdersSchema.find({
      products: {
        $in: [productName],
      },
    });
  } else {
    orders = await SalesOrdersSchema.find();
  }

  let totalProfit = 0;
  orders.forEach((order) => {
    let profit = order.price;
    if (order.products.length > 10) {
      profit *= 0.9; // Apply 10% tax
    }
    totalProfit += profit;
  });

  if (choice.toLowerCase() === "product") {
    console.log(
      `Total profit from orders containing ${productName}: ${totalProfit}`
    );
  } else {
    console.log(`Total profit: ${totalProfit}`);
  }
}
