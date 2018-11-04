export const fetchKitty = kittyId => {
    return fetch(`https://api.cryptokitties.co/kitties/${kittyId}`)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw Error(resp.statusText);
            }
        })
        .catch(e => {
            throw e;
        });
};
