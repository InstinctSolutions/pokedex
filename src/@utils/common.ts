import { saveAs } from 'file-saver';
export const handleValue = (value: number) => {

    if(value) {
        return value <= 100 ? value: 100;
    } else {
        return 0;
    }
}

export const storeData = (data: any) => {
    let blob = new Blob([data], {type: 'text/plain'});
    saveAs(blob, "../@data/data.json");
}

export const storeInCache = (data: any) => {

    caches.open('pokeData').then( cache => {

        cache.add(data).then( () => {
            console.log("Data cached ")
         });
    });
}

export const handlePokemonEncounters = (encounters: Array<object>) => {
    let location: Array<string> = [];
    if(encounters) {
        // console.log('encounter', encounters);
        encounters.map((item: any, key: number) => {
            return location.push(item.location_area.name)
        })
        // console.log(location);   
        return location
    } else {
        return location
    }
}

// const locationIsInKanto = (location: string) => {
//     fetch(`${ENDPOINT}/location/${location}`).then((res) => {
//         console.log(res);
//         return
//     })
// }