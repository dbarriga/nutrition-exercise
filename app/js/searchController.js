angular.module('myApp').controller('searchCtrl', ['$scope', 'searchService', '$routeParams',
    function($scope, searchService, $routeParams)
    {
        $scope.food = '';
        $scope.search = function() {
            searchService.getFood($scope.food).then(function(result)
            {
                $scope.foodResult = result.data.list.item;

            });
        };

        $scope.updateFavorites = function(food) {
            if(food.favorite)
            {
                let x = localStorage.favorites.length > 0 ? localStorage.favorites.split(',') : [];
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
            let x = localStorage.favorites.split(',');
            let index = x.indexOf(food.ndbno);
            x.splice(index, 1);
            localStorage.favorites = x.toString();
            $scope.favorites.forEach(function(item){
                if (item.ndbno === food.ndbno) {
                    delete item;
                }
            });
            $scope.favorites.splice(index)
        };

        function checkFavorites()
        {
            $scope.favorites = [];
            let x = localStorage.favorites.length > 0 ? localStorage.favorites.split(',') : [];
            x.forEach(function(item)
            {
                searchService.getFood(item).then(function(result)
                {
                    $scope.favorites.push(result.data.list.item[0]);
                });
            });
        }

        checkFavorites();

}]);
