import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6'

type SocialData = {
  facebook?: string | null
  twitter?: string | null
  instagram?: string | null
}

export const SocialIconLinks = ({
  social,
  idPrefix,
  className,
}: {
  social: SocialData
  idPrefix?: string
  className?: string
}) => {
  const links = [
    {
      key: 'facebook',
      url: social.facebook,
      label: 'Facebook',
      Icon: FaFacebookF,
    },
    {
      key: 'twitter',
      url: social.twitter,
      label: 'X / Twitter',
      Icon: FaXTwitter,
    },
    {
      key: 'instagram',
      url: social.instagram,
      label: 'Instagram',
      Icon: FaInstagram,
    },
  ].filter((entry) => Boolean(entry.url))

  if (!links.length) {
    return null
  }

  return (
    <div className={className || 'flex items-center gap-1.5'}>
      {links.map(({ key, url, label, Icon }) => (
        <a
          key={key}
          id={idPrefix ? `${idPrefix}-${key}` : undefined}
          aria-label={label}
          href={url || '#'}
          className="flex h-7.5 w-7.5 items-center justify-center rounded-full hover:bg-gray-2 lg:transition-all lg:duration-200 hover:text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon size={16} aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}
