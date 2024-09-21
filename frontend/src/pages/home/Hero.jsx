import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Img1 from "../../assets/hero-carousel/img1.png";
import Img2 from "../../assets/hero-carousel/img2.png";
import Img3 from "../../assets/hero-carousel/img3.png";
import Img4 from "../../assets/hero-carousel/img4.png";

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8'>
        <div className='md:w-1/2 w-full text-center'>
            <h1 className='md:text-5xl text-3xl font-bold md:leading-tight'>
              Welcome to the MERN Blog
            </h1>
            <p className='py-4'>
              Dive into the world of full-stack web development with our MERN blog. Whether you're just getting started or looking to refine your skills, explore articles on MongoDB, Express.js, React, and Node.js. Stay updated with tutorials, tips, and best practices to elevate your coding journey.
            </p>
            <Link
          to='/blogs'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
        </div>

        <div className='md:w-1/2 w-full mx-auto bg-black'>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
                delay: 1500,
                disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
          >
            <SwiperSlide>
                <img src={Img1} alt="MERN Stack Tutorial" className='w-full lg:h-[420px] sm:h-96 h-80' />
            </SwiperSlide>
            <SwiperSlide>
                <img src={Img2} alt="Full Stack Development" className='w-full lg:h-[420px] sm:h-96 h-80' />
            </SwiperSlide>
            <SwiperSlide>
                <img src={Img3} alt="React Best Practices" className='w-full lg:h-[420px] sm:h-96 h-80' />
            </SwiperSlide>
            <SwiperSlide>
                <img src={Img4} alt="Node.js Guides" className='w-full lg:h-[420px] sm:h-96 h-80' />
            </SwiperSlide>
          </Swiper>
        </div>
    </div>
  );
}

export default Hero;
