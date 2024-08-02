import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document {
    name: string,
    price: number
}

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;