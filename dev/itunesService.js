(function(){
  'use strict';
angular.module('itunes').service('itunesService', ['$http', '$q', function($http, $q){
  
  // this service is going to have a method which takes in an artist name as the parameter, then uses a JSONP http request to call the iTunes API and retrieve the data about that specific artist.

  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.
  const baseUrl =  'https://itunes.apple.com/search?term=';

    this.getSongData = (artist) => {
      var defer = $q.defer();
        console.log(artist, 'from svc');
        $http({
          method: 'JSONP',
          url: baseUrl + artist + '&callback=JSON_CALLBACK'
        }).then(function(response) {
          let songData = response.data.results;
          let songArr = songData.map(function(value){
            let obj = {
              AlbumArt: value.artworkUrl60,
               Artist: value.artistName,
               SongTitle: value.trackName,
               Collection: value.collectionName,
               CollectionPrice: '$' + value.collectionPrice,
               Play: value.previewUrl,
               Type: value.kind[0].toUpperCase() + value.kind.slice(1)
            }
            return obj;
          })
          defer.resolve(songArr);
          console.log(songArr);
        });
        return defer.promise;
    };

  //the iTunes API is going to give you a lot more details than ng-grid wants. Create a new array and then loop through the iTunes data pushing into your new array objects that look like the above data. Make sure your method returns this finalized array of data. 
  // When this is complete, head back to your controller.


}]);
})();
