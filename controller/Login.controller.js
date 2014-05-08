/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

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
		
		var busy = new sap.m.BusyIndicator();
		busy.setText("Busy");
		busy.setVisible(true);
		
		var onAuthSuccess = function(oData, statusText, responseXHR) {
			createModel();
			
			app.to("ProductList");
			
			busy.setVisible(false);			
		};
		
		executeFormAuthentication(data.UserName, data.Password, onAuthSuccess);
		
	},
	
	navButtonTap : function(evt) { 

	}
	
	
});
//@ sourceURL=./view/Product.controller.js