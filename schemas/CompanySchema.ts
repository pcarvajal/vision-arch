import { Company } from '@/types/types';
import { model, Schema } from 'mongoose';

const CompanySchema = new Schema<Company>({
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
});

const CompanyModel = model<Company>('Company', CompanySchema);
export default CompanyModel;
