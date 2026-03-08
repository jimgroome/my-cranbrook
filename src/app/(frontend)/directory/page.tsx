import { ListingGridSection } from '@/components/listings/ListingGridSection'
import { RichText } from '@/components/rich-text/RichText'
import config from '@/payload.config'
import { toListingCardItem, type ListingCollection, type ListingDoc } from '@/lib/frontend/listings'
import type { Club, Organisation, Page, Pub, Sport } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { getPayload } from 'payload'

type DirectorySectionKey = 'sports' | 'pubs' | 'organisations' | 'clubs'

type DirectorySectionRow = {
  section?: DirectorySectionKey
  sportsItems?: Array<number | Sport> | null
  pubsItems?: Array<number | Pub> | null
  organisationsItems?: Array<number | Organisation> | null
  clubsItems?: Array<number | Club> | null
}

const getSelectedDocsFromRow = (section: DirectorySectionKey, row: DirectorySectionRow): ListingDoc[] => {
  const selectedRaw =
    section === 'sports'
      ? row.sportsItems
      : section === 'pubs'
        ? row.pubsItems
        : section === 'organisations'
          ? row.organisationsItems
          : row.clubsItems

  if (!selectedRaw?.length) {
    return []
  }

  return selectedRaw.filter((item): item is ListingDoc => typeof item === 'object').slice(0, 3)
}

const getFallbackDocs = async (payload: Awaited<ReturnType<typeof getPayload>>, section: DirectorySectionKey) => {
  switch (section) {
    case 'sports':
      return (await payload.find({ collection: 'sports', limit: 3, sort: '-createdAt' })).docs
    case 'pubs':
      return (await payload.find({ collection: 'pubs', limit: 3, sort: '-createdAt' })).docs
    case 'organisations':
      return (await payload.find({ collection: 'organisations', limit: 3, sort: '-createdAt' })).docs
    case 'clubs':
      return (await payload.find({ collection: 'clubs', limit: 3, sort: '-createdAt' })).docs
  }
}

export default async function DirectoryPage() {
  const payload = await getPayload({ config })

  const directoryPage = await payload.find({
    collection: 'pages',
    where: {
      and: [{ slug: { equals: 'directory' } }, { pageType: { equals: 'directory' } }],
    },
    limit: 1,
    depth: 2,
  })

  const page = directoryPage.docs[0] as Page | undefined

  const sectionMeta = {
    sports: {
      title: 'Sports',
      description: 'Local sports clubs and activities in and around Cranbrook.',
    },
    pubs: {
      title: 'Pubs',
      description: 'Pubs and bars to explore in the Cranbrook area.',
    },
    organisations: {
      title: 'Organisations',
      description: 'Community organisations serving Cranbrook and nearby villages.',
    },
    clubs: {
      title: 'Clubs',
      description: 'Social clubs and groups you can join locally.',
    },
  } as const

  const defaultOrder: DirectorySectionKey[] = ['sports', 'pubs', 'organisations', 'clubs']
  const configuredRows = (page?.directorySections as DirectorySectionRow[] | null | undefined) || []
  const configuredOrder = configuredRows
    .map((row) => row.section)
    .filter((section): section is DirectorySectionKey => Boolean(section))

  const renderOrder = configuredOrder.length ? configuredOrder : defaultOrder

  const sectionItems = await Promise.all(
    renderOrder.map(async (section) => {
      const row = configuredRows.find((entry) => entry.section === section)
      const selectedDocs = row ? getSelectedDocsFromRow(section, row) : []
      const docs = selectedDocs.length ? selectedDocs : await getFallbackDocs(payload, section)

      const listingItems = docs
        .map((doc) => toListingCardItem(section as ListingCollection, doc))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))

      return {
        section,
        items: listingItems,
      }
    }),
  )

  return (
    <>
      <section className="pb-8 pt-34">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <h1 className="mb-4 text-heading-5 font-bold text-dark sm:text-heading-3">
            {page?.title || 'Directory'}
          </h1>
          {page?.content && <RichText data={page.content as SerializedEditorState} />}
        </div>
      </section>

      {sectionItems.map(({ section, items }) => (
        <ListingGridSection
          key={section}
          title={sectionMeta[section].title}
          description={sectionMeta[section].description}
          items={items}
        />
      ))}
    </>
  )
}
