class GuestListManager {
    constructor() {
        this.guests = [];
        this.maxGuests = 10;
        this.editingGuestId = null;
        
        // Get DOM elements
        this.form = document.getElementById('guestForm');
        this.guestNameInput = document.getElementById('guestName');
        this.guestCategorySelect = document.getElementById('guestCategory');
        this.guestList = document.getElementById('guestList');
        this.guestCount = document.getElementById('guestCount');
        this.limitWarning = document.getElementById('limitWarning');
        
        this.initEventListeners();
    }

    initEventListeners() {
        // Form submit event with preventDefault
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    handleFormSubmit(event) {
        // Prevent default form submission behavior
        event.preventDefault();
        
        const name = this.guestNameInput.value.trim();
        const category = this.guestCategorySelect.value;
        
        if (!name) {
            this.showAlert('Please enter a guest name', 'error');
            return;
        }

        if (this.editingGuestId) {
            this.updateGuest(this.editingGuestId, name, category);
        } else {
            this.addGuest(name, category);
        }
    }

    addGuest(name, category) {
        // Check if we've reached the maximum number of guests
        if (this.guests.length >= this.maxGuests) {
            this.showAlert('Maximum guest limit reached (10 guests)', 'error');
            return;
        }

        const guest = {
            id: Date.now(),
            name: name,
            category: category,
            rsvp: 'attending',
            addedTime: new Date().toLocaleString()
        };

        this.guests.push(guest);
        this.resetForm();
        this.renderGuestList();
        this.updateCounter();
        this.showAlert('Guest added successfully!', 'success');
        
        console.log('Guest added:', guest);
        console.log('Total guests:', this.guests.length);
    }

    updateGuest(id, name, category) {
        const guestIndex = this.guests.findIndex(guest => guest.id === id);
        if (guestIndex !== -1) {
            this.guests[guestIndex].name = name;
            this.guests[guestIndex].category = category;
            this.editingGuestId = null;
            this.resetForm();
            this.renderGuestList();
            this.showAlert('Guest updated successfully!', 'success');
            
            console.log('Guest updated:', this.guests[guestIndex]);
        }
    }

    deleteGuest(id) {
        if (confirm('Are you sure you want to remove this guest?')) {
            const guestToDelete = this.guests.find(guest => guest.id === id);
            this.guests = this.guests.filter(guest => guest.id !== id);
            this.renderGuestList();
            this.updateCounter();
            this.showAlert('Guest removed successfully!', 'success');
            
            console.log('Guest deleted:', guestToDelete);
            console.log('Remaining guests:', this.guests.length);
        }
    }

    toggleRSVP(id) {
        const guest = this.guests.find(guest => guest.id === id);
        if (guest) {
            guest.rsvp = guest.rsvp === 'attending' ? 'not-attending' : 'attending';
            this.renderGuestList();
            this.showAlert('RSVP status updated!', 'success');
            
            console.log('RSVP toggled for:', guest.name, 'Status:', guest.rsvp);
        }
    }

    editGuest(id) {
        const guest = this.guests.find(guest => guest.id === id);
        if (guest) {
            this.guestNameInput.value = guest.name;
            this.guestCategorySelect.value = guest.category;
            this.editingGuestId = id;
            this.guestNameInput.focus();
            
            // Change button text to indicate editing
            const submitBtn = this.form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Update Guest';
            submitBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
            
            console.log('Editing guest:', guest);
        }
    }

    resetForm() {
        this.form.reset();
        this.editingGuestId = null;
        
        // Reset button text and style
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Add Guest';
        submitBtn.style.background = 'linear-gradient(135deg, #4f46e5, #7c3aed)';
    }

    renderGuestList() {
        if (this.guests.length === 0) {
            this.guestList.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 4rem; margin-bottom: 20px;">👥</div>
                    <h3>No guests yet</h3>
                    <p>Add your first guest to get started!</p>
                </div>
            `;
            return;
        }

        this.guestList.innerHTML = this.guests.map(guest => `
            <div class="guest-item">
                <div class="guest-info">
                    <div class="guest-name">${this.escapeHtml(guest.name)}</div>
                    <div class="guest-details">
                        <span class="category-tag category-${guest.category}">
                            ${guest.category}
                        </span>
                        <span class="rsvp-status rsvp-${guest.rsvp}">
                            ${guest.rsvp === 'attending' ? '✅ Attending' : '❌ Not Attending'}
                        </span>
                    </div>
                    <div class="guest-time">Added: ${guest.addedTime}</div>
                </div>
                <div class="guest-actions">
                    <button class="btn-small btn-edit" onclick="guestManager.editGuest(${guest.id})">
                        Edit
                    </button>
                    <button class="btn-small btn-rsvp" onclick="guestManager.toggleRSVP(${guest.id})">
                        Toggle RSVP
                    </button>
                    <button class="btn-small btn-delete" onclick="guestManager.deleteGuest(${guest.id})">
                        Remove
                    </button>
                </div>
            </div>
        `).join('');
        
        console.log('Guest list rendered. Total guests:', this.guests.length);
    }

    updateCounter() {
        this.guestCount.textContent = this.guests.length;
        
        if (this.guests.length >= this.maxGuests) {
            this.limitWarning.style.display = 'block';
        } else {
            this.limitWarning.style.display = 'none';
        }
    }

    showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
        
        console.log(`Alert: ${message} (${type})`);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the guest list manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.guestManager = new GuestListManager();
    console.log('Guest List Manager initialized');
});