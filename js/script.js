let currentCateId = null;
// showCategory function for showing all categories
const showCategory = async () => {
    const cateUrl = 'https://openapi.programming-hero.com/api/videos/categories';
    const fetchCate = await fetch(cateUrl);
    const getCate = await fetchCate.json();
    const categories = getCate.data;
    // console.log(categories);
    const cateContainer = document.getElementById('cateContainer');
    categories.forEach(element => {
        // console.log(element.category_id);
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="categoriesShow(${element.category_id})" class="px-4 py-2 text-base text-cateBtnColor font-medium rounded">${element.category}</button>
        `;
        cateContainer.appendChild(div);
    });
}
// call the showCategory function
showCategory();

// show all cards 
const showCards = async (cateId=1000) => {
    const cardsUrl = `https://openapi.programming-hero.com/api/videos/category/${cateId}`;
    const fetchCards = await fetch(cardsUrl);
    const getCards = await fetchCards.json();
    const cards = getCards.data;
    // console.log(cards);
    const notFoundContainer = document.getElementById('noDataFound');
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
        // console.log(`Total Minutes: ${totalMinutes} -> hours: ${hoursFloat} : float-Hours: ${hours} => minutes: ${minutesFloat} : minutes float: ${minutes}`);
        // console.log("videos posted time: ",time)
        const carddiv = document.createElement('div');
        carddiv.classList = `card card-compact rounded-none`;
        carddiv.innerHTML = `
        <!-- single card -->
          <figure class="relative">
            <img class="w-full h-48 rounded-lg" src="${card.thumbnail}" alt="Shoes" />
              <p class="absolute bottom-2 right-2 text-white text-xs bg-gray-800 px-2 py-1 rounded font-medium bg-red">${card.others.posted_date ? time : ''}</p>
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
                <p class="text-sm text-authorColor font-medium mt-2">${card?.others?.views}</p>
              </div>
            </div>
        <!-- single card end -->
        `;
        cardsContainer.appendChild(carddiv);
        // console.log(card);

    })
}
// call showCards function
showCards();

// categories specific showing
const categoriesShow = (cateId) => {
    showCards(cateId);
    currentCateId = cateId;
}

// sort by view button
const sortBtnHandeler = async () => {
  const cardsUrl = `https://openapi.programming-hero.com/api/videos/category/${currentCateId ? currentCateId : 1000}`;
  const fetchCards = await fetch(cardsUrl);
  const getCards = await fetchCards.json();
  const sortedData = getCards.data;
  const viewsString = sortedData;
  // run a loop for cut the k letter and change he views data type
  for(const item of viewsString){
    let viewsString = item.others.views;
    let viewsSplit = viewsString.split('');
    viewsSplit.pop();
    let newLine = viewsSplit;
    const makeJoin = newLine.join('');
    const viewsNumber = makeJoin;
    console.log(viewsNumber);
    item.others.views = viewsNumber;
  }
  viewsString.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views))
  console.log(viewsString)
  


  const cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = '';
  viewsString.forEach((card) => {
      const duration = card.others.posted_date;
      const durationInt = parseInt(duration);
      const totalMinutes = durationInt / 60;
      const hoursFloat = totalMinutes / 60;
      const hours = Math.floor(hoursFloat);
      const minutesFloat = totalMinutes % 60;
      const minutes = Math.floor(minutesFloat);
      const time = `${hours}hrs ${minutes}min ago`
      // console.log(`Total Minutes: ${totalMinutes} -> hours: ${hoursFloat} : float-Hours: ${hours} => minutes: ${minutesFloat} : minutes float: ${minutes}`);
      // console.log("videos posted time: ",time)
      const carddiv = document.createElement('div');
      carddiv.classList = `card card-compact rounded-none`;
      carddiv.innerHTML = `
      <!-- single card -->
        <figure class="relative">
          <img class="w-full h-48 rounded-lg" src="${card.thumbnail}" alt="Shoes" />
            <p class="absolute bottom-2 right-2 text-white text-xs bg-gray-800 px-2 py-1 rounded font-medium bg-red">${card.others.posted_date ? time : ''}</p>
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
              <p class="text-sm text-authorColor font-medium mt-2">${card?.others?.views}K</p>
            </div>
          </div>
      <!-- single card end -->
      `;
      cardsContainer.appendChild(carddiv);
      // console.log(card);

  })









}





console.log(currentCateId)





















