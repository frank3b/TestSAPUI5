sap.ui.jsview("app.master.Menu", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf app.master.Menu
	 */
	getControllerName : function() {
		return "app.master.Menu";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf app.master.Menu
	 */
	createContent : function(oController) {

		tileNotaVenta = new sap.m.StandardTile("tileNotaVenta", {
			icon : "images/nota_venta.png",
			info : "1",
			infoState : sap.ui.core.ValueState.Success,
			title : oBundle.getText("MENU_SALES_NOTE_TILE"),
			press : oController.salesNoteTap
		});

		tilePedidos = new sap.m.StandardTile("tilePedidos", {
			icon : "images/pedidos.png",
			info : "2",
			infoState : sap.ui.core.ValueState.Success,
			title : oBundle.getText("MENU_ORDER_TILE"),
			press : oController.ordersTap
		});

		// create a simple matrix layout
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			id : "matrix1",
			layoutFixed : true,
			hAlign : sap.ui.commons.layout.HAlign.Center,
			vAlign : sap.ui.commons.layout.VAlign.Middle
		});

		oLayout.createRow(tileNotaVenta, tilePedidos);

		return new sap.m.Page({
			title : oBundle.getText("TITLE__MENU"),
			content : [ oLayout ],
			footer : new sap.m.Bar({
				contentMiddle : [ new sap.m.Button({
					text : oBundle.getText("CLOSE"),
					tap : [ oController.exitTap, oController ]
				}) ]
			}),

		});
	}
	

});