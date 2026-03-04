import { Event, Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

export const SinglePost = ({ post }: { post: Event }) => {
  return (
    <div className="group">
      <div className="mb-6 overflow-hidden rounded-[10px] transition-all group-hover:scale-105">
        <a href="blog-single.html">
          {post.image && (
            <Image
              src={(post.image as Media).url || ''}
              alt={(post.image as Media).alt}
              width={(post.image as Media).width || 0}
              height={(post.image as Media).height || 0}
            />
          )}
        </a>
      </div>

      <h3>
        <a href="blog-single.html" className="block text-dark font-bold text-xl mb-3.5">
          <span className="bg-linear-to-r from-primary/50 to-primary/40 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
            {post.title}
          </span>
        </a>
      </h3>

      {post.excerpt && <p className="text-sm">{post.excerpt}</p>}

      <div className="flex flex-wrap gap-3 items-center justify-between mt-4.5">
        <div className="flex items-center gap-2.5">
          <p className="text-sm">{new Date(post.date).toLocaleDateString()}</p>
        </div>
        <a
          href="category.html"
          className="inline-flex text-blue bg-blue/[0.08] font-medium text-sm py-1 px-3 rounded-full"
        >
          {post.town}
        </a>
      </div>
    </div>
  )
}
