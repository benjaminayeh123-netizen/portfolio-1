// Image Modal functionality
function openImageModal(src, alt) {
    console.log('Opening modal for:', src);
    console.log('Image alt:', alt);
    
    // Remove existing modal if any
    const existingModal = document.getElementById('imageModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create new modal
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img class="modal-image" src="${src}" alt="${alt}" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; display: block;">
            <div class="modal-caption">${alt}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeImageModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close on Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    console.log('Modal created and should be visible');
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
        console.log('Modal closed and removed');
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
    console.log('Found images for modal:', allImages.length);
    
    allImages.forEach((img, index) => {
        console.log(`Image ${index + 1}:`, img.src, img.alt);
        img.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Image clicked:', this.src, this.alt);
            openImageModal(this.src, this.alt);
        });
        
        // Add cursor pointer to indicate clickable
        img.style.cursor = 'pointer';
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
