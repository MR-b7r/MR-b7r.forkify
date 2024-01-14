export default class View {

    _data

    /**
     * 
     * @param { Object | Object[] } data => the data to be rendered (e.g recipe) 
     * @param {boolean} [render = true] if false, create markup string instead of rendering to the DOM 
     * @returns {undefined | string}
     */
    render(data, render = true) {
        if(!data || Array.isArray(data) && data.length === 0) return this.renderError()
        this._data = data
        const markup = this._generateMarkup()

        if(!render) return markup
        this._clear()
        this._parentElement.insertAdjacentHTML("afterbegin", markup)

    }
    update(data) {

        this._data = data
        const newMarkup = this._generateMarkup()

        const newDom = document.createRange().createContextualFragment(newMarkup)
        const newElements = Array.from(newDom.querySelectorAll('*'))
        const curElements = Array.from(this._parentElement.querySelectorAll('*'))
        // console.log(newElements) 
        // console.log(curElements) 
        newElements.forEach((newEl, i) => {
            const curEl = curElements[i]

            // update changed text
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
                // console.log(newEl.firstChdild.nodeValue.trim())
                curEl.textContent = newEl.textContent
            }

            // update changed attributes
            if(!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
            }
        })
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
}