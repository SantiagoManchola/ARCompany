'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import { slides } from '@/data/slides'
import Link from 'next/link'

export default function SliderSection() {
  return (
    <section className="h-[90vh]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => {
          const SlideContent = (
            <div
              className="w-full h-full flex items-center justify-center bg-cover bg-center text-white text-3xl font-bold px-4"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <span className="bg-black/60 p-4 rounded-lg">{slide.text}</span>
            </div>
          )

          return (
            <SwiperSlide key={slide.id}>
              {slide.link ? (
                <Link href={slide.link} className="block w-full h-full">
                  {SlideContent}
                </Link>
              ) : (
                SlideContent
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}
