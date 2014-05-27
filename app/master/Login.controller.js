
sap.ui.controller("app.master.Login", {

	onInit : function() {
	},
	
	onBeforeShow : function(evt) {

	},
	
	loginTap : function(evt) {

		/*
		 * Get the data model so we can get the credentials
		 */
		var data = sap.ui.getCore().getModel().getData();
		var app = this.getView().app;
		
		jQuery.sap.require("authentication.FormAuthentication");		
		
		sap.ui.getCore().getEventBus().publish("busyDialog", "open");
		
		var onAuthSuccess = function(oData, statusText, responseXHR) {
			createModel();
			
			app.to("ProductList");
			
			sap.ui.getCore().getEventBus().publish("busyDialog", "close");
		};
		
		//FIXME - this is only for demo
		if(data.UserName == 'demo' && data.Password == 'demo'){
			sap.ui.getCore().getEventBus().publish("busyDialog", "close");
			
			var oBindingContext = evt.oSource.getBindingContext();

			sap.ui.getCore().getEventBus().publish("nav", "to", {
		    	viewId : "app.master.Menu",
		    	data : { bindingContext : oBindingContext }
			});
		} else {
			sap.ui.getCore().getEventBus().publish("busyDialog", "close");
			displayError({
				message : "Usuario o contrase�a incorrecto, por favor verifique",
				responseText : "Error",
				statusCode : "404",
				statusText : "Autenticaci�n"
			});	
		}
		
		//executeFormAuthentication(data.UserName, data.Password, onAuthSuccess);
		
	},
	
	navButtonTap : function(evt) { 

	}
	
	
});
//@ sourceURL=./view/Product.controller.js