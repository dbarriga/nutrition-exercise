angular.module('myApp').controller('searchCtrl', ['$scope', 'searchService', '$routeParams',
    function($scope, searchService, $routeParams)
    {
        $scope.food = '';
        $scope.search = function() {
            searchService.getFood($scope.food).then(function(result)
            {
                $scope.foodResult = result.data;
                console.log($scope.foodResult);
            });
        };

        $scope.updateFavorites = function(food) {
            if(food.favorite)
            {
                let x = localStorage.favorites.length > 0 ? localStorage.favorites.split(',') : [];
                x.push(food.ndbno);
                localStorage.favorites = x.toString();
            }
            else
            {
                let x = localStorage.favorites.split(',');
                let index = x.indexOf(food.ndbno);
                x.splice(index, 1);
                localStorage.favorites = x.toString();
            }
        }

}]);
