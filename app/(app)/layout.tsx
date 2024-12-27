import { getUserAction } from '@/actions/user.actions';
import { Layout } from '@/components/layout/layout';
import { routes } from '@/config/routes';
import '@/styles/globals.css';
import { ReactFlowProvider } from '@xyflow/react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// TODO: fix this

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserAction();

  const header = headers();
  const pathname = header.get('next-url');

  console.log('path', pathname);
  console.log('route', routes.protected.company);

  if (!user.data?.user.companyId && pathname !== routes.protected.company) {
    redirect(routes.protected.company);
  }
  return (
    <Layout>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </Layout>
  );
}
