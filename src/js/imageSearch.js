import servise from './apiService';
import cardImeges from '../templates/templates.hbs';
import refs from './refs';
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');


refs.searchForm.addEventListener('submit',imageSearchInputHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function imageSearchInputHandler(e) {

  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;
  const query = e.target.value;

  clearListItems();

  servise.resetPage();
  servise.searchQuerry = input.value;

  servise.fetcArticles(query).then(hits => {
    const markup = buildListItemsTemplate(hits);
    if (input.value ==="") {
      error({
        text: "Please enter query!"
      });
    } else if (hits.length < 1) {
      error({
        text: "Nothing has been found. Please enter a more specific query!"
      });
    } else
    iserListItems(markup);
  })
  .catch(Error => {
      Error({
          text: "You must enter query parameters!"
      });
      console.log(Error)
  })
  }


function loadMoreBtnHandler() {
  servise.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);
    
  });
  refs.loadMoreBtn.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
  });
}
function iserListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}
function buildListItemsTemplate(items) {
  return cardImeges(items);
}
function clearListItems() {
  refs.gallery.innerHTML = '';
}