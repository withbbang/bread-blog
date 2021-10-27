export const isLoggedIn = () => {
  if (localStorage.getItem("token")) return true;
  else return false;
};
