document.addEventListener('DOMContentLoaded', () => {
    const blogPosts = [
        { id: 1, title: "The Future of Web Development", excerpt: "Exploring the latest trends and technologies shaping the future of web development.", category: "tech", date: "2025-06-15", readTime: "5 min read", image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?auto=format&fit=crop&w=1170&q=80" },
        { id: 2, title: "My Journey Through Japan", excerpt: "A travelogue of my two-week adventure exploring the beautiful landscapes and culture of Japan.", category: "travel", date: "2025-05-22", readTime: "8 min read", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1170&q=80" },
        { id: 3, title: "The Art of Baking Sourdough", excerpt: "Learn the secrets to creating the perfect sourdough bread from scratch with this detailed guide.", category: "food", date: "2025-04-30", readTime: "7 min read", image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1074&q=80" },
        { id: 4, title: "Getting Started with React Hooks", excerpt: "A beginner-friendly introduction to React Hooks and how they can simplify your component logic.", category: "tech", date: "2025-04-18", readTime: "6 min read", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1170&q=80" },
        { id: 5, title: "Minimalist Living: Less is More", excerpt: "How adopting a minimalist lifestyle can lead to greater happiness and fulfillment.", category: "lifestyle", date: "2024-11-29", readTime: "4 min read", image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1170&q=80" },
        { id: 6, title: "The Best Hiking Trails in Switzerland", excerpt: "Discover the most breathtaking hiking trails that Switzerland has to offer for outdoor enthusiasts.", category: "travel", date: "2024-03-15", readTime: "9 min read", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1170&q=80" },
        { id: 7, title: "Vegan Recipes for Beginners", excerpt: "Simple and delicious vegan recipes that even meat-lovers will enjoy and find easy to prepare.", category: "food", date: "2024-02-28", readTime: "5 min read", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1170&q=80" },
        { id: 8, title: "CSS Grid vs Flexbox: When to Use What", excerpt: "A practical guide to understanding when to use CSS Grid and when to use Flexbox for layout design.", category: "tech", date: "2023-10-12", readTime: "7 min read", image: "https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?auto=format&fit=crop&w=1152&q=80" },
        { id: 9, title: "Morning Routines of Successful People", excerpt: "Learn about the morning habits that highly successful people use to start their days productively.", category: "lifestyle", date: "2023-01-25", readTime: "6 min read", image: "https://images.unsplash.com/photo-1495653797063-114787b77b23?auto=format&fit=crop&w=1170&q=80" }
    ];

    let currentPage = 1, postsPerPage = 6, currentCategory = 'all', currentSearchTerm = '';
    const postsContainer = document.getElementById('postsContainer');
    const paginationElement = document.getElementById('pagination');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const footerFilters = document.querySelectorAll('.footer-filter');

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    const getFilteredPosts = () => {
        const allButFeatured = blogPosts.slice(1);
        return allButFeatured.filter(post => 
            (currentCategory === 'all' || post.category === currentCategory) &&
            (post.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(currentSearchTerm.toLowerCase()))
        );
    };

    const renderPosts = () => {
        const filteredPosts = getFilteredPosts();
        const startIndex = (currentPage - 1) * postsPerPage;
        const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
        
        postsContainer.innerHTML = '';
        
        if (paginatedPosts.length === 0) {
            postsContainer.innerHTML = `<div class="no-results"><h3>No posts found.</h3></div>`;
            renderPagination(0);
            return;
        }

        paginatedPosts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-card');
            postElement.innerHTML = `
                <div class="post-image"><img src="${post.image}" alt="${post.title}"></div>
                <div class="post-content">
                    <span class="post-category">${post.category}</span>
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="post-date"><i class="far fa-calendar"></i> ${timeAgo(post.date)}</span>
                        <a href="#" class="read-more">Read More &rarr;</a>
                    </div>
                </div>`;
            postsContainer.appendChild(postElement);
        });

        setTimeout(() => {
            document.querySelectorAll('.post-card').forEach((card, index) => {
                setTimeout(() => card.classList.add('visible'), index * 100);
            });
        }, 10);

        renderPagination(filteredPosts.length);
    };

    const renderPagination = (totalPosts) => {
        const pageCount = Math.ceil(totalPosts / postsPerPage);
        paginationElement.innerHTML = '';
        if (pageCount <= 1) return;

        for (let i = 1; i <= pageCount; i++) {
            const button = document.createElement('button');
            button.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
            button.innerText = i;
            button.addEventListener('click', () => {
                currentPage = i;
                postsContainer.style.opacity = '0';
                setTimeout(() => {
                    renderPosts();
                    postsContainer.style.opacity = '1';
                    window.scrollTo({ top: document.querySelector('.controls').offsetTop, behavior: 'smooth' });
                }, 300);
            });
            paginationElement.appendChild(button);
        }
    };
    
    const handleFilterClick = (category) => {
        filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === category));
        currentCategory = category;
        currentPage = 1;
        postsContainer.style.opacity = '0';
        setTimeout(() => {
            renderPosts();
            postsContainer.style.opacity = '1';
        }, 300);
    };

    filterButtons.forEach(button => button.addEventListener('click', () => handleFilterClick(button.dataset.category)));
    footerFilters.forEach(button => button.addEventListener('click', (e) => {
        e.preventDefault();
        handleFilterClick(button.dataset.category);
        window.scrollTo({ top: document.querySelector('.controls').offsetTop, behavior: 'smooth' });
    }));

    searchInput.addEventListener('input', () => {
        currentSearchTerm = searchInput.value;
        currentPage = 1;
        renderPosts();
    });

    const renderFeaturedPost = () => {
        const featured = blogPosts[0];
        const featuredContainer = document.getElementById('featuredPost');
        featuredContainer.style.backgroundImage = `url(${featured.image})`;
        featuredContainer.innerHTML = `
            <div class="featured-content">
                <span class="featured-category">${featured.category}</span>
                <h1 class="featured-title">${featured.title}</h1>
                <div class="featured-meta">
                    <span><i class="far fa-calendar"></i> ${timeAgo(featured.date)}</span>
                    <span><i class="far fa-clock"></i> ${featured.readTime}</span>
                </div>
            </div>`;
    };

    const initStickyHeader = () => {
        let lastScrollTop = 0;
        const header = document.getElementById('header');
        window.addEventListener("scroll", () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            header.classList.toggle('hide', scrollTop > lastScrollTop && scrollTop > header.offsetHeight);
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    };

    const updateCopyrightYear = () => {
        document.getElementById('copyright-year').textContent = new Date().getFullYear();
    };

    renderFeaturedPost();
    renderPosts();
    initStickyHeader();
    updateCopyrightYear();
});