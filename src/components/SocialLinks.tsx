import config from '@/payload.config'
import { getPayload } from 'payload'
import { SocialIconLinks } from './SocialIconLinks'

export const SocialLinks = async () => {
  const payload = await getPayload({ config })
  const social = await payload.findGlobal({
    slug: 'social',
  })

  if (!social) {
    return null
  }

  return <SocialIconLinks social={social} idPrefix="social" />
}
