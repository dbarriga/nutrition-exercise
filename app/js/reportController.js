angular.module('myApp').controller('reportCtrl', ['$scope', 'searchService', '$routeParams',
    function($scope, searchService, $routeParams)
    {
        $scope.nutrients = new Object();
        $scope.nutrients2 = []
        searchService.getReport($routeParams.reportId).then(function(result)
        {
            $scope.reportResult = result.data.report.food;
            console.log($scope.reportResult);
            $scope.reportResult.nutrients.forEach(function(item)
            {
                if(!$scope.nutrients[item.group]){
                    $scope.nutrients[item.group] = [];
                }
                $scope.nutrients[item.group].push(item);
            });
            for (key in $scope.nutrients){
                $scope.nutrients2.push($scope.nutrients[key]);
            }
            console.log($scope.nutrients2);
        });
    }]);
