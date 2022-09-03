const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => {
            const mainData = data.data.news_category;
            const header = document.getElementById('header')
            mainData.forEach(categories => {
                const div = document.createElement('div');
                div.classList.add('categories');

                div.innerHTML = `
                    <a onclick = "showNews('${categories.category_id}', '${categories.category_name}')">${categories.category_name}</a>
                `
                header.appendChild(div)
            })
        })
    .catch (err=>console.log(err))
}
loadCategories();
const item = document.getElementById('item');
const main = document.getElementById('main');
const showNews = async (news, name) => {
    main.innerHTML = '';
    item.innerHTML = '';
    const h1 = document.createElement('h1');
    h1.style.display = 'block'
    fetch(`https://openapi.programming-hero.com/api/news/category/${news}`)
        .then(res => res.json())
        .then(data => {
            const allNews = data.data;
            allNews.forEach(news => {
                console.log(news._id)
                const div = document.createElement('div');
                div.classList.add('main');
                div.innerHTML = `
                <div class="row">
                <div class="col-12 mt-4 rounded p-3" style="background-color:white ; overflow:hidden;">
                    <div class="row">
                        <div class="col-3">
                            <img class ="img-fluid" src="${news.thumbnail_url}" alt="${news.title}" srcset="">
                        </div>
                        <div class="col-9">
                            <h4 class = "fw-bold">${news.title.slice(0, 60)}..</h4>
                            <p style = "color: #949494; font-size: 15px;" class ="mt-3">${news.details.slice(0, 700)}.....</p>
                            <div class="row mt-4">
                                <div class="col-4">
                                    <div class="row">
                                        <div class="col-4">
                                            <img class ="img-fluid rounded-circle" src="${news.author.img ? news.author.img : 'No found img'}" alt="">
                                        </div>
                                        <div class="col-8">
                                            <p style="color:#2B2C34; font-weight:500;">${news.author.name ? news.author.name : 'No Found author'}</p>
                                            <p style="margin-top: -10px; color: #949494;">${news.author.published_date ? news.author.published_date.slice(0, 10) : 'No found'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                <i class="fa-solid fa-eye me-2"></i>
                                <span>${news.total_view}</span>
                                </div>
                                <div class="col-3">
                                    <p>Rating: ${news.rating.number}</p>
                                </div>
                                <div class="col-2">
                                 <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showModal('${news._id}')">
                                     <i class="fa-solid fa-arrow-right"></i>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `;
                main.appendChild(div)
                main.classList.remove('d-none')
            });
            if (allNews.length !== 0 && h1.innerText === '') {
                h1.innerText = `
                    ${allNews.length} items found for category ${name}
                `
                item.appendChild(h1)

            }
            else {
                h1.innerText = `
                    No items avilabe for ${name}
                `
                item.appendChild(h1)
            }
        })
    
};


const showModal = (newsId) => {
    const modalBody = document.getElementById('modalBody');
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(modalData => {
            const modalNews = modalData.data;
            modalNews.forEach(modal => {
                modalBody.innerHTML = ''
                console.log(modal)
                const div = document.createElement('div');
                div.classList.add('modalBody');
                div.innerHTML = `
                <h4 style = "color:black; font-size: 20px;">${modal.title}</h4>
                <div class="img mt-3">
                  <img class ="img-fluid" src="${modal.image_url}" alt="">
                </div>
                <p class ="mt-2 fw-bold">${modal.author.published_date}</p>
                <div class="text">
                  <p style="color:#858585" class ="mt-3">${modal.details}</p>
                </div>
                `;
                modalBody.appendChild(div);
            })
    })
}
