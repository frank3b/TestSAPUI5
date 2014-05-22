/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','jquery.sap.strings'],function(q){"use strict";(function($,w){var s="_skip",r=/\|id-[0-9]+-[0-9]+/,a=new RegExp(s+"[0-9]*$"),b=[],h=[],S={},c=0,d=undefined,I="|",H=[],e=false,f,g=false;$.sap.history=function(A){if(!q.isPlainObject(A)){return}if(!g){var W=$(w),B=(w.location.href.split("#")[1]||"");W.bind('hashchange',k);if($.isArray(A.routes)){var i,C;for(i=0;i<A.routes.length;i++){C=A.routes[i];if(C.path&&C.handler){$.sap.history.addRoute(C.path,C.handler)}}}if(q.isFunction(A.defaultHandler)){f=A.defaultHandler}h.push(B);if(B.length>1){W.trigger("hashchange",[true])}else{d=B}g=true}};$.sap.history.addHistory=function(i,A,B,V){var C,D;if(B===undefined){B=true}if(!V){D=n(i,A);C=o(D);if(C){D+=(I+C)}D+=(I+(B?"1":"0"))}else{D=m(d)}H.push(D);S[D]=true;w.location.hash=D;return D};$.sap.history.addVirtualHistory=function(){$.sap.history.addHistory("",undefined,false,true)};$.sap.history.addRoute=function(i,A,T){if(T){A=q.proxy(A,T)}var R={};R.sIdentifier=i;R['action']=A;b.push(R);return this};$.sap.history.setDefaultHandler=function(i){f=i};$.sap.history.getDefaultHandler=function(){return f};$.sap.history.backToHash=function(i){i=i||"";var A;if(h.length===1){if($.isFunction(f)){f()}}else{A=j(d,i);if(A<0){w.history.go(A)}else{q.sap.log.error("jQuery.sap.history.backToHash: "+i+"is not in the history stack or it's after the current hash")}}};$.sap.history.backThroughPath=function(P){P=P||"";P=w.encodeURIComponent(P);var i;if(h.length===1){if($.isFunction(f)){f()}}else{i=j(d,P,true);if(i<0){w.history.go(i)}else{q.sap.log.error("jQuery.sap.history.backThroughPath: there's no history state which has the "+P+" identifier in the history stack before the current hash")}}};$.sap.history.back=function(i){if(h.length===1){if($.isFunction(f)){f($.sap.history.NavType.Back)}}else{if(!i){i=1}w.history.go(-1*i)}};$.sap.history.NavType={};$.sap.history.NavType.Back="_back";$.sap.history.NavType.Forward="_forward";$.sap.history.NavType.Bookmark="_bookmark";$.sap.history.NavType.Unknown="_unknown";function j(C,T,P){var A=$.inArray(C,h),B,i,D;if(A>0){if(P){for(i=A-1;i>=0;i--){D=h[i];if(D.indexOf(T)===0&&!u(D)){return i-A}}}else{B=$.inArray(T,h);if((B===-1)&&T.length===0){return-1*A}if((B>-1)&&(B<A)){return B-A}}}return 0}function k(E,M){var i=(w.location.href.split("#")[1]||"");i=l(i);if(M||!S[i]){H.push(i)}if(!e){e=true;if(H.length>0){var A=H.shift();if(S[A]){t(A);delete S[A]}else{x(A)}d=A}e=false}}function p(U){var i=U.indexOf("#");if(i===-1){return""}else if(i>0&&i!==U.length-1){return U.slice(i+1)}}function l(i,R){var A=i,B=i?i.indexOf("#"):-1,C,D;if(B===0){A=A.slice(B+1)}if(R){A=A.replace(r,"")}return A}function m(i){var P=i?i:"";if(u(P)){var A=P.lastIndexOf(s);P=P.slice(0,A)}return P+s+c++}function n(i,A){var E=w.encodeURIComponent(i);var B=w.encodeURIComponent(w.JSON.stringify(A));return E+I+B}function o(A){var B=$.inArray(d,h),T,i,C;if(B>-1){for(i=0;i<B+1;i++){C=h[i];if(C.slice(0,C.length-2)===A){return q.sap.uid()}}}return""}function t(i){var A=$.inArray(d,h);if(!(A===-1||A===h.length-1)){h.splice(A+1,h.length-1-A)}h.push(i)}function u(i){return a.test(i)}function v(C,F){var A=$.inArray(C,h),i;if(A!==-1){if(F){for(i=A;i<h.length;i++){if(!u(h[i])){return i-A}}}else{for(i=A;i>=0;i--){if(!u(h[i])){return i-A}}return-1*(A+1)}}}function x(A){var R,B,i,P=A,C,D,N,E;if(d===undefined){D=z(A);if(!D||!D.bBookmarkable){if(q.isFunction(f)){f($.sap.history.NavType.Bookmark)}return}}if(A.length===0){if(q.isFunction(f)){f($.sap.history.NavType.Back)}}else{N=q.inArray(A,h);if(N===0){D=z(A);if(!D||!D.bBookmarkable){if(q.isFunction(f)){f($.sap.history.NavType.Back)}return}}if(u(A)){if(u(d)){B=v(A,false);w.history.go(B)}else{var F=new RegExp(q.sap.escapeRegExp(d+s)+"[0-9]*$");if(F.test(A)){B=v(A,true);if(B){w.history.go(B)}else{w.history.back()}}else{B=v(A,false);w.history.go(B)}}}else{if(N===-1){E=$.sap.history.NavType.Unknown;h.push(A)}else{if(q.inArray(d,h,N+1)===-1){E=$.sap.history.NavType.Forward}else{E=$.sap.history.NavType.Back}}D=z(A);if(D){R=y(D.sIdentifier);if(R){R.action.apply(null,[D.oStateData,E])}}else{q.sap.log.error("hash format error! The current Hash: "+A)}}}}function y(A){var i;for(i=0;i<b.length;i++){if(b[i].sIdentifier===A){return b[i]}}}function z(A){if(u(A)){var i=A.lastIndexOf(s);A=A.slice(0,i)}var P=A.split(I),R={};if(P.length===4||P.length===3){R.sIdentifier=w.decodeURIComponent(P[0]);R.oStateData=w.JSON.parse(w.decodeURIComponent(P[1]));if(P.length===4){R.uid=P[2]}R.bBookmarkable=P[P.length-1]==="0"?false:true;return R}else{return null}}})(q,this);return q},false);
