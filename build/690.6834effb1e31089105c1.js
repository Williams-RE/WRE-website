"use strict";(self.webpackChunkwre_frontend=self.webpackChunkwre_frontend||[]).push([[690],{657:(e,t,a)=>{a.d(t,{A:()=>o});var s=a(6540),r=a(4848);const o=e=>{let{isOpen:t,onRequestClose:a,className:o,overlayClassName:i,children:n}=e;return(0,s.useEffect)((()=>(document.body.style.overflow=t?"hidden":"unset",()=>{document.body.style.overflow="unset"})),[t]),t?(0,r.jsx)("div",{className:i,onClick:a,children:(0,r.jsx)("div",{className:o,onClick:e=>e.stopPropagation(),children:n})}):null}},9690:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d});var s=a(6540),r=a(9032),o=a(657),i=a(888),n=a(6930),l=a(5254),c=a(4848);const d=e=>{let{showDelay:t}=e;const[a,d]=(0,s.useState)(!t),[u,p]=(0,s.useState)(!1),[m,f]=(0,s.useState)(""),[g,h]=(0,s.useState)(""),[y,b]=(0,s.useState)(""),[x,v]=(0,s.useState)({}),{agents:w,loading:j,error:N}=(0,l._)();(0,s.useEffect)((()=>{if(t){const e=setTimeout((()=>{d(!0)}),2e3);return()=>clearTimeout(e)}}),[t]);return a?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i.l$,{position:"top-right",toastOptions:{duration:5e3,style:{background:"#363636",color:"#fff"}}}),(0,c.jsx)("button",{className:"modal-button "+(a?"fade-in":""),onClick:()=>p(!0),children:(0,c.jsx)("svg",{className:"contact-icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",children:(0,c.jsx)("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})})}),(0,c.jsx)(o.A,{isOpen:u,onRequestClose:()=>p(!1),className:"modal",overlayClassName:"modal-overlay",children:(0,c.jsxs)("div",{className:"modal-content",children:[(0,c.jsx)("h2",{style:{fontWeight:"300"},children:"Any Questions?"}),(0,c.jsx)("p",{style:{fontWeight:"350"},children:"Fill out your information below and we'll connect you with an agent"}),(0,c.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t={};if(m.length||(t.name="Name is required."),(0,n.DT)(g)||(t.email="Please enter a valid email address."),(e=>e.trim().length>0)(y)||(t.agent="Please select an agent."),Object.keys(t).length>0)return v(t),void i.Ay.error("Please correct the errors in the form.");try{await(0,n.ZM)(m,g,y),p(!1),f(""),h(""),b(""),v({}),i.Ay.success("Introduction email sent to agent!")}catch(e){v({submit:"Failed to send message. Please try again."}),i.Ay.error("Error sending information to agent. Please try again.")}},children:[(0,c.jsx)("div",{className:"input-group",children:(0,c.jsx)("label",{htmlFor:"name",children:"Name "})}),(0,c.jsxs)("div",{className:"input-group",children:[(0,c.jsx)("input",{id:"name",type:"text",value:m,onChange:e=>f(e.target.value),required:!0,"data-testid":"contact-form-name",placeholder:"Enter your name",className:"input-field"}),x.name&&(0,c.jsx)("p",{className:"error-message",children:x.name})]}),(0,c.jsx)("div",{className:"input-group",children:(0,c.jsx)("label",{htmlFor:"email",children:"Email"})}),(0,c.jsxs)("div",{className:"input-group",children:[(0,c.jsx)("input",{id:"email",type:"email",value:g,onChange:e=>h(e.target.value),required:!0,"data-testid":"contact-form-email",placeholder:"Enter your email",className:"input-field"}),x.email&&(0,c.jsx)("p",{className:"error-message",children:x.email})]}),(0,c.jsx)("div",{className:"input-group",children:(0,c.jsx)("label",{htmlFor:"agent",children:"Agent"})}),(0,c.jsxs)("div",{className:"input-group",children:[(0,c.jsxs)("select",{id:"agent",value:y,onChange:e=>b(e.target.value),required:!0,"data-testid":"contact-form-agent",className:"select-dropdown input-field",children:[(0,c.jsx)("option",{value:"",children:"Select an agent"}),j?(0,c.jsx)("option",{disabled:!0,children:"Loading agents..."}):Object.values(w).map((e=>(0,c.jsx)("option",{value:e.Name,children:e.Name},e.MATRIX_UNIQUE_ID)))]}),x.agent&&(0,c.jsx)("p",{className:"error-message",children:x.agent})]}),x.submit&&(0,c.jsx)("p",{className:"error-message",children:x.submit}),N&&(0,c.jsx)("p",{className:"error-message",children:N}),(0,c.jsx)("button",{type:"submit",className:"submit-button","data-testid":"contact-form-submit",children:"Submit"})]}),(0,c.jsx)("button",{className:"close-modal-button",onClick:()=>p(!1),children:(0,c.jsx)("img",{src:r,alt:"Close"})})]})})]}):null}},9032:(e,t,a)=>{e.exports=a.p+"assets/images/close-modal.4939de23183770ff2084.avif"},888:(e,t,a)=>{a.d(t,{l$:()=>te,Ay:()=>ae});var s=a(6540);let r={data:""},o=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||r,i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let a="",s="",r="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?a=o+" "+i+";":s+="f"==o[1]?c(i,o):o+"{"+c(i,"k"==o[1]?"":t)+"}":"object"==typeof i?s+=c(i,t?t.replace(/([^,])+/g,(e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=c.p?c.p(o,i):o+":"+i+";")}return a+(t&&r?t+"{"+r+"}":r)+s},d={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e},p=(e,t,a,s,r)=>{let o=u(e),p=d[o]||(d[o]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(o));if(!d[p]){let t=o!==e?e:(e=>{let t,a,s=[{}];for(;t=i.exec(e.replace(n,""));)t[4]?s.shift():t[3]?(a=t[3].replace(l," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);d[p]=c(r?{["@keyframes "+p]:t}:t,a?"":"."+p)}let m=a&&d.g?d.g:null;return a&&(d.g=d[p]),((e,t,a,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(d[p],t,s,m),p};function m(e){let t=this||{},a=e.call?e(t.p):e;return p(a.unshift?a.raw?((e,t,a)=>e.reduce(((e,s,r)=>{let o=t[r];if(o&&o.call){let e=o(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+s+(null==o?"":o)}),""))(a,[].slice.call(arguments,1),t.p):a.reduce(((e,a)=>Object.assign(e,a&&a.call?a(t.p):a)),{}):a,o(t.target),t.g,t.o,t.k)}m.bind({g:1});let f,g,h,y=m.bind({k:1});function b(e,t){let a=this||{};return function(){let s=arguments;function r(o,i){let n=Object.assign({},o),l=n.className||r.className;a.p=Object.assign({theme:g&&g()},n),a.o=/ *go\d+/.test(l),n.className=m.apply(a,s)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),h&&c[0]&&h(n),f(c,n)}return t?t(r):r}}var x=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,v=(()=>{let e=0;return()=>(++e).toString()})(),w=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),j=new Map,N=e=>{if(j.has(e))return;let t=setTimeout((()=>{j.delete(e),$({type:4,toastId:e})}),1e3);j.set(e,t)},E=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&(e=>{let t=j.get(e);t&&clearTimeout(t)})(t.toast.id),{...e,toasts:e.toasts.map((e=>e.id===t.toast.id?{...e,...t.toast}:e))};case 2:let{toast:a}=t;return e.toasts.find((e=>e.id===a.id))?E(e,{type:1,toast:a}):E(e,{type:0,toast:a});case 3:let{toastId:s}=t;return s?N(s):e.toasts.forEach((e=>{N(e.id)})),{...e,toasts:e.toasts.map((e=>e.id===s||void 0===s?{...e,visible:!1}:e))};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter((e=>e.id!==t.toastId))};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map((e=>({...e,pauseDuration:e.pauseDuration+r})))}}},k=[],C={toasts:[],pausedAt:void 0},$=e=>{C=E(C,e),k.forEach((e=>{e(C)}))},A={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,a)=>{let s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||v()}))(t,e,a);return $({type:2,toast:s}),s.id},P=(e,t)=>O("blank")(e,t);P.error=O("error"),P.success=O("success"),P.loading=O("loading"),P.custom=O("custom"),P.dismiss=e=>{$({type:3,toastId:e})},P.remove=e=>$({type:4,toastId:e}),P.promise=(e,t,a)=>{let s=P.loading(t.loading,{...a,...null==a?void 0:a.loading});return e.then((e=>(P.success(x(t.success,e),{id:s,...a,...null==a?void 0:a.success}),e))).catch((e=>{P.error(x(t.error,e),{id:s,...a,...null==a?void 0:a.error})})),e};var S=(e,t)=>{$({type:1,toast:{id:e,height:t}})},D=()=>{$({type:5,time:Date.now()})},z=e=>{let{toasts:t,pausedAt:a}=((e={})=>{let[t,a]=(0,s.useState)(C);(0,s.useEffect)((()=>(k.push(a),()=>{let e=k.indexOf(a);e>-1&&k.splice(e,1)})),[t]);let r=t.toasts.map((t=>{var a,s;return{...e,...e[t.type],...t,duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||A[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}}));return{...t,toasts:r}})(e);(0,s.useEffect)((()=>{if(a)return;let e=Date.now(),s=t.map((t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(a<0))return setTimeout((()=>P.dismiss(t.id)),a);t.visible&&P.dismiss(t.id)}));return()=>{s.forEach((e=>e&&clearTimeout(e)))}}),[t,a]);let r=(0,s.useCallback)((()=>{a&&$({type:6,time:Date.now()})}),[a]),o=(0,s.useCallback)(((e,a)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:o}=a||{},i=t.filter((t=>(t.position||o)===(e.position||o)&&t.height)),n=i.findIndex((t=>t.id===e.id)),l=i.filter(((e,t)=>t<n&&e.visible)).length;return i.filter((e=>e.visible)).slice(...s?[l+1]:[0,l]).reduce(((e,t)=>e+(t.height||0)+r),0)}),[t]);return{toasts:t,handlers:{updateHeight:S,startPause:D,endPause:r,calculateOffset:o}}},I=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,T=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,M=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,_=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,q=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${_} 1s linear infinite;
`,H=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,L=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,R=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${L} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,U=b("div")`
  position: absolute;
`,B=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Q=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(V,null,t):t:"blank"===a?null:s.createElement(B,null,s.createElement(q,{...r}),"loading"!==a&&s.createElement(U,null,"error"===a?s.createElement(M,{...r}):s.createElement(R,{...r})))},Z=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,X=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,Y=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,G=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,J=s.memo((({toast:e,position:t,style:a,children:r})=>{let o=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[s,r]=w()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Z(a),X(a)];return{animation:t?`${y(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=s.createElement(W,{toast:e}),n=s.createElement(G,{...e.ariaProps},x(e.message,e));return s.createElement(Y,{className:e.className,style:{...o,...a,...e.style}},"function"==typeof r?r({icon:i,message:n}):s.createElement(s.Fragment,null,i,n))}));!function(e,t,a,s){c.p=t,f=e,g=a,h=s}(s.createElement);var K=({id:e,className:t,style:a,onHeightUpdate:r,children:o})=>{let i=s.useCallback((t=>{if(t){let a=()=>{let a=t.getBoundingClientRect().height;r(e,a)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}}),[e,r]);return s.createElement("div",{ref:i,className:t,style:a},o)},ee=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,te=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:o,containerStyle:i,containerClassName:n})=>{let{toasts:l,handlers:c}=z(a);return s.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map((a=>{let i=a.position||t,n=((e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:w()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...r}})(i,c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return s.createElement(K,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?ee:"",style:n},"custom"===a.type?x(a.message,a):o?o(a):s.createElement(J,{toast:a,position:i}))})))},ae=P}}]);