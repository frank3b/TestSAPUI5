/**
 * Copyright Craig Haworth 2013 openSAP Mobile 1 MOOC
 */

sap.ui.controller("com.products.App", {

	onInit : function() {
		var view = this.getView();
		// to avoid scrollbars on desktop the root view must be
		// set to block display
		view.setDisplayBlock(true);

		// remember the App Control
		this.app = sap.ui.getCore().byId("ProductsApp");
		// subscribe to event bus
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("nav", "to", this.navToHandler, this);
		bus.subscribe("nav", "back", this.navBackHandler, this);
	},
	navToHandler : function(channelId, eventId, oData) {
		if (oData && oData.viewId) {
			oDataObject = oData.data;
			
			// lazy load view
			if (this.app.getPage(oData.viewId) === null) {
				jQuery.sap.log.info("now loading page '" + oData.viewId + "'");
				this.app.addPage(sap.ui.jsview(oData.viewId, "com.products." + oData.viewId));
			}
			// Navigate to given page (include bindingContext)
			
			this.app.to(oData.viewId, oDataObject);
		} else {

			jQuery.sap.log
					.error("nav-to event cannot be processed. Invalid data: "
							+ data);
		}
	},
	navBackHandler : function() {
		this.app.back();
	},

	onBeforeShow : function(evt) {

	},

	navButtonTap : function(evt) {

	}
});