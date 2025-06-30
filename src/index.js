// Guest List Manager Application
class GuestListManager {
    constructor() {
        this.guests = [];
        this.maxGuests = 10;
        this.nextId = 1;
        
        // Get DOM elements
        this.guestForm = document.getElementById('guestForm');
        this.guestList = document.getElementById('guestList');
        this.guestCountElement = document.getElementById('guestCount');
        this.emptyState = document.getElementById('emptyState');
        this.guestNameInput = document.getElementById('guestName');
        this.guestCategorySelect = document.getElementById('guestCategory');
        
        // Initialize the application
        this.init();
    }
    
    init() {
        // Add event listener to the form
        this.guestForm.addEventListener('submit', (e) => this.handleAddGuest(e));
        
        // Update the display
        this.updateDisplay();
        
        console.log('Guest List Manager initialized');
    }
    
    handleAddGuest(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        const name = this.guestNameInput.value.trim();
        const category = this.guestCategorySelect.value;
        
        // Validate input
        if (!name) {
            alert('Please enter a guest name');
            return;
        }
        
        // Check if guest limit is reached
        if (this.guests.length >= this.maxGuests) {
            alert(`Guest list is full! Maximum ${this.maxGuests} guests allowed.`);
            return;
        }
        
        // Check for duplicate names
        if (this.guests.some(guest => guest.name.toLowerCase() === name.toLowerCase())) {
            alert('This guest is already on the list!');
            return;
        }
        
        // Create new guest object
        const newGuest = {
            id: this.nextId++,
            name: name,
            category: category,
            rsvp: 'attending', // Default to attending
            addedAt: new Date()
        };
        
        // Add guest to the list
        this.guests.push(newGuest);
        
        console.log('Guest added:', newGuest);
        
        // Clear the form
        this.guestNameInput.value = '';
        this.guestCategorySelect.value = 'friend';
        
        // Update the display
        this.updateDisplay();
        
        // Focus back on the input for easy adding
        this.guestNameInput.focus();
    }
    
    removeGuest(guestId) {
        const guestIndex = this.guests.findIndex(guest => guest.id === guestId);
        if (guestIndex !== -1) {
            const removedGuest = this.guests.splice(guestIndex, 1)[0];
            console.log('Guest removed:', removedGuest);
            this.updateDisplay();
        }
    }
    
    toggleRSVP(guestId) {
        const guest = this.guests.find(guest => guest.id === guestId);
        if (guest) {
            guest.rsvp = guest.rsvp === 'attending' ? 'not-attending' : 'attending';
            console.log(`RSVP toggled for ${guest.name}:`, guest.rsvp);
            this.updateDisplay();
        }
    }
    
    editGuest(guestId) {
        const guestElement = document.querySelector(`[data-guest-id="${guestId}"]`);
        const guest = this.guests.find(g => g.id === guestId);
        
        if (!guestElement || !guest) return;
        
        // Toggle editing mode
        guestElement.classList.add('editing');
        
        // Create edit input and populate with current name
        const editInput = guestElement.querySelector('.edit-input');
        editInput.value = guest.name;
        editInput.focus();
        
        // Update action buttons
        const actionsDiv = guestElement.querySelector('.guest-actions');
        actionsDiv.innerHTML = `
            <button class="btn save-btn" onclick="guestManager.saveEdit(${guestId})">Save</button>
            <button class="btn cancel-btn" onclick="guestManager.cancelEdit(${guestId})">Cancel</button>
        `;
    }
    
    saveEdit(guestId) {
        const guestElement = document.querySelector(`[data-guest-id="${guestId}"]`);
        const guest = this.guests.find(g => g.id === guestId);
        const editInput = guestElement.querySelector('.edit-input');
        const newName = editInput.value.trim();
        
        if (!newName) {
            alert('Please enter a valid name');
            return;
        }
        
        // Check for duplicate names (excluding current guest)
        if (this.guests.some(g => g.id !== guestId && g.name.toLowerCase() === newName.toLowerCase())) {
            alert('This guest name is already on the list!');
            return;
        }
        
        // Update guest name
        guest.name = newName;
        console.log('Guest updated:', guest);
        
        // Update display
        this.updateDisplay();
    }
    
    cancelEdit(guestId) {
        // Simply update display to cancel editing mode
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Update guest count
        this.guestCountElement.textContent = this.guests.length;
        
        // Show/hide empty state
        if (this.guests.length === 0) {
            this.emptyState.style.display = 'block';
            this.guestList.style.display = 'none';
        } else {
            this.emptyState.style.display = 'none';
            this.guestList.style.display = 'block';
        }
        
        // Clear and populate guest list
        this.guestList.innerHTML = '';
        
        this.guests.forEach(guest => {
            const listItem = this.createGuestElement(guest);
            this.guestList.appendChild(listItem);
        });
    }
    
    createGuestElement(guest) {
        const li = document.createElement('li');
        li.className = `guest-item ${guest.category}`;
        li.setAttribute('data-guest-id', guest.id);
        
        const formatTime = (date) => {
            return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };
        
        li.innerHTML = `
            <div class="guest-header">
                <div class="guest-info">
                    <h3>${this.escapeHtml(guest.name)}</h3>
                    <input type="text" class="edit-input" value="${this.escapeHtml(guest.name)}">
                    <div class="guest-meta">
                        <span class="category-tag ${guest.category}">${guest.category}</span>
                        <span class="timestamp">Added ${formatTime(guest.addedAt)}</span>
                        <span class="rsvp-status ${guest.rsvp}">${guest.rsvp === 'attending' ? 'Attending' : 'Not Attending'}</span>
                    </div>
                </div>
                <div class="guest-actions">
                    <button class="btn btn-rsvp" onclick="guestManager.toggleRSVP(${guest.id})">
                        Toggle RSVP
                    </button>
                    <button class="btn btn-edit" onclick="guestManager.editGuest(${guest.id})">
                        Edit
                    </button>
                    <button class="btn btn-remove" onclick="guestManager.removeGuest(${guest.id})">
                        Remove
                    </button>
                </div>
            </div>
        `;
        
        return li;
    }
    
    // Utility function to escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance for onclick handlers
    window.guestManager = new GuestListManager();
});

// Additional features and enhancements

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'n' to focus on name input (when not typing in an input)
    if (e.key === 'n' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('guestName').focus();
    }
    
    // Press 'Escape' to cancel any editing
    if (e.key === 'Escape') {
        const editingItems = document.querySelectorAll('.guest-item.editing');
        editingItems.forEach(item => {
            item.classList.remove('editing');
        });
        if (window.guestManager) {
            window.guestManager.updateDisplay();
        }
    }
});

// Add some fun animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add a subtle animation when guests are added
    const originalUpdateDisplay = GuestListManager.prototype.updateDisplay;
    GuestListManager.prototype.updateDisplay = function() {
        const previousCount = this.guestList.children.length;
        originalUpdateDisplay.call(this);
        
        // If a new guest was added, animate it
        if (this.guestList.children.length > previousCount) {
            const newGuest = this.guestList.lastElementChild;
            if (newGuest) {
                newGuest.style.opacity = '0';
                newGuest.style.transform = 'translateY(20px)';
                
                // Trigger animation
                setTimeout(() => {
                    newGuest.style.transition = 'all 0.3s ease';
                    newGuest.style.opacity = '1';
                    newGuest.style.transform = 'translateY(0)';
                }, 10);
            }
        }
    };
});