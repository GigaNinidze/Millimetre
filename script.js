// Language switcher functionality
class LanguageSwitcher {
    constructor() {
        this.currentLang = 'ka'; // Default language
        this.init();
    }

    init() {
        // Load saved language preference
        this.loadLanguagePreference();
        
        // Set initial language
        this.switchLanguage(this.currentLang);
        
        // Add event listeners
        this.addEventListeners();
    }

    loadLanguagePreference() {
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang && ['ka', 'en', 'ru'].includes(savedLang)) {
            this.currentLang = savedLang;
        }
    }

    saveLanguagePreference(lang) {
        localStorage.setItem('selectedLanguage', lang);
    }

    switchLanguage(lang) {
        // Hide all language elements
        const allLangElements = document.querySelectorAll('.lang');
        allLangElements.forEach(element => {
            element.style.display = 'none';
        });

        // Show elements for selected language
        const selectedLangElements = document.querySelectorAll(`.lang.${lang}`);
        selectedLangElements.forEach(element => {
            element.style.display = 'block';
        });

        // Update dropdown display
        this.updateDropdownDisplay(lang);
        
        // Update active state in dropdown menu
        this.updateDropdownActiveState(lang);
        
        // Save preference
        this.saveLanguagePreference(lang);
        
        // Update current language
        this.currentLang = lang;
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    updateDropdownDisplay(lang) {
        const currentLangSpan = document.querySelector('.current-lang');
        const langLabels = {
            'ka': '🇬🇪 ქართ',
            'en': '🇬🇧 ENG',
            'ru': '🇷🇺 RUS'
        };
        currentLangSpan.textContent = langLabels[lang];
    }

    updateDropdownActiveState(lang) {
        // Remove active class from all dropdown items
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to selected language item
        const activeItem = document.querySelector(`[data-lang="${lang}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    toggleDropdown() {
        const dropdownMenu = document.getElementById('languageMenu');
        const dropdownToggle = document.getElementById('languageToggle');
        
        dropdownMenu.classList.toggle('show');
        dropdownToggle.classList.toggle('active');
    }

    closeDropdown() {
        const dropdownMenu = document.getElementById('languageMenu');
        const dropdownToggle = document.getElementById('languageToggle');
        
        dropdownMenu.classList.remove('show');
        dropdownToggle.classList.remove('active');
    }

    addEventListeners() {
        // Toggle dropdown on button click
        const dropdownToggle = document.getElementById('languageToggle');
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Handle language selection
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = item.getAttribute('data-lang');
                this.switchLanguage(selectedLang);
                this.closeDropdown();
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.closeDropdown();
        });

        // Prevent dropdown from closing when clicking inside it
        const dropdownMenu = document.getElementById('languageMenu');
        dropdownMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
}); 