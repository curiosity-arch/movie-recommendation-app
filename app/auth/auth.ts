import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(username: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE username=${username}`;
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
          .object({ username: z.string().min(3), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error('Invalid credentials');
        }

        const { username, password } = parsedCredentials.data;
        const user = await getUser(username);

        if (!user) {
          throw new Error('User not found');
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          throw new Error('Incorrect password');
        }

        return {
          id: String(user.id),
          name: user.username,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as { id: string; name: string};
        token.id = customUser.id;
        token.name = customUser.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      return session;
    },
  },
});
