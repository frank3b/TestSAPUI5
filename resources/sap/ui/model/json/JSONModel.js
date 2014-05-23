/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/ClientModel','./JSONListBinding','./JSONPropertyBinding','./JSONTreeBinding'],function(q,C,J,a,b){"use strict";var c=C.extend("sap.ui.model.json.JSONModel",{constructor:function(d){C.apply(this,arguments);if(d&&typeof d=="object"){this.setData(d)}},metadata:{publicMethods:["setJSON","getJSON"]}});c.prototype.setData=function(d,m){if(m){this.oData=q.extend(true,{},this.oData,d)}else{this.oData=d}this.checkUpdate()};c.prototype.setJSON=function(j,m){var o;try{o=q.parseJSON(j);this.setData(o,m)}catch(e){q.sap.log.fatal("The following problem occurred: JSON parse Error: "+e);this.fireParseError({url:"",errorCode:-1,reason:"",srcText:e,line:-1,linepos:-1,filepos:-1})}};c.prototype.getJSON=function(){return JSON.stringify(this.oData)};c.prototype.loadData=function(u,p,A,t,m,d,h){var e=this;A=(A!==false);t=t||"GET";d=d===undefined?this.bCache:d;this.fireRequestSent({url:u,type:t,async:A,headers:h,info:"cache="+d+";bMerge="+m,infoObject:{cache:d,merge:m}});this._ajax({url:u,async:A,dataType:'json',cache:d,data:p,headers:h,type:t,success:function(D){if(!D){q.sap.log.fatal("The following problem occurred: No data was retrieved by service: "+u)}e.setData(D,m);e.fireRequestCompleted({url:u,type:t,async:A,headers:h,info:"cache="+d+";bMerge="+m,infoObject:{cache:d,merge:m},success:true})},error:function(X,f,g){var E={message:f,statusCode:X.status,statusText:X.statusText,responseText:X.responseText};q.sap.log.fatal("The following problem occurred: "+f,X.responseText+","+X.status+","+X.statusText);e.fireRequestCompleted({url:u,type:t,async:A,headers:h,info:"cache="+d+";bMerge="+m,infoObject:{cache:d,merge:m},success:false,errorobject:E});e.fireRequestFailed(E)}})};c.prototype.bindProperty=function(p,o,P){var B=new a(this,p,o,P);return B};c.prototype.bindList=function(p,o,s,f,P){var B=new J(this,p,o,s,f,P);return B};c.prototype.bindTree=function(p,o,f,P){var B=new b(this,p,o,f,P);return B};c.prototype.setProperty=function(p,v,o){var O=p.substring(0,p.lastIndexOf("/")),P=p.substr(p.lastIndexOf("/")+1);if(!this.resolve(p,o)){return}if(!O&&!o){o=this.oData}var d=this._getObject(O,o);if(d){d[P]=v;this.checkUpdate()}};c.prototype.getProperty=function(p,o){return this._getObject(p,o)};c.prototype._getObject=function(p,o){var n=this.isLegacySyntax()?this.oData:null;if(o instanceof sap.ui.model.Context){n=this._getObject(o.getPath())}else if(o){n=o}if(!p){return n}var P=p.split("/"),i=0;if(!P[0]){n=this.oData;i++}while(n&&P[i]){n=n[P[i]];i++}return n};c.prototype.isList=function(p,o){var A=this.resolve(p,o);return q.isArray(this._getObject(A))};return c},true);
