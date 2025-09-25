import mongoose from "mongoose";

const newsEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ["news", "event", "drive"],
    default: "news",
  },
  postedAt: { type: Date, default: Date.now }, // when it was posted
  eventDate: { type: Date }, // optional: actual date of event/drive
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty", // Faculty/Management
    required: true,
  },
});

export default mongoose.model("NewsEvent", newsEventSchema);
