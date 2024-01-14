import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './view/recipeView.js'
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import bookmarksView from './view/bookmarksView.js';
import paginationView from './view/paginationView.js';
import addRecipeView from './view/AddRecipeView.js';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// if(module.hot) {
//   module.hot.accept()
// }

const controlRecipe = async function() {

    try {
      const id = window.location.hash.slice(1) // get hash from window url
      // console.log(id)

      if(!id) return
      recipeView.renderSpinner()

      resultsView.update(model.getSearchResultsPage())

      // update bookmarks view
      bookmarksView.update(model.state.bookmarks)
      
      // loading recipe
      await model.loadRecipe(id)

      // rendering recipe
      recipeView.render(model.state.recipe)

      recipeView.update(model.state.recipe)

      
    }
    catch(err) {
      recipeView.renderError()
    }
} 

const controlSearchReults = async function() {
  try {
    resultsView.renderSpinner()

    // get search query
    const query = searchView.getQuery()
    if(!query) return

    // load search results
    await model.loadSearchResults(query)
    
    // console.log(model.state.search.results)
    //render results
    resultsView.render(model.getSearchResultsPage())

    // render init paginationView
    paginationView.render(model.state.search)
  }
  catch(err) {
    console.log(err)
  }
} 
const controlPagination = function(gotToPage) {
  // render new Results
  resultsView.render(model.getSearchResultsPage(gotToPage))

  // render new paginationView
  paginationView.render(model.state.search)
}
const controlServings = function(newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings)

  // update the recipe view
  recipeView.render(model.state.recipe)

}
const controlAddBookMark = function() {
  //  Add and remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe)
  else {
    model.deleteBookMark(model.state.recipe.id)
  }

  // update recipe view
  recipeView.update(model.state.recipe)

  bookmarksView.render(model.state.bookmarks)

  // console.log(model.state.recipe)
  // console.log(model.state.bookmarks)

}
const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe) {
  try {
    // show rendering spinner
    addRecipeView.renderSpinner()

    // update the new recipe data
    await model.uploadRecipe(newRecipe)

    // console.log(model.state.recipe)

    // render recipe on recipe view placeHold
    recipeView.render(model.state.recipe)

    // success message
    addRecipeView.renderMessage()

    // render bookmark view
    bookmarksView.render(model.state.bookmarks)

    // change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    // reset add recipe form 
    
    // close form window
    setTimeout(() => {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);
  }
  catch(err) {
    console.error('✨', err)
    addRecipeView.renderError(err.message)
  }

  
}
const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchReults)
  paginationView.addHandlerClick(controlPagination)
  recipeView.addHandlerAddBookmark(controlAddBookMark)
  addRecipeView._addHandlerUpload(controlAddRecipe)
}
init()
