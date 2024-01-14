// import { async } from "regenerator-runtime"
import {API_URL, API_KEY, RES_PER_PAGE} from "./config.js"
import { AJAX } from "./helpers.js"
// import { getJSON, sendJSON } from "./helpers.js"


export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage:RES_PER_PAGE,
    },
    bookmarks: [],
}
const createRecipeObject = function(data) {
    const {recipe} = data.data
        return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            ...(recipe.key && {key : recipe.key}),
            // key: recipe.key ? recipe.key : '',
        }
}
export const loadRecipe = async function(id) {
    try {
        const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`)

        state.recipe = createRecipeObject(data)

        if(state.bookmarks.some(mark => mark.id === id)){ state.recipe.bookmarked = true}
        else {
            state.recipe.bookmarked = false
        }
        
        // console.log(state.recipe)
    }
    catch(err) {
        console.error(`${err} 🎈`)
        throw(err)
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query
        const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`)
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key : rec.key}),
            }
        })
        state.search.page = 1
        // console.log(state.search.results)
        
    }
    catch {
        console.error(`${err} 🎈`)
        throw(err)
    }
}
export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page
    const start = (page - 1) * state.search.resultsPerPage // 0
    const end = page * state.search.resultsPerPage // 9

    return state.search.results.slice(start, end)
} 
export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing => {
        // new Quantity = OldQt * newServings / oldServings 
        ing.quantity = ing.quantity * newServings / state.recipe.servings
    })
    state.recipe.servings = newServings
}
const persistBookmarks = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
    
}
export const addBookMark = function(recipe) {
    // add bookmarks
    state.bookmarks.push(recipe)

    // mark current recipe as bookmarked
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true

    persistBookmarks()
}
export const deleteBookMark = function(id) {
    // delete bookmarks
    const index = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(index, 1)

    // mark current recipe as NOT bookmarked
    if(id === state.recipe.id) state.recipe.bookmarked = false

    persistBookmarks()
}
const init = function() {
    const storage = localStorage.getItem('bookmarks')
    if(storage) state.bookmarks = JSON.parse(storage)
}
init()
// console.log(state.bookmarks)

const clearBookmarks = function() {
    localStorage.clear('bookmarks')
}

export const uploadRecipe = async function(newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].includes('ingredient') && entry[1].length !== 0)
        .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim())
        if(ingArr.length !== 3) throw new Error('Wrong ingredient format. Please use the correct format!')
        const [quantity, unit, description] = ingArr
        return {quantity: quantity ? +quantity : null , unit, description}
        })
        // console.log(ingredients)
        // console.log(newRecipe)

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            servings: +newRecipe.servings,
            cooking_time:+ newRecipe.cookingTime,
            ingredients,
        }
        // console.log(recipe)
        const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe)

        state.recipe = createRecipeObject(data)
        addBookMark(state.recipe)
        // console.log(data)
    }
    catch(err) {
        throw err
    }

}