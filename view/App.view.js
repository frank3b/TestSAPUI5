/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.jsview("com.opensap.App", {
	
	getControllerName: function() {
		return "com.opensap.App";
	},

	createContent : function(oController) {
	
		this.app = new sap.m.App();

		
		var LoginPage = sap.ui.jsview("Login","com.opensap.Login");
		LoginPage.app = this.app;
		this.app.addPage(LoginPage);
		
		var ProductListPage = sap.ui.jsview("ProductList","com.opensap.ProductList");
		ProductListPage.app = this.app;
		this.app.addPage(ProductListPage);
		
		var ProductDetailPage = sap.ui.jsview("ProductDetail","com.opensap.ProductDetail");
		ProductDetailPage.app = this.app;
		this.app.addPage(ProductDetailPage);
		
		var SupplierDetailPage = sap.ui.jsview("SupplierDetail","com.opensap.SupplierDetail");
		SupplierDetailPage.app = this.app;
		this.app.addPage(SupplierDetailPage);
		
		this.app.to("Login");
		
		return this.app;
	}	// end createContent
});	