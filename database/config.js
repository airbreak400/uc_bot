import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log('Connected to the DB...');
