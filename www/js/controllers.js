angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $http) {

  //定义起始数据
  $scope.playlists = [];
  if(!globalData){
    $http.get('js/yuedu.json').success(function(data){
      globalData = data; //把数据放在全局空间里以让其它控制器可以访问
      $scope.playlists = data;
    }).error(function(e){
      console.log('load failed');
    });
  }
  $scope.playlists = globalData;

})

.controller('PlaylistCtrl', function($scope, $stateParams, $sce, $http) {
  var id = $stateParams.playlistId;

  if(!globalData){
    $http.get('js/yuedu.json').success(function(data){
      globalData = data; //把数据放在全局空间里以让其它控制器可以访问
      $scope.playlist = globalData[id];
      $scope.playlist.source = $sce.trustAsResourceUrl($scope.playlist.source);
    }).error(function(e){
      console.log('load failed');
    });
  } else {
    $scope.playlist = globalData[id];
    $scope.playlist.source = $sce.trustAsResourceUrl($scope.playlist.source);
  }

  $scope.pause = false;

  $scope.play = function(){
    var player = document.getElementById('player');
    if(player.paused){
      player.play(); //播放
      $scope.pause = true;
      //$('#play_controller').removeClass('ion-play');
      //$('#play_controller').addClass('ion-pause');
    } else {
      player.pause(); //暂停
      $scope.pause = false;
      //$('#play_controller').removeClass('ion-pause');
      //$('#play_controller').addClass('ion-play');
    }
  };
});
