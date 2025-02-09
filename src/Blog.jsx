import { Route, Routes, useLocation } from "react-router";
import "./Blog.css";

import { AuthForm } from "./pages/AuthForm/AuthForm";

import { useDispatch } from "react-redux";
import { SESSION_STORAGE_USER } from "./services";
import { NewPost, Post } from "./pages/Post";
import { MainContainer } from "./pages/Main";
import { Error404, Users } from "./pages";
import { useLayoutEffect, useState } from "react";
import { setUser } from "./services/store/slice/authSlice";
import { SearchContext } from "./services/context/context";
import { Footer, HeaderContainer } from "./components";

function Blog() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem(SESSION_STORAGE_USER);
    if (!currentUserDataJSON) return;
    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(setUser(currentUserData));
  }, []);
  return (
    <div className="app">
      <SearchContext.Provider value={{ searchPhrase, setSearchPhrase, isSearch, setIsSearch }}>
        <HeaderContainer />
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/auth" element={<AuthForm>SIGN IN</AuthForm>} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<NewPost />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </SearchContext.Provider>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default Blog;
