/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var initdone = false;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        /*
         * Here we make our init OData request for the product collection
         */
        OData.read({ requestUri: "https://sapes1.sapdevcenter.com/sap/opu/odata/sap/ZGWSAMPLE_SRV/ProductCollection?$format=json", user: "P1940061036", password: "Tata2013" } 
		  , 
		  function (data) { 
			  var oModel = new sap.ui.model.json.JSONModel();
			  var myData = {};
			  
			  myData.Products = data.results;
			  oModel.setData(myData);
			  sap.ui.getCore().setModel(oModel);
			  
			  var myapp = sap.ui.jsview("com.opensap.App");
			  myapp.placeAt('root');
		  },
		  function(err){
			  window.alert("error: "+ err.message);
		  }
		);
    },
};
