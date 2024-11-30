import { model, models, Schema } from 'mongoose';

export interface ICompany {
  id?: string;
  name: string;
  mission: string;
  vision: string;
  objetives: string;
  description: string;
  teamId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
    vision: {
      type: String,
      required: true,
    },
    objetives: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const Company = models.Company || model<ICompany>('Company', CompanySchema);
export default Company;
