/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ObjectHeader");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.ObjectHeader",{metadata:{library:"sap.m",properties:{"title":{type:"string",group:"Misc",defaultValue:null},"number":{type:"string",group:"Misc",defaultValue:null},"numberUnit":{type:"string",group:"Misc",defaultValue:null},"intro":{type:"string",group:"Misc",defaultValue:null},"introActive":{type:"boolean",group:"Misc",defaultValue:null},"titleActive":{type:"boolean",group:"Misc",defaultValue:null},"icon":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"iconActive":{type:"boolean",group:"Misc",defaultValue:null},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"iconDensityAware":{type:"boolean",group:"Misc",defaultValue:true},"markFavorite":{type:"boolean",group:"Misc",defaultValue:false},"markFlagged":{type:"boolean",group:"Misc",defaultValue:false},"showMarkers":{type:"boolean",group:"Misc",defaultValue:false},"showTitleSelector":{type:"boolean",group:"Misc",defaultValue:false},"numberState":{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:sap.ui.core.ValueState.None},"condensed":{type:"boolean",group:"Appearance",defaultValue:false},"backgroundDesign":{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:sap.m.BackgroundDesign.Transparent}},defaultAggregation:"attributes",aggregations:{"attributes":{type:"sap.m.ObjectAttribute",multiple:true,singularName:"attribute"},"firstStatus":{type:"sap.m.ObjectStatus",multiple:false,deprecated:true},"secondStatus":{type:"sap.m.ObjectStatus",multiple:false,deprecated:true},"statuses":{type:"sap.ui.core.Control",multiple:true,singularName:"status"}},events:{"titlePress":{},"introPress":{},"iconPress":{},"titleSelectorPress":{}}}});sap.m.ObjectHeader.M_EVENTS={'titlePress':'titlePress','introPress':'introPress','iconPress':'iconPress','titleSelectorPress':'titleSelectorPress'};jQuery.sap.require("sap.ui.core.IconPool");
sap.m.ObjectHeader.prototype.init=function(){this._fNumberWidth=undefined;var p=sap.ui.core.IconPool.getIconURI("fridge");this._oPlaceholderIcon=sap.ui.core.IconPool.createControlByURI({id:this.getId()+"-placeholder",src:p});this._oPlaceholderIcon.addStyleClass("sapMObjStatusMarkerInvisible");var f=sap.ui.core.IconPool.getIconURI("flag");this._oFlagIcon=sap.ui.core.IconPool.createControlByURI({id:this.getId()+"-flag",src:f,visible:false});var F=sap.ui.core.IconPool.getIconURI("favorite");this._oFavIcon=sap.ui.core.IconPool.createControlByURI({id:this.getId()+"-favorite",src:F,visible:false});var t=sap.ui.core.IconPool.getIconURI("slim-arrow-down");this._oTitleArrowIcon=sap.ui.core.IconPool.createControlByURI({id:this.getId()+"-titleArrow",src:t,visible:false});this._titleText=new sap.m.Text(this.getId()+"-titleText");this._titleText.setMaxLines(3)};
sap.m.ObjectHeader.prototype.ontap=function(e){var s=e.target.id;if(this.getIntroActive()&&s===this.getId()+"-intro"){this.fireIntroPress({domRef:jQuery.sap.domById(s)})}else if(this.getTitleActive()&&e.srcControl===this._titleText){this.fireTitlePress({domRef:jQuery.sap.domById(s)})}else if(this.getIconActive()&&(s===this.getId()+"-img"||s===this.getId()+"-icon")){this.fireIconPress({domRef:jQuery.sap.domById(s)})}else if(s===this.getId()+"-titleArrow"){this.fireTitleSelectorPress({domRef:jQuery.sap.domById(s)})}};
sap.m.ObjectHeader.prototype.exit=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=undefined}if(this._oPlaceholderIcon){this._oPlaceholderIcon.destroy();this._oPlaceholderIcon=undefined}if(this._oFavIcon){this._oFavIcon.destroy();this._oFavIcon=undefined}if(this._oFlagIcon){this._oFlagIcon.destroy();this._oFlagIcon=undefined}if(this._oTitleArrowIcon){this._oTitleArrowIcon.destroy();this._oTitleArrowIcon=undefined}if(this._titleText){this._titleText.destroy();this._titleText=undefined}};
sap.m.ObjectHeader.prototype._getImageControl=function(){var i=this.getId()+"-img";var s=sap.ui.Device.system.phone?"2.5rem":"3rem";var p={src:this.getIcon(),height:s,width:s,size:s,densityAware:this.getIconDensityAware()};this._oImageControl=sap.m.ImageHelper.getImageControl(i,this._oImageControl,this,p);return this._oImageControl};
sap.m.ObjectHeader.prototype.onBeforeRendering=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};
sap.m.ObjectHeader.prototype.onAfterRendering=function(){if(this.getShowTitleSelector()){this._oTitleArrowIcon.$().css("cursor","pointer")}if(this.$("number").length>0){this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),jQuery.proxy(this._resizeElements,this));setTimeout(jQuery.proxy(this._resizeElements,this))}};
sap.m.ObjectHeader.prototype._resizeElements=function(){if(!this.getDomRef())return;var i=this.getId();var $=jQuery.sap.byId(i+"-numberdiv");var h=$.hasClass("sapMOHNumberWrap");if(this._fNumberWidth===undefined){this._fNumberWidth=$.outerWidth()}var o=$.parent().width()*35/100<this._fNumberWidth;if(o!=h){$.toggleClass("sapMOHNumberWrap");jQuery.sap.byId(i+"-titlediv").toggleClass("sapMOHNumberWrap");jQuery(sap.m.ObjectHeader._escapeId(i)+" .sapMOHBottomRow").css("margin-top",o&&sap.ui.Device.system.phone?".25rem":"");this._titleText.setMaxLines(o?2:3).rerender()}};
sap.m.ObjectHeader._escapeId=function(i){return i?"#"+i.replace(/(:|\.)/g,'\\$1'):""};
sap.m.ObjectHeader.prototype._hasBottomContent=function(){return(this._hasAttributes()||this._hasStatus()||this.getShowMarkers())};
sap.m.ObjectHeader.prototype._hasIcon=function(){return!!this.getIcon().trim()};
sap.m.ObjectHeader.prototype._hasAttributes=function(){var a=this.getAttributes();if(a&&a.length>0){for(var i=0;i<a.length;i++){if(!a[i]._isEmpty()){return true}}}return false};
sap.m.ObjectHeader.prototype._hasStatus=function(){var h=((this.getFirstStatus()&&!this.getFirstStatus()._isEmpty())||(this.getSecondStatus()&&!this.getSecondStatus()._isEmpty()));if(!h&&this.getStatuses()&&this.getStatuses().length>0){var s=this.getStatuses();for(var i=0;i<s.length;i++){if(s[i]instanceof sap.m.ObjectStatus&&!s[i]._isEmpty()){h=true;break}else if(s[i]instanceof sap.m.ProgressIndicator){h=true;break}}}return h};
