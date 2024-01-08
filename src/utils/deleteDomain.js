import { checkResponse } from "./checkResponse";
import { urlKeitaro } from "./url";

export const fetchDeleteDomainRequest = (id) => {
    return fetch(`${urlKeitaro}/domains/${id}`, {
        method: 'DELETE',
        headers: {
            "Api-Key": "434d601541be43acd4ec4b0858e83bbc",
            "Content-Type": "application/json",
            "accept": "application/json",
        },
    }).then(checkResponse)
}