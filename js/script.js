let currentCateId = null;
// load the categories from api
const loadCategory = async () => {
    const cateUrl = 'https://openapi.programming-hero.com/api/videos/categories';
    const fetchCate = await fetch(cateUrl);
    const getCate = await fetchCate.json();
    const categories = getCate.data;
    showCategory(categories);

}
// show the categories button by taking an objects as a parameter
    const showCategory = async (categories) => {

    const cateContainer = document.getElementById('cateContainer');
    categories.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="categoriesShow(${'this'},${element.category_id})" id="${'cateBtn'+element.category_id}" class="px-4 py-2 text-sm md:text-base text-cateBtnColor font-medium rounded bg-cateBtnBg">${element.category}</button>
        `;
        cateContainer.appendChild(div);
        showDefalutActiveBtn();
    });
}
// call the showCategory function for showing default categories cards
loadCategory();

// load cards data from api
const loadCards = async (cateId=1000) => {
    const cardsUrl = `https://openapi.programming-hero.com/api/videos/category/${cateId}`;
    const fetchCards = await fetch(cardsUrl);
    const getCards = await fetchCards.json();
    const cards = getCards.data;
    showCards(cards);
}
// show the cards by taing an categories object
const showCards = (cards) => {
    const notFoundContainer = document.getElementById('noDataFound');
    // if the parameter objects length is 0 showing the found not page
    if(cards.length === 0){
      notFoundContainer.classList.remove('hidden');
    }else{
      notFoundContainer.classList.add('hidden');
    }
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';
    cards.forEach((card) => {
        const duration = card.others.posted_date;
        const durationInt = parseInt(duration);
        const totalMinutes = durationInt / 60;
        const hoursFloat = totalMinutes / 60;
        const hours = Math.floor(hoursFloat);
        const minutesFloat = totalMinutes % 60;
        const minutes = Math.floor(minutesFloat);
        const time = `${hours}hrs ${minutes}min ago`

        const carddiv = document.createElement('div');
        carddiv.classList = `card card-compact rounded-none`;
        carddiv.innerHTML = `
        <!-- single card -->
          <figure class="relative">
            <img class="w-full h-48 rounded-lg" src="${card.thumbnail}" alt="Shoes" />
              <p class="absolute bottom-2 right-2 text-white text-xs bg-timeBg px-2 py-1 rounded font-medium bg-red">${card.others.posted_date ? time : ''}</p>
                </figure>
              <!-- videos desc -->
            <div class="flex gap-3 mt-4">
          <!-- profile -->
        <div class="w-10">
      <img class="w-10 h-10 rounded-full" src="${card.authors[0].profile_picture}" alt="">
        </div>
          <!-- title -->
            <div>
              <h2 class="text-base text-titleColor font-bold">${card.title}</h2>
                <div class="flex gap-2 items-center mt-2">
                  <h5 class="text-sm font-medium text-authorColor">${card.authors[0].profile_name}</h5>
                  ${card.authors[0].verified ? '<img class="rounded-full" src="./photos/verified.png" alt="">' : ''}
                  </div>
                <p class="text-sm text-authorColor font-medium mt-2">${card?.others?.views} views</p>
              </div>
            </div>
        <!-- single card end -->
        `;
        cardsContainer.appendChild(carddiv);

    })
}
// call loadCards function for when the page will open then showing default cards
loadCards();

// categories onclick function for active btn and pass category id
const categoriesShow = (target, cateId) => {
  loadCards(cateId);
    currentCateId = cateId;
    const btnparent = target.parentElement.parentElement.children;
    for(const btnPar of btnparent){
      const btn = btnPar.children[0];
      btn.classList = `px-4 py-2 text-sm md:text-base text-cateBtnColor font-medium rounded bg-cateBtnBg`;
    }
    target.classList = `px-4 py-2 text-sm md:text-base text-white bg-activeBg font-medium rounded`;
}

// sortBtnHandeler function is for arrange the cards from decending order
const sortBtnHandeler = async () => {
  const cardsUrl = `https://openapi.programming-hero.com/api/videos/category/${currentCateId ? currentCateId : 1000}`;
  const fetchCards = await fetch(cardsUrl);
  const getCards = await fetchCards.json();
  const sortArray = getCards.data;
  // run a loop for cut the k letter and change he views data type
  for(const item of sortArray){
    let viewsString = item.others.views;
    let mkViewsSplit = viewsString.split('');
    mkViewsSplit.pop();
    const makeJoin = mkViewsSplit.join('');
    const viewsNumber = makeJoin;
    item.others.views = viewsNumber;
  }
  sortArray.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
  for(const sortItem of sortArray){
    sortItem.others.views = `${sortItem.others.views}K`;
  }
  showCards(sortArray);
}

// show default active btn when open the page
const showDefalutActiveBtn = () => {
  if(!currentCateId){
    const allBtn = document.getElementById('cateBtn1000');
    allBtn.classList.remove('text-cateBtnColor')
    allBtn.classList.add('text-white','bg-red-500');
  }
}















