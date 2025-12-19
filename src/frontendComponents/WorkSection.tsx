"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function WorkSection() {
  const slides = [
    {
      title:
        "WFA.",
      description:
        "ESCAPE noun (TRAIL MTB SERIES™) 1. Introducing two new trail MTB tires: Escape Inter and Escape Max, engineered to perform across a wide spectrum of terrains and trail conditions. 2. Designed for riders who demand versatility and control, these tires can be precisely tailored to match your riding style and intended usage."
      ,
      button: "LEARN MORE",
    },
    // {
    //   title: "BUILT FOR MAXIMUM CONTROL ON ROUGH TRAILS.",
    //   description:
    //     "Escape Max offers exceptional grip, stability, and durability on aggressive terrain.",
    //   button: "EXPLORE MAX",
    // },
    // {
    //   title: "LIGHTWEIGHT PERFORMANCE FOR SPEED AND FLOW.",
    //   description:
    //     "Escape Inter delivers fast rolling efficiency and precise handling for trail riders.",
    //   button: "EXPLORE INTER",
    // },
  ];

  return (
    <section
      className="relative w-full md:h-[100vh] h-[80vh] flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://www.goodyearbike.com/wp-content/uploads/2024/05/Z30NSW-fadeV4.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10"></div>

      {/* LEFT SIDE CONTENT */}
      <div className="relative z-20 w-[100%] md:px-16 px-4 text-white">
        {slides.map((item, index) => (
          <div className="text-center max-w-5xl md:max-w-6xl mx-auto py-20">
            <h1 className="md:text-[180px] text-[90px] font-semibold leading-tight mb-6 drop-shadow-lg">
              {item.title}
            </h1>

            <p className="md:text-lg text-md text-gray-200 mb-8 drop-shadow-md">
              {item.description}
            </p>

            <button className="px-7 py-3 bg-[#FFD100] hover:bg-[#e6c200] text-black font-semibold shadow-lg">
              {item.button}
            </button>
          </div>
        ))}

        {/* <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="text-center max-w-5xl md:max-w-6xl mx-auto py-20">
                <h1 className="md:text-[180px] text-[90px] font-bold leading-tight mb-6 drop-shadow-lg">
                  {item.title}
                </h1>

                <p className="md:text-lg text-md text-gray-200 mb-8 drop-shadow-md">
                  {item.description}
                </p>

                <button className="px-7 py-3 bg-[#FFD100] hover:bg-[#e6c200] text-black font-semibold shadow-lg">
                  {item.button}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
    </section>
  );
}
