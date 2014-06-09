/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ListItemBase");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.ListItemBase",{metadata:{publicMethods:["isSelected"],library:"sap.m",properties:{"type":{type:"sap.m.ListType",group:"Misc",defaultValue:sap.m.ListType.Inactive},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"unread":{type:"boolean",group:"Misc",defaultValue:false},"selected":{type:"boolean",group:"",defaultValue:false},"counter":{type:"int",group:"Misc",defaultValue:null}},events:{"tap":{},"detailTap":{},"press":{},"detailPress":{}}}});sap.m.ListItemBase.M_EVENTS={'tap':'tap','detailTap':'detailTap','press':'press','detailPress':'detailPress'};jQuery.sap.require("sap.ui.core.theming.Parameters");sap.m.ListItemBase.prototype._bNoFlex=!jQuery.support.hasFlexBoxSupport;sap.m.ListItemBase.prototype._sImagePath=jQuery.sap.getModulePath("sap.m","/")+"themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/img/list/"+(jQuery.os.ios?"ios":"android")+"/";
sap.m.ListItemBase.prototype.init=function(){this._active=false;this._mode="None"};
sap.m.ListItemBase.prototype.getBindingContextPath=function(m){if(this._listId&&!m){m=(sap.ui.getCore().byId(this._listId).getBindingInfo("items")||{}).model}var c=this.getBindingContext(m);if(c){return c.getPath()}};
sap.m.ListItemBase.prototype._getRadioButton=function(r,g){if(this.hasOwnProperty("_checkBox")){this._checkBox.destroy();delete this._checkBox}return this._radioButton||(this._radioButton=new sap.m.RadioButton(r,{groupName:g,activeHandling:false,selected:this.getSelected()}).setParent(this,null,true).attachSelect(this._select)).setTabIndex(-1)};
sap.m.ListItemBase.prototype._getCheckBox=function(b){if(this.hasOwnProperty("_radioButton")){this._radioButton.destroy();delete this._radioButton}return this._checkBox||(this._checkBox=new sap.m.CheckBox(b,{activeHandling:false,selected:this.getSelected()}).setParent(this,null,true).attachSelect(this._select)).setTabIndex(-1)};
sap.m.ListItemBase.prototype.exit=function(){if(this._radioButton){this._radioButton.destroy();delete this._radioButton}if(this._checkBox){this._checkBox.destroy();delete this._checkBox}if(this._navImage){this._navImage.destroy();delete this._navImage}if(this._delIcon){this._delIcon.destroy();delete this._delIcon}if(this._navIcon){this._navIcon.destroy();delete this._navIcon}if(this._detailIcon){this._detailIcon.destroy();delete this._detailIcon}this._oLastFocused=null};
sap.m.ListItemBase.prototype.isSelectable=function(){return true};
sap.m.ListItemBase.prototype.isSelected=function(){if(this.isSelectable()){return this.getProperty("selected")}return false};
sap.m.ListItemBase.prototype.getSelected=function(){return this.isSelected()};
sap.m.ListItemBase.prototype.setSelected=function(s,d){s=this.validateProperty("selected",s);if(this.isSelectable()&&s!=this.getProperty("selected")){if(!d&&this._listId){var p=sap.ui.getCore().byId(this._listId);if(p&&p.onItemSetSelected){p.onItemSetSelected(this,s)}}if(this._checkBox){this._checkBox.setSelected(s)}else if(this._radioButton){this._radioButton.setSelected(s)}if(this.getDomRef()){this.$().toggleClass("sapMLIBSelected",s)}this.setProperty("selected",s,true)}return this};
sap.m.ListItemBase.prototype.setActive=function(a){if(a!=this._active){this._active=a;this._activeHandling();if(this.getType()=="Navigation"){this._activeHandlingNav()}if(a){this._activeHandlingInheritor()}else{this._inactiveHandlingInheritor()}}return this};
sap.m.ListItemBase.prototype.setUnread=function(u){this.setProperty("unread",u);this.$().toggleClass("sapMLIBUnread",u);return this};
sap.m.ListItemBase.prototype._getNavImage=function(i,I,s,a){if(!jQuery.os.ios&&this.getType()=="Navigation"){return null}if(this.hasOwnProperty("_navImage")){return this._navImage}if(a){a=this._sImagePath+a}return this._navImage=new sap.m.Image(i,{src:this._sImagePath+s,activeSrc:a,densityAware:false}).addStyleClass(I,true).setParent(this,null,true)};
sap.m.ListItemBase.prototype._getDelImage=function(i,I,s){return this._delImage||(this._delImage=new sap.m.Image(i,{src:this._sImagePath+s,densityAware:false}).addStyleClass(I,true).setParent(this,null,true).attachPress(this._delete))};
sap.m.ListItemBase.prototype.ontap=function(e){var t=this.getType();if(this._mode==="SingleSelectMaster"||(this._includeItemInSelection&&(this._mode==="SingleSelect"||this._mode==="SingleSelectLeft"||this._mode==="MultiSelect"))){switch(this._mode){case"SingleSelect":case"SingleSelectLeft":case"SingleSelectMaster":if(!this.getSelected()&&e.srcControl&&e.srcControl.getId()!==this._radioButton.getId()){this.setSelected(true);this._listId&&sap.ui.getCore().byId(this._listId)._selectTapped(this)}break;case"MultiSelect":if(e.srcControl&&e.srcControl.getId()!==this._checkBox.getId()){this.setSelected(!this.getSelected());this._listId&&sap.ui.getCore().byId(this._listId)._selectTapped(this)}break}}else{switch(t){case"Active":case"Navigation":if(this._isActivationHandled(e)&&!this._eventHandledByControl){window.clearTimeout(this._timeoutIdStart);window.clearTimeout(this._timeoutIdEnd);this.setActive(true);jQuery.sap.delayedCall(180,this,function(){this.setActive(false)})}if(!this._eventHandledByControl){jQuery.sap.delayedCall(50,this,function(){this.fireTap({});this.firePress({})})}break;case"Detail":if(e.srcControl&&e.srcControl.getId()===(this.getId()+"-imgDet")){this.fireDetailTap({});this.fireDetailPress({})}break;case"DetailAndActive":if(e.srcControl&&e.srcControl.getId()===(this.getId()+"-imgDet")){this.fireDetailTap({});this.fireDetailPress({})}else{if(this._isActivationHandled(e)&&!this._eventHandledByControl){window.clearTimeout(this._timeoutIdStart);window.clearTimeout(this._timeoutIdEnd);this.setActive(true);jQuery.sap.delayedCall(180,this,function(){this.setActive(false)})}if(!this._eventHandledByControl){jQuery.sap.delayedCall(50,this,function(){this.fireTap({});this.firePress({})})}}break}}if(this._listId&&t!="Inactive"){sap.ui.getCore().byId(this._listId)._onItemPressed(this,e)}};
sap.m.ListItemBase.prototype.ontouchstart=function(e){this._eventHandledByControl=e.originalEvent._sapui_handledByControl;this._touchedY=e.targetTouches[0].clientY;this._touchedX=e.targetTouches[0].clientX;this._timeoutIdStart=jQuery.sap.delayedCall(100,this,function(){if(!(this._includeItemInSelection&&(this._mode=="SingleSelect"||this._mode=="SingleSelectLeft"||this._mode=="MultiSelect"))&&((e.touches&&e.touches.length===1)||!e.touches)){var t=this.getType();switch(t){case"Active":case"Navigation":case"DetailAndActive":if(this._isActivationHandled(e)&&!this._eventHandledByControl){this.setActive(true)}break}}})};
sap.m.ListItemBase.prototype.ontouchmove=function(e){var t=((Math.abs(this._touchedY-e.targetTouches[0].clientY)>10)||Math.abs(this._touchedX-e.targetTouches[0].clientX)>10);if((this._active||this._timeoutIdStart)&&t){clearTimeout(this._timeoutIdStart);this.setActive(false);this._timeoutIdStart=null;this._timeoutIdEnd=null}};
sap.m.ListItemBase.prototype.ontouchend=function(e){if(e.targetTouches.length===0){switch(this.getType()){case"Active":case"Navigation":case"DetailAndActive":this._timeoutIdEnd=jQuery.sap.delayedCall(100,this,function(){this._event=e;this.setActive(false)});break}}};
sap.m.ListItemBase.prototype.ontouchcancel=sap.m.ListItemBase.prototype.ontouchend;
sap.m.ListItemBase.prototype._activeHandlingNav=function(){if(sap.ui.Device.os.ios){this.$("imgNav").toggleClass("sapMLIBImgNavActive",this._active)}};
sap.m.ListItemBase.prototype._activeHandlingInheritor=function(){};
sap.m.ListItemBase.prototype._inactiveHandlingInheritor=function(){};
sap.m.ListItemBase.prototype._activeHandling=function(){this.$().toggleClass("sapMLIBActive",this._active);this.$("counter").toggleClass("sapMLIBActiveCounter",this._active);if(this.getUnread()){this.$("unread").toggleClass("sapMLIBActiveUnread",this._active)}var i=sap.ui.getCore().byId(this.getId()+"-imgDet");if(i){i.$().toggleClass("sapMLIBIconDetActive",this._active)}var I=sap.ui.getCore().byId(this.getId()+"-imgDel");if(I){I.$().toggleClass("sapMLIBIconDelActive",this._active)}};
sap.m.ListItemBase.prototype._isActivationHandled=function(e){this._event=e;var c=e.srcControl;if(c&&c.getId()!=this.getId()+"-imgDel"&&c.getId()!=this.getId()+"-imgDet"&&(!c.getActiveHandling||c.getActiveHandling&&c.getActiveHandling()!==false)){return true}return false};
sap.m.ListItemBase.prototype.onsapspace=function(e){if(!this._listId||e.isMarked()||!this.isSelectable()||e.srcControl!==this||this._mode=="Delete"||this._mode=="None"){return}if(this._mode=="MultiSelect"){this.setSelected(!this.getSelected());sap.ui.getCore().byId(this._listId)._selectTapped(this)}else if(!this.getSelected()){this.setSelected(true);sap.ui.getCore().byId(this._listId)._selectTapped(this)}e.preventDefault();e.setMarked()};
sap.m.ListItemBase.prototype.onsapenter=function(e){if(!this._listId||e.isMarked()||e.srcControl!==this){return}if(this.getType()!="Inactive"){sap.ui.getCore().byId(this._listId)._onItemPressed(this,e)}if((this._includeItemInSelection&&this._mode!="None"&&this._mode!="Delete")||this._mode=="SingleSelectMaster"){this.onsapspace(e);return}switch(this.getType()){case"Active":case"Navigation":case"DetailAndActive":e.setMarked();this.setActive(true);jQuery.sap.delayedCall(180,this,function(){this.setActive(false)});jQuery.sap.delayedCall(0,this,function(){this.fireTap({});this.firePress({})});break}};
sap.m.ListItemBase.prototype.onsapdelete=function(e){if(!this._listId||e.isMarked()||e.srcControl!==this||this._mode!="Delete"){return}this._delete.call(this._delIcon||this._delImage);e.preventDefault();e.setMarked()};
sap.m.ListItemBase.prototype._switchFocus=function(e){if(e.srcControl!==this){this._oLastFocused=e.target;jQuery(e.target).blur();this.$().focus()}else if(this._oLastFocused){jQuery(this._oLastFocused).focus()}};
sap.m.ListItemBase.prototype.onkeydown=function(e){var k=jQuery.sap.KeyCodes;if(e.isMarked()){return}if(e.which==k.F7){this._switchFocus(e);e.preventDefault();e.setMarked();return}if(e.srcControl===this&&e.ctrlKey&&e.which==k.A){sap.ui.getCore().byId(this._listId).selectAll(true);e.preventDefault();e.setMarked()}};
