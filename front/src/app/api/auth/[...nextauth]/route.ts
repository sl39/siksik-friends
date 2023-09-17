import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "secret",
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/",
  },

  // 토큰이나 세션 활용하여 사용자 제어 시 사용하는 로직
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
