sap.ui.controller("app.details.SalesOrder5", {

	onBeforeShow : function(oData) {
		this.getView().bindElement(oData.bindingContext.getPath());
   	},
    
	onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},
    
          });