sap.ui.jsview("app.details.SaleNote", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf app.detail.SaleNote
	 */
	getControllerName : function() {
		return "app.details.SaleNote";
	},
	
	/**
	 * Handler to onBeforeShow event that fires by the NavContainer.<BR>
	 * 
	 * @param oEvent
	 */
	onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent);
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf app.detail.SaleNote
	 */
	createContent : function(oController) {

		// Initialize a JSON Model
		//jQuery.sap.require("sap.ui.model.json.JSONModel");
		//var oModelP = new sap.ui.model.json.JSONModel();

		// set employee mock model
		//aDataP = new sap.ui.model.json.JSONModel("model/mockPetitioner.json");

		//oModelP.setData(aDataP);
		// Create a AutoComplete control and bind the items aggregation
		
		//oController.oSource.getBindingContext();
		
		var oAutoP = new sap.ui.commons.AutoComplete({
			tooltip : "Enter a name",
			maxPopupItems : 5,
			displaySecondaryValues : true,
			items : {
				path : "/Products",
				template : new sap.ui.core.ListItem({
					text : "{ProductName}",
					additionalText : "{Code}"
				})
			}
		});
		oAutoP.setModel(oModelP);
		// Define a custom filter
		oAutoP.setFilterFunction(function(sValue, oItem) {
			return jQuery.sap.startsWithIgnoreCase(oItem.getText(), sValue)
					|| jQuery.sap.startsWithIgnoreCase(oItem
							.getAdditionalText(), sValue);
		});
		
		return new sap.m.Page({
			title : oBundle.getText("TITLE__SALE_NOTE"),
			content : [  ]
		});
	}

});