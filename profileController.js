app
    .controller(
        'profileController',
        function($scope,$rootScope,$http,$location) {
                     var len=0;
        			$rootScope.profiledet=[];
                    console.log("checkin the function " +$rootScope.checkVar);

                    $scope.goToProfile=function(){
                        $rootScope.checkVar=true;
                         $location.path('/profile');
                    }
                    $scope.goToInsert=function(){
                        $location.path('/insert');
                    }
                    $scope.goToFilter=function(){
                        $location.path('/filter');
                    }


                    
                    
					$http(
							{								
								url : "https://ts.accenture.com/sites/CignaSharepoint/DemandManagement/_api/SP.UserProfiles.PeopleManager/GetMyProperties",
								type : "GET",
								
								headers : {
									"accept" : "application/json;odata=verbose",
									
								}
							})
							.then(
									function(data) {
										console.log(data);
									    $rootScope.profiledet=data.data.d.AccountName;
										console.log("Profile Details Are " +$rootScope.profiledet);
                                        if($rootScope.checkVar != true){
                                        com();
                                    }

										})

                    function com(){            
                            $http(
                            {                               
                                url : "https://ts.accenture.com/sites/CignaSharepoint/DemandManagement/_api/web/lists/getbytitle('ProfileList')/items?$top=2000",
                                type : "GET",
                                
                                headers : {
                                    "accept" : "application/json;odata=verbose",
                                    
                                }
                            })
                            .then(
                                    function(data) {
                                        console.log(data);
                                        $rootScope.getDet=data.data.d.results;
                                        console.log($rootScope.getDet);
                                         console.log($rootScope.getDet.length);
                                        $rootScope.checkingVar = [];
                                        len=$rootScope.getDet.length;
                                         for(var i=0;i<len;i++){
                                            if($rootScope.getDet[i].Title===$rootScope.profiledet){
                                                $rootScope.checkingVar.push($rootScope.getDet);
                                                filtersub($rootScope.getDet[i].gkos);
                                            }
                                         }
                                         if($rootScope.checkingVar.length == 0){
                                           $location.path('/profile');
                                         }

                                        /*$rootScope.profiledet=data.data.d.AccountName;
                                        console.log("Profile Details Are " +$rootScope.profiledet);
*/
                                        })
                        }
                           



                        function filtersub(paramString) {
                        

                        $http(
                                {
                                    
                                    url : "https://ts.accenture.com/sites/CignaSharepoint/DemandManagement/_api/web/lists/getbytitle('Cigna IT Demands')/items?$top=2000&"
                                            + paramString,
                                    type : "GET",
                                    headers : {
                                        "accept" : "application/json;odata=verbose",
                                        
                                    }
                                })
                                .then(
                                        function(data) {
                                            console.log(data);
                                            groups1 = data.data.d.results;
                                            

                                            console.log(groups1.length);
                                            for (var i = 0; i < groups1.length; i++) {
                                                delete groups1[i]["Attachments"];
                                                delete groups1[i]["AttachmentFiles"];
                                                delete groups1[i]["AuthorId"];
                                                delete groups1[i]["ContentTypeId"];
                                                delete groups1[i]["Created"];
                                                delete groups1[i]["EditorId"];
                                                delete groups1[i]["FileSystemObjectType"];
                                                delete groups1[i]["GUID"];
                                                //                delete groups[i]["ID"];            
                                                delete groups1[i]["Id"];
                                                delete groups1[i]["Modified"];
                                                delete groups1[i]["OData__UIVersionString"];
                                                delete groups1[i]["RoleAssignments"];
                                                delete groups1[i]["ContentType"];
                                                delete groups1[i]["FieldValuesAsHtml"];
                                                delete groups1[i]["FieldValuesAsText"];
                                                delete groups1[i]["FieldValuesForEdit"];
                                                delete groups1[i]["File"];
                                                delete groups1[i]["FirstUniqueAncestorSecurableObject"];
                                                delete groups1[i]["Folder"];
                                                delete groups1[i]["ParentList"];
                                                $location.path('/page1');
                                            };

                                            $rootScope.groups = groups1;
                                            console.log($rootScope.groups);
                                        console.log($rootScope.groups.length);
                                        if($rootScope.groups.length==0){
                                            $location.path('/page1');
                                        }

                                           


                                       })
                                        

                    };
                         $scope.delete=function(){
                             $location.path('/preference');
                         }

						$scope.create = function () {
                                                $location.path('/preference');
                                            }
                                        });


