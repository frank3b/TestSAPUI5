jQuery.sap.declare("authentication.Authentication");
sap.ui.localResources("util");
sap.ui.localResources("model");
jQuery.sap.require("util.Utility");
jQuery.sap.require("model.model");

function authenticate(){
    //authenticateBasic();
    //authenticateSAML();
    //authenticatePortalSSO();
    authenticateForm();
}

function authenticateBasic(){
    launchApplication();
}

function authenticateSAML(){
    jQuery.sap.require("authentication.SAMLAuthentication");
    executeSAMLAuthentication();
}

function authenticatePortalSSO(){
    jQuery.sap.require("authentication.PortalSSOAuthentication");
    executePortalSSOAuthentication();
}

function authenticateForm() {
	jQuery.sap.require("authentication.FormAuthentication");
	
	initializeModel();
}

function launchApplication(){
	
	createModel();

	var myapp = sap.ui.jsview("com.products.App");
	myapp.placeAt('content');	
	
}

function executeAjaxCall(type, url, data, oHeaders, successFunc, errorFunc){
    errorFuncDefault = (typeof errorFunc === "undefined") ? errorHandling : errorFunc;
	jQuery.ajax({
	        type: type,
	        url: url,
	        data: data,
	        headers: oHeaders,
	        success: successFunc,
	        error: errorFuncDefault
	});
}

function errorHandling(oData, textStatus, error){
	alert('errorHandling ' + oData.status + ' ' + error);
	
	displayError({
		message : error,
		responseText : oData.responseText,
		statusCode : oData.status,
		statusText : oData.statusText
	});	
}