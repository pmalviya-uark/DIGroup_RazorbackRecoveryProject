// navigation.js

// Function to dynamically load content based on the selected section
function loadContent(section) {
    let page = '';

    switch (section) {
        
        case 'AR':
            page = '/templates/AR.html';
            break;
        case 'VR':
            page = '/templates/VR.html';
            break;
        case 'apiCall':
            page = '/templates/apiCall.html';
            break;
        case 'apiCallWebSocket':
            page = '/templates/apiCallWebSocket.html';
            break;
        case 'about':
            page = '/DIHogShareProject/templates/about.html';
            break;
        case 'featuredContent':
            page = '/templates/featuredContent.html';
            break;
        case 'hero_centered':
            page = '/templates/hero_centered.html';
            break;
        case 'iconList':
            page = '/templates/iconList.html';
            break;
        case 'modals':
            page = '/templates/modals.html';
            break;
        case 'notifications':
            page = '/templates/notifications.html';
            break;
        case 'llama':
            page = '/templates/llama.html';
            break;
        case 'dropdownPages':
            page = '/templates/dropdownPages.html';
            break;
        case 'styles':
            page = '/templates/styles.html';
            break;
        case 'home':
                page = '/DIHogShareProject/templates/home.html';
                break;
        case 'requestsubmitted':
                page = '/DIHogShareProject/templates/requestsubmitted.html';
                break;
        case 'hostrequest':
                page = '/DIHogShareProject/templates/hostrequest.html';
                break;
        
        case 'volunteerlogin':
                page = '/DIHogShareProject/templates/volunteerlogin.html';
                break;
        case 'volunteerdashboard': 
                page = '/DIHogShareProject/templates/volunteerdashboard.html';
                break;
        case 'pickuprequestdetails':
                page = '/DIHogShareProject/templates/pickuprequestdetails.html';
                break;
        case 'acceptedrequest':
                page = '/DIHogShareProject/templates/acceptedrequest.html';
                break;
        case 'confirmfoodpickup':
                page = '/DIHogShareProject/templates/confirmfoodpickup.html';
                break;
        case 'pickupcompleted':
                page = '/DIHogShareProject/templates/pickupcompleted.html';
                break;
        case 'contact':
                page = '/DIHogShareProject/templates/contact.html';
                break;
        case 'profilesettings':
                page = '/DIHogShareProject/templates/profilesettings.html';
                break;
        case 'myaccount':
                page = '/DIHogShareProject/templates/myaccount.html';
                break;
        case 'volunteersignup':
                page = '/DIHogShareProject/templates/volunteersignup.html';
                break;
        case 'viewrequestdetails':
                page = '/DIHogShareProject/templates/viewrequestdetails.html';
                break;
       
        
        default:
            page = '/DIHogShareProject/templates/home.html'; // Default to home page if section is not recognized
    }
    // Use jQuery's load() to fetch and display the HTML file content dynamically
    $('#main-content').load(page, function(response, status, xhr) {
        if (status === "error" || (status === "success" && !response.trim())) {
            // Handle the error (either status is error or content is empty)
            console.error("Error loading content: ", xhr.status, xhr.statusText);
            // Display an error message to the user
            $('#main-content').html(`<div class="alert alert-danger" role="alert">
                                        Error loading content. Please try again later.
                                    </div>`);
        } else if (section === 'AR' || section === 'VR') {
            // Redirect to the AR or VR page directly
            window.location.href = page;
        }
        // After content loads, trigger the navbar toggle to shrink the navigation bar
        $('.navbar-collapse').removeClass('show');

    });
}

//Click events tied to the navigation for the entire application
$(document).ready(function() {
    // Event listeners for navigation links
    $('#home-link').click(function(event) {
        event.preventDefault();
        loadContent('home');
    });

    $('#about-link').click(function(event) {
        event.preventDefault();
        loadContent('about');
    });
    $('#volunteer-dashboard-link').click(function(event) {
        event.preventDefault();
        loadContent('volunteerdashboard');
    });
    $('#accepted-request-link').click(function(event) {
        event.preventDefault();
        loadContent('acceptedrequest');
    });
    $('#myaccount-link').click(function(event) {
        event.preventDefault();
        loadContent('myaccount');
    });
    $('#contact-link').click(function(event) {
        event.preventDefault();
        loadContent('contact');
    });

    $('#logout-link').click(function(event) {
    event.preventDefault();
    localStorage.setItem('loggedIn', false); // Set loggedIn to false
    sessionStorage.removeItem('loggedInUser'); // Remove user name from session
    loadContent('login'); // Redirect to login page
    });

    // Event listener for app name link
    $('#app-name-link').click(function(event) {
        event.preventDefault(); 
        loadContent('home');
    });


    // Event listener for clicking outside the navigation bar to close it
    $(document).click(function(event) {
        // Check if the clicked element is within the navigation bar
        if (!$(event.target).closest('.navbar').length && $('.navbar-collapse').hasClass('show')) {
        // Trigger the toggle event instead of directly removing the class
        $('.navbar-toggler').trigger('click');
        }
    });

    // Load the default page from local storage or load Home if not set
    // Check if the user has visited before, using local storage
    if (!localStorage.getItem('firstVisit')) {
        // This is the user's first visit
        localStorage.setItem('firstVisit', true);
        loadContent('login'); // Load login on first visit
    } else {
        // This is not the user's first visit, load home if they are logged in
        if (localStorage.getItem('loggedIn') === 'true') {
            loadContent('home'); // Load home if logged in
        } else {
            // They haven't logged in yet, so go to login
            loadContent('login'); // Load login if not logged in
        }
    }
});
