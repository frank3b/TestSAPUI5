/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var P={};P.start=function(c,i){P.config=c;P.interactionSteps=i;P.interactionPointer=0;P.stepPointer=0;q.sap.measure.setActive(true);P.processStepStart()};P.processStepStart=function(){var c=P.interactionSteps[P.interactionPointer];var a=c.steps[P.stepPointer];if(a.startTriggerEvent=="immediate"){if(P.stepPointer==0){q.sap.measure.start(c.id,c.description)}q.sap.measure.start(a.id,c.id);P.processStepStop()}else if(a.startTriggerEvent=="UIUpdated"){sap.ui.getCore().attachEvent(sap.ui.core.Core.M_EVENTS.UIUpdated,function(){if(sap.ui.core.support.stepPointer==0){q.sap.measure.start(c.id,c.description)}q.sap.measure.start(a.id,c.id);P.processStepStop()})}else if(a.startTriggerId&&a.startTriggerEvent){var t=sap.ui.getCore().byId(a.startTriggerId);P.oTriggerEvent={};P.oTriggerEvent[a.startTriggerEvent]=function(){if(P.stepPointer==0){q.sap.measure.start(c.id,c.description)}q.sap.measure.start(a.id,c.id);P.processStepStop()};t.addDelegate(P.oTriggerEvent,true)}};P.processStepStop=function(){var c=P.interactionSteps[P.interactionPointer];var a=c.steps[P.stepPointer];if(a.startTriggerEvent=="UIUpdated"){sap.ui.getCore().detachEvent(sap.ui.core.Core.M_EVENTS.UIUpdated,P.processStepStop)}else if(a.startTriggerId&&a.startTriggerEvent){var t=sap.ui.getCore().byId(a.startTriggerId);t.removeDelegate(P.oTriggerEvent)}if(a.stopTriggerEvent=="UIUpdated"){sap.ui.getCore().attachEvent(sap.ui.core.Core.M_EVENTS.UIUpdated,P.concludeStep)}else if(a.stopTriggerId&&a.stopTriggerEvent){var t=sap.ui.getCore().byId(a.stopTriggerId);P.oTriggerEvent={};P.oTriggerEvent[a.stopTriggerEvent]=function(){P.concludeStep()};t.addDelegate(P.oTriggerEvent,true)}};P.concludeStep=function(){var c=P.interactionSteps[P.interactionPointer];var a=c.steps[P.stepPointer];var l=P.interactionSteps.length-1;var b=c.steps.length-1;q.sap.measure.end(a.id);if(a.stopTriggerEvent=="UIUpdated"){sap.ui.getCore().detachEvent(sap.ui.core.Core.M_EVENTS.UIUpdated,P.concludeStep)}if(P.stepPointer==b){q.sap.measure.end(c.id)}if(P.interactionPointer<l){if(P.stepPointer<b){P.stepPointer++}else{P.interactionPointer++;P.stepPointer=0}P.processStepStart()}else{P.endRecording()}};P.endRecording=function(){var m=P.getAllMeasurementsAsHAR();var d={log:{version:"1.2",creator:{name:"SAPUI5 PerformanceRecorder",version:"1.1"},browser:{name:navigator.userAgent,version:sap.ui.Device.browser.version}}};var p=[];var e=[];for(var i in m){if(m[i].id.substr(-5)==="_page"){var a={startedDateTime:m[i].startedDateTime,id:m[i].id,title:m[i].pageref,pageTimings:{onContentLoad:-1,onLoad:m[i].time}};p.push(a)}else{e.push(m[i])}}d.log.pages=p;d.log.entries=e;q.ajax({type:'POST',url:P.config.beaconUrl,data:d,dataType:'text'})};P.getAllMeasurementsAsHAR=function(){var o=q.sap.measure.getAllMeasurements();var m=new Array();var f=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"});q.each(o,function(i,M){var a=f.format(new Date(M.start),true);m.push({id:M.id,pageref:M.info,startedDateTime:a,time:M.duration,request:{method:"GET",url:M.id,httpVersion:"HTTP/1.1",cookies:[{dummy:""}],headers:[{name:"",value:""}],queryString:[{name:"",value:""}],headersSize:0,bodySize:0},response:{status:200,statusText:"OK",httpVersion:"HTTP/1.1",cookies:[{dummy:""}],headers:[{name:"",value:""}],content:{size:0,compression:0,mimeType:"text/html; charset=utf-8",text:"\n"},redirectURL:"",headersSize:0,bodySize:0},cache:{beforeRequest:{lastAccess:"",eTag:"",hitCount:""},afterRequest:{lastAccess:"",eTag:"",hitCount:""}},timings:{blocked:-1,dns:-1,connect:-1,send:-1,wait:-1,receive:M.duration,ssl:-1}})});return m};return P},true);
