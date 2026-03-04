export const SinglePost = ({ post }: { post: any }) => {
  return (
    <div className="group">
      <div className="mb-6 overflow-hidden rounded-[10px] transition-all group-hover:scale-105">
        <a href="blog-single.html">
          <img src={post.image} alt="image" className="w-full" />
        </a>
      </div>

      <h3>
        <a href="blog-single.html" className="block text-dark font-bold text-xl mb-3.5">
          <span className="bg-linear-to-r from-primary/50 to-primary/40 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
            {post.title}
          </span>
        </a>
      </h3>
      <p>{post.description}</p>

      <div className="flex flex-wrap gap-3 items-center justify-between mt-4.5">
        <div className="flex items-center gap-2.5">
          <a href="author.html" className="flex items-center gap-3">
            <div className="flex w-6 h-6 rounded-full overflow-hidden">
              <img src={post.authorImage} alt="user" />
            </div>
            <p className="text-sm">{post.author}</p>
          </a>

          <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>

          <p className="text-sm">{post.date}</p>
        </div>
        <a
          href="category.html"
          className="inline-flex text-blue bg-blue/[0.08] font-medium text-sm py-1 px-3 rounded-full"
        >
          {post.category}
        </a>
      </div>
    </div>
  )
}
