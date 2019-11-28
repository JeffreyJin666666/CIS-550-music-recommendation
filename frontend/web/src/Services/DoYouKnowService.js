


export function getRandomSongs(onChange, key){
    fetch('http://localhost:3001/songs')
        .then(response => response.json())
        .then(data =>
            onChange(key, data)
        );
}

export function searchQuery(onChange, key, request){

}