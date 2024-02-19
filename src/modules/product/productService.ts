import { Types } from 'mongoose';
import Product, { IProduct } from './productModel';

// Function to get all products
export async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
}

export async function getOneProduct(productId: string): Promise<IProduct | null> {
  try {
    const product = await Product.findById(new Types.ObjectId(productId));
    return product;
  } catch (error) {
    throw error;
  }
}

export async function getProductsByOwnerId(ownerId: string): Promise<IProduct[]> {
  try {
    const products = await Product.find({ ownerId, deletedAt: null });
    return products;
  } catch (error) {
    throw error;
  }
}

export async function add(productData: any) {
  const product = new Product(productData);
  return product.save();
}

export async function update(productId: string, updateData: any) {
  try {
    // Find the product by its ID and update it with the new data
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }, // This option returns the updated document
    );

    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

export async function remove(productId: string) {
  try {
    const result = await Product.updateOne({ _id: productId }, { deletedAt: new Date() });

    return result;
  } catch (error) {
    throw error;
  }
}
