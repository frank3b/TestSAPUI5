sap.ui.jsview("app.details.SalesOrder5", {

    getControllerName : function() {
		return "app.details.SalesOrder5";
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
				  	  new sap.m.DisplayListItem({ label : oBundle.getText("SALESORDER_BILLINGSTATUS"), value : "{BillingStatus}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("SALESORDER_BUYERID"), value : "{BuyerId}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("SALESORDER_BUYERNAME"), value : "{BuyerName}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("SALESORDER_CHANGEDAT"), value :{path : "ChangedAt", formatter : fnDateTimeFormatter}}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("SALESORDER_CHANGEDBY"), value : "{ChangedBy}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("SALESORDER_CHANGEDBYBP"), value : "{ChangedByBp}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("SALESORDER_CREATEDAT"), value :{path : "CreatedAt", formatter : fnDateTimeFormatter}}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("SALESORDER_CREATEDBY"), value : "{CreatedBy}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("SALESORDER_CREATEDBYBP"), value : "{CreatedByBp}"}),
                  	]
		});


		this.page = new sap.m.Page({
	    	title : oBundle.getText("TITLE__DETAIL_ORDER"),
	    	//set back button on details pages only on smartphones
	    	showNavButton : jQuery.device.is.phone,
	    	navButtonTap : [ oController.onNavButtonTap, oController ],
	    	content : [ this.oList, this.oNavList ]
		});

		// done
		return this.page;
    }
});