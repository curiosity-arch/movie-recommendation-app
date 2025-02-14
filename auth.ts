import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(username_user: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE username_user=${username_user}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user: ', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username_user: z.string(), password_user: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username_user, password_user } = parsedCredentials.data;
          const user = await getUser(username_user);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password_user, user.password_user);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null
      },
    }),
  ],
});