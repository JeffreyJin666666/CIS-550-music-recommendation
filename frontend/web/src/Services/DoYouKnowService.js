


export function getRandomSongs(onChange, key){
    fetch('http://ec2-18-208-142-214.compute-1.amazonaws.com:3001/songs')
        .then(response => response.json())
        .then(data =>
            onChange(key, data)
        );
}

export function searchQuery(onChange, key, request){
    fetch('http://ec2-18-208-142-214.compute-1.amazonaws.com:3001/search?from_year=' + request.from_year + '&to_year=' + request.to_year +  '&search_key='  +  request.search_key + '&search_type=' +  request.search_type + '&genre=' +  request.genres + '&song_rating=' + request.song_rating)
        .then(response => response.json())
        .then(data =>
            onChange(key, data)
        );
}

export function quickEntry(onChange, key, request){

    fetch('http://ec2-18-208-142-214.compute-1.amazonaws.com:3001/quick?index='+request)
        .then(response => response.json())
        .then(data =>
            onChange(key, data)
        );
}