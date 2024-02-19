import asyncHandler from 'express-async-handler';
import Product from './productModel';
import * as productService from './productService';
import { validateStaticProduct, validateUpdateProduct } from './productValidator';
import express, { Application, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { json, urlencoded } from 'body-parser';
import multer from 'multer';
import mongoose from 'mongoose';

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dxwxjmxe6',
  api_key: '867413614653484',
  api_secret: '9-gS5zBTOAnrmFUgXs7JMdlVGgs',
});

const fileUpload = multer({ dest: 'uploads/' });

// @Desc Get all products
// @Route/api/products/
// @Method GET
export const index = asyncHandler(async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error retrieving products',
    });
  }
});

// @Desc Get one product
// @Route/api/products/:productId
// @Method GET
export const get = asyncHandler(async (req, res) => {
  try {
    const {productId} = req.params;
    const product = await productService.getOneProduct(productId);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error retrieving product',
    });
  }
});

// @Desc Get product  userby
// @Route/api/products/:productId
// @Method GET
export const getByUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const product = await productService.getProductsByOwnerId(userId);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error retrieving product',
    });
  }
});

// @Desc Add
// @Route /api/products/add
// @Method POST
export const add = asyncHandler(async (req: Request, res: Response) => {
  try {
    //console.log(`productItem ${JSON.stringify(req.body)}`);
    const { productName, price, ownerId, ...otherFields } = req.body;
    let imageUrl = '';

    // If there's an image to upload, call the function `uploadImageToCloudinary`
    if (req.file) {
      imageUrl = await uploadImageToCloudinary(req.file);
    }

    // Now you have the image URL, and you can combine it with other product data
    const productData = {
      productName,
      price, // Make sure to parse or validate price as needed
      ownerId: new mongoose.Types.ObjectId(ownerId),
      ...otherFields,
      imageUrl,
    };
    console.log(`productItem ${JSON.stringify(productData)}`);
    const product = await productService.add(productData);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error adding product ${error}`,
    });
  }
});

// @Desc Update
// @Route /api/products/:productId
// @Method PATCH
export const update = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { productName, category, description, price, quantity, ownerId, imageUrl } = req.body;
    const patchItem = {
      productId,
      productName,
      category,
      description,
      price,
      quantity,
      ownerId,
      imageUrl,
    };
    // try {
    //   validateUpdateProduct(patchItem);
    // } catch (validationError) {
    //   res.status(400).json({
    //     success: false,
    //     message: 'Validation failed',
    //     error: validationError.message,
    //   });
    //   return;
    // }
    console.log(`update: ${JSON.stringify(req.body)} `)

    // Check if the product with the provided ID exists
    const existingProduct = await productService.getOneProduct(productId);

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    let existingImageUrl = existingProduct.imageUrl; // Use the existing image URL by default
    console.log(`existingImageUrl: ${existingImageUrl}`);
    // If there's a new image to upload, delete the existing one and upload the new one
    if (req.file) {
      console.log('Delete the existing image from Cloudinary');
      // Delete the existing image from Cloudinary
      await deleteImageFromCloudinary(existingImageUrl);

      // Upload the new image
      existingImageUrl = await uploadImageToCloudinary(req.file);
      patchItem.imageUrl = existingImageUrl;
    }

      console.log('patch item', patchItem);


    // Update the existing product with the new data
    const updatedProduct = await productService.update(productId, patchItem);

    res.status(200).json({
      success: true,
      message: 'Product updated',
      //product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error adding product ${error}`,
    });
  }
});

// @Desc Update
// @Route /api/products/:productId
// @Method PATCH
export const remove = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Check if the product with the provided ID exists
    const existingProduct = await productService.getOneProduct(productId);

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    await productService.remove(productId);

    res.status(200).json({
      success: true,
      message: 'SUCCESS',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error deleting product: ${error.message}`,
    });
  }
};

// @Desc Post
// @Route /api/products/upload
// @Method PATCH
// Export the upload function
export const upload = async (req: Request, res: Response) => {
  console.log('req', req);
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    // Use Cloudinary's upload method to upload the file to your Cloudinary account
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(`image url: ${result.rul}`);

    return result.url;
    

    // After uploading, Cloudinary returns an object including 'url' (standard HTTP) and 'secure_url' (HTTPS)
    // res.status(200).json({
    //   success: true,
    //   message: 'File uploaded successfully',
    //   url: result.url,
    //   secure_url: result.secure_url,
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message, // Make sure you don't expose sensitive errors in production
    });
  }
};

// to add

// move functions below to helper

export const uploadImageToCloudinary = async (file: Express.Multer.File): Promise<string> => {
  if (!file) {
    throw new Error('No file uploaded.');
  }

  try {
    const result = await cloudinary.uploader.upload(file.path);
    console.log(`image url: ${result.url}`);
    return result.url; // or result.secure_url if you prefer HTTPS
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
};

export const deleteImageFromCloudinary = async (imageUrl: string): Promise<void> => {
  try {
    const getImagePublicId = (imageUrl: string): string => {
      // Regular expression to extract public ID from a Cloudinary URL
      const regex = /\/upload\/([^/]+)/;
      const match = imageUrl.match(regex);

      // If a match is found, return the captured group (public ID)
      return match ? match[1] : '';
    };
    const publicId = getImagePublicId(imageUrl); // Implement getImagePublicId to extract public ID from Cloudinary URL
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error.message);
    throw error;
  }
};


