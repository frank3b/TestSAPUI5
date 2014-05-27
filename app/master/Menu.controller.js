sap.ui.controller("app.master.Menu", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf app.master.Menu
	 */
	// onInit: function() {
	//
	// },
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf app.master.Menu
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf app.master.Menu
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf app.master.Menu
	 */
	// onExit: function() {
	//
	// }
	ordersTap : function() {
		alert('ordersTap');
	},

	salesNoteTap : function() {
		
		// Initialize a JSON Model
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var oModelS = new sap.ui.model.json.JSONModel();

		// set employee mock model
		aDataS = new sap.ui.model.json.JSONModel("model/mock.json");
		oModelS.setData(aDataS);
		
		var oContext = new sap.ui.model.Context(oModelS, "/");

		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId : "app.details.SaleNote",
			data : {
				bindingContext : oContext
			}
		});

		// oBindingContext.saleNote.saleNote.item.amount = "";
		// oBindingContext.saleNote.saleNote.item.code = "";
	},

	exitTap : function(evt) {
		var oBindingContext = evt.oSource.getBindingContext();

		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId : "app.master.Login",
			data : {
				bindingContext : oBindingContext
			}
		});
	}

});