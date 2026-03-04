export const Hero = () => {
  return (
    <section id="home" className="rounded-b-[50px] relative overflow-hidden z-10 pb-15 pt-34">
      {/* Hero BG Shapes Start */}
      <div>
        <div className="absolute bottom-0 left-0 rounded-b-[50px] w-full h-full bg-gray"></div>
        <div className="hidden lg:block absolute bottom-0 left-0 rounded-b-[50px] w-full h-full">
          <img src="/hero-bg.svg" alt="hero" />
        </div>
      </div>
      {/* Hero BG Shapes End */}

      {/* Hero Content Start */}
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0 relative z-1">
        <div className="flex flex-wrap gap-x-7.5 gap-y-9">
          {/* Hero item */}
          <div className="max-w-[1170px] w-full flex flex-col lg:flex-row lg:items-center gap-7.5 lg:gap-11 bg-white shadow-1 rounded-xl p-4 lg:p-2.5">
            <div className="lg:max-w-[536px] w-full">
              <a href="blog-single.html">
                <img className="w-full" src="https://picsum.photos/536/320" alt="hero" />
              </a>
            </div>

            <div className="lg:max-w-[540px] w-full">
              <a
                href="category.html"
                className="inline-flex text-purple-dark bg-purple/[0.08] font-medium text-sm py-1 px-3 rounded-full mb-4"
              >
                Lifestyle
              </a>
              <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4">
                <a href="blog-single.html">
                  Begin here to obtain a brief summary encompassing all the essential
                </a>
              </h1>
              <p className="max-w-[524px]">
                This comprehensive post serves as your cheat-sheet to swiftly familiarize yourself
                with Ghost. Packed with crucial...
              </p>
              <div className="flex items-center gap-2.5 mt-5">
                <a href="author.html" className="flex items-center gap-3">
                  <div className="flex w-6 h-6 rounded-full overflow-hidden">
                    <img src="https://picsum.photos/100" alt="user" />
                  </div>
                  <p className="text-sm">Adrio Devid</p>
                </a>

                <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>

                <p className="text-sm">Sep 10, 2025</p>
              </div>
            </div>
          </div>

          {/* Hero item */}
          <div className="lg:max-w-[570px] w-full flex flex-col sm:flex-row sm:items-center gap-6 bg-white shadow-1 rounded-xl p-2.5">
            <div className="lg:max-w-[238px] w-full">
              <a href="blog-single.html">
                <img className="w-full" src="https://picsum.photos/238/180" alt="hero" />
              </a>
            </div>

            <div className="lg:max-w-[272px] w-full">
              <a
                href="category.html"
                className="inline-flex text-blue bg-blue/[0.08] font-medium text-sm py-1 px-3 rounded-full mb-4"
              >
                Technology
              </a>
              <h2 className="font-semibold text-custom-lg text-dark mb-3">
                <a href="blog-single.html">
                  14 Innovative Architectural Designs to Create a Vast Interior Space
                </a>
              </h2>
              <div className="flex items-center gap-2.5">
                <p className="text-sm">
                  <a href="author.html">By Adrio Devid</a>
                </p>

                <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>

                <p className="text-sm">Sep 10, 2025</p>
              </div>
            </div>
          </div>

          {/* Hero item */}
          <div className="lg:max-w-[570px] w-full flex flex-col sm:flex-row sm:items-center gap-6 bg-white shadow-1 rounded-xl p-2.5">
            <div className="lg:max-w-[238px] w-full">
              <a href="blog-single.html">
                <img className="w-full" src="https://picsum.photos/238/180" alt="hero" />
              </a>
            </div>

            <div className="lg:max-w-[272px] w-full">
              <a
                href="category.html"
                className="inline-flex text-green-dark bg-green/[0.08] font-medium text-sm py-1 px-3 rounded-full mb-4"
              >
                Travel
              </a>
              <h2 className="font-semibold text-custom-lg text-dark mb-3">
                <a href="blog-single.html">
                  Traveller Visiting Ice Cave With Amazing Eye-catching view with nature
                </a>
              </h2>
              <div className="flex items-center gap-2.5">
                <p className="text-sm">
                  <a href="author.html">By Adrio Devid</a>
                </p>

                <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>

                <p className="text-sm">Sep 10, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Content End */}
    </section>
  )
}
