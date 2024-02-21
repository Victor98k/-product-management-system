import mongoose, { connect } from "mongoose";
import prompt from "prompt-sync";
import { addNewCategory, addNewProduct } from "./functions.js";

const p = prompt();

const main = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/product-management-system");

    const { db } = mongoose.connection;

    const productCol = await db.collection("");
    const catergoryCol = await db.collection("");

    const categorySchema = mongoose.Schema({
      categoryName: String,
      catergoryType: String,
    });

    const productSchema = mongoose.Schema({
      categoryName: String,
      catergoryType: String,
    });

    const catergoryModel = mongoose.model("Categorys", categorySchema);

    // Start Menu

    console.log("--------------Main Menu---------------");
    console.log("1. Add new category");
    console.log("2. Add new product");
    console.log("3. View products by category");
    console.log("4. View products by supplier");
    console.log("5. View all offers within a price range");
    console.log(
      "6. View all offers that contain a product from a specific category"
    );
    //
    console.log(
      "7. View the number of offers based on the number of its products in stock"
    );
    console.log("8. Create order for products");
    console.log("9. Create order for offers");
    console.log("10. Ship orders");
    console.log("11. Add a new supplier");
    console.log("12. View suppliers");
    console.log("13.  View all sales");
    console.log("14.  View sum of all profits");
    console.log("15. Exit application");
  } catch (error) {
    console.log(("Error fetching data:", error));
  }

  let runApp = true;

  while (runApp) {
    let prompt = p("Make a choice by entering number: ");
    switch (prompt) {
      case "1":
        console.clear();
        await addNewCategory();
        break;

      case "2":
        console.clear();
        await addNewProduct();
        break;

      case "3":
        console.clear();
        await viewProductsByCategory();
        break;

      case "4":
        console.clear();
        await viewProductsBySupplier();
        break;
      case "5":
        console.clear();
        await viewAllOffersInPriceRange();
        break;
      case "6":
        console.clear();
        await offersFromCategory();
        break;
      case "7":
        console.clear();
        await viewOffersBasedOnStock();
        break;
      case "8":
        console.clear();
        await createOrderForProducts();
        break;
      case "9":
        console.clear();
        await createOrderForOffers();
        break;
      case "10":
        console.clear();
        await shipOrders();
        break;
      case "11":
        console.clear();
        await addNewSupplier();
        break;
      case "12":
        console.clear();
        await viewAllSuppliers();
        break;
      case "13":
        console.clear();
        await viewAllSales();
        break;
      case "14":
        console.clear();
        await viewSumOfProfits();
        break;
      case "15":
        console.clear();
        // EXIT APP CODE
        break;
      default:
        console.log("Please enter a number between 1-5");
    }
  }
};
main();

// async function addNewCategory() {
//   // Function to add new category
//   let name = p("Enter category name: ");
//   let catergoryType = p("Enter category type: ");

//   let newCategory = {
//     name,
//     catergoryType,
//   };
//   await catergoryCol.create(newCategory);
//   console.log(" You have added a new category: ");
//   console.log(newCategory);
// }

// async function addNewProduct() {
//   // Function to add new product
//   console.log("Add new product");
//   async function addNewProduct() {
//     let Namee = p("Enter name of product");
//     let Category = p("Enter Category");
//     let Price = p("Enter Price");
//     let Cost = p("Enter Cost");
//     let Stock = p("Enter Stock");
//   }
//   let newProduct = {
//     Namee,
//     Category,
//     Price,
//     Cost,
//     Stock,
//   };
//   await productModel.create(newProduct);
//   console.log("You have added a new product");
//   console.log(newProduct);
// }

// async function viewProductsByCategory() {
//   // Function to view products by category
// }

// async function viewProductsBySupplier() {
//   // Function to view products by supplier
// }

// async function viewAllOffersInPriceRange() {
//   // Function to view all offers in a specific price range
// }

// async function offersFromCategory() {
//   // Function to view all offers that contain a product from a specific category
// }

// async function viewOffersBasedOnStock() {
//   // Function to view the number of offers based on the number of its products in stock
// }

// async function createOrderForProducts() {
//   // Function to create order for individual products
// }

// async function createOrderForOffers() {
//   // Function to create order for offers
// }

// async function shipOrders() {
//   // Function to ship orders
// }

// async function addNewSupplier() {
//   // Function to add new supplier
// }

// async function viewAllSuppliers() {
//   // Function to view all suppliers
// }

// async function viewAllSales() {
//   // Function to view all sales
// }

// async function viewSumOfProfits() {
//   // Function to view the sum of all profits
// }
