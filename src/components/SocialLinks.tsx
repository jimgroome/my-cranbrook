import { getPayload } from 'payload'
import config from '@/payload.config'

export const SocialLinks = async () => {
  const payload = await getPayload({ config })
  const social = await payload.findGlobal({
    slug: 'social',
  })

  if (!social) {
    return null
  }

  return (
    <div className="flex items-center gap-1.5">
      {social.facebook && (
        <a
          id="facebookBtn"
          aria-label="facebook social link"
          href={social.facebook}
          className="flex items-center justify-center w-7.5 h-7.5 rounded-full hover:bg-gray-2 lg:transition-all lg:duration-200 hover:text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="fill-current"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4 8.58585V6.07664C10.4 5.10529 11.2059 4.31785 12.2 4.31785H14V1.67966L11.5565 1.50912C9.47255 1.36368 7.7 2.97636 7.7 5.01777V8.58585H5V11.224H7.7V16.5H10.4V11.224H13.1L14 8.58585H10.4Z"
              fill=""
            />
          </svg>
        </a>
      )}

      {social.twitter && (
        <a
          id="twitterBtn"
          aria-label="twitter social link"
          href={social.twitter}
          className="flex items-center justify-center w-7.5 h-7.5 rounded-full hover:bg-gray-2 lg:transition-all lg:duration-200 hover:text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="fill-current"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_739_364)">
              <path
                d="M16.2781 4.30313L17.3469 2.95313C17.6562 2.5875 17.7406 2.30625 17.7688 2.16562C16.925 2.67188 16.1375 2.84063 15.6312 2.84063H15.4344L15.3219 2.72813C14.6469 2.1375 13.8031 1.82812 12.9031 1.82812C10.9344 1.82812 9.3875 3.45938 9.3875 5.34375C9.3875 5.45625 9.3875 5.625 9.41563 5.7375L9.5 6.3L8.90938 6.27188C5.30937 6.15938 2.35625 3.06563 1.87813 2.53125C1.09063 3.9375 1.54063 5.2875 2.01875 6.13125L2.975 7.70625L1.45625 6.8625C1.48438 8.04375 1.93437 8.97188 2.80625 9.64688L3.56562 10.2094L2.80625 10.5188C3.28437 11.9531 4.35313 12.5438 5.14062 12.7688L6.18125 13.05L5.19688 13.725C3.62188 14.85 1.65312 14.7656 0.78125 14.6813C2.55313 15.9188 4.6625 16.2 6.125 16.2C7.22188 16.2 8.0375 16.0875 8.23438 16.0031C16.1094 14.1469 16.475 7.11563 16.475 5.70938V5.5125L16.6438 5.4C17.6 4.5 17.9937 4.02188 18.2188 3.74063C18.1344 3.76875 18.0219 3.825 17.9094 3.85313L16.2781 4.30313Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_739_364">
                <rect width="18" height="18" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </a>
      )}
    </div>
  )
}
