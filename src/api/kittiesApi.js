export const fetchKitty = kittyId => {
    return fetch(`https://api.cryptokitties.co/kitties/${kittyId}`)
        .then(resp => {
            return resp.json();
        })
        .catch(e => {
            // TODO: handle/log error
            throw e;
        });
};
