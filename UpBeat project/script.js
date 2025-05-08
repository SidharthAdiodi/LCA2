document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Theme switcher
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Highlight selected theme option
    const currentThemeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
    if (currentThemeOption) {
        currentThemeOption.querySelector('.theme-preview').style.borderColor = 'var(--primary-color)';
    }

    // Follow button functionality
    const followButtons = document.querySelectorAll('.follow-btn');
    
    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.backgroundColor = 'var(--secondary-color)';
            } else {
                this.textContent = 'Follow';
                this.style.backgroundColor = 'var(--primary-color)';
            }
        });
    });

    // Conversation selection
    const conversations = document.querySelectorAll('.conversation');
    
    conversations.forEach(conversation => {
        conversation.addEventListener('click', function() {
            document.querySelector('.conversation.active')?.classList.remove('active');
            this.classList.add('active');
        });
    });

    // Message sending
    const chatInput = document.querySelector('.chat-input input');
    const chatButton = document.querySelector('.chat-input button');
    
    if (chatInput && chatButton) {
        chatButton.addEventListener('click', function() {
            if (chatInput.value.trim() !== '') {
                const chatMessages = document.querySelector('.chat-messages');
                const newMessage = document.createElement('div');
                newMessage.classList.add('message', 'sent');
                newMessage.innerHTML = `
                    <p>${chatInput.value}</p>
                    <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                `;
                chatMessages.appendChild(newMessage);
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                chatButton.click();
            }
        });
    }

    // Save settings
    const saveButton = document.querySelector('.save-btn');
    
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            alert('Settings saved successfully!');
        });
    }
  
    // Automatic filtering when category changes
    document.getElementById('category-filter').addEventListener('change', function() {
        const selectedCategory = this.value;
        const artistCards = document.querySelectorAll('.artist-card');
        
        artistCards.forEach(card => {
            card.style.display = (selectedCategory === 'all' || card.dataset.category === selectedCategory) 
                ? 'block' 
                : 'none';
        });
    });

    // Reset filters
    document.getElementById('reset-filters').addEventListener('click', function() {
        document.getElementById('category-filter').value = 'all';
        document.querySelectorAll('.artist-card').forEach(card => {
            card.style.display = 'block';
        });
    });
});
