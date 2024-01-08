import { checkResponse } from "./checkResponse";
import { urlKeitaro } from "./url";

export const fetchPostDomainsRequest = () => {
    return fetch(`${urlKeitaro}/domains`, {
      headers: {
        "Api-Key": process.env.REACT_APP_API_KEITARO,
        "Content-Type": "application/json",
        "accept": "application/json",
      },
    }).then(checkResponse);
  };