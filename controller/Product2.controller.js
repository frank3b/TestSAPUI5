sap.ui.controller("com.products.ProductDetail", {

	onBeforeShow : function(oData) {
		this.getView().bindElement(oData.bindingContext.getPath());
   	},
    
	onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},
    
    onListItemTap : function(oEvent) {
		var oBindingContext = oEvent.oSource.getBindingContext();

		sap.ui.getCore().getEventBus().publish("nav", "to", {
	    	viewId : "SupplierDetail",
	    	data : { bindingContext : oBindingContext }
		});
		
   	},     });