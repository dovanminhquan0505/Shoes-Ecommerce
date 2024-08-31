import dotenv from 'dotenv';

dotenv.config();

//Read the URL of the .env file
export default {
    MONGODB_URL: process.env.MONGODB_URL,
}