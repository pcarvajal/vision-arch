'use server';

import { routes } from '@/config/routes';
import { accounts } from '@/libs/backend/accounts';
import { dbConnect } from '@/libs/mongodb';
import { parseStringify } from '@/libs/utils';
import Company, { ICompany } from '@/schemas/CompanySchema';
import { redirect } from 'next/navigation';

const saveCompanyAction = async ({
  mission,
  vision,
  name,
  objetives,
  description,
}: CreateCompanyParams) => {
  try {
    await dbConnect();
    const company = await Company.create({
      mission,
      vision,
      name,
      objetives,
      description,
    });
    const newCompany = company.toJSON();
    console.log('Company data saved:', newCompany);
    const preferences = await accounts.getPreferences();
    await accounts.updatePrefs({
      ...preferences,
      companyId: newCompany.id,
      companyName: newCompany.name,
    });
  } catch (error: any) {
    console.error('Error saving company data:', error);
    return { message: error?.message, type: 'error' };
  }
  redirect(routes.protected.index);
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
