import {
  GET_DOMAINS_REQUEST,
  GET_DOMAINS_SUCCESS,
  GET_DOMAINS_FAILED,
} from "../actions/domains";

const initialState = {
  domains: [],
  domainsRequest: false,
  domainFailed: false,
};

export const domainsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOMAINS_REQUEST: {
      return {
        ...state,
        domainsRequest: true,
      };
    }
    case GET_DOMAINS_SUCCESS: {
      return {
        ...state,
        domains: action.payload,
        domainsRequest: false,
      };
    }
    case GET_DOMAINS_FAILED: {
      return {
        ...state,
        domainFailed: true,
        domainsRequest: false,
        domains: [],
      };
    }
    default: {
      return state;
    }
  }
};
