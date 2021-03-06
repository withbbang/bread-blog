import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import * as queries from "./Queries";
import HeaderPresenter from "./HeaderPresenter";
import MHeaderPresenter from "./mobile/MHeaderPresenter";

const HeaderContainer = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sideToggle, setSideToggle] = useState(false);

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
    <MHeaderPresenter
      loading={loading}
      sideToggle={sideToggle}
      setSideToggle={setSideToggle}
    />
  ) : (
    <HeaderPresenter
      loading={loading}
      search={search}
      setSearch={setSearch}
      onSearchPress={onSearchPress}
      searchRef={searchRef}
      sideToggle={sideToggle}
      setSideToggle={setSideToggle}
    />
  );
};

export default HeaderContainer;
