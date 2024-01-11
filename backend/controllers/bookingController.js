import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (err) {
    res.status(200).json({ success: false, message: "internal server error" });
  }
};

export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);

    res.status(200).json({
      success: true,
      message: "successfull",
      data: book,
    });
  } catch (err) {
    res.status(404).json({
      success: true,
      message: "not found",
    });
  }
};

export const getAllBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const books = await Booking.find(id);

    res.status(200).json({
      success: true,
      message: "successfull",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
};
