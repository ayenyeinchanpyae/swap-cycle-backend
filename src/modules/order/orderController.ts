import asyncHandler from 'express-async-handler';
import Product from './orderModel';
import * as orderService from './orderService';
//import { validateStaticProduct, validateUpdateProduct } from './productValidator';
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';


// // @Desc Get all products
// // @Route/api/products/
// // @Method GET
// export const index = asyncHandler(async (req, res) => {
//   try {
//     const products = await productService.getAllProducts();

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: 'Error retrieving products',
//     });
//   }
// });

// // @Desc Get one product
// // @Route/api/products/:productId
// // @Method GET
// export const get = asyncHandler(async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const product = await productService.getOneProduct(productId);

//     res.status(200).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: 'Error retrieving product',
//     });
//   }
// });



// @Desc Add
// @Route /api/products/add
// @Method POST
export const add = asyncHandler(async (req: Request, res: Response) => {
  console.log('add order')
  try {
    console.log(`productItem ${JSON.stringify(req.body)}`);
    const {
      productId,
      buyerId,
      ownerId,
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zipCode,
      country,
      price,
      quantity,
    } = req.body;
    const orderItem = {
      productId: new mongoose.Types.ObjectId(productId),
      buyerId: new mongoose.Types.ObjectId(buyerId),
      ownerId: new mongoose.Types.ObjectId(ownerId),
      firstName,
      lastName,
      address1,
      address2,
      state,
      city,
      zipCode,
      country,
      price,
      quantity
    };

    console.log(`orderItem ${JSON.stringify(orderItem)}`);
    const product = await orderService.add(orderItem);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log('error in orderController.js')
    res.status(500).json({
      success: false,
      error: `Error adding product ${error}`,
    });
  }
});

// @Desc Get order bt userId
// @Route/api/order/user/:userId
// @Method GET
export const get = asyncHandler(async (req, res) => {
  console.log('buyer')
  try {
    const {userId} = req.params;
    const product = await orderService.getbyBuyer(userId);

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

export const getBySeller = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const product = await orderService.getbySeller(userId);

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





