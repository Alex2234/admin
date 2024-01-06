import {
    GET_INFO_DOMAINS_REQUEST,
    GET_INFO_DOMAINS_SUCCESS,
    GET_INFO_DOMAINS_FAILED,
  } from "../actions/infoDomain";
  
  const initialState = {
    infoDomain: {},
    infoDomainRequest: false,
    infoDomainFailed: false,
  };
  
  export const infoDomainReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INFO_DOMAINS_REQUEST: {
        return {
          ...state,
          infoDomainRequest: true,
        };
      }
      case GET_INFO_DOMAINS_SUCCESS: {
        return {
          ...state,
          infoDomain: action.payload,
          infoDomainRequest: false,
        };
      }
      case GET_INFO_DOMAINS_FAILED: {
        return {
          ...state,
          infoDomainFailed: true,
          infoDomainRequest: false,
          infoDomain: {},
        };
      }
      default: {
        return state;
      }
    }
  };
  