import mongoose, { connect } from "mongoose";
import prompt from "prompt-sync";

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

    const p = prompt();

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
  } catch (error) {
    console.log(("Error fetching data:", error));
  }
};
main();
