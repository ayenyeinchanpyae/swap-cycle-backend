import mongoose from 'mongoose';

export interface IOrder extends mongoose.Document {
  productId: mongoose.Schema.Types.ObjectId;
  buyerId: mongoose.Schema.Types.ObjectId;
  onwerId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
  country: string;
}

const OrderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    address1: {
      type: String,
      required: false,
    },
    address2: {
      type: String,
      required: false,
      default: null,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    zipCode: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    // status: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
