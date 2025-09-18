// Image Modal functionality
function openImageModal(src, alt) {
    console.log('Opening modal for:', src);
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img class="modal-image" src="" alt="">
                <div class="modal-caption"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', closeImageModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeImageModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeImageModal();
            }
        });
    }
    
    // Set image and caption
    const modalImage = modal.querySelector('.modal-image');
    const modalCaption = modal.querySelector('.modal-caption');
    
    modalImage.src = src;
    modalImage.alt = alt;
    modalCaption.textContent = alt;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    console.log('Modal should be visible now');
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Thumbnail click to change main image
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
    const mainImage = document.querySelector('.main-image img');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            if (mainImage) {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
                console.log('Main image changed to:', this.src);
            }
        });
    });
    
    // Add click handlers for all images (main and thumbnails)
    const allImages = document.querySelectorAll('.main-image img, .gallery-thumbnails img');
    allImages.forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.src);
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            console.error('Image failed to load:', this.src);
            console.error('Full path:', window.location.origin + this.src);
            // Show a placeholder or fallback
            this.style.opacity = '0.5';
            this.alt = 'Image not available';
            this.style.background = '#333';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#666';
            this.style.fontSize = '14px';
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});
