angular.module('myApp').controller('searchCtrl', ['$scope', 'searchService', '$routeParams',
    function($scope, searchService, $routeParams)
    {
        $scope.food = '';
        $scope.alreadyFavorite = false;
        $scope.error = false;
        $scope.search = function() {
            searchService.getFood($scope.food).then(function(result)
            {
                    if(result.data)
                    {
                        $scope.foodResult = result.data.list.item;
                    }
                    else
                    {
                        $scope.error = true;
                    }
            });
        };

        $scope.updateFavorites = function(food) {
            if(food.favorite)
            {
                if(!localStorage.favorites)
                {
                    localStorage.favorites = '';
                }
                var x = localStorage.favorites.length > 0 ? localStorage.favorites.split(',') : [];
                if(x.indexOf(food.ndbno) > -1)
                {
                    $scope.alreadyFavorite = true;
                }
                else {
                    x.push(food.ndbno);
                    localStorage.favorites = x.toString();
                    $scope.favorites.push(food);
                }
            }
            else
            {
                $scope.removeFavorite(food);
            }
        }

        $scope.removeFavorite = function(food)
        {
            var x = localStorage.favorites.split(',');
            var index = x.indexOf(food.ndbno);
            x.splice(index, 1);
            localStorage.favorites = x.toString();
            $scope.favorites.forEach(function(item, index){
                if (item.ndbno === food.ndbno) {
                    $scope.favorites.splice(index, 1);
                }
            });
            food.favorite = false;
        };

        function checkFavorites()
        {
            $scope.favorites = [];
            if(localStorage.favorites)
            {
                var x = localStorage.favorites.length > 0 ? localStorage.favorites.split(',') : [];
                x.forEach(function(item)
                {
                    searchService.getFood(item).then(function(result)
                    {
                        $scope.favorites.push(result.data.list.item[0]);
                    }, function(err)
                    {
                        console.log('err', err);
                    });
                });
            }
        }

        checkFavorites();

}]);
