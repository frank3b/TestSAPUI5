/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.controller("com.opensap.ProductList", {

	onInit : function() {
	},
	
	onBeforeShow : function(evt) {

	},
	
	productListTap : function(evt) {
		var data = {};
		data.context = evt.getSource().getBindingContext();
		var app = this.getView().app;
		app.to("ProductDetail", data);
	},
	
	navButtonTap : function(evt) { 

	}
});
//@ sourceURL=./view/Product.controller.js