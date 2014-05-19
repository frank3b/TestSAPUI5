
sap.ui.jsview("com.products.App", {
	
	getControllerName: function() {
		return "com.products.App";
	},

	createContent : function(oController) {
	
		this.app = new sap.m.App("ProductsApp");
		
		var LoginPage = sap.ui.jsview("Login","com.products.Login");
		LoginPage.app = this.app;
		this.app.addPage(LoginPage);
		
		var ProductListPage = sap.ui.jsview("ProductList", "com.products.ProductList");
		ProductListPage.app = this.app;
		this.app.addPage(ProductListPage);
		
		var ProductDetailPage = sap.ui.jsview("ProductDetail", "com.products.ProductDetail");
		ProductDetailPage.app = this.app;
		this.app.addPage(ProductDetailPage);
		
		var SupplierDetailPage = sap.ui.jsview("SupplierDetail", "com.products.SupplierDetail");
		SupplierDetailPage.app = this.app;
		this.app.addPage(SupplierDetailPage);
		
		var settingsCategories = sap.ui.jsview("SettingsCategories", "com.products.SettingsCategories");
		settingsCategories.app = this.app;
		this.app.addPage(settingsCategories);
		
		var themeSetting = sap.ui.jsview("ThemeSetting", "com.products.ThemeSetting");
		themeSetting.app = this.app;
		this.app.addPage(themeSetting);
		
		var salesOrders = sap.ui.jsview("SalesOrders", "com.products.SalesOrders");
		salesOrders.app = this.app;
		this.app.addPage(salesOrders);
		
		return this.app;
	}	// end createContent
});	