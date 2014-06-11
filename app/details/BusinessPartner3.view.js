sap.ui.jsview("app.details.BusinessPartner3", {

    getControllerName : function() {
		return "app.details.BusinessPartner3";
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
				  	  new sap.m.DisplayListItem({ label : oBundle.getText("BUSINESSPARTNER_CITY"), value : "{City}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("BUSINESSPARTNER_COMPANYNAME"), value : "{CompanyName}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("BUSINESSPARTNER_EMAILADDRESS"), value : "{EmailAddress}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("BUSINESSPARTNER_PHONENUMBER"), value : "{PhoneNumber}"}),
 				  	  new sap.m.DisplayListItem({ label : oBundle.getText("BUSINESSPARTNER_WEBADDRESS"), value : "{WebAddress}"}),
                  	]
		});

		this.oNavList = new sap.m.List({
	    	inset: true,
	    	items : [ new sap.m.DisplayListItem({
				type : "Navigation",
				label : oBundle.getText("TITLE__CONTACTS"),
				tap : oController.onListItemTap
	    	})]
		});

		this.page = new sap.m.Page({
	    	title : oBundle.getText("TITLE__SUPPLIER"),
	    	//set back button on details pages only on smartphones
	    	showNavButton : jQuery.device.is.phone,
	    	navButtonTap : [ oController.onNavButtonTap, oController ],
	    	content : [ this.oList, this.oNavList ]
		});

		// done
		return this.page;
    }
});