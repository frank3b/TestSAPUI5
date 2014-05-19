sap.ui.controller("com.products.ProductList", {

    onInit : function(oEvent) {
    	this.loadContent();
    },  
    
    onBeforeShow : function(oData) {
        
        var view = this.getView();
        var newValue = view.searchField.getValue();
		if (newValue){
			// in case we navigate back to this view and search was performed, 
			//we executes client side search with the inserted value
	    	this.onLiveChange({
				getParameters : function() {
		    		return { newValue : newValue };
		    	}
	        });
	    }

    },
    
    loadContent: function(){
    	var view = this.getView();
    	view.oList.bindItems("/ProductCollection", view.itemTemplate);   	 
     
	},    
	
	onPersonalizationButtonTap : function() {

        sap.ui.getCore().getEventBus().publish("nav", "to", {
    		viewId : "SettingsCategories",
    		data : ""
        });

    },
    

    onListItemTap : function(oEvent) {
		var oBindingContext = oEvent.oSource.getBindingContext();
		
		sap.ui.getCore().getEventBus().publish("nav", "to", {
	    	viewId : "ProductDetail",
	    	data : { bindingContext : oBindingContext }
		});
		
		
    },
    onLiveChange : function(oEvent) {
		jQuery.sap.require("util.Utility");
		search(this.getView(), oEvent.getParameters().newValue);
    },
    
    onPull : function(oEvent, oController){
		oController.loadContent(oController.oBindingContext);
		this.hide();
    },

});