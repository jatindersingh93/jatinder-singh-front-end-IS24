import { useLocation, useNavigate, useParams } from "react-router-dom";
// react-router-dom does not support props.match.params or props.history, so following hooks will be usefull
export const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
};