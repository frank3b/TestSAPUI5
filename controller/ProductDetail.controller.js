/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.controller("com.opensap.ProductDetail", {

	onInit : function() {
	},
	
	onBeforeShow : function(evt) {
		if (evt.data.context) {
			this.getView().setBindingContext(evt.data.context);
		} 
	},

	navButtonTap : function(evt) { 
		var app = this.getView().app;
		if(app) {
			app.backToPage("ProductList");
		}
	},
	
	supplierTap : function(evt) {

		var supplierId = evt.getSource().data("id");
		alert(JSON.stringify());
		var app = this.getView().app;
		var busy = new sap.m.BusyIndicator();
		busy.setText("Busy");
		busy.setVisible(true);
		
		var onSupplierSuccess = function(result) {
			app.to("SupplierDetail", result);
			
			busy.setVisible(false);
		};
		
		var onError = function(err) {
			window.alter(err.response.body);
		};
		
		//FIXME - esto no funciona
		/*OData.read( 
				  "https://sapes1.sapdevcenter.com/sap/opu/odata/sap/ZGWSAMPLE_SRV/BusinessPartnerCollection('" + supplierId + "')?$format=json", 
				  function (data) { 
					  app.to("SupplierDetail",data);
					  busy.setVisible(false);
				  } 
				);
		*/
		var data = sap.ui.getCore().getModel().getData();
		var connectionRequest = {
				requestUri: data.baseURL + "/" + data.appName + "/BusinessPartnerCollection('" + supplierId + "')",
				user: data.UserName,
				password: data.Password,
				method: "GET",
				headers: { 	'X-SUP-APPCID': data.APPCID,
							Authorization : 'Basic ' + Base64.encode(data.UserName + ":" + data.Password) }
		};
		OData.read( connectionRequest, onSupplierSuccess, onError);
		
	}
	
});
//@ sourceURL=./view/Product.controller.js