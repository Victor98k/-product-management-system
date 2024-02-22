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

export async function viewProductsBySupplier() {
  // Function to view products by supplier
}

export async function viewAllOffersInPriceRange() {
  // Function to view all offers in a specific price range
}

export async function offersFromCategory() {
  console.log("You have chosen to view offers based on Category.");
  console.log("You have chosen to view offers based on Category.");

  try {
    const allCategories = await ProductsModel.aggregate([
      { $group: { _id: "$category" } },
    ]);

    // Generate the choices string including the option to exit
    const choices = allCategories
      .map((category) => category._id)
      .concat("Exit")
      .join(" / ");

    // Use prompt-sync to capture user input
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

    const offersContainingCategory = await OffersModel.aggregate([
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

    if (offersContainingCategory.length === 0) {
      console.log(`No offers found for category: ${categoryInput}`);
      return;
    }

    offersContainingCategory.forEach((offer, index) => {
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
