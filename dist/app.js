!function i(u,s,r){function d(n,e){if(!s[n]){if(!u[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(c)return c(n,!0);throw new Error("Cannot find module '"+n+"'")}var o=s[n]={exports:{}};u[n][0].call(o.exports,function(e){var t=u[n][1][e];return d(t||e)},o,o.exports,i,u,s,r)}return s[n].exports}for(var c="function"==typeof require&&require,e=0;e<r.length;e++)d(r[e]);return d}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.DoingTimer=void 0;var o=e("./utility-function/extend"),u=e("./SoundEventDispatch");function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.DoingTimer=function e(t){var i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),s(this,"setting",void 0),s(this,"ms",void 0),s(this,"target",void 0),s(this,"endTime",void 0),s(this,"intervalTimer",void 0),s(this,"currentTime",void 0),s(this,"soundEventDispatch",void 0),s(this,"_findMilesecond",function(e){return Math.round(e/100)%10}),s(this,"_findSecond",function(e){var t;return t=e/1e3%60,t=String(t).split(".")[0]}),s(this,"_findMinute",function(e){var t;return t=e/1e3/60%60,t=String(t).split(".")[0]}),s(this,"_findHour",function(e){var t;return t=e/1e3/60/60,t=String(t).split(".")[0]}),s(this,"_counter",function(){i.ms+=100,i._displayTime(),i._dispatchTicksEvent()}),s(this,"_dispatchTicksEvent",function(){document.dispatchEvent(new CustomEvent("timer:ticksChange",{detail:{ticks:i.ms}}))}),s(this,"_displayTime",function(){var e;e="";var t=i._findHour(i.ms),n=i._findMinute(i.ms),o=i._findSecond(i.ms);e+=0<t?t+"h":"",e+=0<n?n+"m":"",e+=0<o?o+"s":"0s",i.currentTime=e,i.target.innerHTML=e}),s(this,"startTimer",function(){i.intervalTimer=setInterval(i._counter,100)}),s(this,"stopTimer",function(){clearInterval(i.intervalTimer),i.ms=0,i._displayTime(),document.dispatchEvent(new CustomEvent("sound:stop")),i.target.innerHTML="Timer"}),s(this,"pauseTimer",function(){clearInterval(i.intervalTimer)}),s(this,"resumeTimer",function(){i.intervalTimer=setInterval(i._counter,100)}),s(this,"getTicks",function(){return i.ms}),s(this,"getCurrentTime",function(){return i.currentTime}),s(this,"addTime",function(e){i.ms=i.ms+6e4*e,i._displayTime()}),s(this,"setEndTime",function(){i.soundEventDispatch.setEndTime(document.getElementById("ipt-endTime").value),console.log("setEndTimer in timecontrol")}),this.setting=(0,o.extend)({target:{name:"default"},startTime:0,endTime:0},t||{}),this.target=this.setting.target,this.ms=this.setting.startTime,this.endTime=60*this.setting.endTime,this.intervalTimer="",this.soundEventDispatch=new u.SoundEventDispatch(document.getElementById("ipt-endTime").value),console.log("DoingTimer-start")}},{"./SoundEventDispatch":2,"./utility-function/extend":14}],2:[function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(n,"__esModule",{value:!0}),n.SoundEventDispatch=void 0;n.SoundEventDispatch=function e(t){var d=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),o(this,"endTime",void 0),o(this,"handleTicksChange",function(e){var t=e.detail.ticks,n=t/1e3/3==1,o=t/1e3%15==0,i=t/1e3%60==0,u=t/1e3%120==0,s=t/1e3%300==0,r=t/1e3%d.endTime==0;r&&(console.log("SoundTrigger-checkEnd"),document.dispatchEvent(new CustomEvent("sound:End"))),t/1e3%60==59&&(console.log("SoundTrigger-59s"),document.dispatchEvent(new CustomEvent("sound:10s"))),n&&(console.log("SoundTrigger-checkStart"),document.dispatchEvent(new CustomEvent("sound:start"))),!o||i||u||s||r||(console.log("SoundTrigger-sound:process"),document.dispatchEvent(new CustomEvent("sound:process"))),!i||u||s||r||(console.log("SoundTrigger-1min"),document.dispatchEvent(new CustomEvent("sound:1min"))),!u||s||r||(console.log("SoundTrigger-2min"),document.dispatchEvent(new CustomEvent("sound:2min"))),s&&!r&&(console.log("SoundTrigger-5min"),document.dispatchEvent(new CustomEvent("sound:5min")))}),o(this,"setEndTime",function(e){d.endTime=60*e,console.log("set end Time:SoundTrigger",d.endTime)}),this.endTime=60*t,document.addEventListener("timer:ticksChange",this.handleTicksChange)}},{}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.buttonActionInit=void 0;var s=e("./sound"),r=e("./utility-function/currentTime"),d=e("./globalVar_html.js");n.buttonActionInit=function(o){document.getElementById("ipt-endTime").addEventListener("change",function(e){""==e.target.value&&(e.target.value=0);var t=new FormData;t.append("ticks",o.getTicks()),t.append("endTime",e.target.value),fetch(d.base_url+"doing_timer/set_ticks/"+d.type,{method:"POST",body:t}).then(function(e){if(!e.ok)throw new Error(e.statusText);return e.text()}).then(function(){}).catch(function(e){console.log("There has been a problem with your fetch operation: ",e.message)}),o.setEndTime(e.target.value)});var i=">???|-",u="<|";document.getElementById("btn-start").addEventListener("click",function(){o.startTimer(),(0,s.activeSound)(),document.getElementById("btn-start").className="hide",document.getElementById("btn-pause").className="show",i=">"+(0,r.currentTime)()+"-"}),document.getElementById("btn-pause").addEventListener("click",function(){o.pauseTimer(),document.getElementById("btn-pause").className="hide",document.getElementById("btn-resume").className="show"}),document.getElementById("btn-resume").addEventListener("click",function(){o.resumeTimer(),document.getElementById("btn-resume").className="hide",document.getElementById("btn-pause").className="show"});document.getElementById("btn-stop").addEventListener("click",function(){var e=new FormData;e.append("no var",""),fetch(d.base_url+"doing_timer/done/"+d.type,{method:"POST",body:e}).then(function(e){if(!e.ok)throw new Error(e.statusText);return e.text()}).then(function(){var e=o.getCurrentTime();if("0s"!=e){!0,u="-"+(0,r.currentTime)()+"| "+document.getElementById("ipt-curDoing").value+" \n";var t=document.getElementById("txa-timeMark").value;(t=t.split(" ")).unshift(i+e+u);var n=t;n=(n=n.join(" ")).replace(" >",">"),document.getElementById("txa-timeMark").value=n,o.stopTimer(),document.getElementById("btn-resume").className="hide",document.getElementById("btn-start").className="show",document.getElementById("btn-pause").className="hide",c()}}).catch(function(e){console.log("There has been a problem with your fetch operation: ",e.message)})})};var c=function(){var e=document.getElementById("txa-timeMark").value,t=new FormData;t.append("content",e),fetch(d.base_url+"doing_timer/set_content/"+d.type,{method:"POST",body:t}).then(function(e){if(!e.ok)throw new Error(e.statusText);return e.text()}).then(function(){setTimeout(function(){},50)}).catch(function(e){console.log("There has been a problem with your fetch operation: ",e.message)})}},{"./globalVar_html.js":6,"./sound":9,"./utility-function/currentTime":12}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.ipcRendererInit=void 0;var o=window.require("electron").ipcRenderer;n.ipcRendererInit=function(){var t=document.getElementsByTagName("body")[0];document.getElementById("btn-expander").addEventListener("click",function(e){e.preventDefault(),t.classList.contains("expand")?(t.classList.remove("expand"),o.send("timer:expand",!1),document.dispatchEvent(new CustomEvent("minimize"))):(t.classList.add("expand"),o.send("timer:expand",!0))}),o.on("timer:blur",function(){}),o.on("timer:max",function(){t.classList.add("max"),t.classList.add("expand")}),o.on("appStart",function(){})}},{}],5:[function(e,t,n){"use strict";var o=e("./preloader"),i=e("./Doingtimer"),u=e("./button"),s=e("./title-content"),r=e("./globalVar_html"),d=e("./electron"),c=e("./soundEventHandle"),a=(e("./sound"),e("./menu"));(0,o.showPreloader)(),(0,d.ipcRendererInit)(),(new FormData).append("postPhpDataTest","heyday"),fetch(r.base_url+"/doing_timer/start/"+r.type).then(function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}).then(function(e){document.getElementById("txa-doingNote").value=e.title,document.getElementById("txa-timeMark").value=e.content,document.getElementById("ipt-endTime").value=e.endTime,(0,o.removePreloader)();var t=new i.DoingTimer({target:document.getElementById("timer"),startTime:0});(0,c.soundEventHandleInit)(t),(0,s.titleContentInit)(),(0,u.buttonActionInit)(t),(0,a.menuInit)()}).catch(function(e){console.log("There has been a problem with your fetch operation: ",e.message)})},{"./Doingtimer":1,"./button":3,"./electron":4,"./globalVar_html":6,"./menu":7,"./preloader":8,"./sound":9,"./soundEventHandle":10,"./title-content":11}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.type=n.base_url=void 0;n.base_url="http://bf2c.info/sp/project/ci-doing-timer-v5/";n.type="home"},{}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.menuInit=void 0;function o(){c.soundProcess=s.soundProcess.volume,c.sound1Min=s.sound1Min.volume,c.sound2Min=s.sound2Min.volume,c.sound5Min=s.sound5Min.volume}function i(){s.soundProcess.volume=document.getElementById("sc-playsp").value,s.sound1Min.volume=document.getElementById("sc-play1m").value,s.sound2Min.volume=document.getElementById("sc-play2m").value,s.sound5Min.volume=document.getElementById("sc-play5m").value}function u(){o(),document.getElementById("sc-playsp").value=s.soundProcess.volume,document.getElementById("sc-play1m").value=s.sound1Min.volume,document.getElementById("sc-play2m").value=s.sound2Min.volume,document.getElementById("sc-play5m").value=s.sound5Min.volume,document.getElementById("sc-playsp").addEventListener("change",function(e){console.log("setting sc-playsp"),s.soundProcess.volume=e.target.value,o()}),document.getElementById("sc-play1m").addEventListener("change",function(e){s.sound1Min.volume=e.target.value,o()}),document.getElementById("sc-play2m").addEventListener("change",function(e){s.sound2Min.volume=e.target.value,o()}),document.getElementById("sc-play5m").addEventListener("change",function(e){s.sound5Min.volume=e.target.value,o()}),document.getElementById("btn-mute").addEventListener("click",function(){document.getElementById("sc-playsp").value=0,document.getElementById("sc-play1m").value=0,document.getElementById("sc-play2m").value=0,document.getElementById("sc-play5m").value=0,i(),console.log(c)}),document.getElementById("btn-resetSound").addEventListener("click",function(){document.getElementById("sc-playsp").value=c.soundProcess,document.getElementById("sc-play1m").value=c.sound1Min,document.getElementById("sc-play2m").value=c.sound2Min,document.getElementById("sc-play5m").value=c.sound5Min,i(),o()}),document.getElementById("btn-hardResetSound").addEventListener("click",function(){document.getElementById("sc-playsp").value=s.defaultVolume[0],document.getElementById("sc-play1m").value=s.defaultVolume[1],document.getElementById("sc-play2m").value=s.defaultVolume[2],document.getElementById("sc-play5m").value=s.defaultVolume[3],i(),o()}),document.getElementById("btn-playsp").addEventListener("click",function(){document.dispatchEvent(new CustomEvent("sound:process"))}),document.getElementById("btn-play1m").addEventListener("click",function(){s.sound1Min.play(),document.dispatchEvent(new CustomEvent("sound:1min"))}),document.getElementById("btn-play2m").addEventListener("click",function(){s.sound2Min.play(),document.dispatchEvent(new CustomEvent("sound:2min"))}),document.getElementById("btn-play5m").addEventListener("click",function(){s.sound5Min.play(),document.dispatchEvent(new CustomEvent("sound:5min"))})}var s=e("./sound"),r=e("./utility-function/eventTrigger"),d=window.require("electron").ipcRenderer,c={};n.menuInit=function(){var e=!1;document.getElementById("btn-menu").addEventListener("click",function(){e?(document.getElementById("btn-menu").classList.remove("active"),e=!1,document.getElementById("menuWrapper").classList.remove("show"),console.log("menuClose"),console.log("menupress-close")):(document.getElementById("btn-menu").classList.add("active"),e=!0,console.log("menupress-open"),document.getElementById("menuWrapper").classList.add("show"))}),document.addEventListener("minimize",function(){e&&(0,r.triggerNativeEvent)(document.getElementById("btn-menu"),"click")}),d.on("timer:blur",function(){}),u()}},{"./sound":9,"./utility-function/eventTrigger":13}],8:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.removePreloader=n.showPreloader=void 0;n.showPreloader=function(){setTimeout(function(){document.getElementById("preloader").classList.add("init")},100)};n.removePreloader=function(){document.getElementById("preloader").classList.add("fadeout"),setTimeout(function(){document.getElementById("preloader").classList.remove("init"),document.getElementById("preloader").classList.remove("fadeout");var e=document.getElementsByTagName("body")[0],t=document.getElementById("preloader");e.removeChild(t)},350)}},{}],9:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sound5Min=n.sound2Min=n.sound1Min=n.soundProcess=n.defaultVolume=n.activeSound=void 0;var o=["sound:process","sound:1min","sound:2min","sound:5min"],i=[3,4,3,10];n.defaultVolume=[1,.1,.05,1];var u=document.getElementById("sound:process");(n.soundProcess=u).volume=1;var s=document.getElementById("sound:1min");(n.sound1Min=s).volume=.1;var r=document.getElementById("sound:2min");(n.sound2Min=r).volume=.05;var d=document.getElementById("sound:5min");(n.sound5Min=d).volume=1;n.activeSound=function(){for(var e=function(e){var t=document.getElementById(o[e]);t.muted=!0,t.play();var n=t;setTimeout(function(){n.muted=!1},1e3*i[e])},t=0;t<o.length;t++)e(t)}},{}],10:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.soundEventHandleInit=void 0;var o=e("./sound"),i=e("./globalVar_html.js"),u=e("./utility-function/eventTrigger");n.soundEventHandleInit=function(t){document.addEventListener("sound:start",function(){console.log("sound:start"),o.soundProcess.currentTime=0,o.soundProcess.play()}),document.addEventListener("sound:process",function(){var e=new FormData;e.append("ticks",t.getTicks()),e.append("endTime",document.getElementById("ipt-endTime").value),fetch(i.base_url+"doing_timer/set_ticks/"+i.type,{method:"POST",body:e}).then(function(e){if(!e.ok)throw new Error(e.statusText);return e.text()}).then(function(){}).catch(function(e){console.log("There has been a problem with your fetch operation: ",e.message)}),console.log("sound:process"),o.soundProcess.currentTime=0,o.soundProcess.play()}),document.addEventListener("sound:1min",function(){console.log("sound:1min"),o.sound1Min.currentTime=0,o.sound1Min.play()}),document.addEventListener("sound:2min",function(){console.log("sound:2min"),o.sound2Min.currentTime=0,o.sound2Min.play()}),document.addEventListener("sound:5min",function(){console.log("sound:5min"),o.sound5Min.currentTime=0,o.sound5Min.play()}),document.addEventListener("sound:End",function(){console.log("sound:End"),document.getElementsByTagName("body")[0].classList.add("timerAlert"),(0,u.triggerNativeEvent)(document.getElementById("btn-expander"),"click"),o.sound2Min.loop=!0,o.sound2Min.play()}),document.addEventListener("sound:stop",function(){console.log("sound:stop"),document.getElementsByTagName("body")[0].classList.remove("timerAlert"),o.sound2Min.loop=!1,o.sound2Min.pause(),o.sound2Min.currentTime=0})}},{"./globalVar_html.js":6,"./sound":9,"./utility-function/eventTrigger":13}],11:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.titleContentInit=void 0;var i=e("./globalVar_html.js"),u=e("./utility-function/eventTrigger");n.titleContentInit=function(){function o(e){document.getElementById("ipt-curDoing").value=e.match(/.*/)[0]}var t=document.getElementById("txa-doingNote");o(t.value),document.getElementById("ipt-curDoing").addEventListener("change",function(e){!function(e){t.value=t.value.replace(/.*/,e),(0,u.triggerNativeEvent)(t,"change")}(e.target.value)}),document.getElementById("txa-doingNote").addEventListener("change",function(e){var t=e.target.value;o(t);var n=new FormData;n.append("title",t),fetch(i.base_url+"doing_timer/set_title/"+i.type,{method:"POST",body:n}).then(function(e){if(!e.ok)throw new Error(e.statusText);return e.text()}).then(function(){}).catch(function(e){console.log("There has been a problem with your fetch operation: ",e.message)})}),document.getElementById("txa-timeMark").addEventListener("change",function(e){var t=e.target.value,n=new FormData;n.append("content",t),fetch(i.base_url+"doing_timer/set_content/"+i.type,{method:"POST",body:n}).then(function(e){if(!e.ok)throw new Error(e.statusText);return e.text()}).then(function(){}).catch(function(e){console.log("There has been a problem with your fetch operation: ",e.message)})})}},{"./globalVar_html.js":6,"./utility-function/eventTrigger":13}],12:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.currentTime=void 0;n.currentTime=function(){var e=new Date,t=e.getHours();t=t<10?"0"+t:t;var n=e.getMinutes();return t+":"+(n=n<10?"0"+n:n)}},{}],13:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.triggerNativeEvent=void 0;n.triggerNativeEvent=function(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!1),e.dispatchEvent(n)}},{}],14:[function(e,t,n){"use strict";function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,o)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(n,!0).forEach(function(e){u(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(n,"__esModule",{value:!0}),n.extend=void 0;n.extend=function(e){e=e||{};for(var t=0;t<(arguments.length<=1?0:arguments.length-1);t++)(t+1<1||arguments.length<=t+1?void 0:arguments[t+1])&&(e=i({},e,{},t+1<1||arguments.length<=t+1?void 0:arguments[t+1]));return e}},{}]},{},[5]);
//# sourceMappingURL=../dist/app.js.map
