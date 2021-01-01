import mongoose, { Document } from "mongoose";

interface OAuthType {
  _id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}

const OAuthSchema: mongoose.Schema = new mongoose.Schema({
  googleID: {
    type: "string",
    required: true,
    unique: true,
  },
  displayName: {
    type: "string",
    required: true,
  },
  firstName: {
    type: "string",
    required: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
  photo: {
    type: "string",
    required: true,
  },
});

export default mongoose.model<OAuthType & Document>("OAuth", OAuthSchema);
