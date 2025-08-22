import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['email'],
    required: true
  },
  vendor: {
    type: String,
    enum: ['FG', 'tiffinMom'],
    required: true
  },

}, { timestamps: true });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;
