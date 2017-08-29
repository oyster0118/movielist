angular.module('searchCtrlModule',[])

	.controller('searchCtrl',['$scope','$http','myService','$routeParams','$location',function($scope,$http,myService,$routeParams,$location){
		
		// 获取数据
		// $http({
		// 	method:'get',
		// 	url:'./js/in_theaters.json'
		// }).then(function(res){
		// 	console.log(res)
		// 	$scope.result = res.data;
		// })

		/*
			由于angularjs认为jsonp请求不安全的 所以需要我们配置白名单
			在白名单当中的地址 才允许被请求	

			angularjs给我们动态生成的全局函数名字是这样的

				angular.callbacks._0

			豆瓣接口不支持回调函数名字带点的形式

		 */

		/*$http.jsonp('https://api.douban.com/v2/movie/in_theaters').then(function(res){
			console.log(res)
		})*/



		/*
			start	起始元素	
			count	返回结果的数量

		*/
	
		/*
			1 0 0~9
			2 10 10~19
			3 20 20~29

		*/

		// 当前页
		var page = Number($routeParams['page']);
		var count = 10;
		var start = (page-1)*count;
		var totalPage = 0;
		var keyword = $routeParams['keyword'];


		myService.myJsonp("https://api.douban.com/v2/movie/search",{
			count:count,
			start:start,
			q:keyword
		},function(res){

			$scope.result = res;

			totalPage = Math.ceil(res.total/count);

			$scope.$apply();

			console.log(res)

		});



		$scope.changePage = function(type){

			if(type == "prev"){
				// 上一页
				page = page - 1;

				if(page < 1) page = 1;

				alert(page)
				
			}else if(type == "next"){
				// 下一页
				page = page + 1;

				if(page > totalPage) page = totalPage;
				
				alert(page)
				
			}

			$location.path('/search/'+ page + '/'+ keyword);

		}




	}])