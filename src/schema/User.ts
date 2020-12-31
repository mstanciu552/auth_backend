import mongoose, { Document } from "mongoose";

interface UserType {
  _id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}

const User: mongoose.Schema = new mongoose.Schema({
  email: {
    type: "string",
  },
  username: {
    type: "string",
    required: true,
  },
  first_name: {
    type: "string",
    required: true,
  },
  last_name: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

export default mongoose.model<Document & UserType>("User", User);
