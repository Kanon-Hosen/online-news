const item = document.getElementById('item');
const main = document.getElementById('main');
const blogSection = document.getElementById('blogSection')
const spinner = document.getElementById('spinner');
const modalBody = document.getElementById('modalBody');
const blog = document.getElementById('blog')

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
        .catch(err => console.log(err))
};

loadCategories();

const showNews = (news, name) => {
    toggleSpinner(true)
    item.style.display = 'block';
    main.style.display = 'block';
    main.innerHTML = '';
    item.innerHTML = '';
    blogSection.classList.add('d-none')
    const h1 = document.createElement('h1');
    h1.style.display = 'block'
    fetch(`https://openapi.programming-hero.com/api/news/category/${news}`)
        .then(res => res.json())
        .then(data => {
            const allNews = data.data;
            const view = []

            allNews.forEach(news => {
                view.push(news)
            });
            const result = view.sort((a, b) => {
                return b.total_view - a.total_view;
            })
            result.forEach(data => {
                    const div = document.createElement('div');
                    div.classList.add('main');
                    div.innerHTML = `
                    <div class="row">
                    <div class="col-12 mt-4 rounded p-3" style="background-color:white ; overflow:hidden;">
                        <div class="row">
                            <div class="col-12 col-lg-3 col-md-3 text-center ">
                                <img class ="img-fluid" src="${data.thumbnail_url}" alt="${news.title}" srcset="">
                            </div>
                            <div class="col-12 col-md-9 col-lg-9">
                                <h4 class = "fw-bold mt-4 mt-md-0">${data.title.slice(0, 60)}..</h4>
                                <p style = "color: #949494; font-size: 15px;" class ="mt-3">${data.details.slice(0, 700)}.....</p>
                                <div class="row mt-4">
                                    <div class="col-4 col-md-4">
                                        <div class="row">
                                            <div class="col-4">
                                                <img class ="img-fluid rounded-circle" src="${data.author.img ? data.author.img : 'No found img'}" alt="">
                                            </div>
                                            <div class="col-8">
                                                <p style="color:#2B2C34; font-weight:500;">${data.author.name ? data.author.name : 'No Found author'}</p>
                                                <p style="margin-top: -10px; color: #949494;">${data.author.published_date ? data.author.published_date.slice(0, 10) : 'No found'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3 col-md-3">
                                    <i class="fa-solid fa-eye me-2"></i>
                                    <span>${data.total_view ? data.total_view : "No found"}</span>
                                    </div>
                                    <div class="col-3 col-md-3">
                                        <p>Rating: ${data.rating.number ? data.rating.number : 'No found'}</p>
                                    </div>
                                    <div class="col-2 col-md-2">
                                     <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showModal('${data._id}')">
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
                
                })


                toggleSpinner(false);
  

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
        .catch(err => console.log(err))
    
};

// -----------modal================
const showModal = (newsId) => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(modalData => {
            const modalNews = modalData.data;
            modalNews.forEach(modal => {
                modalBody.innerHTML = ''
                const div = document.createElement('div');
                div.classList.add('modalBody');
                div.innerHTML = `
                <h4 style = "color:black; font-size: 20px;">${modal.title}</h4>
                <div class="img mt-3">
                  <img class ="img-fluid" src="${modal.image_url}" alt="">
                </div>
                <div class = "row mt-3">
                    <div class="col-8">
                        <div class = "row d-">
                            <div class="col-3">
                            <img class ="img-fluid rounded-circle" src="${modal.author.img}">
                            </div>
                            <div class="col-9">
                            <p  class ="fw-bold">${modal.author.name ? modal.author.name : 'No found'}</p>
                            <p style="margin-top:-15px;">${modal.author.published_date ? modal.author.published_date.slice(0, 10) : 'no found'}</p>
                            </div>
                        </div>
                    </div>
                    <div class ="col-4">
                        <p class =" fw-bold">View: ${modal.total_view ? modal.total_view : 'no found'}</p>
                    </div>
                </div>

                <div class="text">
                  <p style="color:#858585" class ="mt-3">${modal.details}</p>
                </div>
                `;
                modalBody.appendChild(div);
            })
        })
        .catch(err => console.log(err))
};

// ==============blog=====================
blog.addEventListener('click', () => {
    item.style.display = 'none';
    main.style.display = 'none';
    blogSection.classList.remove('d-none')

});

// spinner===================
const toggleSpinner = isLoading => {
    if (isLoading) {
        spinner.classList.remove('d-none');
    }

    else {
        spinner.classList.add('d-none')
    }
};