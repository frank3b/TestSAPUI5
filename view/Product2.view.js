sap.ui.jsview("com.products.ProductDetail", {

    getControllerName : function() {
		return "com.products.ProductDetail";
    },
	/**
	 * Handler to onBeforeShow event that fires by the NavContainer.<BR>
	 * Note: If the view is already loaded and the bindingContext was changed, this method also called by the App.contoller
	 * @param oEvent
	 */
    onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent.data);
    },

    createContent : function(oController) {
		this.oList = new sap.m.List({
	    	inset: true,
	    	items : [
				  	  new sap.m.DisplayListItem({ label : oBundle.getText("PRODUCT_NAME"), value : "{Name}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("PRODUCT_DESCRIPTION"), value : "{Description}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("PRODUCT_PRICE"), value : "{Price}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("PRODUCT_SUPPLIERNAME"), value : "{SupplierName}"}),
                  	]
		});

		this.oNavList = new sap.m.List({
	    	inset: true,
	    	items : [ new sap.m.DisplayListItem({
				type : "Navigation",
				label : oBundle.getText("TITLE__SUPPLIER"),
				tap : oController.onListItemTap
	    	})]
		});
		
		this.page = new sap.m.Page({
	    	title : oBundle.getText("TITLE__PRODUCT_DETAIL"),
	    	//set back button on details pages only on smartphones
	    	showNavButton : jQuery.device.is.phone,
	    	navButtonTap : [ oController.onNavButtonTap, oController ],
	    	content : [ this.oList, this.oNavList ]
		});

		// done
		return this.page;
    }
});