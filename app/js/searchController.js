angular.module('myApp').controller('searchCtrl', ['$scope', 'searchService',
    function($scope, searchService)
    {
        $scope.food = '';
        $scope.search = function() {
            searchService.getFood($scope.food).then(function(result)
            {
                $scope.foodResult = result.data;
                console.log($scope.foodResult);
            });
        };

        $scope.report = function(id)
        {
            searchService.getReport(id).then(function(result){
                $scope.reportResult = result.data;
                console.log($scope.reportResult);
            });
        }
}]);
