import { Event, Page, Pub, Sport } from '@/payload-types'
import { SinglePost } from './SinglePost'

export const Listings = ({ listings }: { listings: Page['highlightedContent'] }) => {
  return (
    <div>
      {/* <div className="flex flex-wrap justify-center gap-4 items-center mb-15">
        {['All', 'Technology', 'Lifestyle', 'Travel', 'Health', 'Culture'].map((category) => (
          <button
            key={category}
            className="rounded-full border py-2.5 px-4.5 font-medium hover:bg-dark hover:border-dark hover:text-white ease-in duration-200"
          >
            {category} ({0})
          </button>
        ))}
      </div> */}

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-7.5">
          {listings?.map(
            (listing) =>
              listing.item?.relationTo === 'events' && (
                <SinglePost key={listing.id} post={listing.item?.value as Event} />
              ),
          )}
        </div>
      </div>
    </div>
  )
}
