import View from './view.js'

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination')

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline')
            if(!btn) return
            const gotToPage = Number(btn.dataset.goto)

            handler(gotToPage)
        })
    }
    _generateMarkup() {
        const curPage = this._data.page
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
        // console.log(numPages)
        // Page 1, and there are other pages
        if(curPage === 1 && numPages > 1) {
            return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next text-result-text border-none bg-[#f9f5f3] ml-auto py-[.9rem] px-[1.5rem] rounded-[2rem] cursor-pointer flex items-center flex-nowrap duration-300 hover:bg-[#f2efee]">
                <span class="text-[1.4rem]">Page ${curPage + 1}</span>
                <i class="fa-solid fa-arrow-right text-[1.4rem] ml-[.5rem]"></i>
            </button>
            `
            
        }
    
        // Last page
        if(curPage === numPages && numPages > 1) {
            return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev text-result-text border-none bg-[#f9f5f3] mr-auto py-[.9rem] px-[1.5rem] rounded-[2rem] cursor-pointer flex items-center flex-nowrap duration-300 hover:bg-[#f2efee]">
                <i class="fa-solid fa-arrow-left text-[1.4rem] mr-[.5rem]"></i>
                <span class="text-[1.4rem] ">Page ${curPage - 1}</span>
            </button>
            `
        }
        // Other page
        if(curPage < numPages) {
            return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev text-result-text border-none bg-[#f9f5f3] mr-auto py-[.9rem] px-[1.5rem] rounded-[2rem] cursor-pointer flex items-center flex-nowrap duration-300 hover:bg-[#f2efee]">
                <i class="fa-solid fa-arrow-left text-[1.4rem] mr-[.5rem]"></i>
                <span class="text-[1.4rem] ">Page ${curPage - 1}</span>
            </button>
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next text-result-text border-none bg-[#f9f5f3] ml-auto py-[.9rem] px-[1.5rem] rounded-[2rem] cursor-pointer flex items-center flex-nowrap duration-300 hover:bg-[#f2efee]">
                <span class="text-[1.4rem]">Page ${curPage + 1}</span>
                <i class="fa-solid fa-arrow-right text-[1.4rem] ml-[.5rem]"></i>
            </button>
            `
        }
        // Page 1, and there are NO other pages
        return ''
    }
    
}
export default new PaginationView()