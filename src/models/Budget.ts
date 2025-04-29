import mongoose, { Schema, Document } from 'mongoose';

export interface IBudget extends Document {
  category: mongoose.Types.ObjectId;
  amount: number;
  month: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BudgetSchema: Schema = new Schema({
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category',
    required: true
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0.01,
    set: (v: number) => parseFloat(v.toFixed(2))
  },
  month: { 
    type: Date, 
    required: true,
    default: () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  }
});

// Compound index to ensure one budget per category per month
BudgetSchema.index({ category: 1, month: 1 }, { unique: true });

// Pre-save hook to ensure month is always the first day
BudgetSchema.pre('save', function(next) {
  if (this.isModified('month')) {
    const date = new Date(this.month);
    this.month = new Date(date.getFullYear(), date.getMonth(), 1);
  }
  next();
});

export default mongoose.models.Budget || 
  mongoose.model<IBudget>('Budget', BudgetSchema);