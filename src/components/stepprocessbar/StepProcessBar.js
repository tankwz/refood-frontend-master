/** @format */

import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

const StepProcessBarStyled = styled.div`
  .step-wizard-list {
    background: #fff;
    /* box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1); */
    color: #333;
    list-style-type: none;
    border-radius: 10px;
    display: flex;
    padding: 20px 10px;
    position: relative;
    z-index: 10;
  }

  .step-wizard-item {
    padding: 0 20px;
    flex-basis: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    min-width: 170px;
    position: relative;
  }
  .step-wizard-item + .step-wizard-item:after {
    content: "";
    position: absolute;
    left: 0;
    top: 19px;
    background: #1dc071;
    width: 100%;
    height: 2px;
    transform: translateX(-50%);
    z-index: -10;
  }
  .progress-count {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 600;
    margin: 0 auto;
    position: relative;
    z-index: 10;
    color: transparent;
  }
  .progress-count:after {
    content: "";
    height: 10px;
    width: 10px;
    background: #1dc071;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: -10;
  }
  .progress-label {
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
  }
  .current-item .progress-count:before,
  .current-item ~ .step-wizard-item .progress-count:before {
    display: none;
  }
  .current-item ~ .step-wizard-item .progress-count:after {
    height: 10px;
    width: 10px;
  }
  .current-item ~ .step-wizard-item .progress-label {
    opacity: 0.5;
  }
  .current-item .progress-count:after {
    background: #fff;
    border: 2px solid #1dc071;
    width: 40px;
    height: 40px;
  }
  .current-item .progress-count {
    color: #1dc071;
  }
`;

const StepProcessBar = ({ orderState }) => {
  useEffect(() => {
    const select = document.querySelectorAll(".step-wizard-list");
    if (select) {
      const steps = select[0]?.children;
      for (let i = 0; i < steps.length; i++) {
        steps[i].classList.remove("current-item");
      }
      steps[orderState].classList.add("current-item");
    }
  }, [orderState]);
  return (
    <StepProcessBarStyled>
      <ul className="step-wizard-list">
        <li className="step-wizard-item ">
          <span className="progress-count">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>
          </span>
          <span className="progress-label">Chờ xác nhận</span>
        </li>
        <li className="step-wizard-item ">
          <span className="progress-count">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
          </span>
          <span className="progress-label">Đang thực hiện</span>
        </li>
        <li className="step-wizard-item ">
          <span className="progress-count">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </span>
          <span className="progress-label">Đã hoàn thành</span>
        </li>
        <li className="step-wizard-item ">
          <span className="progress-count">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <span className="progress-label">Đã hủy</span>
        </li>
      </ul>
    </StepProcessBarStyled>
  );
};

export default StepProcessBar;
