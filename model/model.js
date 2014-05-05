/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

function initializeModel() {	
	var oModel = new sap.ui.model.json.JSONModel();
	var myData = {};
	myData.UserName = "P1940061036"; // TODO: put your user name and password here
	myData.Password = "Tata2013";
	oModel.setData(myData);
	sap.ui.getCore().setModel(oModel);
	
	var myapp = sap.ui.jsview("com.opensap.App");
	myapp.placeAt('root');
}