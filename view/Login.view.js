/*
 * Copyright Frank Bedoya 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.jsview("com.products.Login", {

	getControllerName: function() {
		return "com.products.Login";
	},
	
	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},
	
	createContent : function(controller) {

		// create page
		this.page = new sap.m.Page({
			title : "Login",
			showNavButton : false,
			/*
			 * A simple clean way to add the login button is just to embed it 
			 * in the footer of the page
			 */
			footer: new sap.m.Bar({
				contentMiddle : [
					new sap.m.Button({
						text : "Login",
						tap : [ controller.loginTap, controller ]
					}) 
				]
			}), 
			/*
			 * Here we are just create a list and using Input List Items
			 * to host the input text boxes for the user name and password
			 * Please note we are binding to the root of the central
			 * data model.
			 * i.e.
			 * {model}.UserName
			 * {model}.Password
			 */
			content: [
		  		new sap.m.List({
					items : [
						new sap.m.InputListItem({
							label : "User Name",
							content : new sap.m.Input( { value : "{/UserName}" } )
						}),
						new sap.m.InputListItem({
							label : "Password",
							content : new sap.m.Input( { value : "{/Password}", type : sap.m.InputType.Password } )
						})
					],
				})
			] 
		});
		
		return this.page;
	}
});