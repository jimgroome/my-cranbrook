import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import { HighlightedContent } from '@/components/highlighted-content/HighlightedContent'
import { RichText } from '@/components/rich-text/RichText'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { SinglePost } from '@/components/SinglePost'
import { Hero } from '@/components/Hero'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pageData = await payload.find({
    collection: 'pages',
    where: { pageType: { equals: 'home' } },
  })

  if (!pageData.docs.length) {
    return null
  }

  const page = pageData.docs[0]

  return (
    <>
      {/* ===== Hero Section Start ===== */}
      <Hero />
      {/* ===== Hero Section End ===== */}

      {/* ====== Blog Category Section Start */}
      <section className="pt-20 lg:pt-25 pb-15">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          {/* section title */}
          <div className="mb-12.5 text-center">
            <h2 className="text-dark mb-3.5 text-2xl font-bold sm:text-4xl xl:text-heading-3">
              Browse by Category
            </h2>
            <p>Select a category to see more related content</p>
          </div>

          <div
            data-selected-category="All"
            data-active-className="bg-dark border-dark text-white"
            data-inactive-className="bg-gray border-gray-3 text-dark"
          >
            {/* Blog Categories Tab Start */}
            <div className="flex flex-wrap justify-center gap-4 items-center mb-15">
              {['All', 'Technology', 'Lifestyle', 'Travel', 'Health', 'Culture'].map((category) => (
                <button
                  key={category}
                  className="rounded-full border py-2.5 px-4.5 font-medium hover:bg-dark hover:border-dark hover:text-white ease-in duration-200"
                >
                  {category} ({0})
                </button>
              ))}
            </div>
            {/* Blog Categories Tab End */}

            {/* Blog Categories Content Start */}
            <div>
              {/* All content start */}
              <div x-show="selectedCategory === 'All'">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-7.5">
                  {/* blog item */}

                  {[
                    {
                      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
                      description:
                        'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
                      image: 'https://picsum.photos/370/280',
                      category: 'Technology',
                      author: 'Adrio Devid',
                      date: 'Sep 10, 2025',
                      authorImage: 'https://picsum.photos/100',
                    },
                    {
                      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
                      description:
                        'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
                      image: 'https://picsum.photos/370/280',
                      category: 'Technology',
                      author: 'Adrio Devid',
                      date: 'Sep 10, 2025',
                      authorImage: 'https://picsum.photos/100',
                    },
                    {
                      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
                      description:
                        'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
                      image: 'https://picsum.photos/370/280',
                      category: 'Technology',
                      author: 'Adrio Devid',
                      date: 'Sep 10, 2025',
                      authorImage: 'https://picsum.photos/100',
                    },
                    {
                      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
                      description:
                        'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
                      image: 'https://picsum.photos/370/280',
                      category: 'Technology',
                      author: 'Adrio Devid',
                      date: 'Sep 10, 2025',
                      authorImage: 'https://picsum.photos/100',
                    },
                    {
                      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
                      description:
                        'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
                      image: 'https://picsum.photos/370/280',
                      category: 'Technology',
                      author: 'Adrio Devid',
                      date: 'Sep 10, 2025',
                      authorImage: 'https://picsum.photos/100',
                    },
                    {
                      title: 'Stylish Kitchen And Dining Room With Functional Ideas',
                      description:
                        'Lorem Ipsum is simply dummy text of the print and typesetting industry...',
                      image: 'https://picsum.photos/370/280',
                      category: 'Technology',
                      author: 'Adrio Devid',
                      date: 'Sep 10, 2025',
                      authorImage: 'https://picsum.photos/100',
                    },
                  ].map((post) => (
                    <SinglePost key={post.title} post={post} />
                  ))}
                </div>
              </div>
              {/* Travel content end */}
            </div>
            {/* Blog Categories Content End */}

            {/* Blog Show More BTN */}
            <button className="flex justify-center font-medium text-dark border border-dark rounded-md py-3 px-7.5 hover:bg-dark hover:text-white ease-in duration-200 mx-auto mt-12.5 lg:mt-17.5">
              Browse all Posts
            </button>
          </div>
        </div>
      </section>
      {/* ====== Blog Category Section End */}

      {/* ======  Authors Section Start */}
      <section className="pb-15">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-8 mb-6">
            <h2 className="font-semibold text-heading-5 text-dark">Top Authors</h2>
            <a href="#" className="group text-dark leading-none">
              <span className="flex items-center gap-2 bg-linear-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                All Authors
                <svg
                  className="fill-current group-hover:rotate-45 transition-all"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_675_6418)">
                    <path
                      d="M13.7734 3.59902L5.48035 3.53935C5.12237 3.53935 4.84395 3.81778 4.84395 4.17575C4.84395 4.53372 5.12237 4.81215 5.48035 4.81215L12.2222 4.87181L3.77003 13.3239C3.53138 13.5626 3.53138 13.9603 3.77003 14.199C4.00868 14.4376 4.42632 14.4575 4.66496 14.2189L13.1569 5.72696L13.2165 12.5483C13.2165 12.9063 13.495 13.1847 13.8529 13.1847C14.012 13.1847 14.1711 13.1052 14.2905 12.9859C14.4098 12.8665 14.4893 12.7074 14.4694 12.5284L14.4098 4.23541C14.4098 3.87744 14.1314 3.59902 13.7734 3.59902Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_675_6418">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </a>
          </div>

          <div className="pt-14 border-t border-gray-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-7.5">
              {/* Author Item */}

              {[
                {
                  name: 'Adrio Devid',
                  image: 'https://picsum.photos/100',
                  description: 'Director of Operations',
                  posts: 3,
                },
                {
                  name: 'Adrio Devid',
                  image: 'https://picsum.photos/100',
                  description: 'Director of Operations',
                  posts: 3,
                },
                {
                  name: 'Adrio Devid',
                  image: 'https://picsum.photos/100',
                  description: 'Director of Operations',
                  posts: 3,
                },
              ].map((author) => (
                <a href="author.html" className="group" key={author.name}>
                  <div className="border border-gray-3 rounded-[20px] bg-gray p-5 group-hover:bg-white group-hover:drop-shadow-1 group-hover:-translate-y-2 transition-all">
                    <div className="flex flex-wrap items-center gap-8">
                      <div className="w-25 h-25 rounded-full overflow-hidden">
                        <img src={author.image} alt="user" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-custom-xl text-dark mb-1">
                          {author.name}
                        </h3>
                        <p>{author.description}</p>
                        <span className="flex items-center gap-2 text-custom-sm mt-2.5">
                          <svg
                            className="fill-current"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.775 14.4501H2.575C2.325 14.4501 2.125 14.2501 2.125 14.0001V2.00009C2.125 1.75009 2.325 1.55009 2.575 1.55009H8.225V4.75009C8.225 5.05009 8.475 5.32509 8.8 5.32509H11.975V7.00009C11.975 7.30009 12.225 7.57509 12.55 7.57509C12.875 7.57509 13.125 7.32509 13.125 7.00009V4.90009C13.125 4.62509 13 4.35009 12.8 4.15009L9.3 0.750091C9.1 0.550091 8.825 0.450091 8.55 0.450091H2.55C1.7 0.425091 1 1.15009 1 2.00009V14.0001C1 14.8501 1.7 15.5751 2.575 15.5751H5.8C6.1 15.5751 6.375 15.3251 6.375 15.0001C6.375 14.6751 6.1 14.4501 5.775 14.4501ZM9.325 2.35009L11.2 4.20009H9.325V2.35009Z"
                              fill=""
                            />
                            <path
                              d="M14.7996 9.40015C14.5996 9.20015 14.3996 9.00015 14.1996 8.80015C14.0246 8.62515 13.8496 8.42515 13.6496 8.25015C13.5496 8.12515 13.3996 8.02515 13.2246 8.00015C13.0246 7.97515 12.8246 8.02515 12.6746 8.15015L8.32461 12.4751C8.19961 12.6001 8.12461 12.7251 8.07461 12.8751L7.44961 14.7751L7.34961 15.0751L7.52461 15.3001C7.59961 15.4001 7.74961 15.5501 8.02461 15.5501H8.12461L10.0996 14.9001C10.2496 14.8501 10.3996 14.7751 10.4996 14.6501L14.7996 10.3751C14.9246 10.2501 14.9996 10.0751 14.9996 9.87515C14.9996 9.70015 14.9246 9.52515 14.7996 9.40015ZM13.1246 9.30015C13.2246 9.40015 13.3246 9.50015 13.3996 9.60015C13.4996 9.70015 13.5996 9.80015 13.6996 9.90015L13.4246 10.1751L12.8496 9.60015L13.1246 9.30015ZM9.72461 13.8501L8.84961 14.1251L9.12461 13.2501L12.0246 10.3501L12.5996 10.9251L9.72461 13.8501Z"
                              fill=""
                            />
                          </svg>
                          {author.posts} Published posts
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ======  Authors Section End */}

      {/* ====== Newsletter Section Start */}
      <section className="py-12.5 bg-gray relative overflow-hidden z-10">
        <div className="absolute left-0 top-0 w-full h-full -z-1">
          <img src="/bg-dots.svg" alt="dot" />
        </div>
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white shadow-1 rounded-[10px] py-9 px-4 sm:px-8 xl:px-10">
            <div className="flex flex-wrap items-center justify-between gap-10">
              <div className="max-w-[455px] w-full">
                <h3 className="font-semibold text-heading-6 text-dark mb-3">
                  Subscribe to Newsletter
                </h3>
                <p>
                  Provide your email to get email notification when we launch new products or
                  publish new articles
                </p>
              </div>
              <div className="max-w-[494px] w-full">
                <form>
                  <div className="flex items-center gap-5">
                    <div className="max-w-[350px] w-full">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        className="rounded-md border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3.5 px-5 outline-hidden focus:shadow-input focus:ring-2 focus:ring-dark-4/20 focus:border-transparent"
                      />
                    </div>
                    <button className="font-medium rounded-md text-white bg-dark flex py-3.5 px-5.5 hover:opacity-90 transition-all ease-linear duration-300">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Newsletter Section End */}
    </>
  )
}
