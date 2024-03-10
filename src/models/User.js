import { model, Schema } from "mongoose";

const modelSchema = new Schema(
  {
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    email: Schema.Types.String,
    password: Schema.Types.String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

modelSchema.index({ email: 1 }, { unique: true });

const User = model("User", modelSchema, "users");
  
export default User;
