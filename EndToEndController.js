var endToEndPageControllers = angular.module('endToEndPageControllers', ['angular.filter']);
  endToEndPageControllers.controller('EndToEndPageController', 
  	function($scope, $http, $filter,$route, $rootScope, $location)
  	{
  		$scope.dataSample = "SampleTest";
  		$http({
      	
      		method: "GET",
          	url: "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery"+ "/_api/web/lists/getbytitle('" + 'SampleTest'+ "')/items?$top=1000",         
          
          	headers: {
              "accept": "application/json;odata=verbose"            
          	}
          })
  			.success(function (data, status, headers, config){
  				var groups = data.d.results;                        
              // console.log(groups.length);
              for(var i=0;i<groups.length;i++){
                  delete groups[i]["Attachments"];            
                  delete groups[i]["AttachmentFiles"];            
                  delete groups[i]["AuthorId"];            
                  delete groups[i]["ContentTypeId"];            
                  delete groups[i]["Created"];            
                  delete groups[i]["EditorId"];            
                  delete groups[i]["FileSystemObjectType"];            
                  delete groups[i]["GUID"];         
                              
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
              };   

              $rootScope.groups =  groups;
              $rootScope.groups = {
              	'groupData': $rootScope.groups,
              	"selected" : {}
              }
              console.log($rootScope.groups);
          })  
		

        $scope.getTemplate = function (group) {
        	console.log(group.ID);
        	console.log($rootScope.groups.selected.ID);

	        if (group.ID === $rootScope.groups.selected.ID) 
	        	return 'editEndToEndListTemplate';
	        else 
	        	return 'displayEndToEndListTemplate';
	    };

	    $scope.editEndToEndList = function (group) {	    	
	        $rootScope.groups.selected = angular.copy(group);
	        console.log($rootScope.groups.selected);
	    };

	    $scope.saveEndToEndList = function (idx) {
	        console.log("Saving groups");
	        $rootScope.groups.groupData[idx] = angular.copy($rootScope.groups.selected);
	        $scope.reset();
	    };

	    $scope.reset = function () {
	        $rootScope.groups.selected = {};
	    }; 
	    $scope.addingRowEndList = function(){
	    	console.log("Hello----------->");
	       	saveData();		    
		
	    };
	    function saveData() {
			//alert("Inside Savedata");
			

			//===================================================================================   
			var siteUrl = "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/ ";
			var clientContext = new SP.ClientContext(siteUrl);
			var oList = clientContext.get_web().get_lists().getByTitle('SampleTest');
			var itemCreateInfo = new SP.ListItemCreationInformation();
			this.oListItem = oList.addItem(itemCreateInfo);

			//===================================================================================

			//Get Values - Main Data

			var Title = "New Data";
			var Column2= "Data2";
			var Column3= "Data3";

			//alert("After Get");

			//===================================================================================   

			//Store Values - Main Data
			//saveReleaseName();
			oListItem.set_item('Title', Title);
			oListItem.set_item('Column2', Column2);

			oListItem.set_item('Column3', Column3);
			oListItem.update();
			clientContext.load(oListItem);
			clientContext.executeQueryAsync(Function.createDelegate(this, this.onSaved), Function.createDelegate(this, this.onQueryFailed));
			}

			function onSaved() {
			  alert('Successfully Saved');
			   id=oListItem.get_id();
				submits=1;
			    }

			function onQueryFailed(sender, args) {
			    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
			} 
	     

    });



  	