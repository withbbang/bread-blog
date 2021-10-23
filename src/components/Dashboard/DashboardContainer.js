import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router";
import * as queries from "./Queries";
import DashboardPresenter from "./DashboardPresenter";

const DashboardContainer = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) history.replace("/");
  }, []);

  const history = useHistory();

  return <DashboardPresenter />;
};

export default DashboardContainer;
