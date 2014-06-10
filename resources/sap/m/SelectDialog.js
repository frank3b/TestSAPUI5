/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.SelectDialog");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.SelectDialog",{metadata:{publicMethods:["open"],library:"sap.m",properties:{"title":{type:"string",group:"Appearance",defaultValue:null},"noDataText":{type:"string",group:"Appearance",defaultValue:null},"multiSelect":{type:"boolean",group:"Dimension",defaultValue:false},"growingThreshold":{type:"int",group:"Misc",defaultValue:null},"contentWidth":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"rememberSelections":{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"items",aggregations:{"items":{type:"sap.m.ListItemBase",multiple:true,singularName:"item"},"_dialog":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{"confirm":{},"search":{},"liveChange":{},"cancel":{}}}});sap.m.SelectDialog.M_EVENTS={'confirm':'confirm','search':'search','liveChange':'liveChange','cancel':'cancel'};
/*!
 * @copyright@
 */
jQuery.sap.require("sap.m.Button");jQuery.sap.require("sap.m.Dialog");jQuery.sap.require("sap.m.List");jQuery.sap.require("sap.m.SearchField");
sap.m.SelectDialog.prototype.init=function(){var t=this,l=0,r=null,d=null;r=function(){t._oSelectedItem=t._oList.getSelectedItem();t._aSelectedItems=t._oList.getSelectedItems();t._oDialog.detachAfterClose(r);t._fireConfirmAndUpdateSelection()};this._bAppendedToUIArea=false;this._bInitBusy=false;this._bFirstRender=true;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oList=new sap.m.List(this.getId()+"-list",{growing:true,growingScrollToLoad:true,mode:sap.m.ListMode.SingleSelectMaster,infoToolbar:new sap.m.Toolbar({visible:false,active:false,content:[new sap.m.Label({text:this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[0])})]}),selectionChange:function(e){if(t._oDialog){if(!t.getMultiSelect()){t._oDialog.attachAfterClose(r);t._oDialog.close()}else{t._updateSelectionIndicator()}}}});this._list=this._oList;this._oList.attachUpdateStarted(this._updateStarted,this);this._oList.attachUpdateFinished(this._updateFinished,this);this._oBusyIndicator=new sap.m.BusyIndicator(this.getId()+"-busyIndicator").addStyleClass("sapMSelectDialogBusyIndicator",true);this._oSearchField=new sap.m.SearchField(this.getId()+"-searchField",{width:"100%",liveChange:function(e){var v=e.getSource().getValue(),D=(v?300:0);clearTimeout(l);if(D){l=setTimeout(function(){t._executeSearch(v,"liveChange")},D)}else{t._executeSearch(v,"liveChange")}},search:function(e){t._executeSearch(e.getSource().getValue(),"search")}});this._searchField=this._oSearchField;this._oSubHeader=new sap.m.Bar(this.getId()+"-subHeader",{contentMiddle:[this._oSearchField]});this._oDialog=new sap.m.Dialog(this.getId()+"-dialog",{title:this.getTitle(),stretch:sap.ui.Device.system.phone,contentHeight:"2000px",subHeader:this._oSubHeader,content:[this._oBusyIndicator,this._oList],leftButton:this._getCancelButton()}).addStyleClass("sapMSelectDialog",true);this._dialog=this._oDialog;this.setAggregation("_dialog",this._oDialog);d=this._oDialog.onsapescape;this._oDialog.onsapescape=function(e){if(d){d.call(t._oDialog,e)}t._onCancel()};this._oDialog._iVMargin=8*parseInt(sap.ui.core.theming.Parameters.get("sapUiFontSize")||16,10);this._sSearchFieldValue="";this._bFirstRequest=true;this._iListUpdateRequested=0};
sap.m.SelectDialog.prototype.exit=function(){this._oList=null;this._oSearchField=null;this._oSubHeader=null;this._oBusyIndicator=null;this._sSearchFieldValue=null;this._iListUpdateRequested=0;this._bFirstRequest=false;this._bInitBusy=false;this._bFirstRender=false;if(this._oDialog){this._oDialog.destroy();this._oDialog=null}if(this._oOkButton){this._oOkButton.destroy();this._oOkButton=null}this._oSelectedItem=null;this._aSelectedItems=null;this._aInitiallySelectedItems=null;this._list=null;this._searchField=null;this._dialog=null};
sap.m.SelectDialog.prototype.onAfterRendering=function(){if(this._bInitBusy&&this._bFirstRender){this._setBusy(true);this._bInitBusy=false;this._firstRender=false}return this};
sap.m.SelectDialog.prototype.invalidate=function(){if(this._oDialog&&(!arguments[0]||arguments[0]&&arguments[0].getId()!==this.getId()+"-dialog")){this._oDialog.invalidate(arguments)}else{sap.ui.core.Control.prototype.invalidate.apply(this,arguments)}return this};
sap.m.SelectDialog.prototype.open=function(s){if((!this.getParent()||!this.getUIArea())&&!this._bAppendedToUIArea){var S=sap.ui.getCore().getStaticAreaRef();S=sap.ui.getCore().getUIArea(S);S.addContent(this,true);this._bAppendedToUIArea=true}this._bFirstRequest=true;this._oSearchField.setValue(s);this._oDialog.open();if(this._bInitBusy){this._setBusy(true)}this._updateSelectionIndicator();this._aInitiallySelectedItems=this._oList.getSelectedItems();return this};
sap.m.SelectDialog.prototype.setGrowingThreshold=function(v){this._oList.setGrowingThreshold(v);this.setProperty("growingThreshold",v,true);return this};
sap.m.SelectDialog.prototype.setMultiSelect=function(m){this.setProperty("multiSelect",m,true);if(m){this._oList.setMode(sap.m.ListMode.MultiSelect);this._oList.setIncludeItemInSelection(true);this._oDialog.setEndButton(this._getCancelButton());this._oDialog.setBeginButton(this._getOkButton())}else{this._oList.setMode(sap.m.ListMode.SingleSelectMaster);this._oDialog.setBeginButton(this._getCancelButton())}return this};
sap.m.SelectDialog.prototype.setTitle=function(t){this._oDialog.setTitle(t);this.setProperty("title",t,true);return this};
sap.m.SelectDialog.prototype.setNoDataText=function(n){this._oList.setNoDataText(n);return this};
sap.m.SelectDialog.prototype.getNoDataText=function(){return this._oList.getNoDataText()};
sap.m.SelectDialog.prototype.getContentWidth=function(){return this._oDialog.getContentWidth()};
sap.m.SelectDialog.prototype.setContentWidth=function(w){this._oDialog.setContentWidth(w);return this};
sap.m.SelectDialog.prototype._setModel=sap.m.SelectDialog.prototype.setModel;
sap.m.SelectDialog.prototype.setModel=function(m,M){var a=Array.prototype.slice.call(arguments);this._setBusy(false);this._bInitBusy=false;this._iListUpdateRequested+=1;this._oList.setModel(m,M);sap.m.SelectDialog.prototype._setModel.apply(this,a);this._updateSelectionIndicator();return this};
sap.m.SelectDialog.prototype._callMethodInManagedObject=function(f,a){var A=Array.prototype.slice.call(arguments);if(a==="items"){return this._oList[f].apply(this._oList,A.slice(1))}else{return sap.ui.base.ManagedObject.prototype[f].apply(this,A.slice(1))}};
sap.m.SelectDialog.prototype.bindAggregation=function(){var a=Array.prototype.slice.call(arguments);this._callMethodInManagedObject.apply(this,["bindAggregation"].concat(a));return this};
sap.m.SelectDialog.prototype.validateAggregation=function(a,o,m){return this._callMethodInManagedObject("validateAggregation",a,o,m)};
sap.m.SelectDialog.prototype.setAggregation=function(a,o,s){this._callMethodInManagedObject("setAggregation",a,o,s);return this};
sap.m.SelectDialog.prototype.getAggregation=function(a,d){return this._callMethodInManagedObject("getAggregation",a,d)};
sap.m.SelectDialog.prototype.indexOfAggregation=function(a,o){return this._callMethodInManagedObject("indexOfAggregation",a,o)};
sap.m.SelectDialog.prototype.insertAggregation=function(a,o,i,s){this._callMethodInManagedObject("insertAggregation",a,o,i,s);return this};
sap.m.SelectDialog.prototype.addAggregation=function(a,o,s){this._callMethodInManagedObject("addAggregation",a,o,s);return this};
sap.m.SelectDialog.prototype.removeAggregation=function(a,o,s){return this._callMethodInManagedObject("removeAggregation",a,o,s)};
sap.m.SelectDialog.prototype.removeAllAggregation=function(a,s){return this._callMethodInManagedObject("removeAllAggregation",a,s)};
sap.m.SelectDialog.prototype.destroyAggregation=function(a,s){this._callMethodInManagedObject("destroyAggregation",a,s);return this};
sap.m.SelectDialog.prototype.getBinding=function(a){return this._callMethodInManagedObject("getBinding",a)};
sap.m.SelectDialog.prototype.getBindingInfo=function(a){return this._callMethodInManagedObject("getBindingInfo",a)};
sap.m.SelectDialog.prototype.getBindingPath=function(a){return this._callMethodInManagedObject("getBindingPath",a)};
sap.m.SelectDialog.prototype.getBindingContext=function(m){return this._oList.getBindingContext(m)};
sap.m.SelectDialog.prototype._setBindingContext=sap.m.SelectDialog.prototype.setBindingContext;
sap.m.SelectDialog.prototype.setBindingContext=function(c,m){var a=Array.prototype.slice.call(arguments);this._oList.setBindingContext(c,m);sap.m.SelectDialog.prototype._setBindingContext.apply(this,a);return this};
sap.m.SelectDialog.prototype._executeSearch=function(v,e){var l=this._oList,b=(l?l.getBinding("items"):undefined),s=(this._sSearchFieldValue!==v);if(this._oDialog.isOpen()&&((s&&e==="liveChange")||e==="search")){this._sSearchFieldValue=v;if(b){this._iListUpdateRequested+=1;if(e==="search"){this.fireSearch({value:v,itemsBinding:b})}else if(e==="liveChange"){this.fireLiveChange({value:v,itemsBinding:b})}}else{if(e==="search"){this.fireSearch({value:v})}else if(e==="liveChange"){this.fireLiveChange({value:v})}}}return this};
sap.m.SelectDialog.prototype._setBusy=function(b){if(this._iListUpdateRequested){if(b){if(this._bFirstRequest){this._oSubHeader.$().css('display','none')}this._oList.addStyleClass('sapMSelectDialogListHide');this._oBusyIndicator.$().css('display','inline-block')}else{if(this._bFirstRequest){this._oSubHeader.$().css('display','block');this._bFirstRequest=false}this._oList.removeStyleClass('sapMSelectDialogListHide');this._oBusyIndicator.$().css('display','none')}}};
sap.m.SelectDialog.prototype._updateStarted=function(e){if(this.getModel()&&this.getModel()instanceof sap.ui.model.odata.ODataModel){if(this._oDialog.isOpen()&&this._iListUpdateRequested){this._setBusy(true)}else{this._bInitBusy=true}}};
sap.m.SelectDialog.prototype._updateFinished=function(e){this._updateSelectionIndicator();if(this.getModel()&&this.getModel()instanceof sap.ui.model.odata.ODataModel){this._setBusy(false);this._bInitBusy=false}this._iListUpdateRequested=0};
sap.m.SelectDialog.prototype._getOkButton=function(){var t=this,o=null;o=function(){t._oSelectedItem=t._oList.getSelectedItem();t._aSelectedItems=t._oList.getSelectedItems();t._oDialog.detachAfterClose(o);t._fireConfirmAndUpdateSelection()};if(!this._oOkButton){this._oOkButton=new sap.m.Button(this.getId()+"-ok",{text:this._oRb.getText("MSGBOX_OK"),press:function(){t._oDialog.attachAfterClose(o);t._oDialog.close()}})}return this._oOkButton};
sap.m.SelectDialog.prototype._getCancelButton=function(){var t=this;if(!this._oCancelButton){this._oCancelButton=new sap.m.Button(this.getId()+"-cancel",{text:this._oRb.getText("MSGBOX_CANCEL"),press:function(e){t._onCancel()}})}return this._oCancelButton};
sap.m.SelectDialog.prototype._onCancel=function(e){var t=this,a=null;a=function(){t._oSelectedItem=null;t._aSelectedItems=[];t._sSearchFieldValue=null;t._oDialog.detachAfterClose(a);t.fireCancel();t._resetSelection()};this._oDialog.attachAfterClose(a);this._oDialog.close()};
sap.m.SelectDialog.prototype._updateSelectionIndicator=function(){var s=this._oList.getSelectedContexts(true).length,i=this._oList.getInfoToolbar();i.setVisible(!!s);i.getContent()[0].setText(this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[s]))};
sap.m.SelectDialog.prototype._fireConfirmAndUpdateSelection=function(){this.fireConfirm({selectedItem:this._oSelectedItem,selectedItems:this._aSelectedItems,selectedContexts:this._oList.getSelectedContexts(true)});this._updateSelection()};
sap.m.SelectDialog.prototype._updateSelection=function(){if(!this.getRememberSelections()&&!this.bIsDestroyed){this._oList.removeSelections(true);delete this._oSelectedItem;delete this._aSelectedItems}};
sap.m.SelectDialog.prototype._resetSelection=function(){var i=0;if(!this.bIsDestroyed){this._oList.removeSelections();for(;i<this._aInitiallySelectedItems.length;i++){this._oList.setSelectedItem(this._aInitiallySelectedItems[i])}}};
