import{a as g,S as h,i as c}from"./assets/vendor-qhGxV49-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const y="https://pixabay.com/api/",L="52252669-cc5c6090dc05e341eb544e959";function b(i){return g.get(y,{params:{key:L,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(o=>o.data)}const u=document.querySelector(".gallery"),n=document.getElementById("loader"),v=new h(".gallery a",{captionsData:"alt",captionDelay:250});function w(i){if(i.length===0)return;const o=i.map(r=>{const{webformatURL:l,largeImageURL:e,tags:t,likes:a,views:f,comments:m,downloads:p}=r;return`
      <li class="gallery-item">
        <a class="gallery-link" href="${e}">
          <img class="gallery-image" src="${l}" alt="${t}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${a}</p>
          <p class="info-item"><b>Views:</b> ${f}</p>
          <p class="info-item"><b>Comments:</b> ${m}</p>
          <p class="info-item"><b>Downloads:</b> ${p}</p>
        </div>
      </li>
    `}).join("");u.insertAdjacentHTML("beforeend",o),v.refresh()}function S(){u.innerHTML=""}function E(){n&&(n.classList.remove("visually-hidden"),n.classList.add("is-loading"))}function P(){n&&(n.classList.add("visually-hidden"),n.classList.remove("is-loading"))}const d=document.querySelector(".form"),s=d.querySelector("input");d.addEventListener("submit",q);function q(i){i.preventDefault();const o=s.value.trim();if(o===""){s.classList.add("input-error"),c.warning({title:"Warning",message:"Please enter a search term.",position:"topRight"});const r=()=>{s.classList.remove("input-error"),s.removeEventListener("focus",r)};s.addEventListener("focus",r);return}S(),E(),b(o.toLowerCase()).then(r=>{if(!r.hits||r.hits.length===0){c.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}w(r.hits)}).catch(r=>{c.error({title:"Error",message:"Something went wrong while fetching images. Please try again later.",position:"topRight"})}).finally(()=>{P(),s.value=""})}
//# sourceMappingURL=index.js.map
