var m=Object.defineProperty;var w=(o,e,h)=>e in o?m(o,e,{enumerable:!0,configurable:!0,writable:!0,value:h}):o[e]=h;var t=(o,e,h)=>(w(o,typeof e!="symbol"?e+"":e,h),h);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))A(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&A(n)}).observe(document,{childList:!0,subtree:!0});function h(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function A(s){if(s.ep)return;s.ep=!0;const i=h(s);fetch(s.href,i)}})();const y=window.innerWidth-10,x=window.innerHeight-10,r=document.querySelector("#canvas"),u=r.getContext("2d");r.width=y;r.height=x;const p="/assets/tank_1-BV0SEWjr.png",v="/assets/Gun_01-BYbZZPjZ.png",c="/assets/Flash_A_01-CxwdvCpw.png",g="/assets/Flash_A_02-Ck0sB_nk.png",d="data:image/png;base64,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";class P{constructor(e,h,A){t(this,"context");t(this,"x");t(this,"y");t(this,"width");t(this,"height");t(this,"image");t(this,"mouse");t(this,"rotation");t(this,"isShooting",!1);t(this,"currentShotSprite",0);t(this,"shotSprites");this.context=e,this.x=h,this.y=A,this.mouse={x:0,y:0};const s=new Image;s.src=v,s.onload=()=>{this.width=s.width,this.height=s.height,this.image=s},this.shotSprites=[c,c,c,c,g,g,g,g,d,d,d,d].map(i=>{const n=new Image;return n.src=i,n}),document.addEventListener("mousemove",i=>{this.mouse.x=i.clientX,this.mouse.y=i.clientY})}shoot(){this.isShooting=!0}update(e,h){this.x=e,this.y=h,this.rotation=Math.atan2(this.mouse.x-e,-(this.mouse.y-h)),this.isShooting&&(this.currentShotSprite<this.shotSprites.length-1?this.currentShotSprite++:(this.currentShotSprite=0,this.isShooting=!1))}draw(){this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.rotation),this.image&&this.context.drawImage(this.image,-(this.width/4),-(this.height/4),this.width/2,this.height/2),this.context.restore();const e=this.x+80*Math.sin(this.rotation),h=this.y-80*Math.cos(this.rotation);if(this.context.save(),this.context.translate(e,h),this.context.rotate(this.rotation),this.isShooting){const A=this.shotSprites[this.currentShotSprite];this.context.drawImage(A,-A.width/4,-A.height/4,A.width/2,A.height/2)}this.context.restore()}}const B="data:image/png;base64,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";class z{constructor(e,h,A,s){t(this,"context");t(this,"x");t(this,"y");t(this,"width");t(this,"height");t(this,"angle");t(this,"image");t(this,"destroyed");t(this,"speed",20);this.context=e,this.x=h,this.y=A,this.angle=s,this.destroyed=!1;const i=new Image;i.src=B,i.onload=()=>{this.width=i.width,this.height=i.height,this.image=i}}update(){this.x+=this.speed*Math.sin(this.angle),this.y-=this.speed*Math.cos(this.angle),(this.x>this.context.canvas.width||this.x<0)&&this.destroy(),(this.y>this.context.canvas.height||this.y<0)&&this.destroy()}draw(){this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.image&&this.context.drawImage(this.image,-(this.width/4),-(this.height/4),this.width/2,this.height/2),this.context.restore()}destroy(){this.destroyed=!0}}class I{constructor(e,h,A){t(this,"context");t(this,"x");t(this,"y");t(this,"width");t(this,"height");t(this,"keys");t(this,"image");t(this,"speed",3);t(this,"maxSpeed",5);t(this,"acceleration",.2);t(this,"friction",.06);t(this,"rotation",Math.PI/60);t(this,"angle",0);t(this,"gun");t(this,"projectiles");this.context=e,this.x=h,this.y=A,this.projectiles=[],this.keys={w:!1,s:!1,d:!1,a:!1};const s=h+65*Math.sin(this.angle),i=A-65*Math.cos(this.angle);this.gun=new P(e,s,i);const n=new Image;n.src=p,n.onload=()=>{this.width=n.width,this.height=n.height,this.image=n},document.addEventListener("keydown",l=>{const a=l.key.toLowerCase();Object.keys(this.keys).includes(a)&&(this.keys[a]=!0)}),document.addEventListener("keyup",l=>{const a=l.key.toLowerCase();Object.keys(this.keys).includes(a)&&(this.keys[a]=!1)}),document.addEventListener("click",()=>this.shoot())}shoot(){const e=this.x-15*Math.sin(this.angle)+65*Math.sin(this.gun.rotation),h=this.y+15*Math.cos(this.angle)-65*Math.cos(this.gun.rotation),A=new z(this.context,e,h,this.gun.rotation);this.projectiles.push(A),this.gun.shoot()}move(){this.keys.w?(this.speed+=this.acceleration,this.keys.a&&(this.angle-=this.rotation),this.keys.d&&(this.angle+=this.rotation)):this.speed-=this.friction,this.speed>this.maxSpeed?this.speed=this.maxSpeed:this.speed<0&&(this.speed=0),this.x+=this.speed*Math.sin(this.angle),this.y-=this.speed*Math.cos(this.angle)}update(){this.move();const e=this.x-15*Math.sin(this.angle),h=this.y+15*Math.cos(this.angle);this.gun.update(e,h),this.projectiles=this.projectiles.filter(A=>(A.update(),!A.destroyed))}draw(){this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.image&&this.context.drawImage(this.image,-50,-50,100,100),this.context.restore()}render(){this.update(),this.draw(),this.gun.draw(),this.projectiles.forEach(e=>{e.draw()})}}const S=new I(u,r.width/2,r.height/2);function f(){u.clearRect(0,0,r.width,r.height),S.render(),requestAnimationFrame(f)}f();
