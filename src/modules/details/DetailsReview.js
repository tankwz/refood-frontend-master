/** @format */
import styled from "styled-components";
import React from "react";
import DetailsRate from "./DetailsRate";
import DetailsDesc from "./DetailsDesc";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const links = [
  {
    id: "1",
    title: "Mô tả",
  },
  {
    id: "2",
    title: "Đánh giá",
  },
];

const DetailsReviewStyled = styled.div`
  margin-top: 60px;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 20px;
  .review-tab {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 20px;
    gap: 40px;
    border-bottom: 1px solid ${(props) => props.theme.lineGray};
    li {
      text-transform: uppercase;
      font-size: 18px;
      font-weight: 600;
      color: ${(props) => props.theme.textPrimary};
      opacity: 0.5;
      letter-spacing: 1px;
      height: 30px;
      cursor: pointer;
    }
    li.activeReview {
      transition: all 0.5s linear;
      opacity: 1;
      border-bottom: 3px solid ${(props) => props.theme.primary};
    }
  }
  .review-desc {
    padding: 20px 40px;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    .review-desc {
      padding: 20px 0;
    }
  }
`;

const DetailsReview = () => {
  const reviewRef = useRef(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let reviewSelector = document.getElementsByClassName("review-tab");
    const review = reviewSelector[0].children[0];
    review.classList.add("activeReview");
    return () => {
      review.classList.remove("activeReview");
    };
  }, []);
  const handleClick = (index) => {
    if (index > 0) {
      setShow(false);
    } else {
      setShow(true);
    }
    const reviews = reviewRef.current.children;
    const activeItems = document.querySelectorAll(".activeReview");
    for (let i = 0; i < activeItems.length; i++) {
      activeItems[i].classList.remove("activeReview");
    }
    reviews[index].classList.add("activeReview");
  };

  return (
    <DetailsReviewStyled>
      <ul className="review-tab" ref={reviewRef}>
        {links.length > 0 &&
          links.map((link, index) => (
            <li key={link.id} onClick={() => handleClick(index)}>
              {link.title}
            </li>
          ))}
      </ul>
      <div className="review-desc">
        {show ? <DetailsDesc></DetailsDesc> : <DetailsRate></DetailsRate>}
      </div>
    </DetailsReviewStyled>
  );
};

export default DetailsReview;
