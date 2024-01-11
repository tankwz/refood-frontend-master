/** @format */

import styled from "styled-components";
import SectionRight from "components/layout/SectionRight";
import SectionLeft from "components/layout/SectionLeft";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

const HomeBannerStyled = styled.section`
  padding-top: 20px;
  .banner-main {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 1200px;
    min-height: 516px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  /* Desktop and Ipad pro*/
  @media (min-width: 1024px) and (max-width: 1263px) {
    .banner-main {
      min-height: auto;
    }
    .banner-left {
      display: none;
    }
    .banner-right {
      width: 100%;
    }
  }

  /* Tablets and Ipads */
  @media (min-width: 768px) and (max-width: 1023px) {
    .banner-main {
      min-height: auto;
    }
    .banner-left {
      display: none;
    }
    .banner-right {
      width: 100%;
    }
  }

  /* Mobiles */
  @media (min-width: 320px) and (max-width: 767px) {
    .banner-main {
      min-height: auto;
    }
    .banner-left {
      display: none;
    }
    .banner-right {
      width: 100%;
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyled>
      <div className="banner-main">
        <SectionLeft className="banner-left"></SectionLeft>
        <SectionRight className="banner-right">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            <SwiperSlide>
              <img src="/banner4.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/banner.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/banner3.jpg" alt="" />
            </SwiperSlide>
          </Swiper>
        </SectionRight>
      </div>
    </HomeBannerStyled>
  );
};

export default HomeBanner;
