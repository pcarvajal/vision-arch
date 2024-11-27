'use server';

import { accounts } from '@/libs/backend/accounts';
import { dbConnect } from '@/libs/mongodb';
import { parseStringify } from '@/libs/utils';
import Company, { ICompany } from '@/schemas/CompanySchema';

const saveCompanyAction = async ({
  mission,
  vision,
  name,
  objetives,
  description,
}: CreateCompanyParams) => {
  try {
    const preferences = await accounts.getPreferences();

    await dbConnect();
    const company = await Company.create({
      mission,
      vision,
      name,
      objetives,
      description,
      teamId: preferences?.teamId,
    });

    const newCompany = company.toJSON();

    await accounts.updatePrefs({
      ...preferences,
      companyId: newCompany.id,
      companyName: newCompany.name,
    });
    return parseStringify(newCompany);
  } catch (error: any) {
    console.error('Error saving company data:', error);
    return { message: error?.message, type: 'error' };
  }
};

const getCompanyAction = async (id: string) => {
  try {
    await dbConnect();
    const company: ICompany | null = await Company.findById(id);

    if (!company) {
      return { message: 'Company not found', type: 'error' };
    }

    return parseStringify(company);
  } catch (error: any) {
    console.error('Error getting company data:', error);
    return { message: error?.message, type: 'error' };
  }
};

export { saveCompanyAction, getCompanyAction };
