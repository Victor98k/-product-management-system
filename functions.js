import PromptSync from "prompt-sync";
import mongoose from "mongoose";
import {
  OrdersModel,
  ProductsModel,
  OffersModel,
  SuppliersModel,
  CategoriesModel,
} from "./models.js";

const p = PromptSync();

export async function addNewCategory() {
  // Function to add new category
  let name = prompt("Enter category name: ");
  let categoryType = prompt("Enter category type: ");

  let newCategory = {
    name,
    categoryType,
  };
  await categoryCol.create(newCategory);
  console.log("You have added a new category: ");
  console.log(newCategory);
}

export async function addNewProduct() {
  const p = prompt();
  // Function to add new product
  console.log("Add new product");
  async function addNewProduct() {
    let Namee = p("Enter name of product");
    let Category = p("Enter Category");
    let Price = p("Enter Price");
    let Cost = p("Enter Cost");
    let Stock = p("Enter Stock");
  }
  let newProduct = {
    Namee,
    Category,
    Price,
    Cost,
    Stock,
  };
  await productModel.create(newProduct);
  console.log("You have added a new product");
  console.log(newProduct);
}

export async function viewProductsByCategory() {
  const categoryName = p("Enter the category: "); // Get category input from the user

  // First, find the category in the database to ensure it exists
  const category = await CategoriesModel.findOne({ name: categoryName });

  if (category) {
    // If the category exists, find products in that category
    const productsInCategory = await ProductsModel.find({
      category: categoryName,
    });

    if (productsInCategory.length > 0) {
      console.log(`Products in category ${categoryName}:`);
      productsInCategory.forEach((product) => console.log(`- ${product.name}`));
    } else {
      console.log(`No products found in category ${categoryName}.`);
    }
  } else {
    console.log(`Category ${categoryName} does not exist.`);
  }
}

export async function viewProductsBySupplier() {
  // Function to view products by supplier
}

export async function viewAllOffersInPriceRange() {
  // Function to view all offers in a specific price range
}

export async function offersFromCategory() {
  // Function to view all offers that contain a product from a specific category
}

export async function viewOffersBasedOnStock() {
  // Function to view the number of offers based on the number of its products in stock
}

export async function createOrderForProducts() {
  // Function to create order for individual products
}

export async function createOrderForOffers() {
  // Function to create order for offers
}

export async function shipOrders() {
  // Function to ship orders
}

export async function addNewSupplier() {
  // Function to add new supplier
}

export async function viewAllSuppliers() {
  // Function to view all suppliers
}

export async function viewAllSales() {
  // Function to view all sales
}

export async function viewSumOfProfits() {
  // Function to view the sum of all profits
}
