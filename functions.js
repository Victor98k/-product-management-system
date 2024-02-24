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
  try {
    const suppliers = await SuppliersModel.find();
    if (suppliers.length === 0) {
      console.log("There are no suppliers to display.");
      return;
    }

    suppliers.forEach((supplier, index) => {
      console.log(`${index + 1}: Supplier Name: ${supplier.name}`);
    });

    const supplierIndex = parseInt(p("Choose a supplier by entering its number: ")) - 1;
    const selectedSupplier = suppliers[supplierIndex];

    if (!selectedSupplier) {
      console.log("Invalid supplier selection.");
      return;
    }

    const products = await ProductsModel.find({ 'supplier.name': selectedSupplier.name });
    if (products.length === 0) {
      console.log(`No products found for supplier: ${selectedSupplier.name}`);
      return;
    }

    console.log(`Products provided by ${selectedSupplier.name}:`);
    products.forEach((product) => {
      console.log(`Name: ${product.name}, Price: ${product.price}, Cost: ${product.cost}, Stock: ${product.stock}`);
    });
  } catch (error) {
    console.error("An error occurred while viewing products by supplier:", error);
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




// Function to view the number of orders based on the number of its products in stock
export async function viewordersBasedOnStock() {
  try {
    const offers = await OffersModel.find();
    let offersDetails = await Promise.all(offers.map(async (offer) => {
      let totalStock = 0;
      let productsDetails = [];
      for (const productName of offer.products) {
        const product = await ProductsModel.findOne({ name: productName });
        if (product) {
          totalStock += product.stock;
          productsDetails.push({ name: product.name, price: product.price, cost: product.cost, stock: product.stock });
        }
      }
      return {
        offerName: offer.offerName, 
        totalStock: offer.active ? totalStock : undefined, 
        products: productsDetails,
        active: offer.active
      };
    }));

    offersDetails.sort((a, b) => {
      if (!a.active) return 1;
      if (!b.active) return -1;
      return b.totalStock - a.totalStock;
    });

    offersDetails.forEach((offer, index) => {
      console.log(`${index + 1}. Offer: ${offer.offerName || 'No name available'}, Total in Stock: ${offer.active ? offer.totalStock : 'Inactive'}`);
      if (offer.active) { 
        offer.products.forEach(product => {
          console.log(`  Product: ${product.name}, Price: ${product.price}, Cost: ${product.cost}, Stock: ${product.stock}`);
        });
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
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
// Function to ship orders
export async function shipOrders() {
  try {
    const orders = await OrdersModel.find({ status: { $ne: 'Shipped' } });
    if (orders.length === 0) {
      console.log("There are no orders to display.");
      return;
    }

    orders.forEach((order, index) => {
      console.log(`${index + 1}: Order ID: ${order._id}, Status: ${order.status}`);
    });

    const orderIndex = parseInt(p("Choose an order by entering its number: ")) - 1;
    const selectedOrder = orders[orderIndex];

    if (!selectedOrder) {
      console.log("Invalid order selection.");
      return;
    }

    const action = p("Enter 'ship' to ship the order, or 'back' to go back: ").toLowerCase();

    if (action === 'ship') {
      await OrdersModel.updateOne({ _id: selectedOrder._id }, { $set: { status: 'Shipped' } });

      if (selectedOrder.product && selectedOrder.quantity) {
        await ProductsModel.updateOne({ _id: selectedOrder.product }, { $inc: { stock: -selectedOrder.quantity } });
      }

      console.log(`Order ID: ${selectedOrder._id} has been marked as Shipped and stock quantities updated.`);
    } else if (action === 'back') {
      console.log("Going back to the previous menu...");
    } else {
      console.log("Invalid action.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
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
export async function viewAllSales() {
  try {
    const salesOrders = await OrdersModel.find();
    if (salesOrders.length === 0) {
      console.log("There are no sales orders to display.");
      return;
    }

    salesOrders.forEach((order) => {
      console.log(`Order ID: ${order._id}, Status: ${order.status}, Total Cost: ${order.total_cost}`);
    });

    console.log("Enter 'back' to return to the main menu.");
    const action = p("Your choice: ").toLowerCase();
    if (action === 'back') {
      console.log("Returning to the main menu...");
    } else {
      console.log("Invalid action. Returning to the main menu...");
    }
  } catch (error) {
    console.error("An error occurred while viewing all sales:", error);
  }
}

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

