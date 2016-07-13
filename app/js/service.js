angular.module('myApp').service('searchService', ['$http',
    function searchService($http)
    {
        this.getFood = function(food)
        {
            return $http.get('http://api.nal.usda.gov/ndb/search/?format=json&q='+food+'&sort=n&max=25&offset=0&api_key=yjoFLOdw4OPGWM9zt4H3PaKN5UWVZNmdDph11eyL').then(function(response)
            {
                return response;
            });
        };

        this.getReport = function(id)
        {
            return $http.get('http://api.nal.usda.gov/ndb/reports/?ndbno='+id+'&type=b&format=json&api_key=yjoFLOdw4OPGWM9zt4H3PaKN5UWVZNmdDph11eyL').then(function(response)
            {
                return response;
            });
        }
    }])
