var bookList = 	angular.module('bookList', []);

bookList.controller('bookListController', function($scope, $http) {
    $scope.bookList = {
        books :[{
          name: 'Service Oriented Architecture',
          year: '2015',
          field: 'programming',
          author: 'Ha Link',
          code: '2012',
          publisher: 'UET',
          image: '',
          pages: '2015'
        }]
      }
	delete $http.defaults.headers.common['X-Requested-With'];
	$http.get("http://restful-soa.esy.es/listCategories")
    .success(function(response) {    	
    	jQuery('.book-list .mdl-spinner').css('display', 'none');
    	$scope.categories = response;
    });
    delete $http.defaults.headers.common['X-Requested-With'];
	$http.get("http://restful-soa.esy.es/books")
    .success(function(response) {
    	jQuery('.category .mdl-spinner').css('display', 'none');
    	$scope.bookList = response;
    });
    $scope.book_detail = $scope.bookList.books[0];    
    $scope.category_click = function( $event ) {
    							jQuery('.category .active').removeClass('active');
    							if( !jQuery($event.currentTarget).hasClass('active') ){
    								jQuery($event.currentTarget).addClass('active');    								
    							}    							
    							jQuery('.book-category').each(function (i, obj){
    								if( jQuery($event.currentTarget).text() != 'All' ) {
    									if( jQuery(this).data('value') != jQuery($event.currentTarget).text()) {
	    									jQuery(this).parent().parent().parent().css('display', 'none');
	    								} else {
	    									jQuery(this).parent().parent().parent().css('display', 'block');
	    								}   								
    								} else {
    									jQuery(this).parent().parent().parent().css('display', 'block');
    								}
    							})
    						};
    $scope.readmore_click = function ($event) {
                          var index = jQuery($event.currentTarget).attr('index');    
                          $scope.book_detail = $scope.bookList.books[index];
                          console.log( $scope.book_detail );
                          jQuery('.book_detail_section').addClass('active');
                          // ipc.send('show-book-detail');
                        };
    $scope.close = function($event) {
                          $event.preventDefault();
                          jQuery('.book_detail_section').removeClass('active');
                      }                                                       
})

