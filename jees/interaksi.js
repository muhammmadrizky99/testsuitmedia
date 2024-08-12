const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
let currentPage = 1;
let pageSize = 10;
let sort = '-published_at';

document.getElementById('sortBy').addEventListener('change', function () {
    sort = this.value;
    currentPage = 1; // Reset ke halaman 1 setiap kali sort diubah
    fetchImages();
});

document.getElementById('itemsPerPage').addEventListener('change', function () {
    pageSize = parseInt(this.value);
    currentPage = 1; // Reset ke halaman 1 setiap kali jumlah item per halaman diubah
    fetchImages();
});

async function fetchImages() {
    const url = `${apiUrl}?page[number]=${currentPage}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sort}`;
    console.log('Fetching URL:', url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (data && data.data) {
            renderPosts(data.data);
            setupPagination(data.meta.last_page);
        } else {
            console.error('Data structure is not as expected:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    posts.forEach(post => {
        const smallImage = post.small_image && post.small_image[0] ? post.small_image[0].url : null;
        const mediumImage = post.medium_image && post.medium_image[0] ? post.medium_image[0].url : null;
        const imageUrl = smallImage || mediumImage;

        if (imageUrl) {
            postList.innerHTML += `
                <div class="card">
                    <img src="${imageUrl}" class="card-img-top" alt="${post.title}" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <!-- Deskripsi dihapus untuk tampilan yang lebih simpel -->
                    </div>
                </div>
            `;
        } else {
            console.warn('Image URL is missing for post:', post);
        }
    });
}



function setupPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
            </li>
        `;
    }
}

function goToPage(page) {
    currentPage = page;
    fetchImages();
}

// Call fetchImages to load posts initially
fetchImages();
