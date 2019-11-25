------Listing All the API Needed--------
For the data returned, it will be better and easy to return, even though some might be empty 
{
 songs : [{}, {},....]
 singers : [{}, {},....]
}

##Get Songs with configuration (POST)

POST data will be like (all fields may be empty): 
{
 search_key : '', this might the song/singer/album's name 
 song_rating : '',
 from: #year
 to: #year
 genres: [], #list of genres
}

##Get Songs of a singer using singer's id (GET)

##Get Songs in a genres using album's id (GET)

##Get detail of A Song/Singer/Album (GET)





