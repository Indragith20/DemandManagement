app.controller('insertController', ['$scope','XLSXReaderService','$rootScope',function($scope,$rootScope){
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

            $scope.showPreview = false;
            $scope.showJSONPreview = true;
            $scope.json_string = "";

          $scope.fileChanged = function(files) {
              $scope.isProcessing = true;
              $scope.sheets = [];
              $scope.excelFile = files[0];
              console.log("--->"+$scope.excelFile)
             /* XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function(xlsxData) {
                  $scope.sheets = xlsxData.sheets;
                  $scope.isProcessing = false;
                });*/
                 XLSXReader($scope.excelFile, true, true, function(data) {
                  $scope.sheets = data.sheets;
                  $scope.json_string = JSON.stringify($scope.sheets["Sheet1"], null, 2);

                  $rootScope.groups = $scope.json_string;
                  console.log($rootScope.groups);
                  
                   // console.log($rootScope.groups);          
                  
                 });



          }

            $scope.updateJSONString = function() {
                $scope.json_string = JSON.stringify($scope.sheets[$scope.selectedSheetName], null, 2);
            }

            $scope.showPreviewChanged = function() {
                if ($scope.showPreview) {
                    $scope.showJSONPreview = false;
                    $scope.isProcessing = true;
                    XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function(xlsxData) {
                        $scope.sheets = xlsxData.sheets;
                        $scope.isProcessing = false;
                    });
                }
            }





           /* $scope.uploadFile = function(){
               var file = $scope.myFile;
               
               console.log('file is ' );
               console.dir(file);
               
               fileChanged(file);
             
            };*/
           /* function upload(files) {
                console.log(files);
                if (files) {
                  $scope.fileLabel = false;
                  $scope.uploadedFile = files;
                 
                   var file = files;
                   console.log(file);
                   if (!file.$error)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Upload.upload({
                     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                     data: {          
                      file: file
                     }
                    }).success(function(data, status, headers, config) { 
                      
                     fileChanged($scope.uploadedFile);
                     $timeout(function() {
                      $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                      console.log($scope.log);
                     });
                    });
                  
                  }
                 }*/
                
                
                /*function fileChanged(files) {

                 $scope.excelFile = files[0];
                 console.log("--->" + $scope.excelFile);
                 XLSXReader($scope.excelFile, true, true, function(data) {
                  $scope.sheets = data.sheets;
                  $scope.json_string = JSON.stringify($scope.sheets["download"], null, 2);
                  $localStorage.groups = $scope.json_string;
                  $rootScope.groups = $localStorage.groups;
                  console.log($rootScope.groups);
                  
                   // console.log($rootScope.groups);          
                  $rootScope.$apply();
                 });
                };*/



         }]);  
                        

                  /*  $scope.$watch('files', function() {
                              console.log($scope.files);
                             $scope.upload($scope.files);

                            });
                    $scope.$watch('file', function() {
                         if ($scope.file != null) {
                          $scope.files = [$scope.file];
                         }
                        });*/
                 /*   $scope.log = '';
                    $scope.uploadBtn = true;
                    $scope.fileStat = true;
                    $scope.upload = function(files) {
                        alert("ygsdhjsh");
                     if (files && files.length) {
                      $scope.fileLabel = false;
                      $scope.uploadedFile = files;
                      for (var i = 0; i < files.length; i++) {
                       var file = files[i];
                       console.log(file);
                       if (!file.$error) {
                        Upload.upload({
                         url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                         data: {
                          username: $scope.username,
                          file: file
                         }
                        }).success(function(data, status, headers, config) {                  
                            
                          
                         fileChanged($scope.uploadedFile);
                         $timeout(function() {
                          $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                         });
                        });
                       }
                      }
                     }
                    };
                    function fileChanged(files) {

                     $scope.excelFile = files[0];
                     console.log("--->" + $scope.excelFile);
                     XLSXReader($scope.excelFile, true, true, function(data) {
                      $scope.sheets = data.sheets;
                      $scope.json_string = JSON.stringify($scope.sheets["sheet"], null, 2);
                      $localStorage.groups = $scope.json_string;
                      $rootScope.groups = $localStorage.groups;
                      console.log($rootScope.groups)
                      
                       // console.log($rootScope.groups);          
                      $rootScope.$apply();
                     });
                    }
*/





























/*
                $http({
                    url : 'https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/SiteAssets/DemandManagementTestApp/Talent%20Request%20Response%20V3.xlsx',
                    method : 'GET',
                    params : {},
                    headers : {
                        'Content-type' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                    responseType : 'JSON'
                }).success(function(data, status, headers, config) {
                    
                    var fileData = new Blob([ data ], {
                        type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    $scope.fileURL = URL.createObjectURL(fileData);
                    console.log(fileData);
                    console.log(fileData.size);                    
                    console.log(fileData.type);
                    
                    console.log($scope.fileURL);
                    $scope.files={
                        file:[{
                            'name': $scope.fileURL, 
                            'type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            'size': fileData.size,
                            'webkitRelativePath': ""
                            }]
                    };
                    console.log($scope.files.file)
                    console.log($scope.files.file.length);
                    upload($scope.files.file);
                    
                }).error(function(data, status, headers, config) {
                    console.log(data);

                });
            };




































/*
        $scope.files = "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/SiteAssets/DemandManagementTestApp/Talent%20Request%20Response%20V3.xlsx"
        $scope.upload($scope.files);
    }*/
    
    
/*});*/

                                                

 

                                       