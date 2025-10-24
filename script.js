document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    console.log('Hamburger menu elements:', { hamburger, navMenu });
    
    // Hamburger menu functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            } else {
                navMenu.classList.add('active');
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            }
        });
    }
    
    // Go to top button functionality
    const goTopBtn = document.querySelector('.go-top');
    if (goTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                goTopBtn.classList.add('active');
            } else {
                goTopBtn.classList.remove('active');
            }
        });
        
        goTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our latest updates soon.`);
            this.reset();
        });
    }
    
    // News filtering functionality (only on news page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    if (filterButtons.length > 0 && newsCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filter news cards
                newsCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    console.log('All JavaScript functionality loaded successfully');
});

// News Page Functionality
function initNewsPage() {
    // Category filtering
    const categoryFilters = document.querySelectorAll('.category-filter');
    const newsCards = document.querySelectorAll('.news-card');
    
    if (categoryFilters.length > 0) {
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Update active filter
                categoryFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                const category = filter.getAttribute('data-category');
                
                // Filter news cards
                newsCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // View options (grid/list)
    const viewOptions = document.querySelectorAll('.view-option');
    const newsGrid = document.getElementById('newsGrid');
    
    if (viewOptions.length > 0 && newsGrid) {
        viewOptions.forEach(option => {
            option.addEventListener('click', () => {
                viewOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                
                const view = option.getAttribute('data-view');
                newsGrid.className = `news-grid ${view}-view`;
            });
        });
    }
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Simulate loading more content
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            loadMoreBtn.disabled = true;
            
            setTimeout(() => {
                // In a real app, you would fetch more data here
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Stories';
                loadMoreBtn.disabled = false;
                alert('More stories loaded! (This is a demo)');
            }, 1500);
        });
    }
}

// Initialize news page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.news-main')) {
        initNewsPage();
    }
});

// Blog Page Functionality
function initBlogPage() {
    // Search functionality
    const blogSearch = document.getElementById('blogSearch');
    if (blogSearch) {
        blogSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const blogCards = document.querySelectorAll('.blog-post-card');
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Category filtering
    const categoryFilter = document.getElementById('categoryFilter');
    const blogCards = document.querySelectorAll('.blog-post-card');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // View toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    const postsGrid = document.getElementById('postsGrid');
    
    if (viewButtons.length > 0 && postsGrid) {
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                viewButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const view = button.getAttribute('data-view');
                postsGrid.className = `posts-grid ${view}-view`;
                
                if (view === 'list') {
                    postsGrid.style.gridTemplateColumns = '1fr';
                } else {
                    postsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
                }
            });
        });
    }
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMorePosts');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            loadMoreBtn.disabled = true;
            
            setTimeout(() => {
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
                loadMoreBtn.disabled = false;
                alert('More articles loaded! (This is a demo)');
            }, 1500);
        });
    }
    
    // Newsletter form
    const newsletterForms = document.querySelectorAll('.blog-newsletter');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our latest articles.`);
            form.reset();
        });
    });
}

// Initialize blog page functionality
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.blog-main')) {
        initBlogPage();
    }
})

// Debug function to check filter setup
function debugFilterSetup() {
    console.log('=== DEBUG FILTER SETUP ===');
    
    const categoryFilter = document.getElementById('categoryFilter');
    const blogCards = document.querySelectorAll('.blog-post-card');
    
    console.log('Category filter element:', categoryFilter);
    console.log('Number of blog cards:', blogCards.length);
    
    blogCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        console.log(`Card ${index + 1} category:`, category);
    });
    
    console.log('=== END DEBUG ===');
}