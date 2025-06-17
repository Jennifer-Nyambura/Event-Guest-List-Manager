# Event Guest List Manager 🎉

A modern, interactive web application for managing event guest lists with RSVP tracking, categorization, and real-time statistics.

## 📋 Table of Contents

## ✨ Features

### Core Features
- Add guests with name input and submit button
- Display guests in a dynamic list
- Remove guests with individual delete buttons
- 10-guest limit with user alerts
- Toggle RSVP status (Attending/Not Attending)


##  Installation

### Quick Start
1. Clone or download the project files
2. Ensure you have the following file structure:
```
event-guest-manager/
├── index.html
├── src/
│   └── index.js
├── style.css
└── README.md
```

3. Open `index.html` in your web browser
4. Start managing your guest list!


## Adding Guests
1. Enter the guest's name in the input field
2. Select their category (Friend, Family, or Colleague)
3. Click "Add Guest" button
4. Guest appears in the list with default "Attending" status

### Managing Guests
- **Toggle RSVP**: Click "Toggle RSVP" to switch between Attending/Not Attending
- **Edit Guest**: Click "Edit" to modify name or category in a modal dialog
- **Remove Guest**: Click "Remove" and confirm deletion
- **Filter Guests**: Use filter buttons to view specific groups

### Guest Limit
- Maximum of 10 guests allowed
- Alert notification when limit is reached
- Counter shows current guest count (X/10)

## 📁 File Structure

```
event-guest-manager/
├── index.html          # Main HTML structure and embedded CSS/JS
├── src/
│   └── index.js        # JavaScript logic (if separated)
├── style.css           # CSS styles (if separated)
└── README.md           # This documentation file
```

### Key JavaScript Features Used:
- ES6 Classes and arrow functions
- Array methods (filter, map, find, splice)
- DOM manipulation and event handling
- Local state management
- Template literals for dynamic HTML generation
- Date handling and formatting

### CSS Features:
- CSS Grid and Flexbox for responsive layouts
- CSS animations and transitions
- CSS variables for consistent theming
- Media queries for mobile responsiveness
- Modern CSS properties (backdrop-filter, box-shadow)



##  Troubleshooting

### Common Issues:

**Issue**: Guest not being added
- **Solution**: Check that name field is not empty and guest limit hasn't been reached

**Issue**: Modal not opening
- **Solution**: Ensure JavaScript is enabled and there are no console errors



## 📞 Support

For questions, suggestions, or issues:

- 📧 **Email**: jenninyambu@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/event-guest-manager/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/event-guest-manager/discussions)

---

**Made with ❤️ for better event management**

*Happy event planning! 🎉*