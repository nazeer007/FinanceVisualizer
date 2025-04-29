import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    maxlength: 30
  },
  color: { 
    type: String, 
    required: true,
    default: '#8884d8',
    validate: {
      validator: (v: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v),
      message: props => `${props.value} is not a valid hex color!`
    }
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

// Ensure category names are unique
CategorySchema.path('name').validate(async function(value: string) {
  const count = await mongoose.models.Category.countDocuments({ name: value });
  return !count;
}, 'Category name already exists');

export default mongoose.models.Category || 
  mongoose.model<ICategory>('Category', CategorySchema);