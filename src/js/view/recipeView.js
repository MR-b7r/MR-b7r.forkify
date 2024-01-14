// import {Fraction} from './fractional'
// console.log(Fraction)
import View from './view.js'

class RecipeView extends View{
    _parentElement = document.querySelector('.recipe')
    _data;
    _errorMessage = `We could not find that recipe. Please try another one!`
    _message = ''

    render(data) {
        this._data = data
        const markup = this._generateMarkup()
        this._clear()
        this._parentElement.insertAdjacentHTML("afterbegin", markup)

    }
    _clear() {
        this._parentElement.innerHTML = ''
    }
    renderSpinner() {
        const markup = `
            <div class="spinner my-[5rem] mx-auto text-center">
                <i class="fa-solid fa-spinner text-[5rem] text-result-text animate-spin"></i>
            </div>
        `   
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error flex justify-center gap-4 text-center my-[5rem] mx-auto">
                <div class="mr-[1rem] text-result-text ">
                    <i class="fa-solid fa-triangle-exclamation text-[2.5rem]"></i>
                </div>
                <p class="flex-wrap">${message}</p>
            </div> 
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    renderMessage(message = this._message) {
        const markup = `
            <div class="message flex justify-center gap-4 text-center my-[5rem] mx-auto">
                <div class="mr-[1rem] text-result-text ">
                    <i class="fa-regular fa-face-smile text-[2.5rem]"></i>
                </div>
                <p class="flex-wrap">${message}</p>
            </div> 
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    addHandlerRender(handler) {
        // ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe))
        window.addEventListener('hashchange', handler)
        window.addEventListener('load', handler)
        
    }

    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--update-servings')
            if(!btn) return 
            const updateTo = Number(btn.dataset.updateTo) 
            if(updateTo > 0)handler(updateTo)
        })
        
    }
    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--bookmark ')
            if(!btn) return
            handler()
        })
    }
    _generateMarkup() {
        return `
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
                    <button class="btn--tiny btn--update-servings mr-[.8rem] duration-300 hover:-translate-y-[1px]" data-update-to="${this._data.servings - 1}">
                        <i class="fa-regular fa-square-minus text-result-text"></i>
                    </button>
                    <button class="btn--tiny btn--update-servings duration-300 hover:-translate-y-[1px]" data-update-to="${this._data.servings + 1}">
                        <i class="fa-regular fa-square-plus text-result-text"></i>
                    </button>
                </div>
            </div>
            <div class="recipe__user-generated flex justify-center items-center bg-[#eeeae8] w-[4rem] h-[4rem] rounded-[50%] ml-auto mr-[1.7rem]">
                <i class="fa-regular fa-user text-[2rem] text-result-text  ${this._data.key ? 'flex' : 'hidden'}"></i>
            </div>
            <div class="btn--round btn--bookmark flex justify-center items-center w-[4.5rem] h-[4.5rem] bg-gradient text-[#fff] rounded-[50%] cursor-pointer duration-300 hover:scale-105">
                <i class=" ${this._data.bookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}"></i>
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
        `
    }
    _generateMarkupIngredient(ing) {
        return `<li class="recipe__ingredient flex">
            <div class="recipe__icon w-[2rem] h-[2rem] flex justify-center items-center mr-[1.1rem] mt-[.1rem]">
                <i class="fa-solid fa-check text-result-text "></i>
            </div>
            <div class="recipe__quantity mr-[.5rem] basis-auto">${ing.quantity ? ing.quantity : ''}</div>
            <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}
                </span>
                ${ing.description}
            </div>
        </li>`
        }
}
export default new RecipeView()