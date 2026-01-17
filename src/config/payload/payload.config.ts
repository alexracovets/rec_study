import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { OAuth2Plugin } from 'payload-oauth2'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import path from 'path'

import { Users, Media } from '@payload-collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = (process.env.APP_URL || '').replace(/\/$/, '')
const googleUserInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo'

export default buildConfig({
  admin: {
    user: Users.slug,
    autoRefresh: true,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    OAuth2Plugin({
      strategyName: 'google',
      serverURL,
      authCollection: Users.slug,
      useEmailAsIdentity: true,
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      providerAuthorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      scopes: ['openid', 'email', 'profile'],
      getUserInfo: async (accessToken) => {
        const response = await fetch(googleUserInfoUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch Google user info')
        }

        const userInfo = await response.json()
        return {
          sub: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        }
      },
      successRedirect: async () => `${serverURL}/`,
      failureRedirect: async () => `${serverURL}/login?oauth=error`,
      
    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
})
