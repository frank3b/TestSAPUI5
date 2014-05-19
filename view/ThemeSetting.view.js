sap.ui.jsview("com.products.ThemeSetting", {

	onBeforeShow : function(oEvent) {
		return;
	},

	getControllerName : function() {
		return "com.products.ThemeSetting";
	},

	createContent : function(oController) {

		// Check which theme was selected
		var bBlueCrystalSelected = !oStorage.get(sKeyTheme)
				|| oStorage.get(sKeyTheme) == "sap_bluecrystal";
		this.page = new sap.m.Page({
			showNavButton : jQuery.device.is.phone,
			navButtonTap : [ oController.onNavButtonTap, oController ],
			content : [ new sap.m.List({
				mode : sap.m.ListMode.SingleSelect,
				select : [ oController.onListItemTap ],
				items : [ new sap.m.StandardListItem({
					title : "sap_mvi",
					selected : !bBlueCrystalSelected,
				}).data(sKeyTheme, "sap_mvi"), new sap.m.StandardListItem({
					title : "sap_bluecrystal",
					selected : bBlueCrystalSelected,
				}).data(sKeyTheme, "sap_bluecrystal") ],
			}), ],
		});

		return this.page;
	}

});
