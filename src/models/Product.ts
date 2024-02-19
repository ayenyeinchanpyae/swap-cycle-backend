import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  productName: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  ownerId: mongoose.Schema.Types.ObjectId;
  deletedAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);


const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
