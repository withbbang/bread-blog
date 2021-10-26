import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import * as queries from "./Queries";
import HeaderPresenter from "./HeaderPresenter";
import MHeaderPresenter from "./mobile/MHeaderPresenter";

const HeaderContainer = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const searchRef = useRef();

  const doSearch = () => {
    if (search !== "") {
      // setLoading(true);
      console.log("searching...");
    } else searchRef.current.focus();
  };

  const onSearchPress = (e) => {
    e.key === "Enter" && doSearch();
  };

  return isMobile ? (
    <MHeaderPresenter />
  ) : (
    <HeaderPresenter
      loading={loading}
      search={search}
      setSearch={setSearch}
      onSearchPress={onSearchPress}
      searchRef={searchRef}
    />
  );
};

export default HeaderContainer;
