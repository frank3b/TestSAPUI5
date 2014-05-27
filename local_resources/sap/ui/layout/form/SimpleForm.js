/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.layout.form.SimpleForm");jQuery.sap.require("sap.ui.layout.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.layout.form.SimpleForm",{metadata:{library:"sap.ui.layout",properties:{"maxContainerCols":{type:"int",group:"Appearance",defaultValue:2},"minWidth":{type:"int",group:"Appearance",defaultValue:-1},"editable":{type:"boolean",group:"Misc",defaultValue:null},"labelMinWidth":{type:"int",group:"Misc",defaultValue:192},"layout":{type:"sap.ui.layout.form.SimpleFormLayout",group:"Misc",defaultValue:sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout},"labelSpanL":{type:"int",group:"Misc",defaultValue:4},"labelSpanM":{type:"int",group:"Misc",defaultValue:2},"labelSpanS":{type:"int",group:"Misc",defaultValue:12},"emptySpanL":{type:"int",group:"Misc",defaultValue:0},"emptySpanM":{type:"int",group:"Misc",defaultValue:0},"emptySpanS":{type:"int",group:"Misc",defaultValue:0},"columnsL":{type:"int",group:"Misc",defaultValue:2},"columnsM":{type:"int",group:"Misc",defaultValue:1},"breakpointL":{type:"int",group:"Misc",defaultValue:1024},"breakpointM":{type:"int",group:"Misc",defaultValue:600}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Element",multiple:true,singularName:"content"},"form":{type:"sap.ui.layout.form.Form",multiple:false,visibility:"hidden"},"title":{type:"sap.ui.core.Title",altTypes:["string"],multiple:false}}}});jQuery.sap.require("sap.ui.layout.form.Form");jQuery.sap.require("sap.ui.layout.form.FormContainer");jQuery.sap.require("sap.ui.layout.form.FormElement");jQuery.sap.require("sap.ui.layout.form.FormLayout");jQuery.sap.require("sap.ui.layout.ResponsiveFlowLayoutData");(function(){sap.ui.layout.form.SimpleForm.prototype.init=function(){this._iMaxWeight=8;this._iLabelWeight=3;this._iCurrentWidth=0;var F=new sap.ui.layout.form.Form(this.getId()+"--Form");F.getTitle=function(){return this.getParent().getTitle()};this.setAggregation("form",F);this._aElements=null;this._aLayouts=[];var i=this;this._changedFormContainers=[];this._changedFormElements=[]};sap.ui.layout.form.SimpleForm.prototype.exit=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}for(var i=0;i<this._aLayouts.length;i++){var L=sap.ui.getCore().byId(this._aLayouts[i]);if(L&&L.destroy){L.destroy()}}this._aLayouts=[];this._aElements=null;this._changedFormContainers=[];this._changedFormElements=[]};sap.ui.layout.form.SimpleForm.prototype.onBeforeRendering=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}var i=this;var F=this.getAggregation("form");if(!F.getLayout()){_(i)}a(i)};sap.ui.layout.form.SimpleForm.prototype.onAfterRendering=function(){if(this.getLayout()==sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout){this.$().css("visibility","hidden");this._applyLinebreaks();this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),jQuery.proxy(this._resize,this))}};sap.ui.layout.form.SimpleForm.prototype.setEditable=function(E){this.setProperty("editable",E,true);var F=this.getAggregation("form");F.setEditable(E)};sap.ui.layout.form.SimpleForm.prototype.indexOfContent=function(O){var C=this._aElements;if(C){for(var i=0;i<C.length;i++){if(C[i]==O){return i}}}return-1};sap.ui.layout.form.SimpleForm.prototype.addContent=function(E){E=this.validateAggregation("content",E,true);if(!this._aElements){this._aElements=[]}var L=this._aElements.length;var i;var F=this.getAggregation("form");var j;var k;var P;var u;if(E instanceof sap.ui.core.Title){j=o(this,E);F.addFormContainer(j);this._changedFormContainers.push(j)}else if(E.getMetadata().isInstanceOf("sap.ui.core.Label")){if(L>0){i=this._aElements[L-1];P=i.getParent();if(P instanceof sap.ui.layout.form.FormElement){j=P.getParent()}else if(P instanceof sap.ui.layout.form.FormContainer){j=P}}if(!j){j=o(this);F.addFormContainer(j);this._changedFormContainers.push(j)}k=l(this,j,E)}else{if(L>0){i=this._aElements[L-1];P=i.getParent();if(P instanceof sap.ui.layout.form.FormElement){j=P.getParent();k=P;u=d(this,E);if(u instanceof sap.ui.layout.ResponsiveFlowLayoutData&&!b(this,u)){if(u.getLinebreak()){k=l(this,j)}}}else if(P instanceof sap.ui.layout.form.FormContainer){j=P;k=l(this,j)}}else{j=o(this);F.addFormContainer(j);this._changedFormContainers.push(j);k=l(this,j)}e(this,E,5,false,true);k.addField(E);s(this._changedFormElements,k)}this._aElements.push(E);E.attachEvent("_change",t,this);this.invalidate();return this};sap.ui.layout.form.SimpleForm.prototype.insertContent=function(E,I){E=this.validateAggregation("content",E,true);if(!this._aElements){this._aElements=[]}var L=this._aElements.length;var N=I<0?0:(I>L?L:I);if(N!==I){jQuery.sap.log.warning("SimpleForm.insertContent: index '"+I+"' out of range [0,"+L+"], forced to "+N)}if(N==L){this.addContent(E);return this}var O=this._aElements[N];var F=this.getAggregation("form");var j;var k;var u;var v;var C;var w=0;var x;var y;var z;var A;if(E instanceof sap.ui.core.Title){if(I==0&&!(O instanceof sap.ui.core.Title)){j=O.getParent().getParent();j.setTitle(E)}else{j=o(this,E);if(O instanceof sap.ui.core.Title){u=O.getParent();C=F.indexOfFormContainer(u)}else{v=O.getParent();u=v.getParent();C=F.indexOfFormContainer(u)+1;w=u.indexOfFormElement(v);if(!O.getMetadata().isInstanceOf("sap.ui.core.Label")){x=v.indexOfField(O);if(x>0||v.getLabel()){k=l(this,j);this._changedFormElements.push(k);s(this._changedFormElements,v);y=v.getFields();for(var i=x;i<y.length;i++){var B=y[i];k.addField(B)}w++}}z=u.getFormElements();for(var i=w;i<z.length;i++){j.addFormElement(z[i])}}F.insertFormContainer(j,C)}this._changedFormContainers.push(j)}else if(E.getMetadata().isInstanceOf("sap.ui.core.Label")){if(O instanceof sap.ui.core.Title){u=O.getParent();C=F.indexOfFormContainer(u);A=F.getFormContainers();j=A[C-1];k=l(this,j,E)}else if(O.getMetadata().isInstanceOf("sap.ui.core.Label")){u=O.getParent().getParent();w=u.indexOfFormElement(O.getParent());k=m(this,u,E,w)}else{v=O.getParent();u=v.getParent();w=u.indexOfFormElement(v)+1;x=v.indexOfField(O);if(x==0&&!v.getLabel()){k=v;k.setLabel(E);e(this,E,this._iLabelWeight,false,true,this.getLabelMinWidth())}else{k=m(this,u,E,w);s(this._changedFormElements,v);y=v.getFields();for(var i=x;i<y.length;i++){var B=y[i];k.addField(B)}}}this._changedFormElements.push(k)}else{if(O instanceof sap.ui.core.Title){u=O.getParent();C=F.indexOfFormContainer(u);if(C==0){j=o(this);F.insertFormContainer(j,C);this._changedFormContainers.push(j)}else{A=F.getFormContainers();j=A[C-1]}z=j.getFormElements();if(z.length==0){k=l(this,j)}else{k=z[z.length-1]}k.addField(E)}else if(O.getMetadata().isInstanceOf("sap.ui.core.Label")){v=O.getParent();j=v.getParent();w=j.indexOfFormElement(v);if(w==0){k=m(this,j,null,0)}else{z=j.getFormElements();k=z[w-1]}k.addField(E)}else{k=O.getParent();x=k.indexOfField(O);k.insertField(E,x)}s(this._changedFormElements,k);e(this,E,5,false,true)}this._aElements.splice(N,0,E);E.attachEvent("_change",t,this);this.invalidate();return this};sap.ui.layout.form.SimpleForm.prototype.removeContent=function(E){var j=null;var I=-1;if(this._aElements){if(typeof(E)=="string"){E=sap.ui.getCore().byId(E)}if(typeof(E)=="object"){for(var i=0;i<this._aElements.length;i++){if(this._aElements[i]==E){E=i;break}}}if(typeof(E)=="number"){if(E<0||E>=this._aElements.length){jQuery.sap.log.warning("Element.removeAggregation called with invalid index: Items, "+E)}else{I=E;j=this._aElements[I]}}}if(j){var F=this.getAggregation("form");var k;var u;var v;var w;if(j instanceof sap.ui.core.Title){k=j.getParent();k.setTitle(null);if(I>0){v=k.getFormElements();var C=F.indexOfFormContainer(k);var P=F.getFormContainers()[C-1];if(v&&!v[0].getLabel()){var x=P.getFormElements();var L=x[x.length-1];w=v[0].getFields();for(var i=0;i<w.length;i++){L.addField(w[i])}s(this._changedFormElements,L);k.removeFormElement(v[0]);v[0].destroy();v.splice(0,1)}for(var i=0;i<v.length;i++){P.addFormElement(v[i])}s(this._changedFormContainers,P);F.removeFormContainer(k);k.destroy()}}else if(j.getMetadata().isInstanceOf("sap.ui.core.Label")){u=j.getParent();k=u.getParent();u.setLabel(null);var y=k.indexOfFormElement(u);if(y==0){if(!u.getFields()){k.removeFormElement(u);u.destroy()}else{s(this._changedFormElements,u)}}else{v=k.getFormElements();var z=v[y-1];w=u.getFields();for(var i=0;i<w.length;i++){z.addField(w[i])}s(this._changedFormElements,z);k.removeFormElement(u);u.destroy()}}else{u=j.getParent();u.removeField(j);if(!u.getFields()&&!u.getLabel()){k=u.getParent();k.removeFormElement(u);u.destroy()}else{s(this._changedFormElements,u)}}this._aElements.splice(I,1);j.setParent(null);j.detachEvent("_change",t,this);h(this,j);this.invalidate();return j}return null};sap.ui.layout.form.SimpleForm.prototype.removeAllContent=function(){if(this._aElements){var F=this.getAggregation("form");var k=F.getFormContainers();for(var i=0;i<k.length;i++){var u=k[i];u.setTitle(null);var v=u.getFormElements();for(var j=0;j<v.length;j++){var w=v[j];w.setLabel(null);w.removeAllFields()}u.destroyFormElements()}F.destroyFormContainers();for(var i=0;i<this._aElements.length;i++){var E=this._aElements[i];h(this,E);E.detachEvent("_change",t,this)}var x=this._aElements;this._aElements=null;this.invalidate();return x}else{return[]}};sap.ui.layout.form.SimpleForm.prototype.destroyContent=function(){var E=this.removeAllContent();if(E){for(var i=0;i<E.length;i++){E[i].destroy()}this.invalidate()}return this};sap.ui.layout.form.SimpleForm.prototype.getContent=function(){if(!this._aElements){this._aElements=this.getAggregation("content")}return this._aElements};sap.ui.layout.form.SimpleForm.prototype.setLayout=function(L){var O=this.getLayout();this.setProperty("layout",L);if(L!=O){var u=this;_(u);var F=this.getAggregation("form");var C=F.getFormContainers();var E;var v;var w;for(var i=0;i<C.length;i++){var x=C[i];this._changedFormContainers.push(x);w=x.getLayoutData();if(w){w.destroy()}g(this,x);E=x.getFormElements();for(var j=0;j<E.length;j++){var y=E[j];s(this._changedFormElements,y);w=y.getLayoutData();if(w){w.destroy()}f(this,y);var z=y.getLabel();if(z){h(this,z);e(this,z,this._iLabelWeight,false,true,this.getLabelMinWidth())}v=y.getFields();for(var k=0;k<v.length;k++){var A=v[k];h(this,A);e(this,A,5,false,true)}}}}};sap.ui.layout.form.SimpleForm.prototype.clone=function(I){var C=sap.ui.core.Control.prototype.clone.apply(this,arguments);var k=this.getContent();for(var i=0;i<k.length;i++){var E=k[i];var L=E.getLayoutData();var u=E.clone(I);if(L){if(L.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var v=L.getMultipleLayoutData();for(var j=0;j<v.length;j++){if(b(this,v[j])){C._aLayouts.push(u.getLayoutData().getMultipleLayoutData()[j].getId())}}}else if(b(this,L)){C._aLayouts.push(u.getLayoutData().getId())}}C.addContent(u)}return C};var _=function(T){var F=T.getAggregation("form");var L=F.getLayout();if(L){L.destroy()}switch(T.getLayout()){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:jQuery.sap.require("sap.ui.layout.form.ResponsiveLayout");F.setLayout(new sap.ui.layout.form.ResponsiveLayout(T.getId()+"--Layout"));break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:jQuery.sap.require("sap.ui.layout.form.GridLayout");jQuery.sap.require("sap.ui.layout.form.GridContainerData");jQuery.sap.require("sap.ui.layout.form.GridElementData");F.setLayout(new sap.ui.layout.form.GridLayout(T.getId()+"--Layout"));break;case sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout:jQuery.sap.require("sap.ui.layout.form.ResponsiveGridLayout");jQuery.sap.require("sap.ui.layout.GridData");F.setLayout(new sap.ui.layout.form.ResponsiveGridLayout(T.getId()+"--Layout"));break;default:break}};var a=function(T){T._changedFormContainers=[];var L=T.getLayout();switch(L){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:T._applyLinebreaks();break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:r(T);break;case sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout:var j=T.getAggregation("form").getLayout();j.setLabelSpanL(T.getLabelSpanL());j.setLabelSpanM(T.getLabelSpanM());j.setLabelSpanS(T.getLabelSpanS());j.setEmptySpanL(T.getEmptySpanL());j.setEmptySpanM(T.getEmptySpanM());j.setEmptySpanS(T.getEmptySpanS());j.setColumnsL(T.getColumnsL());j.setColumnsM(T.getColumnsM());j.setBreakpointL(T.getBreakpointL());j.setBreakpointM(T.getBreakpointM());break;default:break}for(var i=0;i<T._changedFormElements.length;i++){var F=T._changedFormElements[i];switch(L){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:p(T,F);break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:break;default:break}q(T,F)}T._changedFormElements=[]};var b=function(T,L){var i=L.getId(),j=" "+T._aLayouts.join(" ")+" ";return j.indexOf(" "+i+" ")>-1};var c=function(T,w,L,i,M){var j=new sap.ui.layout.ResponsiveFlowLayoutData({weight:w,linebreak:L===true,linebreakable:i===true});if(M){j.setMinWidth(M)}T._aLayouts.push(j.getId());return j};var d=function(T,F){var L;switch(T.getLayout()){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:L=sap.ui.layout.form.FormLayout.prototype.getLayoutDataForElement(F,"sap.ui.layout.ResponsiveFlowLayoutData");break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:L=sap.ui.layout.form.FormLayout.prototype.getLayoutDataForElement(F,"sap.ui.layout.form.GridElementData");break;case sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout:L=sap.ui.layout.form.FormLayout.prototype.getLayoutDataForElement(F,"sap.ui.layout.GridData");break;default:break}return L};var e=function(T,F,w,L,i,M){var j;switch(T.getLayout()){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:j=d(T,F);if(!j||!b(T,j)){j=F.getLayoutData();if(j&&j.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){j.addMultipleLayoutData(c(T,w,L,i,M))}else if(!j){F.setLayoutData(c(T,w,L,i,M))}else{jQuery.sap.log.warning("ResponsiveFlowLayoutData can not be set on Field "+F.getId(),"_createFieldLayoutData","SimpleForm")}}break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:break;default:break}};var f=function(T,E){switch(T.getLayout()){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:E.setLayoutData(new sap.ui.layout.ResponsiveFlowLayoutData({linebreak:true,margin:false}));break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:break;default:break}};var g=function(T,C){switch(T.getLayout()){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:C.setLayoutData(new sap.ui.layout.ResponsiveFlowLayoutData({minWidth:280}));break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:if(T.getMaxContainerCols()>1){C.setLayoutData(new sap.ui.layout.form.GridContainerData({halfGrid:true}))}else{C.setLayoutData(new sap.ui.layout.form.GridContainerData({halfGrid:false}))}break;default:break}};var h=function(T,E){var L=d(T,E);if(L){var j=L.getId();for(var i=0;i<T._aLayouts.length;i++){var I=T._aLayouts[i];if(j==I){L.destroy();T._aLayouts.splice(i,1);break}}}};var l=function(T,F,L){var E=n(T,L);F.addFormElement(E);return E};var m=function(T,F,L,i){var E=n(T,L);F.insertFormElement(E,i);return E};var n=function(T,L){var E=new sap.ui.layout.form.FormElement();f(T,E);if(L){L.addStyleClass("sapUiFormLabel-CTX");E.setLabel(L);if(!d(T,L)){e(T,L,T._iLabelWeight,false,true,T.getLabelMinWidth())}}E.setVisible(false);return E};var o=function(T,i){var C=new sap.ui.layout.form.FormContainer();g(T,C);if(i){C.setTitle(i)}return C};var p=function(T,E){var M=T._iMaxWeight;var F=E.getFields();var j;var L=F.length;var k=E.getLabel();var u;if(k&&d(T,k)){M=M-d(T,k).getWeight()}for(var i=0;i<F.length;i++){j=F[i];u=d(T,j);if(u instanceof sap.ui.layout.ResponsiveFlowLayoutData&&!b(T,u)){M=M-u.getWeight();L--}}var w=Math.floor(M/L);var R=M%L;for(var i=0;i<F.length;i++){j=F[i];u=d(T,j);var C=w;if(!u){e(T,j,C,false,i==0)}else if(b(T,u)&&u instanceof sap.ui.layout.ResponsiveFlowLayoutData){if(R>0){C++;R--}u.setWeight(C)}}};var q=function(T,E){var F=E.getFields();var L=F.length;var v=false;for(var i=0;i<F.length;i++){var j=F[i];if(!j.getVisible||j.getVisible()){v=true;break}}if(E.getVisible()!=v){E.setVisible(v)}};sap.ui.layout.form.SimpleForm.prototype._applyLinebreaks=function(){var F=this.getAggregation("form"),C=F.getFormContainers();var D=this.getDomRef();var j=this.$();for(var i=1;i<C.length;i++){var k=C[i],L=k.getLayoutData();if(!D||j.outerWidth(true)>this.getMinWidth()){if(i%this.getMaxContainerCols()==0){L.setLinebreak(true)}else{L.setLinebreak(false)}}else{L.setLinebreak(true)}}if(D&&j.css("visibility")=="hidden"){var u=this;setTimeout(function(){if(u.getDomRef()){u.$().css("visibility","inherit")}},10)}};var r=function(T){var F=T.getAggregation("form");var C=F.getFormContainers();var L=C.length;if(L%2>0){C[L-1].getLayoutData().setHalfGrid(false)}};sap.ui.layout.form.SimpleForm.prototype._resize=function(){if(this._iCurrentWidth==this.$().outerWidth())return;this._iCurrentWidth=this.$().outerWidth();this._applyLinebreaks()};var s=function(F,j){var k=false;for(var i=0;i<F.length;i++){var C=F[i];if(C==j){k=true;break}}if(!k){F.push(j)}};var t=function(E){if(E.getParameter("name")=="visible"){var F=E.oSource.getParent();q(this,F)}}}());
