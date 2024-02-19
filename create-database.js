import mongoose, { connect } from "mongoose";

const con = await connect("");

const { db } = mongoose.connection;

const productCol = await db.collection("products");

