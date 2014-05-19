
sap.ui.controller("com.products.Login", {

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
		
		jQuery.sap.require("authentication.FormAuthentication");		
		
		sap.ui.getCore().getEventBus().publish("busyDialog","open");
		
		var onAuthSuccess = function(oData, statusText, responseXHR) {
			createModel();
			
			app.to("ProductList");
			
			sap.ui.getCore().getEventBus().publish("busyDialog", "close");
		};
		
		executeFormAuthentication(data.UserName, data.Password, onAuthSuccess);
		
	},
	
	navButtonTap : function(evt) { 

	}
	
	
});
//@ sourceURL=./view/Product.controller.js