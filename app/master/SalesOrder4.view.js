sap.ui.jsview("app.master.SalesOrder4", {

	getControllerName : function() {
		return "app.master.SalesOrder4";
	},
	/**
	 * Handler to onBeforeShow event that fires by the NavContainer.<BR>
	 * @param oEvent
	 */
	onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent.data, oEvent.backData);
    },

	createContent : function(oController) {

		this.oList = new sap.m.List();

		this.itemTemplate = new sap.m.CustomListItem({
			type : "Navigation",
			tap : oController.onListItemTap,
			content : [ new sap.m.VBox({
				items : [
					  	  new sap.m.Label({ text :  "{BillingStatus}" , design : "Bold"}),
					  	  new sap.m.Label({ text :  "{BuyerName}" }),
					  	  new sap.m.Label({ text :  "{DeliveryStatus}" }),
					  	  new sap.m.Label({ text :  "{NetAmount}" }),
                    	]
           		}).addStyleClass("mobile-list-item")
           	]
		});
		
	// create search field
	this.searchField = new sap.m.SearchField({
	    placeholder : oBundle.getText("SEARCH_PLACEHOLDER"),
	    layoutData : new sap.m.FlexItemData({ growFactor : 1 }),
	    liveChange : [ oController.onLiveChange, oController ],
	    maxLength  : 127,
	});
	
	var pull = new sap.m.PullToRefresh({
	    description : "",
	    refresh : [oController, oController.onPull]
	});	
	

	this.page = new sap.m.Page({
   	    title : oBundle.getText("TITLE__ORDERS"),
	    showNavButton : true,
	     navButtonTap : [ oController.onNavButtonTap, oController ],	    content : [ pull, new sap.m.Bar({	
	    				enableFlexBox : true, 
	    				contentMiddle : [ this.searchField ] 
	    				}), 
	    			this.oList ]
	});

		// done
		return this.page;
	}
	
});