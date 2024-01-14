const e="https://forkify-api.herokuapp.com/api/v2/recipes",t="4345b5b8-bf81-4e32-88f5-66c78dbf1bbf",r=async function(e){try{let t=await Promise.race([fetch(e),new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 3 second"))},3e3)})]),r=await t.json();if(!t.ok)throw Error(`${r.message} ${t.status}`);return r}catch(e){throw e}},a={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:10}},s=async function(s){try{let{recipe:i}=(await r(`${e}/${s}?key=${t}`)).data;a.recipe={id:i.id,title:i.title,publisher:i.publisher,sourceUrl:i.source_url,image:i.image_url,servings:i.servings,cookingTime:i.cooking_time,ingredients:i.ingredients},console.log(a.recipe)}catch(e){throw console.error(`${e} \u{1F388}`),e}},i=async function(s){try{a.search.query=s;let i=await r(`${e}?search=${s}&key=${t}`);a.search.results=i.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url}))}catch{throw console.error(`${err} \u{1F388}`),err}},n=function(e=a.search.page){a.search.page=e;let t=(e-1)*a.search.resultsPerPage,r=e*a.search.resultsPerPage;return a.search.results.slice(t,r)};class l{render(e){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let t=this._generateMarkup();this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let e=`
            <div class="spinner my-[5rem] mx-auto text-center">
                <i class="fa-solid fa-spinner text-[5rem] text-result-text animate-spin"></i>
            </div>
        `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)}renderError(e=this._errorMessage){let t=`
            <div class="error flex justify-center gap-4 text-center my-[5rem] mx-auto">
                <div class="mr-[1rem] text-result-text ">
                    <i class="fa-solid fa-triangle-exclamation text-[2.5rem]"></i>
                </div>
                <p class="flex-wrap">${e}</p>
            </div> 
        `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderMessage(e=this._message){let t=`
            <div class="message flex justify-center gap-4 text-center my-[5rem] mx-auto">
                <div class="mr-[1rem] text-result-text ">
                    <i class="fa-regular fa-face-smile text-[2.5rem]"></i>
                </div>
                <p class="flex-wrap">${e}</p>
            </div> 
        `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}}class c extends l{_parentElement=document.querySelector(".recipe");_data;_errorMessage="We could not find that recipe. Please try another one!";_message="";render(e){this._data=e;let t=this._generateMarkup();this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let e=`
            <div class="spinner my-[5rem] mx-auto text-center">
                <i class="fa-solid fa-spinner text-[5rem] text-result-text animate-spin"></i>
            </div>
        `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)}renderError(e=this._errorMessage){let t=`
            <div class="error flex justify-center gap-4 text-center my-[5rem] mx-auto">
                <div class="mr-[1rem] text-result-text ">
                    <i class="fa-solid fa-triangle-exclamation text-[2.5rem]"></i>
                </div>
                <p class="flex-wrap">${e}</p>
            </div> 
        `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderMessage(e=this._message){let t=`
            <div class="message flex justify-center gap-4 text-center my-[5rem] mx-auto">
                <div class="mr-[1rem] text-result-text ">
                    <i class="fa-regular fa-face-smile text-[2.5rem]"></i>
                </div>
                <p class="flex-wrap">${e}</p>
            </div> 
        `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}addHandlerRender(e){window.addEventListener("hashchange",e),window.addEventListener("load",e)}_generateMarkup(){return`
            <figure class="recipe__fig relative h-[32rem] before:content-[''] before:absolute before:top-0 before:left-0 before:opacity-70 before:w-full before:h-full">
            <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img w-full h-full block object-cover">
            <h1 class="recipe__title absolute bottom-0 right-1/2 translate-x-1/2  skew-y-[-6deg]  font-bold uppercase w-1/2 text-center ">
                <span class="px-[2rem] py-[1.3rem] text-[#fff] text-[3.25rem] leading-[1.9] font-bold text-center box-decoration-clone">${this._data.title}</span>
            </h1>
        </figure>
        <div class="recipe__details flex items-center px-[8rem] pt-[7.5rem] pb-[3.5rem]">
            <div class="recipe__info mr-[4.5rem] flex">
                <div class="recipe__info-icon mr-[1.1rem] ">
                    <i class="fa-regular fa-clock text-[1.8rem] text-result-text"></i>
                </div>
                    <span class="recipe__info-data recipe__info-data--minutes mr-[.5rem] font-bold">${this._data.cookingTime}</span>
                    <span class="recipe__info-text uppercase">minutes</span>
                
            </div>
            <div class="recipe__info flex">
                <div class="recipe__info-icon mr-[1.1rem] ">
                    <i class="fa-solid fa-user-group text-[1.8rem] text-result-text"></i>
                </div>
                <span class="recipe__info-data recipe__info-data--people mr-[.5rem] font-bold">${this._data.servings}</span>
                <span class="recipe__info-text uppercase">servings</span>

                <div class="recipe__info-buttons flex ml-[1.5rem]">
                    <button class="btn--tiny btn--update-servings mr-[.8rem] duration-300 hover:-translate-y-[1px]" data-update-to="">
                        <i class="fa-regular fa-square-minus text-result-text"></i>
                    </button>
                    <button class="btn--tiny btn--update-servings duration-300 hover:-translate-y-[1px]" data-update-to="">
                        <i class="fa-regular fa-square-plus text-result-text"></i>
                    </button>
                </div>
            </div>
            <div class="recipe__user-generated flex justify-center items-center bg-[#eeeae8] w-[4rem] h-[4rem] rounded-[50%] ml-auto mr-[1.7rem]">
                <i class="fa-regular fa-user text-[2rem] text-result-text"></i>
            </div>
            <div class="btn--round btn--bookmark flex justify-center items-center w-[4.5rem] h-[4.5rem] bg-gradient text-[#fff] rounded-[50%] cursor-pointer duration-300 hover:scale-105">
                <i class="fa-regular fa-bookmark"></i>
            </div>
        </div>
        <div class="recipe__ingredients px-[8rem] py-[5rem] bg-[#f2efee] text-[1.6rem] leading-[1.4] flex flex-col items-center">
            <h2 class="heading--2 text-[2rem] font-bold uppercase mb-[2.5rem] text-result-text text-center">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list grid grid-cols-2 gap-x-[2.5rem] gap-y-[3rem]">
                ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
            </ul>
        </div>
        <div class="recipe__directions px-[10rem] py-[5rem] text-[1.6rem] flex flex-col items-center">
            <h2 class="heading--2 text-[2rem] font-bold uppercase mb-[2.5rem] text-result-text text-center">How to cook it</h2>
            <p class="recipe__directions-text text-center mb-[3.5rem] text-[1.7rem] text-[#918581]">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher font-bold"> ${this._data.publisher}</span>
                Please check out directions at their website.
            </p>
            <a href="${this._data.sourceUrl}" target="_blank" class="btn--small recipe__btn px-[2.25rem] py-[1.25rem] text-[#fff] border-none bg-gradient cursor-pointer flex items-center justify-between flex-nowrap rounded-[10rem] uppercase duration-300 hover:scale-105">
                <span class="mr-[1rem] text-[1.3rem] font-bold">Directions</span>
                <i class="fa-solid fa-arrow-right text-[1.4rem]"></i>
            </a>
        </div>
        `}_generateMarkupIngredient(e){return`<li class="recipe__ingredient flex">
            <div class="recipe__icon w-[2rem] h-[2rem] flex justify-center items-center mr-[1.1rem] mt-[.1rem]">
                <i class="fa-solid fa-check text-result-text "></i>
            </div>
            <div class="recipe__quantity mr-[.5rem] basis-auto">${e.quantity?e.quantity:""}</div>
            <div class="recipe__description">
                <span class="recipe__unit">${e.unit}
                </span>
                ${e.description}
            </div>
        </li>`}}var o=new c;class d{_parentElement=document.querySelector(".search");getQuery(){let e=this._parentElement.querySelector(".search__field").value;return this.clearInput(),e}clearInput(){this._parentElement.querySelector(".search__field").value=""}addHandlerSearch(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault(),e()})}}var p=new d;class m extends l{_parentElement=document.querySelector(".results");_errorMessage="No recipes found for your query. Please try again!";_message="";_generateMarkup(){return this._data.map(this._generateMarkupPreview).join("")}_generateMarkupPreview(e){return`
        <div class="preview duration-300 hover:bg-[#f9f5f3]">
            <a href="${e.id}" class="preview__link flex items-center py-[3rem] px-[2rem] duration-300 border border-r-2 border-white border-solid">
                <figure class="preview__fig grow-0 shrink-0 basis-[5.8rem] h-[5.8rem] rounded-[50%] border-none mr-[2rem] relative overflow-hidden">
                    <img src="${e.image}" class="block w-full h-full object-cover">
                </figure>
                <div class="preview__data grid gap-y-[.1rem] items-center">
                    <h4 class="preview__title col-span-full uppercase font-semibold text-[1.5rem] text-result-text text-ellipsis overflow-hidden whitespace-nowrap">${e.title}</h4>
                    <p class="preview__publisher uppercase font-semibold text-[1.2rem] text-[#918581]">${e.publisher}</p>
                    <div class="preview__user-generated bg-[#eeeae8] flex items-center justify-center h-[2.4rem] w-[2.4rem] rounded-[10rem] ml-auto mr-[1.5rem]">
                        <i class="fa-regular fa-user text-[1.5rem] text-result-text"></i>
                    </div>
                </div>
            </a>
        </div> 
        `}}var u=new m;class f extends l{_parentElement=document.querySelector(".pagination");addHandlerClick(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--inline");r&&e(Number(r.dataset.goto))})}_generateMarkup(){let e=this._data.page,t=Math.ceil(this._data.results.length/this._data.resultsPerPage);return 1===e&&t>1?`
            <button data-goto="${e+1}" class="btn--inline pagination__btn--next text-result-text border-none bg-[#f9f5f3] ml-auto py-[.9rem] px-[1.5rem] rounded-[2rem] cursor-pointer flex items-center flex-nowrap duration-300 hover:bg-[#f2efee]">
                <span class="text-[1.4rem]">Page ${e+1}</span>
                <i class="fa-solid fa-arrow-right text-[1.4rem] ml-[.5rem]"></i>
            </button>
            `:e===t&&t>1?`
            <button data-goto="${e-1}" class="btn--inline pagination__btn--prev text-result-text border-none bg-[#f9f5f3] mr-auto py-[.9rem] px-[1.5rem] rounded-[2rem] cursor-pointer flex items-center flex-nowrap duration-300 hover:bg-[#f2efee]">
                <i class="fa-solid fa-arrow-left text-[1.4rem] mr-[.5rem]"></i>
                <span class="text-[1.4rem] ">Page ${e-1}</span>
            </button>
            `:e<t?`
            <button data-goto="${e-1}" class="btn--inline pagination__btn--prev text-result-text border-none bg-[#f9f5f3] mr-auto py-[.9rem] px-[1.5rem] rounded-[2rem] cursor-pointer flex items-center flex-nowrap duration-300 hover:bg-[#f2efee]">
                <i class="fa-solid fa-arrow-left text-[1.4rem] mr-[.5rem]"></i>
                <span class="text-[1.4rem] ">Page ${e-1}</span>
            </button>
            <button data-goto="${e+1}" class="btn--inline pagination__btn--next text-result-text border-none bg-[#f9f5f3] ml-auto py-[.9rem] px-[1.5rem] rounded-[2rem] cursor-pointer flex items-center flex-nowrap duration-300 hover:bg-[#f2efee]">
                <span class="text-[1.4rem]">Page ${e+1}</span>
                <i class="fa-solid fa-arrow-right text-[1.4rem] ml-[.5rem]"></i>
            </button>
            `:""}}var x=new f;const g=async function(){try{let e=window.location.hash.slice(1);if(console.log(e),!e)return;o.renderSpinner(),await s(e),o.render(a.recipe)}catch(e){o.renderError()}},_=async function(){try{u.renderSpinner();let e=p.getQuery();if(!e)return;await i(e),u.render(n()),x.render(a.search)}catch(e){console.log(e)}};o.addHandlerRender(g),p.addHandlerSearch(_),x.addHandlerClick(function(e){u.render(n(e)),x.render(a.search)});
//# sourceMappingURL=index.805d18d1.js.map
