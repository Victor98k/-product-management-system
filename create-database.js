import mongoose, { connect } from "mongoose";

const con = await connect("");

const { db } = mongoose.connection;

const productCol = await db.collection("products");

<<<<<<< HEAD:index.js

daniel sjunger som en gud 
=======
>>>>>>> 0857f40c08ed54410ac1453fc4c0c898caa421c8:create-database.js
