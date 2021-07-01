import { config } from 'dotenv';
import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { parsed: envVariables } = config({
  path: `${__dirname.slice(0, __dirname.length - 3)}` + '/.env',
});
const connectionString = envVariables.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
