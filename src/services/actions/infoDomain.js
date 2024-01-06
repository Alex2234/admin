import { fetchDomainInfoRequest } from "../../utils/getInfodomain";
export const GET_INFO_DOMAINS_REQUEST = "GET_INFO_DOMAINS_REQUEST";
export const GET_INFO_DOMAINS_SUCCESS = "GET_INFO_DOMAINS_SUCCESS";
export const GET_INFO_DOMAINS_FAILED = "GET_INFO_DOMAINS_FAILED";


export const getInfoDomain = (domain) => {
    return function (dispatch) {
      dispatch({
        type: GET_INFO_DOMAINS_REQUEST,
      });
      fetchDomainInfoRequest(domain)
        .then((res) =>
          dispatch({
            type: GET_INFO_DOMAINS_SUCCESS,
            payload: res,
          })
        )
        .catch((err) => {
          dispatch({
            type: GET_INFO_DOMAINS_FAILED,
          });
        });
    };
  };