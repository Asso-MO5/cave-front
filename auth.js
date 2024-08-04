import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,

      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          global_name: profile.global_name,
          image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },

  callbacks: {
    jwt(props) {
      const { token: _token, profile } = props
      const token = { ..._token }
      if (profile) token.providerId = profile.id
      return token
    },
    async session(props) {
      const { session: _session, token } = props

      const session = { ..._session }
      const rest = new REST({ version: '10' }).setToken(
        process.env.DISCORD_TOKEN
      )

      const guildRoles = await rest.get(
        Routes.guildRoles(process.env.DISCORD_GUILD_ID)
      )

      const member = await rest.get(
        Routes.guildMember(process.env.DISCORD_GUILD_ID, token.providerId)
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
})
