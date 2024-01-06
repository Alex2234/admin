import { fetchPostDomainsRequest } from "../../utils/getDomains";
export const GET_DOMAINS_REQUEST = "GET_DOMAINS_REQUEST";
export const GET_DOMAINS_SUCCESS = "GET_DOMAINS_SUCCESS";
export const GET_DOMAINS_FAILED = "GET_DOMAINS_FAILED";


export const getDomains = () => {
    return function (dispatch) {
      dispatch({
        type: GET_DOMAINS_REQUEST,
      });
      fetchPostDomainsRequest()
        .then((res) =>
          dispatch({
            type: GET_DOMAINS_SUCCESS,
            payload: res,
          })
        )
        .catch((err) => {
          dispatch({
            type: GET_DOMAINS_FAILED,
          });
        });
    };
  };