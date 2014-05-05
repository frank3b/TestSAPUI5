/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.controller("com.opensap.Login", {

	onInit : function() {
	},
	
	onBeforeShow : function(evt) {

	},
	
	loginTap : function(evt) {

		/*
		 * Get the data model so we can get the credentials
		 */
		var data = sap.ui.getCore().getModel().getData();
		var app = this.getView().app;
		
		data.baseURL = "https://smp-p1940061036trial.hanatrial.ondemand.com";
		data.appName = "com.opensap.myfirst";
		
		var onSuccess = function(result) {
			
			var data = sap.ui.getCore().getModel().getData();
			
			data.APPCID = result.ApplicationConnectionId;
			sap.ui.getCore().getModel().setData(data);
			
			/*
			 * Make the request for Products
			 */
			var onProductSuccess = function(result) {
				
				var data = sap.ui.getCore().getModel().getData();
				data.Products = result.results;
				sap.ui.getCore().getModel().setData(data);

				app.to("ProductList");
			};
			
			var onError = function(err) {
				window.alter(err.response.body);
			};
			
			var connectionRequest = {
					requestUri: data.baseURL + "/" + data.appName + "/ProductCollection",
					user: data.UserName,
					password: data.Password,
					method: "GET",
					headers: { 	'X-SUP-APPCID': data.APPCID,
								Authorization : 'Basic ' + Base64.encode(data.UserName + ":" + data.Password) }
			};
			
			OData.read( connectionRequest, onProductSuccess, onError);
		};
		
		var onError = function(err) {
			window.alert(err.response.body);
		};
		
		var connectionData = {
				DeviceType : "Android"
		};
		
		
		var connectionRequest = {
				requestUri: data.baseURL + "/odata/applications/latest/"+ data.appName + "/Connections",
				headers: { Authorization : 'Basic ' + Base64.encode(data.UserName + ":" + data.Password) },
				method: "POST",
				data: connectionData
		};
		
		OData.request( connectionRequest, onSuccess, onError);

		
	},
	
	navButtonTap : function(evt) { 

	}
});
//@ sourceURL=./view/Product.controller.js