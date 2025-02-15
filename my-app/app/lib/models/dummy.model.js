import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Event name is required"],
    minlength: [3, "Event name must be at least 3 characters long"],
    maxlength: [100, "Event name must be less than 100 characters"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
    validate: [
      {
        validator: function (value) {
          return value > Date.now();
        },
        message: "Start date must be greater than today",
      },
      {
        validator: function (value) {
          return this.endDate ? value <= this.endDate : true;
        },
        message: "Start date must be before or equal to the end date",
      },
    ],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  },
  organiser: {
    type: String,
    required: [true, "Organiser name is required"],
    minlength: [3, "Organiser name must be at least 3 characters long"],
    maxlength: [100, "Organiser name must be less than 100 characters"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    minlength: [3, "Location must be at least 3 characters long"],
    maxlength: [200, "Location must be less than 200 characters"],
  },
});

const eventsModel = mongoose.model("Event", EventSchema);

export const Event = eventsModel;
