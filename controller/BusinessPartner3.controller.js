sap.ui.controller("com.products.SupplierDetail", {

	onBeforeShow : function(oData) {
		this.getView()
				.bindElement(oData.bindingContext.getPath() + "/Supplier");
	},

	onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},

	onListItemTap : function(oEvent) {
		var oBindingContext = oEvent.oSource.getBindingContext();

		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId : "SalesOrders",
			data : {
				bindingContext : oBindingContext
			}
		});

	},
	
});