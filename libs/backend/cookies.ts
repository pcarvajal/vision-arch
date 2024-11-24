import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies as nextCookies } from 'next/headers';

export const cookies = {
  setCookie: async (
    secret: string,
    expire: string,
  ): Promise<ResponseCookies> => {
    return nextCookies().set('session', secret, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      expires: new Date(expire),
      path: '/',
    });
  },
  deleteCurrentCookie: () => {
    return nextCookies().delete('session');
  },
};
