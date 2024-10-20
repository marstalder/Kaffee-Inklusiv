//Modal Newsletter
document.addEventListener('DOMContentLoaded', function() {
            var modal = document.getElementById('newsletter-modal');
            var closeButton = modal.querySelector('.close');
            var hasSeenModal = localStorage.getItem('hasSeenNewsletterModal');
    
            if (!hasSeenModal) {
                // Zeige den Modal nach 5 Sekunden an, wenn er noch nicht gesehen wurde
                setTimeout(function() {
                    modal.style.display = 'block';
                    // Setze den Local Storage Wert
                    localStorage.setItem('hasSeenNewsletterModal', 'true');
                }, 5000);
            }
    
            // Schließe den Modal, wenn auf das X geklickt wird
            closeButton.onclick = function() {
                modal.style.display = 'none';
            }
    
            // Schließe den Modal, wenn außerhalb des Modals geklickt wird
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }
        });

        /*Dropdown Funktionalität*/
        document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    const dropdownIcon = document.querySelector('.dropdown-icon');
    const hasDropdown = document.querySelector('.has-dropdown');
    
    function toggleDropdown() {
        dropdown.classList.toggle('show');
        dropdownIcon.textContent = dropdown.classList.contains('show') ? '▲' : '▼';
        dropdownToggle.setAttribute('aria-expanded', dropdown.classList.contains('show'));
    }

    function closeDropdown() {
        dropdown.classList.remove('show');
        dropdownIcon.textContent = '▼';
        dropdownToggle.setAttribute('aria-expanded', 'false');
    }

    // Toggle dropdown on click
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleDropdown();
    });

    // Close dropdown when moving mouse away
    hasDropdown.addEventListener('mouseleave', function() {
        closeDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
            closeDropdown();
        }
    });

    // Close dropdown with Esc key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdown.classList.contains('show')) {
            closeDropdown();
        }
    });

    // Handle keyboard navigation within the dropdown
    dropdown.addEventListener('keydown', function(e) {
        const focusableElements = dropdown.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    // If we're on the events page, make sure the dropdown stays open if it's supposed to be
    if (eventsLink && eventsLink.classList.contains('active')) {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('dropdown') === 'open') {
            dropdownToggle.setAttribute('aria-expanded', 'true');
            dropdown.classList.add('show');
            dropdownToggle.querySelector('.dropdown-icon').style.transform = 'rotate(180deg)';
        }
    }
});

// JavaScript für die Tab-Funktionalität auf der Food and Drinks Seite
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabList = document.querySelector('[role="tablist"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    function initTabs() {
        const activeTab = document.querySelector('[role="tab"][aria-selected="true"]') || tabs[0];
        activateTab(activeTab, false);
    }

    tabList.addEventListener('click', changeTabOnClick);
    tabList.addEventListener('keydown', changeTabOnKeyPress);

    function changeTabOnClick(e) {
        const targetTab = e.target.closest('[role="tab"]');
        if (!targetTab) return;
        
        activateTab(targetTab);
    }

    function changeTabOnKeyPress(e) {
        const targetTab = e.target.closest('[role="tab"]');
        if (!targetTab) return;

        const tabsArray = Array.from(tabs);
        const index = tabsArray.indexOf(targetTab);

        let newTab;
        switch (e.key) {
            case 'ArrowLeft':
                newTab = tabsArray[index - 1] || tabsArray[tabsArray.length - 1];
                activateTab(newTab);
                break;
            case 'ArrowRight':
                newTab = tabsArray[index + 1] || tabsArray[0];
                activateTab(newTab);
                break;
            case 'Home':
                newTab = tabsArray[0];
                activateTab(newTab);
                break;
            case 'End':
                newTab = tabsArray[tabsArray.length - 1];
                activateTab(newTab);
                break;
            default:
                return;
        }
        e.preventDefault();
    }

    function activateTab(tab, setFocus = true) {
        tabs.forEach(t => {
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });

        tabPanels.forEach(panel => {
            panel.hidden = true;
            panel.classList.remove('active');
        });

        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        if (setFocus) {
            tab.focus();
        }
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        panel.hidden = false;
        panel.classList.add('active');
    }

    initTabs();
});


// Akkordeon-Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = document.getElementById(this.getAttribute('aria-controls'));
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            content.setAttribute('aria-hidden', isExpanded);
            // Schließe andere geöffnete Panels
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    const otherContent = document.getElementById(otherHeader.getAttribute('aria-controls'));
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherContent.setAttribute('aria-hidden', 'true');
                }
            });
        });
    });
});

//Reservierungsformulare
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('event-formular').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Vielen Dank für Ihre Event-Anmeldung! Wir werden uns bald bei Ihnen melden.');
    });

    document.getElementById('vermietung-formular').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Vielen Dank für Ihre Vermietungsanfrage! Wir werden uns bald bei Ihnen melden, um die Details zu besprechen.');
    });
});

// Neue Funktion für Formularvalidierung
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('event-formular');
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            alert('Vielen Dank für Ihre Event-Anmeldung! Wir werden uns bald bei Ihnen melden.');
            form.reset();
        }
    });

    function validateField(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (field.validity.valid) {
            errorElement.textContent = '';
            field.setAttribute('aria-invalid', 'false');
        } else {
            showError(field);
        }
    }

    function showError(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (field.validity.valueMissing) {
            errorElement.textContent = `${field.name} ist erforderlich.`;
        } else if (field.validity.typeMismatch) {
            errorElement.textContent = `Bitte geben Sie eine gültige ${field.name} ein.`;
        } else if (field.validity.patternMismatch) {
            errorElement.textContent = `Ungültiges Format für ${field.name}.`;
        }
        field.setAttribute('aria-invalid', 'true');
    }

    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!input.validity.valid) {
                showError(input);
                isValid = false;
            }
        });
        return isValid;
    }
});
