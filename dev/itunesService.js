(function(){
  'use strict';
  angular.module('itunes').service('itunesService', ['$http', '$q', function($http, $q){

    const baseUrl = 'https://itunes.apple.com/search?term=';

    this.getSongData = (artist) => {
      var defer = $q.defer();
      console.log(artist, 'from svc');
      $http({
        method: 'JSONP',
        url: baseUrl + artist + '&callback=JSON_CALLBACK'
      }).then(function(response) {
        let songData = response.data.results;
        let songArr = songData.map(function(value) {
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

  }]);
})();
