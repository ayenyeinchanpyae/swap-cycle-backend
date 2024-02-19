import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  productName: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  ownerId: mongoose.Schema.Types.ObjectId;
  imageUrl: string;
  deletedAt: Date;
  isSold: boolean;
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
    isSold: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: false,
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
