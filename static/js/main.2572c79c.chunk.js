(this.webpackJsonpnews=this.webpackJsonpnews||[]).push([[0],{101:function(e,t,a){e.exports=a(137)},136:function(e,t,a){},137:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),o=a.n(c),i=a(32),l=a.n(i),s=a(45),u=a(6),m=a(52),d=a.n(m),g=Object(n.createContext)(),b=Object(n.createContext)(),f=a(84),p=a(85),h=a(57),j=a.n(h),v=(a(123),a(125),{apiKey:"".concat("AIzaSyBLlGiCXgza91XEF7xXofhcgs1TlmHFYLQ"),authDomain:"news-4ef12.firebaseapp.com",databaseURL:"https://news-4ef12.firebaseio.com",projectId:"news-4ef12",storageBucket:"news-4ef12.appspot.com",messagingSenderId:"890937201506",appId:"".concat("1:890937201506:web:4c53217d4dfa934020923b"),measurementId:"G-2QYDG5TDTW"}),O=new(function(){function e(){Object(f.a)(this,e),j.a.initializeApp(v),this.auth=j.a.auth(),this.db=j.a.firestore()}return Object(p.a)(e,[{key:"login",value:function(e,t){return this.auth.signInWithEmailAndPassword(e,t)}},{key:"logOut",value:function(){return this.auth.signOut()}},{key:"isLoggedIn",value:function(e){return this.auth.onAuthStateChanged((function(t){e(t||null)}))}},{key:"getSettings",value:function(){return this.db.collection("settings").doc("options").get()}},{key:"saveSettings",value:function(e){return this.db.collection("settings").doc("options").set(e)}}]),e}()),E=function(e){var t=e.children,a=Object(n.useState)({}),c=Object(u.a)(a,2),o=c[0],i=c[1],m=Object(n.useState)({}),f=Object(u.a)(m,2),p=f[0],h=f[1],j=Object(n.useState)({}),v=Object(u.a)(j,2),E=v[0],w=v[1],y=Object(n.useState)({}),C=Object(u.a)(y,2),x=C[0],S=C[1],k=Object(n.useState)(""),N=Object(u.a)(k,2),A=N[0],B=N[1];Object(n.useEffect)((function(){var e=function(){var e=Object(s.a)(l.a.mark((function e(){var t,a,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d()("https://newsapi.org/v2/sources?apiKey=".concat("3c44d2e5c78b40e390758064d60eee87"));case 2:t=e.sent,a=new Set(["business","entertainment","general","health","science","sports","technology"]),n=new Set([{code:"ae",name:"United Arab Emirates"},{code:"ar",name:"Argentina"},{code:"at",name:"Austria"},{code:"au",name:"Australia"},{code:"be",name:"Belgium"},{code:"bg",name:"Bulgaria"},{code:"br",name:"Brazil"},{code:"ca",name:"Canada"},{code:"ch",name:"Switzerland"},{code:"cn",name:"China"},{code:"co",name:"Colombia"},{code:"cu",name:"Cuba"},{code:"cz",name:"Czech Republic"},{code:"de",name:"Germany"},{code:"eg",name:"Egypt"},{code:"fr",name:"France"},{code:"gb",name:"United Kingdom"},{code:"gr",name:"Greece"},{code:"hk",name:"Hong Kong"},{code:"hu",name:"Hungary"},{code:"id",name:"Indonesia"},{code:"ie",name:"Ireland"},{code:"il",name:"Israel"},{code:"in",name:"India"},{code:"it",name:"Italy"},{code:"jp",name:"Japan"},{code:"kr",name:"Korea"},{code:"lt",name:"Lithuania"},{code:"lv",name:"Latvia"},{code:"ma",name:"Morocco"},{code:"mx",name:"Mexico"},{code:"my",name:"Malaysia"},{code:"ng",name:"Nigeria"},{code:"nl",name:"Netherlands"},{code:"no",name:"Norway"},{code:"nz",name:"New Zealand"},{code:"ph",name:"Philippines"},{code:"pl",name:"Poland"},{code:"pt",name:"Portugal"},{code:"ro",name:"Romania"},{code:"rs",name:"Serbia"},{code:"ru",name:"Russian Federation"},{code:"sa",name:"Saudi Arabia"},{code:"se",name:"Sweden"},{code:"sg",name:"Singapore"},{code:"si",name:"Slovenia"},{code:"sk",name:"Slovakia"},{code:"th",name:"Thailand"},{code:"tr",name:"Turkey"},{code:"tw",name:"Taiwan"},{code:"ua",name:"Ukraine"},{code:"us",name:"United States"},{code:"ve",name:"Venezuela"},{code:"za",name:"South Africa"}]),r=new Set(t.data.sources.map((function(e){return{name:e.name,id:e.id}}))),w(a),i(n),h(r);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),t=function(){var e=Object(s.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.getSettings();case 2:t=e.sent,S({ctry:t.data().country,cat:t.data().category}),B(t.data().publisher);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e(),t()}),[]);var I=g.Provider,P=b.Provider;return r.a.createElement(P,{value:{adminCC:x,adminPubl:A}},r.a.createElement(I,{value:{countries:o,publishers:p,categories:E}},t))},w=a(12),y=a(37),C=a(31),x=a(86),S=a(191),k=a(192),N=a(193),A=a(42),B=a(141),I=a(188),P=a(93),L=a(179),W=a(181),F=a(195),T=a(182),z=a(183),R=a(184),H=a(185),U=a(88),D=a.n(U),K=function(e){var t=Object(n.useState)(null),a=Object(u.a)(t,2),r=a[0],c=a[1];return Object(n.useEffect)((function(){var t=e.isLoggedIn(c);return function(){return t()}}),[e]),r},M=function(e){var t=Object(n.useRef)();return Object(n.useEffect)((function(){t.current=e})),t.current},G=a(138),J=a(145),X=a(144),Y=a(173),Q=a(142),V=Object(x.a)((function(e){return{formControl:{margin:e.spacing(1,0),width:"100%"}}})),q=function(e){var t=e.name,a=e.options,c=e.changeHandler,o=e.selected,i=e.hasReady,l=V(),s=Object(n.useRef)(null),m=Object(n.useState)(0),d=Object(u.a)(m,2),g=d[0],b=d[1],f=Object(n.useState)(!1),p=Object(u.a)(f,2),h=p[0],j=p[1];Object(n.useEffect)((function(){b(s.current.offsetWidth)}),[]);var v=0;Object(n.useEffect)((function(){i&&v>0?i(!0):console.log("optionKey")}),[i,v]);return r.a.createElement(G.a,{variant:"outlined",className:l.formControl,error:h},r.a.createElement(J.a,{ref:s,id:"demo-simple-select-outlined-label"},t),r.a.createElement(X.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:o,onChange:function(e){return function(e){c(e.target.value),""===e.target.value?j(!0):j(!1)}(e)},labelWidth:g},r.a.createElement(Y.a,{value:""},r.a.createElement("em",null,"None")),Array.from(a).map((function(e){return v+=1,e.name?r.a.createElement(Y.a,{key:"optionName-".concat(v),value:e.name},e.name):r.a.createElement(Y.a,{key:"option-".concat(v),value:e},e)}))),h&&r.a.createElement(Q.a,null,"Required."))};q.defaultProps={hasReady:null};var Z=q,_=Object(x.a)((function(e){return{mansory:{display:"flex",margin:"auto",flexFlow:"row nowrap",justifyContent:"center",alignItems:"flex-start"},mansoryCols:{margin:e.spacing(0,1),flex:"0 1 auto"}}})),$=function(e){for(var t=e.colNum,a=e.children,c=_(),o=Array.from({length:t},(function(){return[]})),i=0;i<a.length;i+=1)o[i%t].push(a[i]);Object(n.useEffect)((function(){console.log("Masonry")}),[]);var l=0;return r.a.createElement("div",{className:c.mansory},o.map((function(e){return l+=1,r.a.createElement("div",{key:"mansoryCol-".concat(l),className:c.mansoryCols},e)})))},ee=a(174),te=a(175),ae=a(176),ne=a(177),re=a(178),ce=a(61),oe=a.n(ce),ie=Object(x.a)((function(e){return{card:{margin:e.spacing(1,0,2),width:"100%",maxWidth:310},cardActionsArea:{transition:"background-color .2s linear"},cardActions:{display:"flex",flexFlow:"column",alignItems:"flex-end"},toLocalTime:{margin:e.spacing(0,.5,.5,0)}}})),le=function(e){var t=e.imgUrl,a=e.newsTitle,n=e.newsSummary,c=e.publishedAt,o=e.sourceName,i=e.author,l=e.articleUrl,s=e.newsContent,u=e.openDialog,m=e.openArticleUrl,d=ie(),g=function(e){return null!==e&&"null"!==e&&e?e:"https://source.unsplash.com/random/300x400"},b=function(e){var t=oe()("".concat(e)),a=oe.a.tz.guess(!0);return t.tz(a).format("LLL")};return r.a.createElement(ee.a,{className:d.card},r.a.createElement(te.a,{className:d.cardActionsArea,onClick:function(){return u(a,g(t),null!==(r=s)&&"null"!==r&&r?r:n,b(c),o,null!==(e=i)&&"null"!==e&&e?e:"(No Author Information)",l);var e,r}},r.a.createElement(ae.a,{component:"img",height:"140",image:g(t)}),r.a.createElement(ne.a,null,r.a.createElement(A.a,{gutterBottom:!0,variant:"h6",component:"h6"},a),r.a.createElement(A.a,{variant:"body2",color:"textSecondary",component:"p"},n))),r.a.createElement(re.a,{className:d.cardActions},r.a.createElement(A.a,{className:d.toLocalTime,variant:"caption",color:"primary",component:"p"},b(c)),r.a.createElement(L.a,{size:"small",color:"primary",onClick:function(){return m(l)}},o)))};le.defaultProps={imgUrl:"https://source.unsplash.com/random/300x400",newsTitle:"I am a news title",newsSummary:"I am news summary",publishedAt:"0000/00/00 00:00",sourceName:"google",author:"I am author",articleUrl:"https://google.com",newsContent:"I am news content"};var se=le,ue=a(180),me=Object(x.a)((function(e){return{root:{display:"flex","& > * + *":{marginLeft:e.spacing(2)},justifyContent:"center",marginTop:e.spacing(6)}}})),de=function(){var e=me();return r.a.createElement("div",{className:e.root},r.a.createElement(ue.a,null))},ge=Object(x.a)((function(e){var t,a;return{newsPaper:(t={margin:e.spacing(0,1,9,1),padding:e.spacing(0,1),width:"100%",maxWidth:1320},Object(w.a)(t,e.breakpoints.down("md"),{maxWidth:994}),Object(w.a)(t,e.breakpoints.down("sm"),{maxWidth:667}),Object(w.a)(t,e.breakpoints.down(600),{maxWidth:310}),t),searchBar:(a={width:"100%",height:88,display:"flex"},Object(w.a)(a,e.breakpoints.down("md"),{maxWidth:994}),Object(w.a)(a,e.breakpoints.down("sm"),{flexFlow:"column",alignItems:"center",height:"auto",maxWidth:651,padding:e.spacing(0,1)}),Object(w.a)(a,"& > div:nth-of-type(1)",{marginLeft:e.spacing(1)}),Object(w.a)(a,"& > div:nth-of-type(2)",{marginLeft:e.spacing(1)}),a),searchBtn:Object(w.a)({height:55,margin:e.spacing(1),textTransform:"none"},e.breakpoints.down("sm"),{width:"100%"}),divider:{margin:e.spacing(1,1,3,1)},dialogHeader:{display:"flex",padding:e.spacing(2,3),justifyContent:"space-between",alignItems:"center","& > div":{marginRight:e.spacing(1)}},dialogImg:{display:"block",width:"100%",height:"auto",objectFit:"scale-down",marginBottom:e.spacing(1.5)},dialogFooter:{flexFlow:"column","& > p":{marginBottom:e.spacing(1)}}}})),be=function(e){var t=e.readBy,a=Object(n.useContext)(g),c=Object(n.useContext)(b),o=ge(),i=Object(n.useState)(!0),m=Object(u.a)(i,2),f=m[0],p=m[1],h=Object(n.useState)(""),j=Object(u.a)(h,2),v=j[0],O=j[1],E=Object(n.useState)(""),w=Object(u.a)(E,2),y=w[0],C=w[1],x=Object(n.useState)(""),S=Object(u.a)(x,2),k=S[0],N=S[1],B=Object(n.useState)(!0),I=Object(u.a)(B,2),U=I[0],K=I[1],G=Object(n.useState)([]),J=Object(u.a)(G,2),X=J[0],Y=J[1],Q=Object(n.useState)(0),V=Object(u.a)(Q,2),q=V[0],_=V[1],ee=Object(n.useState)(1),te=Object(u.a)(ee,2),ae=te[0],ne=te[1],re=Object(n.useState)({}),ce=Object(u.a)(re,2),oe=ce[0],ie=ce[1],le=Object(n.useState)(!1),ue=Object(u.a)(le,2),me=ue[0],be=ue[1],fe=Object(n.useState)(!1),pe=Object(u.a)(fe,2),he=pe[0],je=pe[1],ve=Object(n.useState)(!1),Oe=Object(u.a)(ve,2),Ee=Oe[0],we=Oe[1],ye=Object(n.useState)(!1),Ce=Object(u.a)(ye,2),xe=Ce[0],Se=Ce[1],ke=M(v),Ne=M(y),Ae=M(k),Be=M(ae),Ie=Object(n.useCallback)(Object(s.a)(l.a.mark((function e(){var t,n,r,c,o,i,s,u,m=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=m.length>0&&void 0!==m[0]?m[0]:null,n=m.length>1&&void 0!==m[1]?m[1]:null,r=m.length>2&&void 0!==m[2]?m[2]:null,c=m.length>3&&void 0!==m[3]?m[3]:null,o=Array.from(a.countries).filter((function(e){return e.name===t})).map((function(e){return e.code})),i=Array.from(a.publishers).filter((function(e){return e.name===r})).map((function(e){return e.id})),e.next=8,d()("https://newsapi.org/v2/top-headlines?apiKey=".concat("3c44d2e5c78b40e390758064d60eee87"),{params:{country:o,category:n,sources:i,page:c}});case 8:(s=e.sent).data.articles.length>0&&(ae>1?(u=Object(P.a)(X).concat(s.data.articles),Y(u)):Y(s.data.articles),_(s.data.totalResults)),K(!1),p(!1);case 12:case"end":return e.stop()}}),e)}))),[ae,a.countries,a.publishers,X]);Object(n.useEffect)((function(){f&&("Country and Category"===t&&(he&&Ee&&c.adminCC.ctry&&c.adminCC.cat&&(O(c.adminCC.ctry),C(c.adminCC.cat)),ke!==v&&Ne!==y&&Ie(v,y)),"Publisher"===t&&(xe&&""!==c.adminPubl&&N(c.adminPubl),Ae!==k&&Ie(null,null,k)))}),[c.adminCC.cat,c.adminCC.ctry,c.adminPubl,Ie,f,Ee,he,xe,a.countries,a.publishers,X,Ne,ke,Ae,t,y,v,k]),Object(n.useEffect)((function(){var e=function(){var e=document.body.offsetHeight-5;if(window.innerHeight+window.scrollY>=e&&!U){if(!(q>X.length))return 0;ne(ae+1)}return 0};return window.addEventListener("scroll",e),Be!==ae&&(K(!0),"Country and Category"===t?Ie(v,y,null,ae):"Publisher"===t&&Ie(null,null,k,ae)),function(){return window.removeEventListener("scroll",e)}}),[ae,Ie,U,X.length,Be,t,y,v,k,q]);var Pe=function(){var e=Object(n.useState)(window.innerWidth),t=Object(u.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){var e=function(){return r(window.innerWidth)};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}})),a}(),Le=Object(n.useState)(0),We=Object(u.a)(Le,2),Fe=We[0],Te=We[1];Object(n.useEffect)((function(){Te(Pe>1280?4:Pe>960?3:Pe>600?2:1)}),[Pe]);var ze=function(e,t,a,n,r,c,o){var i={title:e,img:t,content:a,time:n,source:r,author:c,url:o};be(!0),ie(i)},Re=function(){be(!1)},He=function(e){window.open(e,"_blank")},Ue=0;return r.a.createElement("div",{className:o.newsPaper},r.a.createElement("div",{className:o.searchBar},"Country and Category"===t&&r.a.createElement(r.a.Fragment,null,r.a.createElement(Z,{name:"Country",options:a.countries,selected:v,changeHandler:function(e){f||O(e)},hasReady:function(e){je(e)}}),r.a.createElement(Z,{name:"Category",options:a.categories,selected:y,changeHandler:function(e){f||C(e)},hasReady:function(e){we(e)}})),"Publisher"===t&&r.a.createElement(Z,{name:"Publisher",options:a.publishers,selected:k,changeHandler:function(e){f||N(e)},hasReady:function(e){Se(e)}}),r.a.createElement(L.a,{className:o.searchBtn,variant:"outlined",onClick:function(){return function(){if(!f){if((""===y||""===v)&&""===k)return 0;if(ke===v&&Ne===y&&Ae===k)return 0;K(!0),Y([]),ne(1),"Country and Category"===t&&Ie(v,y),"Publisher"===t&&Ie(null,null,k)}return 0}()}},"Search")),r.a.createElement(W.a,{className:o.divider}),X.length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement($,{colNum:Fe},X.map((function(e){return Ue+=1,r.a.createElement(se,{key:"NewsCard-".concat(Ue),imgUrl:e.urlToImage,articleUrl:e.url,newsTitle:e.title,newsSummary:e.description,publishedAt:e.publishedAt,sourceName:e.source.name,author:e.author,newsContent:e.content,openDialog:ze,openArticleUrl:He})}))),r.a.createElement(F.a,{open:me,onClose:Re},r.a.createElement("div",{className:o.dialogHeader},r.a.createElement("div",null,r.a.createElement(A.a,{variant:"subtitle1"},oe.title),r.a.createElement(A.a,{variant:"subtitle2",color:"primary"},oe.author)),r.a.createElement(T.a,{onClick:function(){return Re()}},r.a.createElement(D.a,null))),r.a.createElement(z.a,{dividers:!0},r.a.createElement("img",{alt:oe.img,src:oe.img,className:o.dialogImg}),r.a.createElement(R.a,{id:"dialog-news-desc"},oe.content)),r.a.createElement(H.a,{className:o.dialogFooter},r.a.createElement(A.a,{variant:"caption",color:"primary",component:"p"},oe.time),r.a.createElement(L.a,{size:"small",color:"primary",onClick:function(){return He(oe.url)}},oe.source)))),!U&&X.length<=0&&r.a.createElement(A.a,{variant:"h5",color:"primary",align:"center"},"No news was found for your search."),U&&r.a.createElement(de,null))},fe=a(186),pe=a(89),he=a.n(pe),je=Object(x.a)((function(e){return{button:{margin:e.spacing(1),textTransform:"none",position:"fixed",right:0,bottom:8,display:"flex",justifyContent:"center",alignItems:"center"}}})),ve=function(){var e=je();return r.a.createElement("div",{className:e.button},r.a.createElement(fe.a,{size:"small","aria-label":"add",onClick:function(){return function(){try{window.scroll({top:0,left:0,behavior:"smooth"})}catch(e){window.scrollTo(0,0)}}()}},r.a.createElement(he.a,null)))},Oe=Object(x.a)((function(e){return{container:{display:"flex",flexFlow:"column",justifyContent:"center",alignItems:"center",margin:"auto",padding:e.spacing(0,1)},button:{margin:e.spacing(1),textTransform:"none",width:100}}})),Ee=function(){var e=Oe(),t=Object(n.useState)(""),a=Object(u.a)(t,2),c=a[0],o=a[1],i=Object(C.e)();return Object(n.useEffect)((function(){"/"===i.pathname?o("Country and Category"):"/publ"===i.pathname&&o("Publisher")}),[i]),r.a.createElement("div",{className:e.container},r.a.createElement(be,{readBy:c}),r.a.createElement(ve,null))},we=a(190),ye=a(187),Ce=Object(x.a)((function(e){return{button:{margin:e.spacing(1,0),flex:"1 1 auto",textTransform:"none"},controlPanelMsg:{marginTop:e.spacing(1),textAlign:"center"},dialogBtn:{textTransform:"none"}}}));var xe=function(){var e=Ce(),t=Object(n.useContext)(b),a=Object(n.useContext)(g),c=Object(n.useState)(""),o=Object(u.a)(c,2),i=o[0],l=o[1],s=Object(n.useState)(""),m=Object(u.a)(s,2),d=m[0],f=m[1],p=Object(n.useState)(""),h=Object(u.a)(p,2),j=h[0],v=h[1],E=Object(n.useState)(!1),w=Object(u.a)(E,2),y=w[0],C=w[1],x=Object(n.useState)(!0),S=Object(u.a)(x,2),k=S[0],N=S[1],A=Object(n.useState)(""),P=Object(u.a)(A,2),W=P[0],T=P[1],U=Object(n.useState)(""),D=Object(u.a)(U,2),K=D[0],M=D[1],G=Object(n.useState)(!1),J=Object(u.a)(G,2),X=J[0],Y=J[1],Q=Object(n.useState)(!1),V=Object(u.a)(Q,2),q=V[0],_=V[1];Object(n.useEffect)((function(){t.adminCC.ctry&&t.adminCC.cat&&""!==t.adminPubl&&(l(t.adminCC.ctry),v(t.adminCC.cat),f(t.adminPubl),N(!1))}),[t.adminCC.cat,t.adminCC.ctry,t.adminPubl]);var $=function(){C(!1)};return r.a.createElement(r.a.Fragment,null,k?r.a.createElement(de,null):r.a.createElement("div",null,r.a.createElement(Z,{name:"Publisher",options:a.publishers,selected:d,changeHandler:function(e){f(e)}}),r.a.createElement(Z,{name:"Country",options:a.countries,selected:i,changeHandler:function(e){l(e)}}),r.a.createElement(Z,{name:"Category",options:a.categories,selected:j,changeHandler:function(e){v(e)}}),r.a.createElement(L.a,{className:e.button,variant:"outlined",fullWidth:!0,onClick:function(){if(""===j||""===i||""===d)return 0;var e={category:j,publisher:d,country:i};return C(!0),_(!0),O.saveSettings(e).then((function(){M("Settings Saved !"),T("New settings will be applied to your (and guest's) next visit. (or you can refresh website right now.)"),Y(!1),_(!1)})).catch((function(e){M("Opps !"),T("There is something wrong, error: ".concat(e)),Y(!0),_(!1)})),0}},"Save"),r.a.createElement(F.a,{open:y,onClose:$},r.a.createElement(ye.a,{id:"dialog-Admin"},K),r.a.createElement(z.a,{dividers:!0},q&&r.a.createElement(de,null),!q&&r.a.createElement(R.a,{id:"dialog-description"},W)),r.a.createElement(H.a,null,r.a.createElement(L.a,{className:e.dialogBtn,color:"primary",onClick:$},"Got it"),!X&&r.a.createElement(L.a,{className:e.dialogBtn,color:"primary",onClick:function(){window.location.href="".concat("/news","/")}},"Refresh now"))),r.a.createElement(L.a,{className:e.button,variant:"outlined",fullWidth:!0,onClick:function(){return O.logOut()}},"Log Out"),r.a.createElement(B.a,{className:e.controlPanelMsg},r.a.createElement(I.a,{primary:"Current settings is now reflected on the public pages."}))))},Se=a(189),ke=Object(x.a)((function(e){return{textField:{flex:"1 1 auto"},button:{margin:e.spacing(2,0),flex:"1 1 auto",textTransform:"none"},input:{display:"none"}}})),Ne=function(){var e=ke(),t=Object(n.useState)(!1),a=Object(u.a)(t,2),c=a[0],o=a[1],i=Object(n.useState)("".concat("admin@mail.com")),l=Object(u.a)(i,2),s=l[0],m=l[1],d=Object(n.useState)("".concat("123456")),g=Object(u.a)(d,2),b=g[0],f=g[1];return r.a.createElement(r.a.Fragment,null,c?r.a.createElement(de,null):r.a.createElement("form",{noValidate:!0,autoComplete:"off"},r.a.createElement(Se.a,{id:"outlined-basic",className:e.textField,label:"Email",margin:"normal",variant:"outlined",fullWidth:!0,value:s,onChange:function(e){return m(e.target.value)}}),r.a.createElement(Se.a,{id:"outlined-password-input",label:"Password",className:e.textField,type:"password",autoComplete:"current-password",margin:"normal",variant:"outlined",fullWidth:!0,value:b,onChange:function(e){return f(e.target.value)}}),r.a.createElement(L.a,{variant:"outlined",className:e.button,fullWidth:!0,onClick:function(){return O.login(s,b).catch((function(e){throw new Error(e.message)})),void o(!0)}},"Login")))},Ae=a(91),Be=a.n(Ae),Ie=a(92),Pe=a.n(Ie),Le=Object(x.a)((function(e){return{container:Object(w.a)({display:"flex",flexFlow:"column",width:"100%",maxWidth:300,justifyContent:"center",alignItems:"center",marginTop:e.spacing(3),marginLeft:"auto",marginRight:"auto"},e.breakpoints.down(360),{padding:e.spacing(0,3)}),logo:{margin:10,width:60,height:60,"& img":{maxWidth:"80%",height:"unset"}},title:{marginBottom:e.spacing(2)}}}));var We=function(){var e=Le(),t=K(O),a=Object(n.useState)(""),c=Object(u.a)(a,2),o=c[0],i=c[1],l=Object(n.useState)(""),s=Object(u.a)(l,2),m=s[0],d=s[1];return Object(n.useEffect)((function(){t?(d(Be.a),i("Control Panel")):(d(Pe.a),i("Login"))}),[t]),r.a.createElement("div",{className:e.container},r.a.createElement(we.a,{alt:"News",src:m,className:e.logo}),r.a.createElement(A.a,{className:e.title,variant:"h6"},o),t?r.a.createElement(xe,null):r.a.createElement(Ne,null))},Fe=Object(x.a)((function(e){var t;return{appbar:Object(w.a)({boxShadow:"unset",marginBottom:e.spacing(2)},e.breakpoints.down("sm"),{padding:e.spacing(1,3)}),toolbar:(t={width:"100%",maxWidth:1320,padding:e.spacing(0,2),alignSelf:"center"},Object(w.a)(t,e.breakpoints.down("md"),{maxWidth:994}),Object(w.a)(t,e.breakpoints.down("sm"),{flexFlow:"column",maxWidth:651,padding:e.spacing(0,1)}),Object(w.a)(t,e.breakpoints.down(600),{maxWidth:310}),t),pageLabel:Object(w.a)({display:"flex",justifyContent:"flex-start",flex:"1 1 auto","& a":{marginRight:e.spacing(2),flex:"0 1 10%"}},e.breakpoints.down("sm"),{flexFlow:"column",alignItems:"center",width:"100%"}),logoLink:{textDecoration:"none"},logoBtn:Object(w.a)({fontWeight:"bold",fontFamily:"Meiryo",fontSize:"20px",color:"#55b4d1",margin:e.spacing(0,5,0,0)},e.breakpoints.down("sm"),{margin:e.spacing(1,0)}),navBtn:Object(w.a)({textAlign:"center",whiteSpace:"nowrap",borderRadius:3},e.breakpoints.down("sm"),{margin:e.spacing(.5,2)}),navBtnActive:{backgroundColor:e.palette.action.selected},loginBtn:Object(w.a)({flex:"0 1 120px",margin:e.spacing(0,0,0,5),backgroundColor:"#C7E191",color:"#fff","&:hover":{backgroundColor:"#BDD983",borderColor:"#95CC75",boxShadow:"none"},"&:active":{boxShadow:"none",backgroundColor:"#A5C365",borderColor:"#95CC75"}},e.breakpoints.down("sm"),{margin:e.spacing(1,0),flex:"0 1 auto"})}})),Te=function(){var e=Fe();return r.a.createElement(r.a.Fragment,null,r.a.createElement(S.a,null),r.a.createElement(y.a,{basename:"/news"},r.a.createElement(k.a,{position:"static",color:"inherit",className:e.appbar},r.a.createElement(N.a,{className:e.toolbar},r.a.createElement(y.b,{to:"/",className:e.logoLink},r.a.createElement(A.a,{className:"".concat(e.navBtn," ").concat(e.logoBtn)},"Top News Headlines")),r.a.createElement("div",{className:e.pageLabel},r.a.createElement(B.a,{className:e.navBtn,button:!0,key:"Country and Category",component:y.c,exact:!0,to:"/",activeClassName:e.navBtnActive},r.a.createElement(I.a,{primary:"Country and Category"})),r.a.createElement(B.a,{className:e.navBtn,button:!0,key:"Publisher",component:y.c,to:"/publ",activeClassName:e.navBtnActive},r.a.createElement(I.a,{primary:"Publisher"}))),r.a.createElement(B.a,{className:"".concat(e.navBtn," ").concat(e.loginBtn),button:!0,key:"Login",component:y.c,to:"/admin"},r.a.createElement(I.a,{primary:"Admin"})))),r.a.createElement(C.a,{exact:!0,path:"/",render:function(){return r.a.createElement(Ee,null)}}),r.a.createElement(C.a,{path:"/publ",render:function(){return r.a.createElement(Ee,null)}}),r.a.createElement(C.a,{path:"/admin",render:function(){return r.a.createElement(We,null)}})))};a(136);o.a.render(r.a.createElement(E,null,r.a.createElement(Te,null)),document.getElementById("root"))},91:function(e,t,a){e.exports=a.p+"static/media/avatar-admin.8eb7aa43.png"},92:function(e,t,a){e.exports=a.p+"static/media/avatar-guest.c9ea7585.png"}},[[101,1,2]]]);
//# sourceMappingURL=main.2572c79c.chunk.js.map