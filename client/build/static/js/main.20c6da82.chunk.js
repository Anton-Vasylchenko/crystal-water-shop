(this["webpackJsonpfrontend-water"]=this["webpackJsonpfrontend-water"]||[]).push([[0],{49:function(e,t,c){},69:function(e,t,c){},70:function(e,t,c){},71:function(e,t,c){},72:function(e,t,c){},73:function(e,t,c){},74:function(e,t,c){},75:function(e,t,c){},76:function(e,t,c){},77:function(e,t,c){},78:function(e,t,c){},79:function(e,t,c){},80:function(e,t,c){},81:function(e,t,c){},82:function(e,t,c){},83:function(e,t,c){},84:function(e,t,c){},85:function(e,t,c){},86:function(e,t,c){},87:function(e,t,c){},88:function(e,t,c){},89:function(e,t,c){},90:function(e,t,c){},91:function(e,t,c){},92:function(e,t,c){},94:function(e,t,c){},95:function(e,t,c){"use strict";c.r(t);var s=c(1),a=c.n(s),i=c(14),n=c.n(i),l=c(5),r=c(2),o=c(11),j=c(33);const d={items:[],itemDetails:[],isLoaded:!1};var b=(e=d,t)=>{switch(t.type){case"SET_GOODS":return{...e,items:t.payload,isLoaded:!0};case"SET_POPULAR_GOODS":return{...e,popularItems:t.payload,isLoaded:!0};case"SET_ITEM_DETAILS":return{...e,itemDetails:t.payload,isLoaded:!0};case"SET_LOADED":return{...e,isLoaded:t.payload};default:return e}};const m={activeCategory:null,sortBy:"rating",sortOrder:"asc"};var O=(e=m,t)=>"SET_SORT_BY"===t.type?{...e,sortBy:t.payload}:"SET_SORT_ORDER"===t.type?{...e,sortOrder:t.payload}:"SET_CATEGORIES"===t.type?{...e,categories:t.payload}:"SET_ACTIVE_CATEGORY"===t.type?{...e,activeCategory:t.payload}:e;const x={items:[],isLoaded:!1};var h=(e=x,t)=>"SET_ADVANTAGES"===t.type?{...e,items:t.payload,isLoaded:!0}:e;const u={items:{},totalCount:0,totalPrice:0},p=(e,t)=>Object.keys(e).filter((e=>e!=="".concat(t))).reduce(((t,c)=>(t[c]=e[c],t)),{});var v=(e=u,t)=>{const c=t.payload;switch(t.type){case"ADD_ITEM_TO_CART":const t=c.id,s=e.items[t];return{...e,items:{...e.items,[t]:s?[...e.items[t],c]:[c]},itemTotalCount:{...e.itemTotalCount,[t]:s?e.itemTotalCount[t]+1:1},itemTotalPrice:{...e.itemTotalPrice,[t]:s?e.itemTotalPrice[t]+c.price:c.price},totalCount:e.totalCount+1,totalPrice:e.totalPrice+c.price};case"MINUS_CART_ITEM":const[a,...i]=e.items[c];return{...e,items:{...e.items,[c]:i},itemTotalPrice:{...e.itemTotalPrice,[c]:e.itemTotalPrice[c]-a.price},itemTotalCount:{...e.itemTotalCount,[c]:e.itemTotalCount[c]-1},totalCount:e.totalCount-1,totalPrice:e.totalPrice-a.price};case"REMOVE_CART_ITEM":return{...e,items:p(e.items,c),itemTotalPrice:p(e.itemTotalPrice,c),itemTotalCount:p(e.itemTotalCount,c),totalCount:e.totalCount-e.itemTotalCount[c],totalPrice:e.totalPrice-e.itemTotalPrice[c]};case"CLEAR_CART":return{items:{},totalCount:0,totalPrice:0};default:return e}};var _=Object(o.c)({goods:b,filters:O,advantages:h,cart:v});const g=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||o.d;var f=Object(o.e)(_,g(Object(o.a)(j.a))),N=c(4);var C=Object(N.g)((({children:e,location:{pathname:t}})=>(Object(s.useEffect)((()=>{window.scrollTo({top:0,left:0})}),[t]),e||null))),y=c.p+"static/media/cart.d7ea8a0a.png",w=(c(49),c(0));var T=()=>{const{totalPrice:e,totalCount:t}=Object(r.c)((({cart:e})=>e));return Object(w.jsx)("div",{className:"header align-items-center",children:Object(w.jsx)("div",{className:"container",children:Object(w.jsxs)("div",{className:"row",children:[Object(w.jsxs)("div",{className:"col-5 col-md-7 col-lg-1",children:[Object(w.jsx)(de,{}),Object(w.jsx)(je,{})]}),Object(w.jsx)("div",{className:"col-md-7 col-lg-6 align-items-center main-menu",children:Object(w.jsx)(re,{})}),Object(w.jsx)("div",{className:"col-7 col-md-5 col-lg-5 d-flex justify-content-end align-items-center",children:Object(w.jsx)(l.b,{to:"/cart",children:Object(w.jsxs)("div",{className:"button--cart d-flex mr-a",children:[Object(w.jsxs)("span",{children:[e," \u20b4"]}),Object(w.jsx)("div",{className:"button--cart__delimiter"}),Object(w.jsx)("img",{className:"button--cart__img",src:y,alt:"cart-img"}),Object(w.jsx)("span",{children:t})]})})})]})})})},k=c(15),E=c.n(k);var S=new class{constructor(){this._baseUrl="https://water-shop-api.herokuapp.com/",this.getResource=async e=>{const t=await fetch("".concat(this._baseUrl).concat(e));if(!t.ok)throw new Error("Could not fetch ".concat(e,", received ").concat(t.status));return t.json()},this.getGoods=async(e,t,c)=>{const{data:s}=await E.a.get("".concat(this._baseUrl,"shopItems"),{params:{category:t,_sort:e,_order:c}});return s},this.getPopularGoods=async e=>{const{data:t}=await E.a.get("".concat(this._baseUrl,"shopItems"),{params:{category:e,_sort:"rating",_order:"desc",_start:0,_end:4}});return t},this.getShopItemById=async e=>{const{data:t}=await E.a.get("".concat(this._baseUrl,"shopItems"),{params:{id:e}});return t},this.getShopCategories=async()=>await this.getResource("shopCategories"),this.getAdvantages=async()=>await this.getResource("advantages")}};const A=e=>({type:"SET_CATEGORIES",payload:e}),I=e=>({type:"SET_LOADED",payload:e}),P=e=>({type:"SET_GOODS",payload:e}),L=e=>({type:"SET_POPULAR_GOODS",payload:e}),R=e=>({type:"SET_ITEM_DETAILS",payload:e}),D=e=>({type:"SET_ADVANTAGES",payload:e}),M=e=>({type:"ADD_ITEM_TO_CART",payload:e});c(69);var B=({title:e,catId:t})=>{const c=Object(r.b)(),s=Object(r.c)((({cart:e})=>e.items)),{isLoaded:i,popularItems:n}=Object(r.c)((({goods:e})=>e));a.a.useEffect((()=>{c((e=>t=>{t(I(!1)),S.getPopularGoods(e).then((e=>{t(L(e))}))})(t))}),[c,t]);const l=e=>{c(M(e))},o=n&&n.map((({id:e,...t})=>{const c=s[e]&&s[e].length;return Object(w.jsx)(G,{onClickBuyBtn:l,countOfAdded:c,id:e,...t},e)}));return Object(w.jsx)(q,{title:e,isLoaded:i,children:Object(w.jsx)("div",{className:"popular-items-list",children:i?o:Object(w.jsx)(V,{})})})};c(70);var U=function(){return Object(w.jsx)("footer",{children:Object(w.jsxs)("div",{className:"container",children:[Object(w.jsxs)("div",{className:"row",children:[Object(w.jsx)("div",{className:"col-12 d-flex col-md-1 align-items-center text-center footer-block",children:Object(w.jsx)(je,{})}),Object(w.jsxs)("div",{className:"col-12 col-md-4 d-flex align-items-center footer-block",children:[Object(w.jsx)("div",{className:"footer__icon",children:Object(w.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",children:Object(w.jsx)("path",{d:"M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"})})}),Object(w.jsx)("div",{className:"footer__text",children:"\u043c.\u041b\u044c\u0432\u0456\u0432, \u0432\u0443\u043b. \u041c\u0430\u0433\u0430\u0437\u0438\u043d\u043e\u0432\u0430, 8 (\u0431\u0456\u0447\u043d\u0430 \u0432\u0443\u043b.\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0430 \u041c\u0443\u0434\u0440\u043e\u0433\u043e)"})]}),Object(w.jsxs)("div",{className:"col-12 col-md-3 d-flex align-items-center footer-block",children:[Object(w.jsx)("div",{className:"footer__icon",children:Object(w.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",children:Object(w.jsx)("path",{d:"M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"})})}),Object(w.jsxs)("div",{className:"footer__text",children:["(068) 655 32 05",Object(w.jsx)("br",{}),"(095) 015 12 22",Object(w.jsx)("br",{}),"(063) 015 12 22",Object(w.jsx)("br",{})]})]}),Object(w.jsxs)("div",{className:"col-12 col-md-4 d-flex align-items-center footer-block",children:[Object(w.jsx)("div",{className:"footer__icon",children:Object(w.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",children:Object(w.jsx)("path",{d:"M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z"})})}),Object(w.jsxs)("div",{className:"footer__text",children:[Object(w.jsx)("b",{children:"\u041f\u043d-\u041f\u0442:"})," 08:00 - 19:00",Object(w.jsx)("br",{}),Object(w.jsx)("b",{children:"C\u0431:"})," 10:00 - 17:00",Object(w.jsx)("br",{}),Object(w.jsx)("b",{children:"\u041d\u0434:"})," \u0412\u0438\u0445\u0456\u0434\u043d\u0438\u0439",Object(w.jsx)("br",{})]})]})]}),Object(w.jsx)("hr",{}),Object(w.jsxs)("div",{className:"text-center footer-text-author",children:["developed by ",Object(w.jsx)("a",{href:"https://www.facebook.com/anton.adart",target:"_blank",rel:"noreferrer",children:"Anton Vasylchenko"})]})]})})};c(71);var z=function(){const e=Object(r.b)(),{advantagesList:t,isLoaded:c}=Object(r.c)((({advantages:e})=>({advantagesList:e.items,isLoaded:e.isLoaded})));a.a.useEffect((()=>{e((e=>{S.getAdvantages().then((t=>{e(D(t))}))}))}),[e]);const s=t&&t.map((e=>Object(w.jsxs)("div",{className:"advantage",children:[Object(w.jsx)("div",{className:"advantage__img",children:Object(w.jsx)("img",{src:e.imgUrl,alt:"icon"})}),Object(w.jsx)("div",{className:"advantage__text",children:e.text})]},e.id)));return Object(w.jsx)(q,{title:"\u0427\u043e\u043c\u0443 \u043e\u0431\u0438\u0440\u0430\u044e\u0442\u044c \u043d\u0430\u0448\u0443 \u0432\u043e\u0434\u0443?",isLoaded:c,children:Object(w.jsx)("div",{className:"advantages-wrapper",children:s})})};c(72);var G=function({id:e,name:t,imageUrl:c,price:s,onClickBuyBtn:a,countOfAdded:i}){return Object(w.jsxs)("div",{className:"shop-item",children:[Object(w.jsx)("div",{className:"shop-item__img",children:Object(w.jsx)("img",{src:c,alt:"poster"})}),Object(w.jsx)("div",{className:"shop-item__title",children:Object(w.jsx)(l.b,{to:"/shop/".concat(e),children:t})}),Object(w.jsx)("div",{className:"shop-item__bottom",children:Object(w.jsxs)("div",{className:"row",children:[Object(w.jsxs)("div",{className:"col-12 col-lg-4 shop-item__price",children:[s," \u20b4"]}),Object(w.jsx)("div",{className:"col-12 col-lg-8 text-right",children:Object(w.jsxs)("button",{onClick:()=>{a({id:e,name:t,imageUrl:c,price:s})},className:"btn-add-to-cart",children:["+\u0414\u043e\u0434\u0430\u0442\u0438 ",i&&Object(w.jsx)("span",{children:i})]})})]})})]})};c(73);var Y=function(){let e=Object(N.f)();return Object(w.jsx)("div",{children:Object(w.jsx)("div",{className:"back-arrow",onClick:()=>e.goBack(),children:Object(w.jsx)("svg",{viewBox:"0 0 24 24",children:Object(w.jsx)("g",{children:Object(w.jsx)("path",{className:"arrow-icon",d:"M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"})})})})})};c(74);var V=()=>Object(w.jsx)("div",{className:"loadingio-spinner-double-ring mt-2 mb-2",children:Object(w.jsxs)("div",{className:"ldio",children:[Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{children:Object(w.jsx)("div",{})}),Object(w.jsx)("div",{children:Object(w.jsx)("div",{})})]})});c(75);const F=({isLoaded:e,handleAddItemToCart:t,countOfAdded:c,itemDetails:s})=>Object(w.jsxs)(a.a.Fragment,{children:[Object(w.jsx)(q,{title:s.name,backArrow:!0,children:e?Object(w.jsxs)("div",{className:"item-details",children:[Object(w.jsxs)("div",{className:"row",children:[Object(w.jsx)("div",{className:"col-md-6",children:Object(w.jsx)("div",{className:"item-details__image",children:Object(w.jsx)("img",{src:s.imageUrl,alt:"item pictures"})})}),Object(w.jsxs)("div",{className:"col-md-6",children:[Object(w.jsxs)("div",{className:"item-details__block item-details__info",children:[Object(w.jsx)("p",{children:"\u041e\u043f\u0438\u0441:"}),Object(w.jsx)("span",{children:s.info})]}),Object(w.jsxs)("div",{className:"item-details__block item-details__delivery",children:[Object(w.jsx)("p",{children:"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430:"}),Object(w.jsx)("span",{children:s.delivery})]})]})]}),Object(w.jsxs)("div",{className:"item-details__bottom",children:[Object(w.jsxs)("div",{className:"item-details__price",children:["\u0426\u0456\u043d\u0430: ",s.price," \u20b4"]}),Object(w.jsxs)("button",{onClick:t,className:"btn-add-to-cart",children:["+\u0414\u043e\u0434\u0430\u0442\u0438 ",c&&Object(w.jsx)("span",{children:c})]})]})]}):Object(w.jsx)(V,{})}),Object(w.jsx)(B,{title:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u0435 \u0443 \u0434\u0430\u043d\u0456\u0439 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0456\u0457",catId:s.category})]});var J=function({itemId:e}){const t=Object(r.b)(),{itemDetails:c,isLoaded:a}=Object(r.c)((({goods:e})=>e)),i=Object(r.c)((({cart:e})=>e.items)),n=i[e]&&i[e].length;return Object(s.useEffect)((()=>{var c;t((c=e,e=>{e(I(!1)),S.getShopItemById(c).then((t=>{e(R(t[0]))}))}))}),[t,e]),Object(w.jsx)(F,{isLoaded:a,handleAddItemToCart:()=>{t(M(c))},countOfAdded:n,itemDetails:c})};c(76);var X=e=>{const{item:t,count:c,totalPrice:s,onDeleteItem:i,onPlus:n,onMinus:r}=e,{id:o,imageUrl:j,name:d}=t,[b,m]=a.a.useState(!1),O=()=>{m(!b)};return Object(w.jsxs)("li",{className:"cart-item ",children:[Object(w.jsxs)("div",{className:"row",children:[Object(w.jsxs)("div",{className:"col-md-6 d-flex align-items-center",children:[Object(w.jsx)("div",{className:"cart-item__img",children:Object(w.jsx)("img",{src:j,alt:"item"})}),Object(w.jsx)("div",{className:"cart-item__info",children:Object(w.jsx)(l.b,{to:"/shop/".concat(o),children:Object(w.jsx)("h3",{children:d})})})]}),Object(w.jsxs)("div",{className:"col-md-6 d-flex bottom-item-mobile align-items-center",children:[Object(w.jsxs)("div",{className:"cart-item__count",children:[Object(w.jsx)("div",{onClick:()=>{r(o)},className:"cart-item__btn unselectable-text",children:"-"}),Object(w.jsx)("span",{children:c}),Object(w.jsx)("div",{onClick:()=>{n(t)},className:"cart-item__btn unselectable-text",children:"+"})]}),Object(w.jsxs)("div",{className:"cart-item__price",children:[s," \u20b4"]}),Object(w.jsx)("div",{className:"cart-item__del",children:Object(w.jsx)("div",{className:"cart-item__btn btn_del unselectable-text",onClick:O,children:"x"})})]})]}),Object(w.jsxs)(te,{show:b,children:[Object(w.jsxs)("span",{children:["\u0412\u0438 \u0434\u0456\u0439\u0441\u043d\u043e \u0431\u0430\u0436\u0430\u0454\u0442\u0435 \u0432\u0438\u0434\u0430\u043b\u0438\u0442\u0438 ",Object(w.jsxs)("b",{children:['"',d,'"?']})]}),Object(w.jsx)("button",{className:"btn btn-info",onClick:()=>{i(o),m(!b)},children:"\u0422\u0430\u043a"}),Object(w.jsx)("button",{className:"btn btn-info",onClick:O,children:"\u041d\u0456"})]})]})},H=c(16),W=c.n(H),Z=c(34);c(77);var q=function({title:e,children:t,backArrow:c,isLoaded:s=!0}){const a=e?Object(w.jsx)("h4",{children:e}):null,i=c?Object(w.jsx)(Y,{}):"",n=s?t:Object(w.jsx)(V,{});return Object(w.jsx)("div",{className:"container",children:Object(w.jsxs)("div",{className:"main-wrapper",children:[Object(w.jsxs)("div",{className:"container-title",children:[i,a]}),Object(w.jsx)("div",{className:"content",children:n})]})})};c(78);W.a.workerClass=Z.a,W.a.accessToken="pk.eyJ1IjoiZGlrdXNvciIsImEiOiJja25leWhsYWYxdzY2MnBtcjNkdDRhYWU4In0.pdghOzMOAjtXK2FrRLFRcA";var K=()=>{const e=Object(s.useRef)(),[t,c]=Object(s.useState)(24.0099813),[a,i]=Object(s.useState)(49.8439957),[n,l]=Object(s.useState)(16.5);return Object(s.useEffect)((()=>{const s=new W.a.Map({container:e.current,style:"mapbox://styles/dikusor/ckngbl5xc1bka17p3fql8z4wn",center:[t,a],zoom:n});return s.on("move",(()=>{c(s.getCenter().lng.toFixed(4)),i(s.getCenter().lat.toFixed(4)),l(s.getZoom().toFixed(2))})),()=>s.remove()}),[]),Object(w.jsx)(q,{children:Object(w.jsx)("div",{children:Object(w.jsx)("div",{className:"map-container",ref:e})})})},Q=K;c(79);var $=function(){const e=Object(r.b)(),t=Object(r.c)((({cart:e})=>e.items)),{items:c,isLoaded:s}=Object(r.c)((({goods:e})=>e)),{activeCategory:i,sortBy:n,sortOrder:l}=Object(r.c)((({filters:e})=>e));a.a.useEffect((()=>{e(((e,t,c)=>s=>{s(I(!1)),S.getGoods(e,t,c).then((e=>{s(P(e))}))})(n,i,l))}),[e,i,n,l]);const o=t=>{e(M(t))},j=s?c.map((e=>{const c=t[e.id]&&t[e.id].length;return Object(w.jsx)(G,{onClickBuyBtn:o,countOfAdded:c,...e},e.id)})):Object(w.jsx)(V,{}),d=0!==j.length?j:Object(w.jsx)("h3",{className:"text-center text-secondary jumbotron jumbotron-fluid",children:"\u0422\u043e\u0432\u0430\u0440\u0438 \u0432\u0456\u0434\u0441\u0443\u0442\u043d\u0456 :("});return Object(w.jsx)("div",{className:"shop-items-list",children:d})};var ee=function(){return Object(w.jsx)("div",{children:Object(w.jsx)(q,{children:Object(w.jsx)("h3",{className:"text-center",children:" \u0423\u0443\u0443\u0443\u043f\u0441! \u0421\u0442\u043e\u0440\u0456\u043d\u043a\u0443 \u043d\u0435 \u0437\u043d\u0430\u0439\u0434\u0435\u043d\u043e :( "})})})};c(80);var te=({show:e,children:t})=>Object(w.jsxs)("div",{className:e?"popup-window":"modal-hide ",children:[Object(w.jsx)("div",{className:"popup-window__modal",children:t}),Object(w.jsx)("div",{className:"popup-window__bg"})]});c(81);function ce(){const e=Object(r.b)(),{activeCategory:t,categories:c}=Object(r.c)((({filters:e})=>e));a.a.useEffect((()=>{e((e=>{S.getShopCategories().then((t=>{e(A(t))}))}))}),[e]);const s=a.a.useCallback((t=>{e((e=>({type:"SET_ACTIVE_CATEGORY",payload:e}))(t))}),[e]),i=c&&c.map(((e,c)=>Object(w.jsx)("li",{className:t===c?"shop-categories__active":"",onClick:()=>s(c),children:e.name},"".concat(e.id))));return Object(w.jsx)("div",{className:"shop-categories",children:Object(w.jsxs)("ul",{children:[Object(w.jsx)("li",{className:null===t?"shop-categories__active":"",onClick:()=>s(null),children:"\u0412\u0441\u0456"}),i]})})}ce.defaultProps={activeCategory:null,items:[],onClickCategory:()=>{}};var se=a.a.memo(ce);c(82);var ae=function(){const e=Object(r.b)(),{sortOrder:t}=Object(r.c)((({filters:e})=>e)),c=a.a.useCallback((t=>{e({type:"SET_SORT_ORDER",payload:t})}),[e]),s="desc"===t?"":"rotated";return Object(w.jsx)("div",{className:"sort-arrow unselectable-text",onClick:e=>{c("desc"===t?"asc":"desc")},children:Object(w.jsx)("svg",{className:"arrow-svg ".concat(s),width:"14",height:"10",viewBox:"0 0 10 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(w.jsx)("path",{d:"M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z",fill:"#2C2C2C"})})})};c(83);const ie=[{type:"rating",name:"\u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u0456\u0441\u0442\u044e"},{type:"price",name:"\u0446\u0456\u043d\u043e\u044e"},{type:"name",name:"\u0430\u043b\u0444\u0430\u0432\u0456\u0442\u043e\u043c"}];function ne(){const e=Object(r.b)(),{sortBy:t}=Object(r.c)((({filters:e})=>e)),[c,i]=Object(s.useState)(!1),n=Object(s.useRef)(),l=ie.find((e=>e.type===t)).name;Object(s.useEffect)((()=>(document.body.addEventListener("click",o),function(){i(!1)})),[]);const o=e=>{(e.path||e.composedPath&&e.composedPath()).includes(n.current)||i(!1)},j=a.a.useCallback((t=>{e({type:"SET_SORT_BY",payload:t})}),[e]),d=ie&&ie.map(((e,c)=>Object(w.jsx)("li",{className:t===e.type?"active":"",onClick:()=>{var t;t=e.type,j(t),i(!1)},children:e.name},"".concat(e.type,"_").concat(c))));return Object(w.jsxs)("div",{ref:n,className:"sort",children:[Object(w.jsxs)("div",{className:"sort__label",children:[Object(w.jsx)(ae,{}),Object(w.jsx)("b",{children:"\u0421\u043e\u0440\u0442\u0443\u0432\u0430\u0442\u0438 \u0437\u0430:"}),Object(w.jsx)("span",{onClick:()=>{i(!c)},children:l})]}),c&&Object(w.jsx)("div",{className:"sort__popup",children:Object(w.jsx)("ul",{children:d})})]})}var le=a.a.memo(ne);c(84);var re=({onClickLink:e})=>{const t=()=>{e&&e()};return Object(w.jsxs)("ul",{children:[Object(w.jsx)("li",{children:Object(w.jsx)(l.b,{to:"/",onClick:t,children:" \u0413\u043e\u043b\u043e\u0432\u043d\u0430 "})}),Object(w.jsx)("li",{children:Object(w.jsx)(l.b,{to:"/about-us",onClick:t,children:" \u041f\u0440\u043e \u043d\u0430\u0441 "})}),Object(w.jsx)("li",{children:Object(w.jsx)(l.b,{to:"/contacts",onClick:t,children:" \u041a\u043e\u043d\u0442\u0430\u043a\u0442\u0438 "})}),Object(w.jsx)("li",{children:Object(w.jsx)(l.b,{to:"/shop",onClick:t,children:" \u041c\u0430\u0433\u0430\u0437\u0438\u043d "})}),Object(w.jsx)("li",{children:Object(w.jsx)(l.b,{to:"/payment-delivery",onClick:t,children:" \u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u0456 \u043e\u043f\u043b\u0430\u0442\u0430 "})})]})},oe=c.p+"static/media/logo.6733eb09.png";c(85);var je=function({classNames:e}){const t=e?"".concat(e," logo-wrapper"):"logo-wrapper";return Object(w.jsx)("div",{className:t,children:Object(w.jsx)(l.b,{to:"/",children:Object(w.jsx)("div",{className:"main__logo",children:Object(w.jsx)("img",{src:oe,alt:"logo"})})})})};c(86);var de=function(){const[e,t]=a.a.useState(!1),c=()=>{t(!e)};return Object(w.jsxs)("div",{className:"mobile-menu-wrapper",children:[Object(w.jsxs)("div",{className:"mobile-btn-menu",onClick:c,children:[Object(w.jsx)("span",{}),Object(w.jsx)("span",{}),Object(w.jsx)("span",{})]}),Object(w.jsxs)("div",{className:e?"mobile-menu show-menu":"mobile-menu",children:[Object(w.jsx)(je,{}),Object(w.jsx)(re,{onClickLink:c})]}),Object(w.jsx)("div",{className:e?"bg-mobile-menu":"bg-mobile-menu d-none",onClick:c})]})};c(87);var be=function(){return Object(w.jsxs)(q,{title:"\u041c\u0430\u0433\u0430\u0437\u0438\u043d",children:[Object(w.jsxs)("div",{className:"row mb-2",children:[Object(w.jsx)("div",{className:"col-12 col-lg-9",children:Object(w.jsx)(se,{})}),Object(w.jsx)("div",{className:"col-12 col-lg-3",children:Object(w.jsx)(le,{})})]}),Object(w.jsx)($,{})]})},me=(c(88),c.p+"static/media/logo-main.228369e3.png");var Oe=function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)(q,{children:Object(w.jsxs)("div",{className:"home",children:[Object(w.jsx)("div",{className:"home__img",children:Object(w.jsx)("img",{src:me,className:"img-fluid",alt:"main logo"})}),Object(w.jsx)("div",{className:"home__text",children:"\u0411\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u0430 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u0432\u043e\u0434\u0438 \u0443 \u0432\u0430\u0448 \u0434\u0456\u043c \u0442\u0430 \u043e\u0444\u0456\u0441!"})]})}),Object(w.jsx)(z,{}),Object(w.jsx)(B,{title:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u0456 \u0442\u043e\u0432\u0430\u0440\u0438"}),Object(w.jsx)(K,{})]})},xe=c(35),he=(c(89),c.p+"static/media/about-us.206035b7.png");var ue=()=>{const e=Object(w.jsx)(xe.a,{className:"aboutus__preloader-img",src:he,lazy:!0}),t=Object(w.jsxs)("p",{className:"m-4",children:['\u041d\u0430\u0448\u0430 "\u041a\u0440\u0438\u0448\u0442\u0430\u043b\u0435\u0432\u0430" \u043d\u0430\u0439\u0441\u043c\u0430\u0447\u043d\u0456\u0448\u0430, \u043e\u0447\u0438\u0449\u0435\u043d\u0430 \u0432\u043e\u0434\u0430 \u0456\u0437 \u0437\u0431\u0430\u043b\u0430\u043d\u0441\u043e\u0432\u0430\u043d\u0438\u043c \u0441\u043a\u043b\u0430\u0434\u043e\u043c. ',Object(w.jsx)("br",{}),"\u0406\u0434\u0435\u0430\u043b\u044c\u043d\u0430 \u0434\u043b\u044f \u043f\u0440\u0438\u0433\u043e\u0442\u0443\u0432\u0430\u043d\u043d\u044f \u0457\u0436\u0456\u044e ",Object(w.jsx)("br",{}),"\u041f\u0456\u0434\u0445\u043e\u0434\u0438\u0442\u044c \u0434\u043b\u044f \u0432\u0438\u043a\u043e\u0440\u0438\u0441\u0442\u0430\u043d\u043d\u044f \u0432 \u043a\u0430\u0432\u043e\u0432\u0438\u0445 \u043c\u0430\u0448\u0438\u043d\u0430\u0445 \u0442\u0430 \u0456\u043d\u0448\u0438\u0445 \u043e\u0431\u043b\u0430\u0434\u043d\u0430\u043d\u043d\u044f\u0445.",Object(w.jsx)("br",{}),"\u041d\u0435 \u0437\u0430\u043b\u0438\u0448\u0430\u0454 \u043d\u0430\u043a\u0438\u043f\u0443.",Object(w.jsx)("br",{}),"\u041c\u0430\u0454 \u043d\u0435\u0432\u0438\u0441\u043e\u043a\u0438\u0439 \u0440\u0456\u0432\u0435\u043d\u044c \u043c\u0456\u043d\u0435\u0440\u0430\u043b\u0456\u0437\u0430\u0446\u0456\u0457.",Object(w.jsx)("br",{}),"\u041d\u0430\u0439\u0447\u0430\u0441\u0442\u0456\u0448\u0435 \u0457\u0457 \u0437\u0430\u043c\u043e\u0432\u043b\u044f\u044e\u0442\u044c \u0434\u043e\u0434\u043e\u043c\u0443, \u0432 \u043e\u0444\u0456\u0441\u0438, \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u0438 \u0442\u0430 \u043c\u0435\u0434\u0438\u0447\u043d\u0456 \u0437\u0430\u043a\u043b\u0430\u0434\u0438.",Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"\u0422\u0430\u043a\u043e\u0436 \u043f\u0440\u043e\u043f\u043e\u043d\u0443\u0454\u043c\u043e:",Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"- \u0431\u0443\u0442\u043b\u0456, \u043a\u043e\u0440\u043a\u0438;",Object(w.jsx)("br",{}),"- \u043f\u043e\u043c\u043f\u0438;",Object(w.jsx)("br",{}),"- \u043a\u0443\u043b\u0435\u0440\u0430;",Object(w.jsx)("br",{}),"- \u043f\u0430\u043f\u0435\u0440\u043e\u0432\u0456 \u0442\u0430 \u043f\u043b\u0430\u0441\u0442\u0438\u043a\u043e\u0432\u0456 \u0441\u0442\u0430\u043a\u0430\u043d\u0447\u0438\u043a\u0438;",Object(w.jsx)("br",{}),"- \u0433\u0456\u0433\u0456\u0454\u043d\u0456\u0447\u043d\u0456 \u0442\u0430 \u0432\u043e\u043b\u043e\u0433\u0456 \u0441\u0435\u0440\u0432\u0435\u0442\u043a\u0438;",Object(w.jsx)("br",{}),"- \u0442\u0435\u0430\u043b\u0435\u0442\u043d\u0438\u0439 \u043f\u0430\u043f\u0456\u0440;",Object(w.jsx)("br",{}),"- \u043c\u0430\u0441\u043a\u0438 \u043c\u0435\u0434\u0438\u0447\u043d\u0456;",Object(w.jsx)("br",{})]});return Object(w.jsx)(q,{title:"\u041f\u0440\u043e \u043d\u0430\u0441!",children:Object(w.jsxs)("div",{className:"row",children:[Object(w.jsx)("div",{className:"col-md-6 text-center",children:e}),Object(w.jsx)("div",{className:"col-md-6 about-us-text",children:t})]})})};c(90);var pe=function(){return Object(w.jsxs)("div",{className:"contacts",children:[Object(w.jsx)(q,{title:"\u041d\u0430\u0448\u0456 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0438",children:"\u0422\u0443\u0442 \u0442\u0440\u0435\u0431\u0430 \u0431\u0443\u0434\u0435 \u0437\u0430\u0432\u043f\u043e\u0432\u043d\u0438\u0442\u0438 \u0456\u043d\u0444\u043e\u044e :))"}),Object(w.jsx)(Q,{})]})};c(91);var ve=function(){return Object(w.jsxs)(q,{title:"\u041e\u043f\u043b\u0430\u0442\u0430 \u0456 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430",children:[Object(w.jsx)("b",{children:"\u0414\u041b\u042f \u0417\u0410\u041c\u041e\u0412\u041b\u0415\u041d\u041d\u042f  \u0414\u041e\u0421\u0422\u0410\u0412\u041a\u0418  \u0412\u041e\u0414\u0418  \u0422\u0410 \u0421\u0423\u041f\u0423\u0422\u041d\u0406\u0425 \u0422\u041e\u0412\u0410\u0420\u0406\u0412 \u0412\u0410\u041c \u041d\u0415\u041e\u0411\u0425\u0406\u0414\u041d\u041e:"}),Object(w.jsx)("br",{}),"\u0437\u0430\u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443\u0432\u0430\u0442\u0438 \u0430\u0431\u043e \u043d\u0430\u0434\u0456\u0441\u043b\u0430\u0442\u0438 \u0421\u041c\u0421 \u0437\u0430 \u043d\u043e\u043c\u0435\u0440\u0430\u043c\u0438 (068)-655-32-05, (095)-015-12-22, (063)-015-12-22 \u0430\u0431\u043e \u0437\u0434\u0456\u0439\u0441\u043d\u0438\u0442\u0438 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u043d\u0430 \u043d\u0430\u0448\u043e\u043c\u0443 \u0441\u0430\u0439\u0442\u0456; \u0432\u043a\u0430\u0437\u0430\u0442\u0438 \u0430\u0434\u0440\u0435\u0441\u0443 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f; \u0443\u0437\u0433\u043e\u0434\u0438\u0442\u0438 \u0447\u0430\u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438 (\u0437 \u0456\u043d\u0442\u0435\u0440\u0432\u0430\u043b\u043e\u043c \u043d\u0435 \u043c\u0435\u043d\u0448\u0435 2-\u043e\u0445 \u0433\u043e\u0434\u0438\u043d) \u043f\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443 \u0430\u0431\u043e \u0432\u043a\u0430\u0437\u0430\u0442\u0438 \u0439\u043e\u0433\u043e \u0432 \u0456\u043d\u0442\u0435\u0440\u043d\u0435\u0442-\u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u0456.",Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),Object(w.jsx)("b",{children:"\u0427\u0410\u0421 \u0422\u0410 \u0423\u041c\u041e\u0412\u0418 \u0414\u041e\u0421\u0422\u0410\u0412\u041a\u0418:"}),Object(w.jsx)("br",{}),"\u0417\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u043d\u0430 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0443 \u0432\u043e\u0434\u0438  \u0432\u0438\u043a\u043e\u043d\u0443\u044e\u0442\u044c\u0441\u044f \u0432 \u0442\u043e\u0439 \u0441\u0430\u043c\u0438 \u0434\u0435\u043d\u044c (\u043f\u0440\u0438 \u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u043d\u0456 \u0434\u043e 11 \u0433\u043e\u0434\u0438\u043d\u0438). \u0417\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u043d\u0430 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0443 \u0441\u0443\u043f\u0443\u0442\u043d\u0456\u0445 \u0442\u043e\u0432\u0430\u0440\u0456\u0432 \u043f\u0440\u0438\u0439\u043c\u0430\u044e\u0442\u044c\u0441\u044f \u0434\u043e 17 \u0433\u043e\u0434. \u0442\u0430 \u0432\u0438\u043a\u043e\u043d\u0443\u044e\u0442\u044c\u0441\u044f \u043d\u0430 \u043d\u0430\u0441\u0442\u0443\u043f\u043d\u0438\u0439 \u0434\u0435\u043d\u044c. \u041c\u0456\u043d\u0456\u043c\u0430\u043b\u044c\u043d\u0435 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0442\u043e\u0432\u0430\u0440\u0456\u0432 \u0431\u0435\u0437 \u0431\u0443\u0442\u0438\u043b\u044c\u043e\u0432\u0430\u043d\u043e\u0457 \u0432\u043e\u0434\u0438 \u2013 200 \u0433\u0440\u0438\u0432\u0435\u043d\u044c.",Object(w.jsx)("br",{}),"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u043f\u043e \u043c.\u041b\u044c\u0432\u0456\u0432 - \u0431\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u0430!",Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),Object(w.jsx)("b",{children:"\u041e\u041f\u041b\u0410\u0422\u0410:"}),Object(w.jsx)("br",{}),"\u041f\u0440\u0438 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u0456 \u0442\u043e\u0432\u0430\u0440\u0456\u0432  \u043c\u043e\u0436\u043d\u0430 \u043f\u0440\u043e\u0432\u0435\u0441\u0442\u0438 \u043e\u043f\u043b\u0430\u0442\u0443 \u043a\u043e\u0448\u0442\u0456\u0432 \u0443 \u0437\u0440\u0443\u0447\u043d\u0438\u0439 \u0434\u043b\u044f \u0412\u0430\u0441 \u0441\u043f\u043e\u0441\u0456\u0431: \u2013 \u0433\u043e\u0442\u0456\u0432\u043a\u043e\u044e \u043f\u0440\u0438 \u0434\u043e\u0441\u0442\u0430\u0432\u0446\u0456; \u2013 \u043f\u0435\u0440\u0435\u043a\u0430\u0437 \u043a\u043e\u0448\u0442\u0456\u0432 \u043d\u0430 \u0431\u0430\u043d\u043a\u0456\u0432\u0441\u044c\u043a\u0443 \u043a\u0430\u0440\u0442\u0443;"]})},_e=(c(92),c.p+"static/media/trash-icon.49eafd40.png"),ge=c.p+"static/media/cart-is-empty.6f0349a5.png";const fe=e=>{const{items:t,showPopup:c,onClickClearCart:s,onClickYes:i,totalCount:n,totalPrice:l}=e;return Object(w.jsxs)(a.a.Fragment,{children:[Object(w.jsxs)(te,{show:c,children:[Object(w.jsx)("span",{children:"\u0412\u0438 \u0434\u0456\u0439\u0441\u043d\u043e \u0431\u0430\u0436\u0430\u0454\u0442\u0435 \u043e\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u043a\u043e\u0448\u0438\u043a?"}),Object(w.jsx)("button",{className:"btn btn-info",onClick:i,children:"\u0422\u0430\u043a"}),Object(w.jsx)("button",{className:"btn btn-info",onClick:s,children:"\u041d\u0456"})]}),Object(w.jsx)("div",{className:"cart-top",children:Object(w.jsxs)("div",{onClick:s,className:"cart-top__clear-btn unselectable-text",children:[Object(w.jsx)("img",{src:_e,alt:"trash-icon"}),"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u043a\u043e\u0448\u0438\u043a"]})}),Object(w.jsx)("ul",{children:t}),Object(w.jsxs)("div",{className:"cart-bottom",children:[Object(w.jsxs)("div",{className:"cart-bottom__info",children:[Object(w.jsxs)("div",{className:"cart-bottom__items-counts",children:["\u0412\u0441\u044c\u043e\u0433\u043e \u0442\u043e\u0432\u0430\u0440\u0456\u0432: ",Object(w.jsxs)("span",{children:[n," \u0448\u0442."]})]}),Object(w.jsxs)("div",{className:"cart-bottom__total-price",children:["\u0421\u0443\u043c\u0430 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f: ",Object(w.jsxs)("span",{children:[l," \u20b4"]})]})]}),Object(w.jsx)("div",{className:"cart-bottom__buy-btn unselectable-text",children:"\u0417\u0430\u043c\u043e\u0432\u0438\u0442\u0438"})]})]})};var Ne=function(){const e=Object(r.b)(),{totalPrice:t,totalCount:c,items:s,itemTotalCount:i,itemTotalPrice:n}=Object(r.c)((({cart:e})=>e)),[l,o]=a.a.useState(!1),j=t=>{e((e=>({type:"REMOVE_CART_ITEM",payload:e}))(t))},d=t=>{e(M(t))},b=t=>{i[t]>1&&e((e=>({type:"MINUS_CART_ITEM",payload:e}))(t))},m=Object.keys(s).map((e=>s[e][0])).map((e=>{const t=e.id;return Object(w.jsx)(X,{item:e,count:i[t],totalPrice:n[t],onDeleteItem:j,onMinus:b,onPlus:d},t)}));return Object(w.jsx)(q,{title:"\u041a\u043e\u0448\u0438\u043a",backArrow:!0,children:c?Object(w.jsx)(fe,{items:m,onClickClearCart:()=>{o(!l)},onClickYes:()=>{e({type:"CLEAR_CART"}),o(!l)},totalCount:c,totalPrice:t,showPopup:l}):Object(w.jsxs)("h3",{className:"text-center text-secondary jumbotron jumbotron-fluid",children:[Object(w.jsx)("img",{className:"empty-cart-img",src:ge,alt:"cart is empty"}),Object(w.jsx)("p",{children:"\u0412\u0430\u0448 \u043a\u043e\u0448\u0438\u043a \u043f\u043e\u0440\u043e\u0436\u043d\u0456\u0439 :( "})]})})};c(93),c(94);var Ce=function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)(T,{}),Object(w.jsxs)(N.c,{children:[Object(w.jsx)(N.a,{exact:!0,path:"/",component:Oe}),Object(w.jsx)(N.a,{exact:!0,path:"/about-us",component:ue}),Object(w.jsx)(N.a,{exact:!0,path:"/contacts",component:pe}),Object(w.jsx)(N.a,{exact:!0,path:"/payment-delivery",component:ve}),Object(w.jsx)(N.a,{exact:!0,path:"/cart",component:Ne}),Object(w.jsx)(N.a,{path:"/shop",exact:!0,component:be}),Object(w.jsx)(N.a,{path:"/shop/:id",render:({match:e})=>Object(w.jsx)(J,{itemId:e.params.id,exact:!0})}),Object(w.jsx)(N.a,{path:"*",component:ee})]}),Object(w.jsx)(U,{})]})};n.a.render(Object(w.jsx)(l.a,{children:Object(w.jsx)(r.a,{store:f,children:Object(w.jsx)(C,{children:Object(w.jsx)(Ce,{})})})}),document.getElementById("root"))}},[[95,1,2]]]);
//# sourceMappingURL=main.20c6da82.chunk.js.map