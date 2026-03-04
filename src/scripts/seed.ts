import { getPayload } from 'payload'
import config from '@payload-config'
import { loremIpsum } from 'lorem-ipsum'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'

const seed = async () => {
  const payload = await getPayload({ config })

  await Promise.all(
    [...new Array(10)].map(async (_, index) => {
      const description = loremIpsum({
        count: 1,
        format: 'html',
        paragraphLowerBound: 3,
        paragraphUpperBound: 7,
        random: Math.random,
        sentenceLowerBound: 5,
        sentenceUpperBound: 15,
        suffix: '\n',
        units: 'sentences',
      })

      const lexicalDescription = convertHTMLToLexical({
        editorConfig: await editorConfigFactory.default({
          config: await config,
        }),
        html: description,
        JSDOM,
      })

      await fetch('https://picsum.photos/600/400')
        .then((res) => res.arrayBuffer())
        .then(async (buffer) => {
          const image = await payload.create({
            collection: 'media',
            data: { alt: `Event ${index + 1}` },
            file: {
              data: Buffer.from(buffer),
              mimetype: 'image/png',
              name: `event-${index + 1}.png`,
              size: buffer.byteLength,
            },
          })

          payload.create({
            collection: 'events',
            data: {
              title: `Event ${index + 1}`,
              description: lexicalDescription,
              date: new Date().toISOString(),
              town: 'London',
              location: 'London',
              postcode: 'WC1N 3XX',
              link: 'https://example.com',
              excerpt: loremIpsum({
                count: 8,
                format: 'plain',
                units: 'words',
              }),
              image: image.id,
            },
          })

          payload.create({
            collection: 'clubs',
            data: {
              title: `Club ${index + 1}`,
              description: lexicalDescription,
              town: 'London',
              location: 'London',
              postcode: 'WC1N 3XX',
              link: 'https://example.com',
              excerpt: loremIpsum({
                count: 8,
                format: 'plain',
                units: 'words',
              }),
              image: image.id,
            },
          })

          payload.create({
            collection: 'pubs',
            data: {
              title: `Pub ${index + 1}`,
              description: lexicalDescription,
              town: 'London',
              location: 'London',
              postcode: 'WC1N 3XX',
              link: 'https://example.com',
              excerpt: loremIpsum({
                count: 8,
                format: 'plain',
                units: 'words',
              }),
              image: image.id,
            },
          })

          payload.create({
            collection: 'sports',
            data: {
              title: `Sport ${index + 1}`,
              description: lexicalDescription,
              town: 'London',
              location: 'London',
              postcode: 'WC1N 3XX',
              link: 'https://example.com',
              excerpt: loremIpsum({
                count: 8,
                format: 'plain',
                units: 'words',
              }),
              image: image.id,
            },
          })

          payload.create({
            collection: 'organisations',
            data: {
              title: `Organisation ${index + 1}`,
              description: lexicalDescription,
              town: 'London',
              location: 'London',
              postcode: 'WC1N 3XX',
              link: 'https://example.com',
              excerpt: loremIpsum({
                count: 8,
                format: 'plain',
                units: 'words',
              }),
              image: image.id,
            },
          })

          return payload.create({
            collection: 'news',
            data: {
              title: `News ${index + 1}`,
              content: lexicalDescription,
              date: new Date().toISOString(),
              excerpt: loremIpsum({
                count: 8,
                format: 'plain',
                units: 'words',
              }),
              image: image.id,
              slug: `news-${index + 1}`,
            },
          })
        })
    }),
  )
}

await seed()
