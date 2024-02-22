import promptSync from "prompt-sync";
import mongoose from "mongoose";
import {
  CategoriesModel,
  SuppliersModel,
  ProductsModel,
  OffersModel,
  SalesOrdersSchema,
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

export async function viewAllordersInPriceRange(lowerLimit, upperLimit) {
  console.log("View all orders within a price range");

  // Function to view all orders in a specific price range
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

export async function ordersFromCategory() {
  console.log("You have chosen to view orders based on Category.");

  try {
    const allCategories = await ProductsModel.aggregate([
      { $group: { _id: "$category" } },
    ]);

    // Generate the choices string including the option to exit
    const choices = allCategories
      .map((category) => category._id)
      .concat("Exit")
      .join(" / ");

    // Use p-sync to capture user input
    const categoryInput = p(`Choose a category (${choices}): `);

    // Check if the user chose to exit
    if (categoryInput === "Exit") {
      return;
    }

    // Validate if the input is one of the categories
    if (
      !allCategories.map((category) => category._id).includes(categoryInput)
    ) {
      console.log("Invalid category selected.");
      return;
    }

    const ordersContainingCategory = await ordersModel.aggregate([
      {
        $match: {
          $or: [
            { category: categoryInput },
            { category: { $in: [categoryInput] } },
          ],
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$_id",
          price: { $first: "$price" },
          active: { $first: "$active" },
          products: { $push: "$products" },
        },
      },
    ]);

    if (ordersContainingCategory.length === 0) {
      console.log(`No orders found for category: ${categoryInput}`);
      return;
    }

    ordersContainingCategory.forEach((offer, index) => {
      console.log(
        `Offer ${index + 1}:\nPrice: $${offer.price} \nActive: ${
          offer.active ? "Yes" : "No"
        }\nIncluded Products: ${offer.products.join(
          ", "
        )}\n------------------------`
      );
    });
  } catch (error) {
    console.log(error);
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

export async function createOrderFororders() {
  // Function to create order for orders
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
