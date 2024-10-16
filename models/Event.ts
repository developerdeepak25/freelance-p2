import mongoose, { Document } from "mongoose";


export interface IEvent extends Document{
  eventTitle: string;
  description: string;
  thumbnail: string;
  cloudinaryThumbnailId: string;
  // date: Date;
  startDate: Date;
  endDate: Date;
  // time: string;
  venue: string;
  eventGalleryLink?: string;
  eventHighlights?: string;
  // duration: number;
  // status: string;
  // tags: string[];
  // price: number;
  // maxParticipants: number;
} 

const eventSchema = new mongoose.Schema<IEvent>(
  {
    eventTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String, // URL of the main photo (likely from Cloudinary)
      required: true,
    },
    cloudinaryThumbnailId: {
      type: String,
      required: true,
    },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    // time: {
    //   type: String, // You can store time as a string like '10:00 AM'
    //   required: true,
    // },
    venue: {
      type: String,
      //   required: true,
    },
    // duration: {
    //   type: Number, // Number of days the event lasts
    //   required: true,
    // },
    // status: {
    //   type: Number, // 0 = Upcoming, 1 = Ongoing, 2 = Past
    //   enum: [0, 1, 2],
    //   default: 0,
    // },
    eventGalleryLink: {
      type: String, // Google Drive link for event gallery
      required: false,
    },
    eventHighlights: {
      type: String, // maybe Array of social media links (Twitter, Facebook, etc.) currentl taking singel link
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema); 
export default Event;
