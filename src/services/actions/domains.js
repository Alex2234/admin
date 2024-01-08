import { fetchPostDomainsRequest } from "../../utils/getDomains";
import { fetchDeleteDomainRequest } from "../../utils/deleteDomain";


export const GET_DOMAINS_REQUEST = "GET_DOMAINS_REQUEST";
export const GET_DOMAINS_SUCCESS = "GET_DOMAINS_SUCCESS";
export const GET_DOMAINS_FAILED = "GET_DOMAINS_FAILED";

export const DELETE_DOMAIN_REQUEST = "DELETE_DOMAIN_REQUEST";
export const DELETE_DOMAIN_SUCCESS = "DELETE_DOMAIN_SUCCESS";
export const DELETE_DOMAIN_FAILED = "DELETE_DOMAIN_FAILED";

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

export const deleteDomain = (id) => {
  return function (dispatch) {
    dispatch({
      type: DELETE_DOMAIN_REQUEST,
    });
    fetchDeleteDomainRequest(id)
      .then((res) => {
        dispatch({
          type: DELETE_DOMAIN_SUCCESS,
          payload: res,
        });
        dispatch(getDomains());
      })
      .catch((err) => {
        dispatch({
          type: DELETE_DOMAIN_FAILED,
        });
      });
  };
};