(function(){
  'use strict';
  angular.module('itunes').controller('mainCtrl', ['$scope', 'itunesService', function($scope, itunesService){

    $scope.gridOptions = {
      data: 'songData',
      height: '110px',
      sortInfo: {
        fields: [
          'Song', 'Artist', 'Collection', 'Type'
        ],
        directions: ['asc']
      },
      columnDefs: [
        {
          field: 'Play',
          displayName: 'Play',
          width: '40px',
          cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a target="_blank" href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png" target="_blank"></a></div>'
        }, {
          field: 'Artist',
          displayName: 'Artist'
        }, {
          field: 'songTitle',
          displayName: 'Title'
        }, {
          field: 'Collection',
          displayName: 'Collection'
        }, {
          field: 'AlbumArt',
          displayName: 'Album Art',
          width: '110px',
          cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'
        }, {
          field: 'Type',
          displayName: 'Type'
        }, {
          field: 'CollectionPrice',
          displayName: 'Collection Price'
        }
      ]
    };

    $scope.songData = null;

    $scope.getSongData = (artist) => {
      console.log(artist, 'from ctrl');
      console.log('firing from controller');
      itunesService.getSongData(artist).then(function(response) {
        $scope.songData = response;
        console.log(response, 'from ctrl');
      })
    }

  }]);

})();


