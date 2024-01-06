import { urlWhois } from "./url";
import { checkResponse } from "./checkResponse";

export const fetchDomainInfoRequest
 = (domain) => {
  return fetch(`${urlWhois}/whois?q=${domain}`, {
    headers: {
        "X-RapidAPI-Key": "99fb0e7757msh9269d97a5c4e579p15074cjsn0c3c6865f27f",
        "X-RapidAPI-Host": "whois40.p.rapidapi.com"
      }
  }).then(checkResponse);
};


