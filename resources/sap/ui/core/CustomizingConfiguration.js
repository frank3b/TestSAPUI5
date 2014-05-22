/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Core'],function(q,C){"use strict";var a="sap.ui.viewReplacements",b="sap.ui.viewExtensions",c="sap.ui.viewModifications",d="sap.ui.controllerExtensions";var m={};function f(t,g){q.each(m,function(n,o){if(o&&o[t]){if(g(o[t])){return false}}})};var e={log:function(){if(window.console){window.console.log(m)}},activateForComponent:function(s){q.sap.log.info("CustomizingConfiguration: activateForComponent('"+s+"')");var F=s+".Component";q.sap.require(F);var o=q.sap.getObject(F).getMetadata().getCustomizing();m[s]=o},deactivateForComponent:function(s){q.sap.log.info("CustomizingConfiguration: deactivateForComponent('"+s+"')");delete m[s]},getViewReplacement:function(v){var r=undefined;f(a,function(o){r=o[v];return!!r});return r},getViewExtension:function(v,E){var r=undefined;f(b,function(o){r=o[v]&&o[v][E];return!!r});return r},getControllerExtension:function(s){var r=undefined;f(d,function(o){r=o[s];return!!r});return r},getCustomProperties:function(v,s){var S={};f(c,function(o){var g=o[v]&&o[v][s];var u={};if(g){q.each(g,function(n,V){if(n==="visible"){u[n]=V;q.sap.log.info("Customizing: custom value for property '"+n+"' of control '"+s+"' in View '"+v+"' applied: "+V)}else{q.sap.log.warning("Customizing: custom value for property '"+n+"' of control '"+s+"' in View '"+v+"' ignored: only the 'visible' property can be customized.")}});q.extend(S,u)}});return S}};if(sap.ui.getCore().getConfiguration().getDisableCustomizing()){q.sap.log.info("CustomizingConfiguration: disabling Customizing now");q.each(e,function(n,A){if(typeof A==="function"){e[n]=function(){}}})}return e},true);
