import View from './view.js'

class PreviewView extends View {
    _parentElement = ''


    _generateMarkup() {
        const id = window.location.hash.slice(1)
        return `
        <div class="preview bg-[#fff] mb-[.5rem] duration-150 hover:-translate-y-[1px]">
            <a class="preview__link ${this._data.id === id ? 'preview__link--active' : ""} flex items-center py-[1.5rem] px-[3.25rem] border-r border-solid border-[#fff]" href="#${this._data.id}">
                <figure class="preview__fig grow-0 shrink-0 basis-[5.8rem] rounded-[50%] overflow-hidden mr-[2rem] relative h-[5.8rem]">
                    <img src="${this._data.image}" alt="Test" class="w-full h-full block object-cover "/>
                </figure>
                <div class="preview__data grid w-full gap-y-[.1rem] items-center">
                    <h4 class="preview__name  col-span-full uppercase font-semibold text-[1.5rem] text-result-text text-ellipsis overflow-hidden whitespace-nowrap">
                    ${this._data.title}
                    </h4>
                    <p class="preview__publisher uppercase font-semibold text-[1.2rem] text-[#918581]">${this._data.publisher}</p>
                    <div class="preview__user-generated  bg-[#eeeae8]  items-center justify-center h-[2.4rem] w-[2.4rem] rounded-[10rem] ml-auto mr-[1.5rem] ${this._data.key ? 'flex' : 'hidden'}">
                        <i class="fa-regular fa-user text-[1.5rem] text-result-text "></i>
                    </div>
                </div>
            </a>
        </div> 
        `
    }
    
}

export default new PreviewView() 