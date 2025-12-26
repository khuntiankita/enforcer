import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  description: String,
  work: String,
  force: Number,
  duration: String,
  city: String,
  number: Number,     
  fromDate: Date,
  toDate: Date,
  type: { type: String, enum: ["Booking", "WorkerRequest"], default: "Booking" },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
  },
}, {
  timestamps: true
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
