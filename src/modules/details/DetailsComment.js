/** @format */

import Swal from "sweetalert2";
import styled from "styled-components";
import React from "react";
import formatToDate from "utils/formatDate";
import Comment from "modules/comment/Comment";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getCommentDetails } from "store/food/slice";
import { Button } from "components/button";

const DetailsCommentStyled = styled.div`
  margin-top: 60px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px 40px;
  .cmt-heading {
    display: inline;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.theme.textPrimary};
    border-bottom: 3px solid ${(props) => props.theme.primary};
    letter-spacing: 1px;
    cursor: pointer;
  }

  .cmt-content {
    padding: 40px 0;
    border-top: 1px solid ${(props) => props.theme.line};
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .cmt-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }
  .cmt-avatar {
    width: 30px;
    height: 30px;
    background: #ddd;
    color: ${(props) => props.theme.text};
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 30px;
  }
  .cmt-name {
    text-transform: capitalize;
    font-size: 16px;
    color: ${(props) => props.theme.text};
  }
  .cmt-question {
    font-size: 14px;
    color: ${(props) => props.theme.text};
    font-weight: 400;
    letter-spacing: 1px;
  }
  .cmt-answer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
  }
  .cmt-rely {
    color: ${(props) => props.theme.primary};
    font-size: 13px;
    padding: 5px 0;
    cursor: pointer;
  }
  .cmt-delete {
    color: ${(props) => props.theme.text};
    font-size: 13px;
    padding: 5px 0;
    margin-left: 5px;
    cursor: pointer;
  }
  .cmt-time {
    color: ${(props) => props.theme.textGray};
    font-size: 13px;
    pointer-events: none;
  }
  .cmt-input {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
  }
  .list-rely {
    padding: 10px 10px;
    background-color: ${(props) => props.theme.lightRed};
    position: relative;
  }
  .list-rely::before {
    border-bottom: 50px solid ${(props) => props.theme.lightRed};
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 50px solid transparent;
    border-width: 11px;
    margin-left: -11px;
    z-index: 1;
  }
  .list-rely::after {
    border-bottom: 50px solid ${(props) => props.theme.lightRed};
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 50px solid transparent;
    border-width: 10px;
    margin-left: -10px;
  }
  .list-rely::before,
  .list-rely::after {
    position: absolute;
    content: " ";
    height: 0;
    width: 0;
    top: -20px;
    left: 18px;
  }
  .rely {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .rely-user {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
  .rely-image {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
  .qtv {
    background-color: ${(props) => props.theme.blueBold};
    padding: 0 5px;
    border-radius: 8px;
    font-size: 10px;
    color: #fff;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .cmt-input {
      width: auto;
    }
  }
  @media (min-width: 320px) and (max-width: 767px) {
    .cmt-input {
      width: auto;
    }
    .cmt-name {
      font-size: 14px;
    }
  }
`;

const DetailsComment = () => {
  const [showCmt, setShowCmt] = useState(false);
  const [page, setPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const { foodDetails, comments, countAllComment } = useSelector(
    (state) => state.food
  );

  const user = window.localStorage.getItem("user");
  const CustomerId = JSON.parse(user)?.CustomerId;
  const dispatch = useDispatch();

  const handleClickCmt = () => {
    setShowCmt(true);
  };

  useEffect(() => {
    async function fetchCommentDetails() {
      try {
        if (foodDetails?.FoodId) {
          dispatch(
            getCommentDetails({ foodId: foodDetails?.FoodId, page: page })
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCommentDetails();
  }, [dispatch, foodDetails?.FoodId, page]);

  const handleDeleteCmt = (CommentId) => {
    Swal.fire({
      title: "Bạn muốn xóa bình luận?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#2bbef9"',
      confirmButtonText: "Xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteComment({ commentid: CommentId, foodid: foodDetails?.FoodId })
        );
        dispatch(
          getCommentDetails({ foodId: foodDetails?.FoodId, page: page })
        );
      }
    });
  };

  const handleLoadMore = () => {
    setLoading(true);
    try {
      if (page < countAllComment) {
        setTimeout(() => {
          setPage(page * 2);
          dispatch(
            getCommentDetails({ foodId: foodDetails?.FoodId, page: page })
          );
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  return (
    <DetailsCommentStyled>
      <h3 className="cmt-heading">Bình luận</h3>
      <Comment className="pt-10 pb-10 cmt-input"></Comment>
      {comments?.length > 0 &&
        comments.map((cmt) => {
          let nameComment = cmt.CommentOwnerName.charAt(0);
          const formatDate = formatToDate(cmt.CommentTime);
          return (
            <div className="cmt-content" key={cmt.CommentId}>
              <div className="cmt-info">
                <div className="pointer-events-none cmt-avatar">
                  {nameComment}
                </div>
                <strong className="pointer-events-none cmt-name">
                  {cmt.CommentOwnerName}
                </strong>
              </div>
              <div className="pointer-events-none cmt-question">
                {cmt.CommentContent}
              </div>
              <div className="cmt-answer">
                <span className="cmt-rely" onClick={handleClickCmt}>
                  Trả lời
                </span>
                {CustomerId === cmt.CommentOwnerId && (
                  <span
                    className="cmt-delete"
                    onClick={() => handleDeleteCmt(cmt.CommentId)}
                  >
                    Xóa
                  </span>
                )}
                <span className="pointer-events-none">-</span>
                <span className="cmt-time">{formatDate}</span>
              </div>
              {cmt.CommentReplies.length > 0 &&
                cmt.CommentReplies.map((rely) => {
                  const formatDateRely = formatToDate(rely.CommentReplyTime);
                  return (
                    <div className="list-rely" key={rely.CommentReplyID}>
                      <div className="rely">
                        <div className="rely-user">
                          <img src="/logo.png" alt="" className="rely-image" />
                          <strong className="pointer-events-none cmt-name">
                            {rely.CommentReplierName}
                          </strong>
                          <div className="pointer-events-none qtv">
                            Quản trị viên
                          </div>
                        </div>
                        <div className="pointer-events-none cmt-question">
                          {rely.CommentReplyContent}
                        </div>
                        <div className="cmt-answer">
                          <span className="cmt-rely" onClick={handleClickCmt}>
                            Trả lời
                          </span>
                          <span>-</span>
                          <span className="cmt-time">{formatDateRely}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {showCmt && <Comment className="cmt-input"></Comment>}
            </div>
          );
        })}
      {comments?.length > 0 && (
        <div className="flex justify-center">
          {!loading ? (
            <Button
              type="submit"
              height="40px"
              className=""
              onClick={handleLoadMore}
              disabled={page >= countAllComment}
            >
              Xem thêm
            </Button>
          ) : (
            <Button
              type="submit"
              height="40px"
              className="w-[130px] pointer-events-none"
              onClick={handleLoadMore}
            >
              <div className="w-8 h-8 mx-auto border-4 border-t-4 border-white rounded-full border-t-transparent animate-spin"></div>
            </Button>
          )}
        </div>
      )}
    </DetailsCommentStyled>
  );
};

export default DetailsComment;
