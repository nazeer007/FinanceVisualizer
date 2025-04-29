import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
  amount: { 
    type: Number, 
    required: true,
    min: 0.01
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  description: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  type: { 
    type: String, 
    enum: ['expense', 'income'], 
    default: 'expense' 
  },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category' 
  }
}, {
  timestamps: true
});

const Transaction = mongoose.models.Transaction || 
  mongoose.model('Transaction', TransactionSchema);

export default Transaction;