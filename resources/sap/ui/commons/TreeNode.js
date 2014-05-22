/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.TreeNode");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.ui.commons.TreeNode",{metadata:{publicMethods:["select","expand","collapse"],library:"sap.ui.commons",properties:{"text":{type:"string",group:"Misc",defaultValue:null},"expanded":{type:"boolean",group:"Misc",defaultValue:true},"hasExpander":{type:"boolean",group:"Misc",defaultValue:false},"icon":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"isSelected":{type:"boolean",group:"Misc",defaultValue:false},"selectable":{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"nodes",aggregations:{"nodes":{type:"sap.ui.commons.TreeNode",multiple:true,singularName:"node"}},associations:{"ariaDescribedBy":{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},"ariaLabelledBy":{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{"toggleOpenState":{},"selected":{}}}});sap.ui.commons.TreeNode.M_EVENTS={'toggleOpenState':'toggleOpenState','selected':'selected'};sap.ui.commons.TreeNode.ANIMATION_DURATION=600;jQuery.sap.require("sap.ui.core.CustomStyleClassSupport");sap.ui.core.CustomStyleClassSupport.apply(sap.ui.commons.TreeNode.prototype);
sap.ui.commons.TreeNode.prototype.expand=function(e){var d=this.$();if(d.hasClass("sapUiTreeNodeCollapsed")){d.toggleClass("sapUiTreeNodeCollapsed");d.toggleClass("sapUiTreeNodeExpanded");var D=this.$("children");if(D){D.stop(true,true);D.show(sap.ui.commons.TreeNode.ANIMATION_DURATION,this.getCallbackFunction(this,d,false))}d.attr("aria-expanded","true");this.fireToggleOpenState({opened:true})}this.setProperty("expanded",true,true);if(e){var n=this.getNodes();for(var i=0;i<n.length;i++){n[i].expand(e)}}};
sap.ui.commons.TreeNode.prototype.collapse=function(c){var d=this.$();if(d.hasClass("sapUiTreeNodeExpanded")){d.toggleClass("sapUiTreeNodeCollapsed");d.toggleClass("sapUiTreeNodeExpanded");var D=this.$("children");if(D){D.stop(true,true);D.hide(sap.ui.commons.TreeNode.ANIMATION_DURATION,this.getCallbackFunction(this,d,true))}d.attr("aria-expanded","false");this.fireToggleOpenState({opened:false})}this.setProperty("expanded",false,true);if(c){var n=this.getNodes();for(var i=0;i<n.length;i++){n[i].collapse(c)}}};
sap.ui.commons.TreeNode.prototype.select=function(s){var t=this.getTree(),T;this.setProperty("isSelected",true,true);if(!t||!this.getDomRef()){return}T=t.$();var d=T.find(".sapUiTreeNodeSelected");d.removeClass("sapUiTreeNodeSelected").removeAttr("aria-selected");T.find(".sapUiTreeNodeSelectedParent").removeClass("sapUiTreeNodeSelectedParent");if(d.length){var S=sap.ui.getCore().getControl(d[0].id);S.setProperty("isSelected",false,true)}this.$().closest(".sapUiTreeNode").addClass("sapUiTreeNodeSelected").attr("aria-selected","true");if(!s){this.fireSelected()}this.scrollIntoView()};
sap.ui.commons.TreeNode.prototype.deselect=function(s){var t=this.getTree();this.setProperty("isSelected",false,true);if(!t||!this.getDomRef()){return}this.$().removeClass("sapUiTreeNodeSelected").removeAttr("aria-selected")};
sap.ui.commons.TreeNode.prototype.hasSelectedHiddenChild=function(){var n=this.getNodes();for(var i=0;i<n.length;i++){if((!n[i].isVisible()&&n[i].getIsSelected())||n[i].hasSelectedHiddenChild()){return true}}return false};
sap.ui.commons.TreeNode.prototype.setIsSelected=function(i){if(!this.getSelectable()){return this}if(i){this.select(true)}else{this.deselect()}return this};
sap.ui.commons.TreeNode.prototype.setSelectable=function(s){if(!s&&this.getIsSelected()){this.setIsSelected(false)}this.setProperty("selectable",s);return this};
sap.ui.commons.TreeNode.prototype.onclick=function(e){var d=e.target,t=this.getTree();if(jQuery(d).is(".sapUiTreeNode")||jQuery(d).is(".sapUiTreeNodeNotSelectable")){if(jQuery(d).is(".sapUiTreeNodeNotSelectable")){d=jQuery(d).closest(".sapUiTreeNode")[0]}if(jQuery(d).hasClass("sapUiTreeNodeExpanded")){this.collapse()}else{this.expand()}t.placeFocus(d);d.focus()}else if(jQuery(d).is(".sapUiTreeNodeContent")||jQuery(d).is(".sapUiTreeIcon")){t.setSelection(this);d=jQuery(d).closest(".sapUiTreeNode")[0];t.placeFocus(d);d.focus()}};
sap.ui.commons.TreeNode.prototype.onsapselect=function(e){if(this.getSelectable()){this.getTree().setSelection(this)}else if(this.getExpanded()){this.collapse()}else{this.expand()}};
sap.ui.commons.TreeNode.prototype.onsapexpand=function(e){this.expand()};
sap.ui.commons.TreeNode.prototype.onsapcollapse=function(e){this.collapse()};
sap.ui.commons.TreeNode.prototype.onsapleft=function(e){if(sap.ui.getCore().getConfiguration().getRTL()){this.expand()}else{this.collapse()}e.preventDefault()};
sap.ui.commons.TreeNode.prototype.onsapright=function(e){if(sap.ui.getCore().getConfiguration().getRTL()){this.collapse()}else{this.expand()}e.preventDefault()};
sap.ui.commons.TreeNode.prototype.focus=function(){var d=this.getFocusDomRef();if(d){d.setAttribute("tabindex","0");d.focus()}};
sap.ui.commons.TreeNode.prototype.blur=function(){var d=this.getFocusDomRef();if(d){d.setAttribute("tabindex","-1")}};
sap.ui.commons.TreeNode.prototype.getTree=function(){var p=this.getParent();while(p instanceof sap.ui.commons.TreeNode){p=p.getParent()}return p};
sap.ui.commons.TreeNode.prototype.hasChildren=function(){var s=this.getNodes();if(s.length){return true}return false};
sap.ui.commons.TreeNode.prototype.isVisible=function(){var p=this.getParent();while(p instanceof sap.ui.commons.TreeNode){if(!p.getExpanded()){return false}p=p.getParent()}return true};
sap.ui.commons.TreeNode.prototype.getCallbackFunction=function(n,d,c){var t=n.getTree();if(c){return function(){t.adjustFocus();t.adjustSelectionOnCollapsing(d)}}else{return function(){t.adjustSelectionOnExpanding(d)}}};
sap.ui.commons.TreeNode.prototype.scrollIntoView=function(){var n=this.$(),t=this.getTree().$(),T=t.find(".sapUiTreeCont"),o=n[0].offsetTop,s=T.scrollTop(),h=T.height(),N;if(o>s+h){N=o-Math.floor(h*0.8);T.animate({scrollTop:N})}else if(o<s){N=o-Math.floor(h*0.2);T.animate({scrollTop:N})}};
sap.ui.commons.TreeNode.prototype.getTooltip_AsString=function(){var t;var T=this.getTooltip();if(typeof T==="string"||T instanceof String){t=T}if(!t){t=this.getText()}return t};