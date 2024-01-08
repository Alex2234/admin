import {
  GET_DOMAINS_REQUEST,
  GET_DOMAINS_SUCCESS,
  GET_DOMAINS_FAILED,
  DELETE_DOMAIN_FAILED,
  DELETE_DOMAIN_REQUEST,
  DELETE_DOMAIN_SUCCESS
} from "../actions/domains";

const initialState = {
  domains: [],
  domainsRequest: false,
  domainFailed: false,
  deleteDomainRequest: false,
  deleteDomainFailed: false,
  deleteDomainSuccess: ''
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
    case DELETE_DOMAIN_REQUEST: {
      return {
        ...state,
        deleteDomainRequest: true
      };
    }
    case DELETE_DOMAIN_SUCCESS: {
      return {
        ...state,
        deleteDomainRequest: false,
        deleteDomainSuccess: action.payload
      };
    }
    case DELETE_DOMAIN_FAILED: {
      return {
        ...state,
        deleteDomainFailed: true,
        deleteDomainSuccess: ''
      };
    }
    default: {
      return state;
    }
  }
};
