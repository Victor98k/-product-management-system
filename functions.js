import promptSync from "prompt-sync";
import mongoose from "mongoose";
import {
  CategoriesModel,
  OffersModel,
  OrdersModel,
  SuppliersModel,
} from "./models.js";

const prompt = promptSync();

export async function addNewCategory() {
  console.log("Add new category");
  let name = prompt("Enter category name: ");
  let categoryDescription = prompt("Enter category description: ");

  let newCategory = {
    name,
    categoryDescription,
  };

  await CategoriesModel.create(newCategory);

  console.log("You have added a new category");
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
  const categoryName = p("Enter the category: ");

  const category = await CategoriesModel.findOne({
    name: { $regex: new RegExp(categoryName, "i") },
  });

  if (category) {
    const productsInCategory = await ProductsModel.find({
      category: { $regex: new RegExp(categoryName, "i") },
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

export async function viewAllOffersInPriceRange(lowerLimit, upperLimit) {
  console.log("View all offers within a price range");

  // Function to view all offers in a specific price range
  const offers = await OffersModel.find({
    price: {
      $gte: lowerLimit,
      $lte: upperLimit,
    },
  });
  console.log(
    `Offers within the price range of ${lowerLimit} and ${upperLimit}`
  );
  offers.forEach((offer) => {
    console.log(
      ` Products: ${offer.products.join(", ")},  
        Price: ${offer.price}, Active: ${offer.active}`
    );
  });
}

export async function offersFromCategory() {
  const categoryName = p("Enter the category: ");

  const offersInCategory = await OffersModel.find({
    category: { $regex: new RegExp(categoryName, "i") },
  });

  if (offersInCategory.length > 0) {
    console.log(`Offers in category ${categoryName}:`);
    offersInCategory.forEach((offer) => {
      console.log(
        `- Offer ID: ${offer._id}, Products: ${offer.products.join(
          ", "
        )}, Price: ${offer.price}, Active: ${offer.active}`
      );
    });
  } else {
    console.log(`No offers found in category ${categoryName}.`);
  }
}

export async function viewOffersBasedOnStock() {
  // Function to view the number of offers based on the number of its products in stock
}

export async function createOrderForProducts() {
  console.log("Create order for products");
  let productName = prompt("Enter the product name: ");
  let quantity = prompt("Enter the quantity: ");
  let additionalDetail = prompt("Enter additional detail: ");

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

export async function viewAllSales() {
  // Function to view all sales
}

export async function viewSumOfProfits() {
  // Function to view the sum of all profits
  console.log("View sum of all profits");

  let choice = prompt(
    "Enter 'all' to view all offers\nor 'product' to view offers for a specific product: "
  );

  let offers;
  let productName; // Declare productName here

  if (choice.toLowerCase() === "product") {
    productName = prompt("Enter the name of the product: "); // Don't redeclare productName, just assign the value
    offers = await OffersModel.find({
      products: {
        $in: [productName],
      },
    });
  } else {
    offers = await OffersModel.find();
  }

  let totalProfit = 0;
  offers.forEach((offer) => {
    totalProfit += offer.price;
  });

  if (choice.toLowerCase() === "product") {
    console.log(
      `Total profit from offers containing ${productName}: ${totalProfit}`
    );
  } else {
    console.log(`Total profit: ${totalProfit}`);
  }
}
