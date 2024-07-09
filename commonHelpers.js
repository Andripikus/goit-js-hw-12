import{a as h,S as b,i as a}from"./assets/vendor-b11e2a50.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const L="44743173-b0da996c95212aae97675bf04",S="https://pixabay.com/api/";function q(i,r=1,o=12){return h.get(S,{params:{key:L,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:o}}).then(s=>s.data).catch(s=>{throw console.error("Error fetching images:",s),s})}let c;function v(i){const r=document.querySelector(".gallery"),o=i.map(({webformatURL:s,largeImageURL:e,tags:t,likes:n,views:p,comments:y,downloads:g})=>`
    <div class="photo-card">
      <a href="${e}">
        <img class="card-img" src="${s}" alt="${t}" loading="lazy" />
      </a>
      <div class="card-info">
        <p class="info-item"><b>Likes</b> ${n}</p>
        <p class="info-item"><b>Views</b> ${p}</p>
        <p class="info-item"><b>Comments</b> ${y}</p>
        <p class="info-item"><b>Downloads</b> ${g}</p>
      </div>
    </div>
    `).join("");r.innerHTML=o,c?c.refresh():c=new b(".gallery a")}function P(){const i=document.querySelector(".gallery");i.innerHTML=""}const m=document.querySelector("#search-form"),l=m.querySelector(".form-input"),d=document.querySelector("#loader");let u=1;m.addEventListener("submit",i=>{i.preventDefault();const r=l.value.trim();if(r===""){a.error({title:"Error",message:"Please enter a search query",position:"center"});return}u=1,P(),w(),l.value="",q(r,u).then(o=>{setTimeout(()=>{if(f(),o.hits.length===0){a.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"});return}v(o.hits)},2e3)}).catch(o=>{setTimeout(()=>{f(),a.error({title:"Error",message:"Something went wrong. Please try again later.",position:"center"})},2e3)})});function w(){d.style.display="block"}function f(){d.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
