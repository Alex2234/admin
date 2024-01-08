import { checkResponse } from "./checkResponse";
import { urlKeitaro } from "./url";

export const fetchDeleteDomainRequest = (id) => {
    return fetch(`${urlKeitaro}/domains/${id}`, {
        method: 'DELETE',
        headers: {
            "Api-Key": process.env.REACT_APP_API_KEITARO,
            "Content-Type": "application/json",
            "accept": "application/json",
        },
    }).then(checkResponse)
}