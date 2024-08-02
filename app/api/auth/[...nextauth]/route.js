import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },

  callbacks: {
    async session(props) {
      const { session, token } = props
      const rest = new REST({ version: '10' }).setToken(
        process.env.DISCORD_TOKEN
      )
      const guildRoles = await rest.get(
        Routes.guildRoles(process.env.DISCORD_GUILD_ID)
      )

      const member = await rest.get(
        Routes.guildMember(process.env.DISCORD_GUILD_ID, token.sub)
      )

      session.user.roles = member.roles

        .map((role) => guildRoles.find((r) => r.id === role))
        .map((r) => ({
          id: r.id,
          name: r.name,
          color: r.color,
        }))
      session.user.id = member.user.id

      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
