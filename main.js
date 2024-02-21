import mongoose, { connect } from "mongoose";
import PromptSync from "prompt-sync";
import {
  addNewCategory,
  viewProductsByCategory,
  offersFromCategory,
} from "./functions.js";
const p = PromptSync();
import {
  SuppliersModel,
  OffersModel,
  OrdersModel,
  ProductsModel,
  CategoriesModel,
} from "./models.js";
import {
  sampleOffers,
  sampleOrders,
  sampleSuppliers,
  sampleProducts,
} from "./SampleData.js";

let supplierCol = SuppliersModel.collection;
let offerCol = OffersModel.collection;
let salesOrderCol = OrdersModel.collection;
let productCol = ProductsModel.collection;
let categoriesCol = CategoriesModel.collection;

const connectToDatabase = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/product-management-system");
    console.log("You are now connected to MongoDB");
  } catch (error) {
    console.log("ERROR 404 - Could not connect to MongoDB", error);
  }
};
connectToDatabase();

const main = async () => {
  let runApp = true;

  while (runApp) {
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

    let choice = p("Make a choice by entering number: ");

    switch (choice) {
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
