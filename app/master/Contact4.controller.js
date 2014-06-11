sap.ui.controller("app.master.Contact4", {

    onBeforeShow : function(oData, oBackData) {
		this.oBindingContext = oData.bindingContext;
		var view = this.getView();
		if(oBackData && oBackData.back)
        {
	        //Check whether the navigation type is back, if yes 
	        //perform search on the current list data. Otherwise execute 
	        //a request in order to load the list with data
			var newValue = view.searchField.getValue();
			if (newValue) {
		    	this.onLiveChange({
					getParameters : function() {
			    		return { newValue : newValue  };
				    }
	
		       });
			}
		}
		else{
			this.loadContent(oData.bindingContext);
		}
    },
    
    loadContent: function(oBindingContext){
    	var view = this.getView();
		view.oList.bindAggregation("items", {
	    	path : oBindingContext.getPath() + "/Contacts",
	    	template : view.itemTemplate,
		});
	},      

    onNavButtonTap : function() {
    	this.getView().searchField.setValue(null);
		sap.ui.getCore().getEventBus().publish("nav", "back");
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