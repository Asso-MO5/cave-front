import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import * as jose from 'jose'

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

      const secret = Buffer.from(process.env.API_KEY, 'hex')

      const jwt = await new jose.EncryptJWT({
        provider_id: member.user.id,
        name: member.user.username,
        roles: session.user.roles.map((r) => r.name),
      })
        .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
        .setIssuedAt()
        .setIssuer('cave_front')
        .setAudience('cave_back')
        .setExpirationTime('720h')
        .encrypt(secret)

      try {
        const caveApi = await fetch(
          process.env.NEXT_PUBLIC_API_URL + '/auth/login',
          {
            method: 'POST',
            body: jwt,
          }
        )

        const caveApiJson = await caveApi.json()
        session.api_token = caveApiJson.auth

        // session.routes = caveApiJson.routes
        session.user.id = member.user.id

        return session
      } catch (e) {
        return session
      }
    },
  },
})
