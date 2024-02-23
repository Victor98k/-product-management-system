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

  const orders = await OrdersModel.find({
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

    // Retrieve all products within the selected category
    const productsInCategory = await ProductsModel.find({
      category: selectedCategory.name,
    });

    // Extract the names of these products
    const productNames = productsInCategory.map((product) => product.name);

    // Find all offers that contain any of these products
    const offers = await OffersModel.find({
      products: { $in: productNames }, // This line checks if any of the products in an offer belong to the selected category
    });

    console.log(
      `\nOffers containing product(s) in the "${selectedCategory.name}" category:\n`
    );
    offers.forEach((offer, index) => {
      console.log(
        `${index + 1}. \n - Products: ${offer.products.join(
          ", "
        )} \n - Price: $${offer.price}, Active: ${offer.active ? "Yes" : "No"}`
      );
    });
  } catch (error) {
    console.error("Error viewing offers by category:", error);
  }
}

// export async function offersFromCategory() {
//   console.log("You have chosen to view offers based on Category.");

//   try {
//     const categories = await CategoriesModel.find();
//     console.log(
//       "You can choose to view products out of following categories:\n "
//     );
//     categories.forEach((category, index) => {
//       console.log(`${index + 1}. ${category.name}`);
//     });
//     console.log("\n");
//     const choice = parseInt(p("Choose category by entering the number: "));
//     const selectedCategory = categories[choice - 1];

//     const offers = await OffersModel.find({
//       category: selectedCategory.name,
//     });
//     console.log(`\nProducts in category "${selectedCategory.name}":\n`);
//     offers.forEach((offer, index) => {
//       console.log(
//         `${index + 1}. ${offer.products} - Price: $${offer.price}, Active: ${
//           offer.active
//         }`
//       );
//     });
//   } catch (error) {
//     console.error("Error viewing offers by category:", error);
//   }
// }

export async function viewordersBasedOnStock() {
  // Function to view the number of orders based on the number of its products in stock
}

export async function createOrderForProducts() {
  console.log("Create order for products");
  const productName = p("Enter the product name: ");
  const quantity = parseInt(p("Enter the quantity: "), 10);
  const additionalDetail = p("Enter additional detail: ");

  try {
    // Find the product by name with sufficient stock
    let productToOrder = await ProductsModel.findOne({
      name: { $regex: new RegExp(productName, "i") },
      stock: { $gte: quantity },
    });

    if (!productToOrder || productToOrder.stock < quantity) {
      console.log(
        `${productName} is out of stock or does not have enough stock!`
      );
      return;
    }

    // Create a new SalesOrder document
    const newProductOrder = new OrdersModel({
      product: productToOrder.toObject(), // Assuming you're embedding the whole product
      quantity: quantity,
      status: "pending", // Providing a value for the required 'status' field
      additional_detail: additionalDetail,
      total_price: productToOrder.price * quantity, // Example calculation for total price
      total_cost: productToOrder.cost * quantity, // Example calculation for total cost
    });

    // Save the new SalesOrder document to the database
    await newProductOrder.save();

    // Reduce the stock of the ordered product
    await ProductsModel.updateOne(
      { _id: productToOrder._id },
      { $inc: { stock: -quantity } }
    );

    console.log(`Order for ${productName} created successfully!`);
  } catch (error) {
    console.error("Error creating order for products:", error);
  }
  // let product = await OrdersModel.findOne({
  //   name: { $regex: new RegExp(productName, "i") },
  // });
  // console.log(
  //   `Product: ${productName},
  //    Quantity: ${quantity},
  //    Additional Detail: ${additionalDetail}`
  // );
  // Function to create order for individual products
}

// // Function to create order for offers
export async function createOrderForOffers() {
  try {
    const offers = await OffersModel.find({ active: true });
    console.log("Available Offers: \n");
    offers.forEach((offer, index) => {
      console.log(
        `${index + 1}. Offer: \n - Products: ${offer.products} \n - Price: $${
          offer.price
        } \n`
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
      p(`Enter the quantity of Offer ${selectedOffer.offer} to order: `)
    );
    if (isNaN(quantity) || quantity <= 0) {
      console.log(`Invalid quantity for Offer ${selectedOffer.offer}.`);
      return;
    }

    const newOrder = new OrdersModel({
      offer: selectedOffer.offer,
      quantity,
      status: "pending",
    });
    await newOrder.save();

    console.log(`Order created successfully for Offer ${selectedOffer.offer}.`);
  } catch (error) {
    console.error("Error creating order for offers:", error);
  }
}

export async function shipOrders() {
  // Function to ship orders
}

// Function to add new supplier
export async function addNewSupplier() {
  try {
    console.log("Add new supplier");
    const name = p("Enter name of new supplier: ");
    const contactName = p("Enter new contact name: ");
    const contactEmail = p("Enter new supplier email: ");

    const newSupplier = new SuppliersModel({
      name: name,
      contact: {
        name: contactName,
        email: contactEmail,
      },
    });

    await newSupplier.save();
    console.log(` \n Supplier "${name}" was added!`);
  } catch (error) {
    console.error("Error adding new supplier:", error);
  }
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
    orders = await OrdersModel.find({
      products: {
        $in: [productName],
      },
    });
  } else {
    orders = await OrdersModel.find();
  }

  let totalProfit = 0;
  orders.forEach((order) => {
    if (order.products) {
      let profit = order.price;
      if (order.products.length > 10) {
        profit *= 0.9; // Apply 10% tax
      }
      totalProfit += profit;
    } else {
      console.log("An order without products was found.");
    }
  });

  if (choice.toLowerCase() === "product") {
    console.log(
      `Total profit from orders containing ${productName}: ${totalProfit}`
    );
  } else {
    console.log(`Total profit: ${totalProfit}`);
  }
}
