import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const opts: any = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

export const uploadImage = (image: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(image, opts, (error: any, result: any) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};