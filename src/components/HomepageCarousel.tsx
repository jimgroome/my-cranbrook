'use client'

import type { Media } from '@/payload-types'
import Slider, { type Settings } from 'react-slick'
import { useRef } from 'react'

const arrowButtonClass =
  'inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#102128] shadow-[0_10px_24px_rgba(16,33,40,0.18)] transition-colors duration-200 hover:bg-white/90'

export const HomepageCarousel = ({
  images,
  title,
  description,
}: {
  images: Media[]
  title: string
  description?: string | null
}) => {
  const sliderRef = useRef<Slider | null>(null)

  if (!images.length) {
    return null
  }

  const settings: Settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    dots: false,
    fade: true,
    infinite: images.length > 1,
    pauseOnHover: false,
    speed: 800,
    swipe: images.length > 1,
  }

  return (
    <section
      className="relative overflow-hidden bg-[#102128]"
      style={{ minHeight: 'calc(100vh - var(--site-header-height, 0px))' }}
    >
      <div style={{ height: 'calc(100vh - var(--site-header-height, 0px))' }}>
        <Slider ref={sliderRef} {...settings} className="homepage-carousel">
          {images.map((image) => (
            <div key={image.id}>
              <div
                className="relative"
                style={{ height: 'calc(100vh - var(--site-header-height, 0px))' }}
              >
                {image.url ? (
                  <img
                    src={image.url}
                    alt={image.alt || title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-[#102128]" />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,21,29,0.84)_0%,rgba(8,21,29,0.46)_45%,rgba(8,21,29,0.14)_100%)]" />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-end">
        <div className="w-full px-5 pb-7 sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
          <div className="max-w-[720px]">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-white/70">
              Welcome to My Cranbrook
            </p>
            <h1 className="max-w-[680px] text-[42px] font-bold leading-[1.05] text-white sm:text-[68px]">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-[540px] text-[15px] leading-7 text-white/82 sm:mt-5 sm:text-lg">
                {description}
              </p>
            )}
          </div>

          <div className="pointer-events-auto mt-8 flex items-center justify-end gap-3 sm:mt-10">
            <button
              type="button"
              aria-label="Previous slide"
              className={arrowButtonClass}
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M12.5 4.16669L6.66666 10L12.5 15.8334"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className={arrowButtonClass}
              onClick={() => sliderRef.current?.slickNext()}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M7.5 4.16669L13.3333 10L7.5 15.8334"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
