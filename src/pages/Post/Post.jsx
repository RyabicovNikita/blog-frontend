import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Comments, PostContent } from "./components";
import { Modal, Loader, PrivateContainer, Error } from "../../components";
import { Error404 } from "../NotFound/NotFound";
import { deletePost, getPost } from "../../api";
import { POST_ACTION_TYPES } from "../../services/store/constants";
import "./Post.scss";

export const Post = () => {
  const [accessError, setAccessError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getPost(postId)
      .then((postData) => {
        if (postData?.error) {
          setServerError(postData.error);
          return;
        }
        dispatch({ type: POST_ACTION_TYPES.GET_POST, payload: postData });
      })
      .catch((error) => {
        switch (error) {
          case 404:
            setServerError(<Error404 />);
            break;
          default:
            console.error(error);
            setServerError("Что-то пошло не так. Повторите попытку позднее.");
        }
      })
      .finally(() => setIsLoading(false));
    return () => dispatch({ type: POST_ACTION_TYPES.CLEAR_POST_STATE });
  }, []);

  const confirmDeletePost = () => {
    deletePost(postId).then((result) => {
      if (result?.error) {
        setAccessError(result.error);
        setIsModalOpen(false);
        return;
      }
      dispatch({ type: POST_ACTION_TYPES.CLEAR_POST_STATE });
      setIsModalOpen(false);
      navigate("/");
    });
  };
  const rejectDeletePost = () => setIsModalOpen(false);
  return (
    <div className="blog">
      {isLoading ? (
        <Loader />
      ) : (
        <PrivateContainer error={accessError}>
          {serverError ? (
            <Error>{serverError}</Error>
          ) : (
            <>
              <PostContent setIsModalOpen={setIsModalOpen} />
              <Comments />
              {isModalOpen && (
                <Modal>
                  <div className="confirm-delete-modal">
                    <p className="confirm-delete-modal__question">{"Вы действительно хотите удалить текущий пост?"}</p>
                    <div className="confirm-delete-modal__answer">
                      <button onClick={confirmDeletePost} className="confirm-delete-modal__accept">
                        Да
                      </button>
                      <button onClick={rejectDeletePost} className="confirm-delete-modal__reject">
                        Отмена
                      </button>
                    </div>
                  </div>
                </Modal>
              )}
            </>
          )}
        </PrivateContainer>
      )}
    </div>
  );
};
