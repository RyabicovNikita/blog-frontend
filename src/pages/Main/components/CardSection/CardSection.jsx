import { useContext, useEffect, useRef, useState } from "react";
import { contentBack_img } from "../../../../images";
import { CardContainer, Scrollable, Section } from "../../styled-components";
import { getPosts, POSTS_ACTION_TYPES } from "../../../../services/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../../../services/store/selectors/selectors";
import { BlogCard, Error, Footer } from "../../../../components";
import { getLastPageFromLinks, PAGINATION_LIMIT } from "../../../../services";
import { SearchContext } from "../../../../services/context/context";
import { ERRORS } from "../../../../services/constants/constants";
import PropTypes from "prop-types";

export const CardSection = ({ cardSectionRef }) => {
  const lastPostRef = useRef(null);
  const dispatch = useDispatch();
  const { searchPhrase } = useContext(SearchContext);
  const posts = useSelector(selectPosts);
  const [page, setPage] = useState(1);
  const [isScrollToLast, setIsScrollToLast] = useState(false);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    getPosts(page, PAGINATION_LIMIT).then(({ posts, links }) => {
      dispatch({
        type: POSTS_ACTION_TYPES.GET_POSTS,
        payload: posts,
      });
      if (links) setLastPage(getLastPageFromLinks(links));
    });
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (lastPostRef.current) {
        const posTop = lastPostRef.current.getBoundingClientRect().top - 200;
        setIsScrollToLast(posTop + lastPostRef.current.clientHeight <= window.innerHeight && posTop >= 0);
      }
    };
    cardSectionRef.current.addEventListener("scroll", handleScroll);
  }, []);

  const observerLoader = useRef();

  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }
    observerLoader.current = new IntersectionObserver(actionInSight);

    if (lastPostRef.current) {
      observerLoader.current.observe(lastPostRef.current);
    }
  }, [isScrollToLast]);

  const actionInSight = (entries) => {
    if (entries[0].isIntersecting && page < lastPage) {
      setPage((prevState) => prevState + 1);
    }
  };

  const getPostsBySearch = () => {
    const filteredPosts = posts.filter((post) =>
      searchPhrase.length === 0 ? post : post.title.indexOf(searchPhrase) >= 0
    );
    if (filteredPosts.length === 0)
      return (
        <Error styles={" position: absolute;bottom: 50%;left: 50%;  transform: translate(-50%, -50%);"}>
          {ERRORS.POSTS_NOT_FOUND}
        </Error>
      );
    return filteredPosts.map((post, index) =>
      index + 1 === posts.length ? (
        <BlogCard post={post} key={post.id} lastPostRef={lastPostRef} />
      ) : (
        <BlogCard post={post} key={post.id} />
      )
    );
  };
  return (
    <Section href={contentBack_img}>
      <Scrollable ref={cardSectionRef}>
        <CardContainer>{posts?.length > 0 && getPostsBySearch()}</CardContainer>
        <Footer />
      </Scrollable>
    </Section>
  );
};

CardSection.propTypes = {
  cardSectionRef: PropTypes.object.isRequired,
};
