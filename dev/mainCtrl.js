(function(){
  'use strict';
angular.module('itunes').controller('mainCtrl', ['$scope', 'itunesService', function($scope, itunesService){
  //This is setting up the default behavior of our ng-grid. The important thing to note is the 'data' property. The value is 'songData'. That means ng-grid is looking for songData on $scope and is putting whatever songData is into the grid.
  //This means when you make your iTunes request, you'll need to get back the information, parse it accordingly, then set it to songData on the scope -> $scope.songData = ...
  $scope.gridOptions = { 
      data: 'songData',
      height: '110px',
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']},
      columnDefs: [
        {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a target="_blank" href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png" target="_blank"></a></div>'},
        {field: 'Artist', displayName: 'Artist'},
        {field: 'songTitle', displayName: 'Title'},
        {field: 'Collection', displayName: 'Collection'},
        {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
        {field: 'Type', displayName: 'Type'},
        {field: 'CollectionPrice', displayName: 'Collection Price'},
      ]
  };

    $scope.songData = null;

    $scope.getSongData = (artist) => {
      console.log(artist, 'from ctrl');
      console.log('firing from controller');
      itunesService.getSongData(artist)
      .then(function(response) {
        $scope.songData = response;
        console.log(response, 'from ctrl');
      })
    }


  //If everything worked you should see a huge array of objects inside your console. That's great! But unfortunately that's not what ng-grid is expecting. What you need to do now is sort the data you got back. This sounds like a great job for a service! Head back to your itunesService and complete the last instructions there. 
  

    



  //Now that your service is doing the heavy lifting (sorting/formatting), we can now put the result of calling that method onto $scope.songData so that ng-grid will find it and populate the page.



}]);

})();


