import"./Bzak7iHL.js";import{t as m,a as b,d as f,c as h,r as s}from"./DTIdTzvd.js";import{s as c}from"./tvd98vth.js";import{p as e}from"./CBwARAgb.js";var u=h('<div class="round-terminal svelte-1pctwgq"><pre></pre></div>');function C(a,t){e(t,"width",3,450),e(t,"height",3,450);let d=e(t,"borderWidth",3,2),i=e(t,"radius",3,10);e(t,"fontSize",3,14),e(t,"fontColor",3,"#FFFFFF");let o=e(t,"borderColor",3,"#DDDDDD"),n=e(t,"gradientStart",3,"rgb(8, 95, 146)"),l=e(t,"gradientEnd",3,"rgb(39, 143, 217)");e(t,"text",3,"Connect"),e(t,"editable",3,!1);var r=u(),g=f(r);g.textContent="content",s(r),m(()=>c(r,`
  height: 100%;
    border: ${d()??""}px solid ${o()??""};
    border-radius: ${i()??""}px;
    background: linear-gradient(to right, ${n()??""}, ${l()??""});
  `)),b(a,r)}export{C as R};
