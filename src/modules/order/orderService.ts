import { Types } from 'mongoose';
import Order, { IOrder } from './orderModel';
import Product from '../product/productModel';
import User from '../user/userModel';
// Function to get all products
// export async function getAllProducts() {
//   try {
//     const products = await Product.find();
//     return products;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function getOneProduct(productId: string): Promise<IProduct | null> {
//   try {
//     const product = await Product.findById(new Types.ObjectId(productId));
//     return product;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function getProductsByOwnerId(ownerId: string): Promise<IProduct[]> {
//   try {
//     const products = await Product.find({ ownerId, deletedAt: null });
//     return products;
//   } catch (error) {
//     throw error;
//   }
// }

export async function add(orderData: any) {
  const order = new Order(orderData);
  return order.save();
}

// Function to get all orders by buyer
export async function getbyBuyer(buyerId: string) {
  try {
    const orders = await Order.find({ buyerId: buyerId }).populate({
      path: 'productId',
      select: 'productName', // Specify the fields you want to select
      model: Product, // Reference to the Product model
    }).populate({
      path: 'ownerId',
      select: 'fullName', // Specify the fields you want to select
      model: User, // Reference to the Product model
    })

    console.log('Orders:', orders);
    return orders
  } catch (error) {
    throw error;
  }
}

export async function getbySeller(ownerId: string) {
  try {
    const orders = await Order.find({ ownerId: ownerId })
      .populate({
        path: 'productId',
        select: 'productName', // Specify the fields you want to select
        model: Product, // Reference to the Product model
      })
      .populate({
        path: 'buyerId',
        select: 'fullName', // Specify the fields you want to select
        model: User, // Reference to the Product model
      });

    console.log('Orders:', orders);
    return orders;
  } catch (error) {
    throw error;
  }
}

// export async function update(productId: string, updateData: any) {
//   try {
//     // Find the product by its ID and update it with the new data
//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       updateData,
//       { new: true }, // This option returns the updated document
//     );

//     return updatedProduct;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function remove(productId: string) {
//   try {
//     const result = await Product.updateOne({ _id: productId }, { deletedAt: new Date() });

//     return result;
//   } catch (error) {
//     throw error;
//   }
// }
