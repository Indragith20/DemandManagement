app
		.controller(
				'myController',
				function($scope, $http, $rootScope, $location, $filter,$timeout) {

					
					$scope.login=function(){
						var username=$scope.user;
						var pwd=$scope.pwd;
						console.log("user and pwd is" +$scope.user);
						if($scope.user!='' && $scope.pwd!='' && $scope.user!=null && $scope.pwd!=null){
							$location.path("/filter");
							console.log("success");
							
						}
						else{
							$location.path("/filter");
							console.log("successsssss	");
						}
					}
					
					if(sessionStorage.getItem("selection") == null){
						$scope.selection = [];
					}
					else {
						$scope.selection = JSON.parse(sessionStorage.getItem("selection"));
					}
					if(sessionStorage.getItem("tsg") == null){
						$scope.tsg = [];
					}
					else{
						$scope.tsg = JSON.parse(sessionStorage.getItem("tsg"));
					}
					if(sessionStorage.getItem("location") == null){
						$scope.location = [];
					}
					else{
						$scope.location = JSON.parse(sessionStorage.getItem("location"));
					}
					if(sessionStorage.getItem("demand") == null){
						$scope.demand = [];
					}
					else{
						$scope.demand = JSON.parse(sessionStorage.getItem("demand"));
					}
					
					$scope.reset = function(){
							$scope.selection = [];						
							$scope.tsg = [];
							$scope.location = [];
							$scope.demand = [];						
					};

					$scope.toggleSelection = function toggleSelection(status) {
						var idx = $scope.selection.indexOf(status);
						if (idx > -1) {
							$scope.selection.splice(idx, 1);
							sessionStorage.setItem("selection", JSON.stringify($scope.selection));
						} else {
							$scope.selection.push(status);							
							sessionStorage.setItem("selection", JSON.stringify($scope.selection));
						}
						console.log($scope.selection)
					};

					$scope.toggleTsg = function toggleTsg(tsg) {
						var idx = $scope.tsg.indexOf(tsg);
						if (idx > -1) {
							$scope.tsg.splice(idx, 1);
							sessionStorage.setItem("tsg", JSON.stringify($scope.tsg));
						} else {
							$scope.tsg.push(tsg);
							sessionStorage.setItem("tsg", JSON.stringify($scope.tsg));
						}
						console.log($scope.tsg)
						
					};
					
					$scope.showList = function showList(event){
						event.stopPropagation();
					};

					$scope.toggleLocation = function toggleLocation(location) {
						var idx = $scope.location.indexOf(location);
						if (idx > -1) {
							$scope.location.splice(idx, 1);
							sessionStorage.setItem("location", JSON.stringify($scope.location));
						} else {
							$scope.location.push(location);
							sessionStorage.setItem("location", JSON.stringify($scope.location));
						}
						console.log($scope.location)
					};

					$scope.toggleDemand = function toggleDemand(demand) {
						var idx = $scope.demand.indexOf(demand);
						if (idx > -1) {
							$scope.demand.splice(idx, 1);
							sessionStorage.setItem("demand", JSON.stringify($scope.demand));
						} else {
							$scope.demand.push(demand);
							sessionStorage.setItem("demand", JSON.stringify($scope.demand));
						}
						console.log($scope.demand)
					};
					
					
					

					$http(
							{								
								url : "https://ts.accenture.com/sites/CignaSharepoint/DemandManagement/_api/web/lists/getbytitle('Cigna IT Demands')/items?$top=2000",
								type : "GET",
								
								headers : {
									"accept" : "application/json;odata=verbose",
									
								}
							})
							.then(
									function(data) {
										console.log(data);
										groups = data.data.d.results;

										console.log(groups.length);
										for (var i = 0; i < groups.length; i++) {
											delete groups[i]["Attachments"];
											delete groups[i]["AttachmentFiles"];
											delete groups[i]["AuthorId"];
											delete groups[i]["ContentTypeId"];
											delete groups[i]["Created"];
											delete groups[i]["EditorId"];
											delete groups[i]["FileSystemObjectType"];
											delete groups[i]["GUID"];
											//	                delete groups[i]["ID"];            
											delete groups[i]["Id"];
											delete groups[i]["Modified"];
											delete groups[i]["OData__UIVersionString"];
											delete groups[i]["RoleAssignments"];
											delete groups[i]["ContentType"];
											delete groups[i]["FieldValuesAsHtml"];
											delete groups[i]["FieldValuesAsText"];
											delete groups[i]["FieldValuesForEdit"];
											delete groups[i]["File"];
											delete groups[i]["FirstUniqueAncestorSecurableObject"];
											delete groups[i]["Folder"];
											delete groups[i]["ParentList"];
										}
										;

										$rootScope.filterData = groups;

										$rootScope.filterStatus = [];
										$rootScope.filterLocation = [];
										$rootScope.filterTSG = [];
										$rootScope.filterDemand = [];
										for (var i = 0; i < $rootScope.filterData.length; i++) {
											if($rootScope.filterData[i].Status=="Staffed" || $rootScope.filterData[i].Status=="01. Open" ||$rootScope.filterData[i].Status=="10. Identified" || $rootScope.filterData[i].Status=="09. On-Hold")
											{
												$rootScope.filterStatus
													.push($rootScope.filterData[i].Status);
											}
											$rootScope.filterLocation
													.push($rootScope.filterData[i].Location);
											$rootScope.filterTSG
													.push($rootScope.filterData[i].TSG);
											$rootScope.filterDemand
													.push($rootScope.filterData[i].Demand_x0020_Confidence);

										}
										console.log($rootScope.filterStatus);
										$rootScope.filterStatus = $filter(
												'unique')(
												$rootScope.filterStatus);
										$rootScope.filterLocation = $filter(
												'unique')(
												$rootScope.filterLocation);
										$rootScope.filterTSG = $filter('unique')
												($rootScope.filterTSG);
										$rootScope.filterDemand = $filter(
												'unique')(
												$rootScope.filterDemand);
										console.log($rootScope.filterStatus);

									}
									);

					var groups;
					$scope.value = "";

					$scope.items = [ {
						id : 1,
						label : 'aLabel',
						subItem : {
							name : 'aSubItem'
						}
					}, {
						id : 2,
						label : 'bLabel',
						subItem : {
							name : 'bSubItem'
						}
					} ];

					$scope.clickedVlaue = function(status) {
						alert(status);
					}

					$scope.tableClicked = function(clickedValue) {
						console.log("----->" + clickedValue);
						$scope.clickedID = clickedValue;
						$rootScope.page2Data = [];
						for (var i = 0; i < $rootScope.groups.length; i++) {
							if ($rootScope.groups[i].ID == $scope.clickedID) {
								$rootScope.page2Data.push($rootScope.groups[i]);
							}
						}
						$location.path('/page2');
						console.log($rootScope.page2Data);

					};

					$scope.backBtn = function() {
						$location.path('/page1');
					}

					$scope.backToMainPage = function() {
						$location.path('/filter');
					}

					$rootScope.fieldvalues = {};

					function buildParameterString() {
						
						var tempParamString = '$filter=';
						var queryAppended = false;

						var fieldValues = $rootScope.fieldvalues;
						console.log("fieldValue", fieldValues)
												
						if ($scope.tsg && $scope.tsg != null
								&& $scope.tsg != '') {
							var last = $scope.tsg.length;
							if (queryAppended) {
								tempParamString = tempParamString + " and ";
							}
							tempParamString = tempParamString + "(";
							for (var i = 0; i < $scope.tsg.length; i++) {

								tempParamString = tempParamString + "(TSG eq '"
										+ $scope.tsg[i] + "')";
								if (i + 1 < $scope.tsg.length) {
									tempParamString = tempParamString + " or ";
								}								
								queryAppended = true;
							}
							tempParamString = tempParamString + ")";
						}
						
						if ($scope.location && $scope.location != null
								&& $scope.location != '') {
							if (queryAppended) {
								tempParamString = tempParamString + " and ";
							}
							
							tempParamString = tempParamString + "(";
							for (var i = 0; i < $scope.location.length; i++) {
								tempParamString = tempParamString
										+ "(Location eq '" + $scope.location[i]
										+ "')";
								if (i + 1 < $scope.location.length) {
									tempParamString = tempParamString + " or ";
								}
								queryAppended = true;
							}
							tempParamString = tempParamString + ")";

						}

						if ($scope.selection && $scope.selection != null
								&& $scope.selection != '') {
							if (queryAppended) {
								tempParamString = tempParamString + " and ";
							}
							
							tempParamString = tempParamString + "(";
							for (var i = 0; i < $scope.selection.length; i++) {
								tempParamString = tempParamString
										+ "(Status eq '" + $scope.selection[i]
										+ "')";
								if (i + 1 < $scope.selection.length) {
									tempParamString = tempParamString + " or ";
								}
								queryAppended = true;
							}
							tempParamString = tempParamString + ")";

						}
						if ($scope.demand && $scope.demand != null
								&& $scope.demand != '') {
							if (queryAppended) {
								tempParamString = tempParamString + " and ";
							}
							
							tempParamString = tempParamString + "(";
							for (var i = 0; i < $scope.demand.length; i++) {
								tempParamString = tempParamString
										+ "(Demand_x0020_Type eq '" + $scope.demand[i]
										+ "')";
								if (i + 1 < $scope.demand.length) {
									tempParamString = tempParamString + " or ";
								}
								queryAppended = true;
							}
							tempParamString = tempParamString + ")";
						}

						return tempParamString;
					}

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

					$scope.submitPreferences=function(){

						/*$scope.visible=false;*/
						/*console.log($rootScope.fieldvalues.tsg);*/
						 var propertyNew=0;
						$rootScope.groups = [ {
							txt : 'Loading..'
						} ];
						console.log("$rootScope.fieldvalues",
								$rootScope.fieldvalues);
						var paramString = buildParameterString();
						$rootScope.paramString1=paramString;
						console.log("paramString", paramString);

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
                                        
                                        
                                        len=$rootScope.getDet.length;
                                         for(var i=0;i<len;i++){
                                            if($rootScope.getDet[i].Title===$rootScope.profiledet){
                                                $rootScope.delpro=$rootScope.getDet[i];
                                               	propertyNew=1;
                                                break;
                                            }
                                         }
                                         if(propertyNew==1){
                                        depo($rootScope.delpro);  
                                        }
                                        else{
                                        	crepo();
                                        }	
                                        /*$rootScope.profiledet=data.data.d.AccountName;
                                        console.log("Profile Details Are " +$rootScope.profiledet);
*/
                                        })


                            function depo(details){
                            console.log(details.Id);
                                  var itemId = details.Id;
                                  var siteUrl = "https://ts.accenture.com/sites/CignaSharepoint/DemandManagement/";
                                var clientContext = new SP.ClientContext(siteUrl);
                                var oList = clientContext.get_web().get_lists().getByTitle('ProfileList');

                                 var oListItem = oList.getItemById(itemId);
                                 console.log(oListItem);
                                oListItem.set_item('gkos',$rootScope.paramString1);
                              /*  oListItem.deleteObject();
*/									oListItem.update();
                                    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
                                
                                     function onQuerySucceeded() {

                                    alert('Item deleted: ' + itemId);
                                            }

                                function onQueryFailed(sender, args) {

                                    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                                }

                                }




                        function crepo(){
						var siteUrl = "https://ts.accenture.com/sites/CignaSharepoint/DemandManagement/";

                        var clientContext = new SP.ClientContext(siteUrl);

       	                var oList = clientContext.get_web().get_lists().getByTitle('ProfileList');

        		        var itemCreateInfo = new SP.ListItemCreationInformation();

       	                var oListItem = oList.addItem(itemCreateInfo);

                        var uname = $rootScope.profiledet;

						oListItem.set_item('Title', uname);
                        oListItem.set_item('gkos',$rootScope.paramString1);

                                              
                        oListItem.update();

                        clientContext.load(oListItem);

                        clientContext.executeQueryAsync(Function.createDelegate(this, this.onSaved), Function.createDelegate(this, this.onQueryFailed));

                                                function onSaved() {

                                                  alert('Successfully Saved');

                                                   id=oListItem.get_id();

                                                                submits=1;

                                                    }

 

                                                function onQueryFailed(sender, args) {

                                                    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());

                                                }
                                            }

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
											groups = data.data.d.results;
											

											console.log(groups.length);
											for (var i = 0; i < groups.length; i++) {
												delete groups[i]["Attachments"];
												delete groups[i]["AttachmentFiles"];
												delete groups[i]["AuthorId"];
												delete groups[i]["ContentTypeId"];
												delete groups[i]["Created"];
												delete groups[i]["EditorId"];
												delete groups[i]["FileSystemObjectType"];
												delete groups[i]["GUID"];
												//                delete groups[i]["ID"];            
												delete groups[i]["Id"];
												delete groups[i]["Modified"];
												delete groups[i]["OData__UIVersionString"];
												delete groups[i]["RoleAssignments"];
												delete groups[i]["ContentType"];
												delete groups[i]["FieldValuesAsHtml"];
												delete groups[i]["FieldValuesAsText"];
												delete groups[i]["FieldValuesForEdit"];
												delete groups[i]["File"];
												delete groups[i]["FirstUniqueAncestorSecurableObject"];
												delete groups[i]["Folder"];
												delete groups[i]["ParentList"];
												$location.path('/page1');
											};

											$rootScope.groups = groups;
											console.log($rootScope.groups);
										console.log($rootScope.groups.length);
											if($rootScope.groups.length==0){
												$location.path('/page1');
											}


										})







					}









					$scope.submit = function() {
						$scope.visible=false;
						console.log($rootScope.fieldvalues.tsg);

						$rootScope.groups = [ {
							txt : 'Loading..'
						} ];
						console.log("$rootScope.fieldvalues",
								$rootScope.fieldvalues);
						var paramString = buildParameterString();
						/*$rootScope.paramString1=paramString;*/
						console.log("paramString", paramString);

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
											groups = data.data.d.results;
											

											console.log(groups.length);
											for (var i = 0; i < groups.length; i++) {
												delete groups[i]["Attachments"];
												delete groups[i]["AttachmentFiles"];
												delete groups[i]["AuthorId"];
												delete groups[i]["ContentTypeId"];
												delete groups[i]["Created"];
												delete groups[i]["EditorId"];
												delete groups[i]["FileSystemObjectType"];
												delete groups[i]["GUID"];
												//                delete groups[i]["ID"];            
												delete groups[i]["Id"];
												delete groups[i]["Modified"];
												delete groups[i]["OData__UIVersionString"];
												delete groups[i]["RoleAssignments"];
												delete groups[i]["ContentType"];
												delete groups[i]["FieldValuesAsHtml"];
												delete groups[i]["FieldValuesAsText"];
												delete groups[i]["FieldValuesForEdit"];
												delete groups[i]["File"];
												delete groups[i]["FirstUniqueAncestorSecurableObject"];
												delete groups[i]["Folder"];
												delete groups[i]["ParentList"];
												$location.path('/page1');
											};

											$rootScope.groups = groups;
											console.log($rootScope.groups);
										console.log($rootScope.groups.length);
											if($rootScope.groups.length==0){
												$scope.visible=true;
											}


										})

					};
				})
				
