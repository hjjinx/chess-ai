(this["webpackJsonpchess-ai"]=this["webpackJsonpchess-ai"]||[]).push([[0],{13:function(r,n,o){},14:function(r,n,o){},15:function(r,n,o){"use strict";o.r(n);var e=o(0),i=o.n(e),l=o(6),c=o.n(l),t=(o(13),o(7)),a=o(2),u=function(r){var n="rgb(208, 139, 76)",o="white";(r.i+r.k)%2==0&&(n="rgb(254, 206, 161)",o="black");return i.a.createElement("div",{onClick:function(){null!=r.piece||r.active?r.handleClick(r.i,r.k):r.clickNothing()},style:{display:"flex",width:100,height:100,backgroundColor:n,boxShadow:"0 0 40px 1px ".concat(r.active?r.piece?"red":"yellow":"transparent"," inset"),color:o,border:"1px solid black  ",boxSizing:"border-box"}},r.rows[r.k]&&i.a.createElement("img",{src:"./gfx/".concat(r.rows[r.k].color).concat(r.rows[r.k].type,".png"),alt:"b bishop",style:{margin:"auto",height:"80%"}}))},f=o(4),v=function r(n,o){Object(f.a)(this,r),this.type="",this.color="",this.canMoveTo=[[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1]],this.numOfMoves=0,this.turnsSinceLastMove=0,this.importance=void 0,this.type=n,this.color=o;var e="W"===o?1:-1;this.importance="King"===n?1e4*e:"Queen"===n?1e3*e:"Knight"===n?200*e:"Rook"===n||"Bishop"===n?150*e:50*e},s=[[new v("Rook","B"),new v("Knight","B"),new v("Bishop","B"),new v("Queen","B"),new v("King","B"),new v("Bishop","B"),new v("Knight","B"),new v("Rook","B")],[new v("Pawn","B"),new v("Pawn","B"),new v("Pawn","B"),new v("Pawn","B"),new v("Pawn","B"),new v("Pawn","B"),new v("Pawn","B"),new v("Pawn","B")],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[new v("Pawn","W"),new v("Pawn","W"),new v("Pawn","W"),new v("Pawn","W"),new v("Pawn","W"),new v("Pawn","W"),new v("Pawn","W"),new v("Pawn","W")],[new v("Rook","W"),new v("Knight","W"),new v("Bishop","W"),new v("Queen","W"),new v("King","W"),new v("Bishop","W"),new v("Knight","W"),new v("Rook","W")]],p=[[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1]],W=function(r){switch(r){case"King":return 5e3;case"Rook":return 100;case"Knight":return 150;case"Bishop":return 100;case"Pawn":return 30;case"Queen":return 500}},y=function(r,n,o,e,i){var l=150,c=function(r,o){var l=e.map((function(r){return r.slice()}));return l[r][o]=l[r][n],l[r][n]=null,P(l,"W"===i?"B":"W")},t=function(n,o){var l=e.map((function(r){return r.slice()}));return l[n][o]=l[r][o],l[r][o]=null,P(l,"W"===i?"B":"W")};if(0!==r)for(var a=r-1;a>=0;a--){var u=e[a][n];if(u){if(u.color===i)break;if(t(a,n))break}else if(t(a,n))continue;if(null!==u){u.color!==i&&(o[a][n]=!0,l+=W(u.type));break}o[a][n]=!0}if(7!==r)for(var f=r+1;f<=7;f++){var v=e[f][n];if(v){if(v.color===i)break;if(t(f,n))break}else if(t(f,n))continue;if(null!==v){v.color!==i&&(o[f][n]=!0,l+=W(v.type));break}o[f][n]=!0}if(0!==n)for(var s=n-1;s>=0;s--){var p=e[r][s];if(p){if(p.color===i)break;if(c(r,s))break}else if(c(r,s))continue;if(null!==p){p.color!==i&&(o[r][s]=!0,l+=W(p.type));break}o[r][s]=!0}if(7!==n)for(var y=n+1;y<=7;y++){var m=e[r][y];if(m){if(m.color===i)break;if(c(r,y))break}else if(c(r,y))continue;if(null!==m){m.color!==i&&(o[r][y]=!0,l+=W(m.type));break}o[r][y]=!0}l*="W"===i?1:-1,e[r][n].importance=l},m=function(r,n,o,e,i){var l=200;if(r>=2){if(n>=1){var c=e[r-2][n-1],t=!1;if(!c||c.color!==e[r][n].color){var a=e.map((function(r){return r.slice()}));a[r-2][n-1]=a[r][n],a[r][n]=null,t=P(a,"W"===i?"B":"W")}t||(null===c?o[r-2][n-1]=!0:c.color!==i&&(o[r-2][n-1]=!0,l+=W(c.type)))}if(n<=6){var u=e[r-2][n+1],f=!1;if(!u||u.color!==e[r][n].color){var v=e.map((function(r){return r.slice()}));v[r-2][n+1]=v[r][n],v[r][n]=null,f=P(v,"W"===i?"B":"W")}f||(null===u?o[r-2][n+1]=!0:u.color!==i&&(o[r-2][n+1]=!0,l+=W(u.type)))}}if(r<=5){if(n>=1){var s=e[r+2][n-1],p=!1;if(!s||s.color!==e[r][n].color){var y=e.map((function(r){return r.slice()}));y[r+2][n-1]=y[r][n],y[r][n]=null,p=P(y,"W"===i?"B":"W")}p||(null===s?o[r+2][n-1]=!0:s.color!==i&&(o[r+2][n-1]=!0,l+=W(s.type)))}if(n<=6){var m=e[r+2][n+1],k=!1;if(!m||m.color!==e[r][n].color){var w=e.map((function(r){return r.slice()}));w[r+2][n+1]=w[r][n],w[r][n]=null,k=P(w,"W"===i?"B":"W")}k||(null===m?o[r+2][n+1]=!0:m.color!==i&&(o[r+2][n+1]=!0,l+=W(m.type)))}}if(n>=2){if(r>=1){var b=e[r-1][n-2],g=!1;if(!b||b.color!==e[r][n].color){var B=e.map((function(r){return r.slice()}));B[r-1][n-2]=B[r][n],B[r][n]=null,g=P(B,"W"===i?"B":"W")}g||(null===b?o[r-1][n-2]=!0:b.color!==i&&(o[r-1][n-2]=!0,l+=W(b.type)))}if(r<=6){var h=e[r+1][n-2],K=!1;if(!h||h.color!==e[r][n].color){var M=e.map((function(r){return r.slice()}));M[r+1][n-2]=M[r][n],M[r][n]=null,K=P(M,"W"===i?"B":"W")}K||(null===h?o[r+1][n-2]=!0:h.color!==i&&(o[r+1][n-2]=!0,l+=W(h.type)))}}if(n<=5){if(r>=1){var O=e[r-1][n+2],d=!1;if(!O||O.color!==e[r][n].color){var T=e.map((function(r){return r.slice()}));T[r-1][n+2]=T[r][n],T[r][n]=null,d=P(T,"W"===i?"B":"W")}d||(null===O?o[r-1][n+2]=!0:O.color!==i&&(o[r-1][n+2]=!0,l+=W(O.type)))}if(r<=6){var S=e[r+1][n+2],j=!1;if(!S||S.color!==e[r][n].color){var x=e.map((function(r){return r.slice()}));x[r+1][n+2]=x[r][n],x[r][n]=null,j=P(x,"W"===i?"B":"W")}j||(null===S?o[r+1][n+2]=!0:S.color!==i&&(o[r+1][n+2]=!0,l+=W(S.type)))}}l*="W"===i?1:-1,e[r][n].importance=l},k=function(r,n,o,e,i){for(var l=150,c=1;c<8;c++){var t=function(o){var l=e.map((function(r){return r.slice()}));return l[r-o][n+o]=l[r][n],l[r][n]=null,P(l,"W"===i?"B":"W")};if(!(r-c>=0&&n+c<=7))break;var a=e[r-c][n+c];if(a){if(a.color===e[r][n].color)break;if(t(c))break}else if(t(c))continue;if(null!==a){a.color!==i&&(o[r-c][n+c]=!0,l+=W(a.type));break}o[r-c][n+c]=!0}for(var u=1;u<8;u++){var f=function(o){var l=e.map((function(r){return r.slice()}));return l[r+o][n+o]=l[r][n],l[r][n]=null,P(l,"W"===i?"B":"W")};if(!(r+u<=7&&n+u<=7))break;var v=e[r+u][n+u];if(v){if(v.color===e[r][n].color)break;if(f(u))break}else if(f(u))continue;if(null!==v){v.color!==i&&(o[r+u][n+u]=!0,l+=W(v.type));break}o[r+u][n+u]=!0}for(var s=1;s<8;s++){var p=function(o){var l=e.map((function(r){return r.slice()}));return l[r+o][n-o]=l[r][n],l[r][n]=null,P(l,"W"===i?"B":"W")};if(r+s<=7&&n-s>=0){var y=e[r+s][n-s];if(y){if(y.color===e[r][n].color)break;if(p(s))break}else if(p(s))continue;if(null!==y){y.color!==i&&(o[r+s][n-s]=!0,l+=W(y.type));break}o[r+s][n-s]=!0}}for(var m=1;m<8&&(r-m>=0&&n-m>=0);m++){var k=e[r-m][n-m],w=function(o){var l=e.map((function(r){return r.slice()}));return l[r-o][n-o]=l[r][n],l[r][n]=null,P(l,"W"===i?"B":"W")};if(k){if(k.color===e[r][n].color)break;if(w(m))break}else if(w(m))continue;if(null!==k){k.color!==i&&(o[r-m][n-m]=!0,l+=W(k.type));break}o[r-m][n-m]=!0}l*="W"===i?1:-1,e[r][n].importance=l},w=function(r,n,o,e,i){var l=1e4,c=e[r][n],t=e[r][n+3];if(e[r][n+3]&&"Rook"===e[r][n+3].type&&0===c.numOfMoves&&0===t.numOfMoves&&null===e[r][n+1]&&null===e[r][n+2]){var a=e.map((function(r){return r.slice()}));a[r][n+1]=e[r][n+3],a[r][n+2]=e[r][n],a[r][n]=null,a[r][n+3]=null,P(a,"W"===i?"B":"W")||(o[r][n+2]=!0)}if(r>=1){var u=e[r-1][n];if(!u||u.color!==i){var f=e.map((function(r){return r.slice()}));f[r-1][n]=e[r][n],f[r][n]=null,P(f,"W"===i?"B":"W")||(o[r-1][n]=!0,u&&(l+=W(u.type)))}if(n>=1){var v=e[r-1][n-1];if(!v||v.color!==i){var s=e.map((function(r){return r.slice()}));s[r-1][n-1]=e[r][n],s[r][n]=null,P(s,"W"===i?"B":"W")||(o[r-1][n-1]=!0,v&&(l+=W(v.type)))}}if(n<=6){var p=e[r-1][n+1];if(!p||p.color!==i){var y=e.map((function(r){return r.slice()}));y[r-1][n+1]=e[r][n],y[r][n]=null,P(y,"W"===i?"B":"W")||(o[r-1][n+1]=!0,p&&(l+=W(p.type)))}}}if(r<=6){var m=e[r+1][n];if(!m||m.color!==i){var k=e.map((function(r){return r.slice()}));k[r+1][n]=e[r][n],k[r][n]=null,P(k,"W"===i?"B":"W")||(o[r+1][n]=!0,m&&(l+=W(m.type)))}if(n>=1){var w=e[r+1][n-1];if(!w||w.color!==i){var b=e.map((function(r){return r.slice()}));b[r+1][n-1]=e[r][n],b[r][n]=null,P(b,"W"===i?"B":"W")||(o[r+1][n-1]=!0,w&&(l+=W(w.type)))}}if(n<=6){var g=e[r+1][n+1];if(!g||g.color!==i){var B=e.map((function(r){return r.slice()}));B[r+1][n+1]=e[r][n],B[r][n]=null,P(B,"W"===i?"B":"W")||(o[r+1][n+1]=!0,g&&(l+=W(g.type)))}}}if(n>=1){var h=e[r][n-1];if(!h||h.color!==i){var K=e.map((function(r){return r.slice()}));K[r][n-1]=e[r][n],K[r][n]=null,P(K,"W"===i?"B":"W")||(o[r][n-1]=!0,h&&(l+=W(h.type)))}}if(n<=6){var M=e[r][n+1];if(!M||M.color!==i){var O=e.map((function(r){return r.slice()}));O[r][n+1]=e[r][n],O[r][n]=null,P(O,"W"===i?"B":"W")||(o[r][n+1]=!0,M&&(l+=W(M.type)))}}l*="W"===i?1:-1,e[r][n].importance=l},b=function(r,n,o,e,i){var l=50;if(e[r][n].turnsSinceLastMove++,"W"===i){if(null===e[r-1][n]){var c=e.map((function(r){return r.slice()}));if(c[r-1][n]=e[r][n],c[r][n]=null,P(c,"W"===i?"B":"W")||(o[r-1][n]=!0),e[r][n]&&0===e[r][n].numOfMoves&&null===e[r-2][n]){var t=e.map((function(r){return r.slice()}));t[r-2][n]=e[r][n],t[r][n]=null,P(t,"W"===i?"B":"W")||(o[r-2][n]=!0)}}if(0!==n){var a=e[r-1][n-1],u=e[r][n-1];if(null!==a){if("B"===a.color){var f=e.map((function(r){return r.slice()}));f[r-1][n-1]=e[r][n],f[r][n]=null,P(f,"W"===i?"B":"W")||(o[r-1][n-1]=!0,l+=W(a.type))}}else if(3===r&&u&&1===u.numOfMoves&&0===u.turnsSinceLastMove){var v=e.map((function(r){return r.slice()}));v[r-1][n-1]=e[r][n],v[r][n-1]=null,P(v,"W"===i?"B":"W")||(o[r-1][n-1]=!0,l+=W(u.type))}}if(7!==n){var s=e[r-1][n+1],p=e[r][n+1];if(null!==s){if("B"===s.color){var y=e.map((function(r){return r.slice()}));y[r-1][n+1]=e[r][n],y[r][n]=null,P(y,"W"===i?"B":"W")||(o[r-1][n+1]=!0,l+=W(s.type))}}else if(3===r&&p&&1===p.numOfMoves&&0===p.turnsSinceLastMove){var m=e.map((function(r){return r.slice()}));m[r-1][n+1]=e[r][n],m[r][n+1]=null,P(m,"W"===i?"B":"W")||(o[r-1][n+1]=!0,l+=W(p.type))}}}if("B"===i){if(null===e[r+1][n]){var k=e.map((function(r){return r.slice()}));if(k[r+1][n]=e[r][n],k[r][n]=null,P(k,"W"===i?"B":"W")||(o[r+1][n]=!0),0===e[r][n].numOfMoves&&null==e[r+2][n]){var w=e.map((function(r){return r.slice()}));w[r+2][n]=e[r][n],w[r][n]=null,P(w,"W"===i?"B":"W")||(o[r+2][n]=!0)}}if(0!==n){var b=e[r+1][n-1],g=e[r][n-1];if(null!==b){if("W"===b.color){var B=e.map((function(r){return r.slice()}));B[r+1][n-1]=e[r][n],B[r][n]=null,P(B,"W"===i?"B":"W")||(o[r+1][n-1]=!0,l+=W(b.type))}}else if(4===r&&g&&1===g.numOfMoves&&0===g.turnsSinceLastMove){var h=e.map((function(r){return r.slice()}));h[r+1][n-1]=h[r][n],h[r][n-1]=null,P(h,"W"===i?"B":"W")||(o[r+1][n-1]=!0),l+=W(g.type)}}if(7!==n){var K=e[r+1][n+1],M=e[r][n+1];if(null!==K){if("W"===K.color){var O=e.map((function(r){return r.slice()}));O[r+1][n+1]=e[r][n],O[r][n]=null,P(O,"W"===i?"B":"W")||(o[r+1][n+1]=!0,l+=W(K.type))}}else if(4===r&&M&&1===M.numOfMoves&&0===M.turnsSinceLastMove){var d=e.map((function(r){return r.slice()}));d[r+1][n+1]=d[r][n],d[r][n+1]=null,P(d,"W"===i?"B":"W")||(o[r+1][n+1]=!0),l+=W(M.type)}}}l*="W"===i?1:-1,e[r][n].importance=l},g=function(r,n){for(var o=0,e=0;e<8;e++)for(var i=0;i<8;i++)if(r[e][i]&&r[e][i].color===n){switch(r[e][i].canMoveTo=p.map((function(r){return r.slice()})),r[e][i].type){case"Pawn":b(e,i,r[e][i].canMoveTo,r,r[e][i].color);break;case"Bishop":k(e,i,r[e][i].canMoveTo,r,r[e][i].color);break;case"King":w(e,i,r[e][i].canMoveTo,r,r[e][i].color);break;case"Queen":k(e,i,r[e][i].canMoveTo,r,r[e][i].color),y(e,i,r[e][i].canMoveTo,r,r[e][i].color);break;case"Rook":y(e,i,r[e][i].canMoveTo,r,r[e][i].color);break;case"Knight":m(e,i,r[e][i].canMoveTo,r,r[e][i].color)}o+=r[e][i].importance}else r[e][i]&&(o+=r[e][i].importance);return o},B=function(r,n,o){if(0===r||7===r)return!1;if("W"===o[r][n].color){if(0!==n){var e=o[r-1][n-1];if(null!==e&&"B"===e.color&&"King"==e.type)return!0}if(7!==n){var i=o[r-1][n+1];if(null!==i&&"B"===i.color&&"King"==i.type)return!0}}if("B"===o[r][n].color){if(0!==n){var l=o[r+1][n-1];if(null!==l&&"W"===l.color&&"King"===l.type)return!0}if(7!==n){var c=o[r+1][n+1];if(null!==c&&"W"===c.color&&"King"==c.type)return!0}}return!1},h=function(r,n,o){if(0!==r)for(var e=r-1;e>=0;e--){var i=o[e][n];if(i&&(i.color===o[r][n].color||i.color!==o[r][n].color&&"King"!==i.type))break;if(i&&i.color!==o[r][n].color&&"King"===i.type)return!0}if(7!==r)for(var l=r+1;l<=7;l++){var c=o[l][n];if(c&&(c.color===o[r][n].color||c.color!==o[r][n].color&&"King"!==c.type))break;if(c&&c.color!==o[r][n].color&&"King"===c.type)return!0}if(0!==n)for(var t=n-1;t>=0;t--){var a=o[r][t];if(a&&(a.color===o[r][n].color||a.color!==o[r][n].color&&"King"!==a.type))break;if(a&&a.color!==o[r][n].color&&"King"===a.type)return!0}if(7!==n)for(var u=n+1;u<=7;u++){var f=o[r][u];if(f&&(f.color===o[r][n].color||f.color!==o[r][n].color&&"King"!==f.type))break;if(f&&f.color!==o[r][n].color&&"King"===f.type)return!0}return!1},K=function(r,n,o){if(r>=2){if(n>=1){var e=o[r-2][n-1];if(e&&e.color!==o[r][n].color&&"King"===e.type)return!0}if(n<=6){var i=o[r-2][n+1];if(i&&i.color!==o[r][n].color&&"King"===i.type)return!0}}if(r<=5){if(n>=1){var l=o[r+2][n-1];if(l&&l.color!==o[r][n].color&&"King"===l.type)return!0}if(n<=6){var c=o[r+2][n+1];if(c&&c.color!==o[r][n].color&&"King"===c.type)return!0}}if(n>=2){if(r>=1){var t=o[r-1][n-2];if(t&&t.color!==o[r][n].color&&"King"===t.type)return!0}if(r<=6){var a=o[r+1][n-2];if(a&&a.color!==o[r][n].color&&"King"===a.type)return!0}}if(n<=5){if(r>=1){var u=o[r-1][n+2];if(u&&u.color!==o[r][n].color&&"King"===u.type)return!0}if(r<=6){var f=o[r+1][n+2];if(f&&f.color!==o[r][n].color&&"King"===f.type)return!0}}return!1},M=function(r,n,o){for(var e=1;e<8&&(r-e>=0&&n+e<=7);e++){var i=o[r-e][n+e];if(i&&(i.color===o[r][n].color||i.color!==o[r][n].color&&"King"!==i.type))break;if(i&&i.color!==o[r][n].color&&"King"===i.type)return!0}for(var l=1;l<8&&(r+l<=7&&n+l<=7);l++){var c=o[r+l][n+l];if(c&&(c.color===o[r][n].color||c.color!==o[r][n].color&&"King"!==c.type))break;if(c&&c.color!==o[r][n].color&&"King"===c.type)return!0}for(var t=1;t<8;t++)if(r+t<=7&&n-t>=0){var a=o[r+t][n-t];if(a&&(a.color===o[r][n].color||a.color!==o[r][n].color&&"King"!==a.type))break;if(a&&a.color!==o[r][n].color&&"King"===a.type)return!0}for(var u=1;u<8&&(r-u>=0&&n-u>=0);u++){var f=o[r-u][n-u];if(f&&(f.color===o[r][n].color||f.color!==o[r][n].color&&"King"!==f.type))break;if(f&&f.color!==o[r][n].color&&"King"===f.type)return!0}return!1},O=function(r,n,o){if(r>=1){var e=o[r-1][n];if(e&&e.color!==o[r][n].color&&"King"===e.type)return!0;if(n>=1){var i=o[r-1][n-1];if(i&&i.color!==o[r][n].color&&"King"===i.type)return!0}if(n<=6){var l=o[r-1][n+1];if(l&&l.color!==o[r][n].color&&"King"===l.type)return!0}}if(r<=6){var c=o[r+1][n];if(c&&c.color!==o[r][n].color&&"King"===c.type)return!0;if(n>=1){var t=o[r+1][n-1];if(t&&t.color!==o[r][n].color&&"King"===t.type)return!0}if(n<=6){var a=o[r+1][n+1];if(a&&a.color!==o[r][n].color&&"King"===a.type)return!0}}if(n>=1){var u=o[r][n-1];if(u&&u.color!==o[r][n].color&&"King"===u.type)return!0}if(n<=6){var f=o[r][n+1];if(f&&f.color!==o[r][n].color&&"King"===f.type)return!0}return!1},P=function(r,n){for(var o=0;o<8;o++)for(var e=0;e<8;e++)if(r[o][e]&&r[o][e].color===n){var i=!1;switch(r[o][e].type){case"Pawn":i=B(o,e,r);break;case"Bishop":i=M(o,e,r);break;case"King":i=O(o,e,r);break;case"Queen":(i=M(o,e,r))||(i=h(o,e,r));break;case"Rook":i=h(o,e,r);break;case"Knight":i=K(o,e,r)}if(i)return!0}return!1},d=function r(n,o,e,i){Object(f.a)(this,r),this.i=void 0,this.j=void 0,this.x=void 0,this.y=void 0,this.i=n,this.j=o,this.x=e,this.y=i},T=function r(n,o,e,i){if(0===e)return{score:S(n),moveToMake:new d(1,1,1,1)};var l=JSON.parse(JSON.stringify(n));g(l,o);for(var c={},t=0;t<8;t++)for(var a=0;a<8;a++)if(l[t][a]&&l[t][a].color===o)for(var u=0;u<8;u++)for(var f=0;f<8;f++){if(l[t][a].canMoveTo[u][f]){var v=n.map((function(r){return r.slice()}));v[u][f]=v[t][a],v[t][a]=null;var s=r(v,"W"===o?"B":"W",e-1,i),p=s.score,W=(s.moveToMake,new d(t,a,u,f));c[p]=W}}var y=0;if("W"===o)for(var m in y=-1e4,c){var k=parseInt(m);k>y&&(y=k)}else for(var w in y=1e4,c){var b=parseInt(w);b<y&&(y=b)}return{score:y,moveToMake:c[y]}},S=function(r){var n=0;r=JSON.parse(JSON.stringify(r));for(var o=0;o<8;o++)for(var e=0;e<8;e++)if(r[o][e]){switch(r[o][e].type){case"Pawn":b(o,e,r[o][e].canMoveTo,r,r[o][e].color);break;case"Bishop":k(o,e,r[o][e].canMoveTo,r,r[o][e].color);break;case"King":w(o,e,r[o][e].canMoveTo,r,r[o][e].color);break;case"Queen":k(o,e,r[o][e].canMoveTo,r,r[o][e].color),y(o,e,r[o][e].canMoveTo,r,r[o][e].color);break;case"Rook":y(o,e,r[o][e].canMoveTo,r,r[o][e].color);break;case"Knight":m(o,e,r[o][e].canMoveTo,r,r[o][e].color)}n+=r[o][e].importance}return n};g(s,"W");var j=function(){var r=Object(e.useState)((function(){return s})),n=Object(a.a)(r,2),o=n[0],l=n[1],c=Object(e.useState)([4,4]),f=Object(a.a)(c,2),v=f[0],W=f[1],y=Object(e.useState)("W"),m=Object(a.a)(y,2),k=m[0],w=m[1],b=Object(e.useState)((function(){return Object(t.a)(p)})),B=Object(a.a)(b,2),h=B[0],K=B[1],M=function(){K(p.map((function(r){return r.slice()}))),W([9,9])},O=function(r,n){if((!o[r][n]||k===o[r][n].color||h[r][n])&&(r!==v[0]||n!==v[1]))if(1==h[r][n]){var e=function(r,n,o){var e=r.map((function(r){return r.slice()}));return e[n][o]&&"King"===e[n][o].type&&alert("Game over"),6!==o||0!==n&&7!==n||4!==v[1]||0!==v[0]&&7!==v[0]||"King"!==r[v[0]][v[1]].type||(e[n][o-1]=r[v[0]][7],e[n][7]=null,e[n][o-1].numOfMoves++),(2===n&&r[n+1][o]&&"Pawn"===r[n+1][o].type&&"Pawn"===r[v[0]][v[1]].type||5===n&&r[n-1][o]&&"Pawn"===r[n-1][o].type&&"Pawn"===r[v[0]][v[1]].type)&&(e[2===n?3:4][o]=null),(0===n&&r[1][o]&&"W"===r[1][o].color&&"Pawn"===r[1][o].type||7===n&&r[6][o]&&"B"===r[6][o].color&&"Pawn"===r[6][o].type)&&(r[0===n?1:6][o].type="Queen"),e[n][o]=r[v[0]][v[1]],e[v[0]][v[1]]=null,e[n][o].numOfMoves++,e[n][o].turnsSinceLastMove=0,e}(o,r,n);l(e),K(p.map((function(r){return r.slice()})));var i=T(e,"B",2,2),c=(i.score,i.moveToMake);l((function(r){var n=r.map((function(r){return r.slice()}));return n[c.x][c.y]=n[c.i][c.j],n[c.i][c.j]=null,n[c.x][c.y].numOfMoves++,g(n,"W"),n})),w("W")}else K((function(e){var i=o[r][n].canMoveTo.map((function(r){return r.slice()}));return i[r][n]=!0,i})),W([r,n])};return i.a.createElement("div",null,i.a.createElement("section",{className:"app_board",style:{margin:"auto"}},o.map((function(r,n){return r.map((function(e,l){return i.a.createElement(u,{clickNothing:M,rows:r,k:l,i:n,key:"".concat(n,"_").concat(l),piece:o[n][l],handleClick:O,active:h[n][l]})}))}))))},x=(o(14),function(){return i.a.createElement("main",{className:"app"},i.a.createElement(j,null))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(r){r.unregister()})).catch((function(r){console.error(r.message)}))},8:function(r,n,o){r.exports=o(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.277f54da.chunk.js.map