import{R as b,T as A,X as D,A as k,C as X,V as I,a as R,l as d,b as O,B as T,L as p,c as C,p as h,d as Y,e as m,f as x,o as P,g as L}from"./vendor.fdf4cbf2.js";const N=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}};N();const B=100;class F{constructor(t,r){this.stepDuration=r;const s=b.new(t);s.numberFormatter.setAll({numberFormat:"#a",bigNumberPrefixes:[{number:1e6,suffix:"M"},{number:1e9,suffix:"B"}],smallNumberPrefixes:[]}),s.setThemes([A.new(s)]);const e=s.container.children.push(D.new(s,{paddingTop:0,panX:!0,panY:!0,wheelX:"none",wheelY:"none"}));e.zoomOutButton.set("forceHidden",!0);const n=k.new(s,{minGridDistance:10,inversed:!0});n.grid.template.set("visible",!1);const l=e.yAxes.push(X.new(s,{maxDeviation:0,categoryField:"network",renderer:n})),c=e.xAxes.push(I.new(s,{maxDeviation:0,min:0,strictMinMax:!0,extraMax:.1,renderer:R.new(s,{})}));c.set("interpolationDuration",r/10),c.set("interpolationEasing",d);const o=e.series.push(O.new(s,{xAxis:c,yAxis:l,valueXField:"value",categoryYField:"network"}));o.columns.template.setAll({cornerRadiusBR:5,cornerRadiusTR:5}),o.columns.template.adapters.add("fill",(w,u)=>e.get("colors")?.getIndex(o.columns.indexOf(u))),o.columns.template.adapters.add("stroke",(w,u)=>e.get("colors")?.getIndex(o.columns.indexOf(u))),o.bullets.push(()=>T.new(s,{locationX:1,sprite:p.new(s,{text:"{valueXWorking.formatNumber('#.')}",fill:C.fromRGB(100,100,100),centerX:h,centerY:Y,populateText:!0})}));const v=e.plotContainer.children.push(p.new(s,{fontSize:"8em",opacity:.1,x:m,y:h,centerY:h,centerX:m}));this.chart=e,this.yAxis=l,this.series=o,this.label=v}chart;series;yAxis;label;sortCategoryAxis(){this.series.dataItems.sort((t,r)=>(r.get("valueX")??0)-(t.get("valueX")??0)),x(this.yAxis.dataItems,t=>{const r=this.series.dataItems.find(n=>n.get("categoryY")===t.get("category"));if(!r)return;const s=this.series.dataItems.indexOf(r);if(t.get("index")===s)return;const e=(s-t.get("index",0))/this.series.dataItems.length;t.set("index",s),t.set("deltaPosition",-e),t.animate({key:"deltaPosition",to:0,duration:this.stepDuration/2,easing:P(L)})}),this.yAxis.dataItems.sort((t,r)=>(t.get("index")??0)-(r.get("index")??0))}setInitialData(t){Object.entries(t).forEach(([r,s])=>{this.series.data.push({network:r,value:s}),this.yAxis.data.push({network:r})})}updateDate(t){this.label.set("text",t)}update(t){x(this.series.dataItems,r=>{const s=r.get("categoryY")??"",e=t[s];!e||(r.animate({key:"valueX",to:e,duration:this.stepDuration,easing:d}),r.animate({key:"valueXWorking",to:e,duration:this.stepDuration,easing:d}))}),this.yAxis.zoom(0,B/this.yAxis.dataItems.length)}appear(){this.series.appear(1e3),this.chart.appear(1e3,100)}}const g=1e3,j=await fetch("./data.json"),E=await j.json();function*M(a){for(const[t,r]of Object.entries(a))yield[t,r]}const i=new F("chartdiv",g),f=M(E),S=setInterval(function(){const a=f.next();if(a.done){clearInterval(S),clearInterval(z);return}const[t,r]=a.value;i.updateDate(t),i.update(r)},g),z=setInterval(function(){i.sortCategoryAxis()},100),y=f.next();if(y.done)throw new Error("The data has no record.");const[,_]=y.value;i.setInitialData(_);setTimeout(function(){const a=f.next();if(a.done)throw new Error("The data has only one record.");const[t,r]=a.value;i.updateDate(t),i.update(r)},50);i.appear();