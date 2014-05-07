jQuery.sap.declare("util.Connectivity");
 //Service Root URL
// "https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/ZGWSAMPLE_SRV/?sap-client=520";
//Extract the relative URL to use this application for deployment on any Web Server
var serviceUrl = "http://sapes1.sapdevcenter.com:8080/sap/opu/odata/sap/ZGWSAMPLE_SRV/";

function getServiceURL(){
	//Get the service URL from the SAP NetWeaver Gateway Catalog service.	
	if(window.location.hostname == 'localhost'){
		return "proxy/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
	} else {
		return "http://sapes1.sapdevcenter.com:8080/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
	}
}

function createModel(){  

	var oModel = new sap.ui.model.odata.ODataModel(getServiceURL(), false, "P1940061036", "Tata2013", null,null, null, true);
    oModel.setCountSupported(false);
	// set global models
	sap.ui.getCore().setModel(oModel);
    
	oModel.attachRequestCompleted(function(oEvent) {
	    sap.ui.getCore().getEventBus().publish("busyDialog","close");
	});

	oModel.attachRequestSent(function(oEvent) {
	    sap.ui.getCore().getEventBus().publish("busyDialog","open");
	});

	oModel.attachParseError(function(oEvent) {
	    displayError({
		message : oEvent.getParameter("message"),
		responseText : oEvent.getParameter("responseText"),
		statusCode : oEvent.getParameter("statusCode"),
		statusText : oEvent.getParameter("statusText")
	    });
	});

	oModel.attachRequestFailed(function(oEvent) {
	    displayError({
		message : oEvent.getParameter("message"),
		responseText : oEvent.getParameter("responseText"),
		statusCode : oEvent.getParameter("statusCode"),
		statusText : oEvent.getParameter("statusText")
	    });
	});
	
}

	
