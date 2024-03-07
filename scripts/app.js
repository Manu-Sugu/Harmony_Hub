// Name:       Noelle Dacayo    &    Manu Sugunakumar
// Student ID: 1008854345       |    100748877
// DoC: 27-Jan-2024
"use strict";

// IIFE - Immediately Invoked Functional Expression
(function () {

    function redirect(page){
        window.location.href = page;
    }

    function InitializeLightbox() {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        });
    }

    function ShowWelcomeMessage(username) {
        $("#welcomeMessage").text(`Welcome, ${username}!`).fadeIn();
        setTimeout(function() {
            $("#welcomeMessage").fadeOut();
        }, 5000); // 5 seconds
    }


    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-undo"></i> Logout</a>`)
            let userData = JSON.parse(sessionStorage.getItem("user"));
            if (userData && userData.type === "user") {
                let user = userData.data;
                if (!sessionStorage.getItem("welcomeShown")) {
                    ShowWelcomeMessage(user.DisplayName);
                    sessionStorage.setItem("welcomeShown", "true");
                    setTimeout(function() {
                        $("#welcomeMessage").fadeOut("slow", function() {
                            $(this).remove();
                        });
                    }, 6000); // 6 seconds
                }
            }
        }

        $("#logout").on("click", function () {
            sessionStorage.clear();
            location.href = "index.html";
        });
    }

    function AjaxRequest(method, url, callback) {

        let xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (typeof callback == "function") {
                    callback(xhr.responseText);
                } else {
                    console.error("ERROR: Callback not a function");
                }
            }
        });

        xhr.send();
    }

    /**
     * Validates each field input using regular expressions with an error message
     */
    function ContactFormValidation(){
        // full name
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid First and Last Name");

        // contactNumber
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid contact number");

        // emailAddress
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");
    }

    function RegisterFormValidation(){
        // user name
        ValidateField("#userName",
                  /^[a-zA-Z0-9_]+$/,
                     "Please enter a valid user name");

        // first name
        ValidateField("#firstName",
                  /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]+)+/,
                     "Please enter a valid first name");

        // last name
        ValidateField("#lastName",
            /([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid last name");

        // emailAddress
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");

        // phone number
        ValidateField("#phoneNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone number");

        // password
        ValidateField("#password",
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                     "Please enter a valid password, password must contain 1 uppercase letter" +
            ", 1 lowercase letter, 1 digit, 1 special character and must be 8 characters or more.")
    }

    /**
     * This funtion validates input for contact and edit pages.
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id, regular_expression, error_message){
        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function (){
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                // fail validation
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                // pass validation
                messageArea.removeClass("class").hide();
            }
        });
    }
    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Call the function to load and play the video
        loadVideoBackground();

        function loadVideoBackground() {
            // Create a new Video element
            let videoElement = document.createElement("video");

            // Add attributes to the video element
            videoElement.setAttribute("loop", true);
            videoElement.setAttribute("muted", true);

            // Add a class to style the video
            videoElement.classList.add("video-background");
            document.addEventListener("DOMContentLoaded", function() {
                // Append the video to the background overlay
                document.getElementById("background-overlay").appendChild(videoElement);
            });
            // Add source elements for different video formats (e.g., mp4, webm)
            let videoSources =
                ["pictures/1655962330-1655962330-return-to-valorant-city-star-guardian-live-wallpaper.mp4"];

            videoSources.forEach(function (sourceUrl) {
                let sourceElement = document.createElement("source");
                sourceElement.setAttribute("src", sourceUrl);
                videoElement.appendChild(sourceElement);
            });

            // Play the video when it's fully loaded
            videoElement.addEventListener("loadeddata", function () {
                videoElement.play().then(function() {
                    // Video started playing successfully
                    console.log("Video started playing");
                }).catch(function(error) {
                    // Handle the error
                    console.error("Video play failed:", error.message);
                });
            });
        }
        let blogNav = document.getElementById("BlogNav");
        if (blogNav) {
            let blogIcon = document.createElement("i");
            blogIcon.setAttribute("class", "fa-solid fa-book");

            let textNodeBlog = document.createTextNode(' News');

            blogNav.innerHTML = "";

            blogNav.appendChild(blogIcon);
            blogNav.appendChild(textNodeBlog);
        }

        let navBar = document.getElementById("NavBar");
        if (navBar) {
            let careerNavItem = document.createElement("li");

            let careerLink = document.createElement("a");
            careerLink.setAttribute("class", "nav-link active");
            careerLink.setAttribute("href", "career.html")


            let careerIcon = document.createElement("i");
            careerIcon.setAttribute("class", "fa-solid fa-city");

            careerLink.appendChild(careerIcon);
            careerLink.appendChild(document.createTextNode(' Careers'));
            careerNavItem.appendChild(careerLink);
            navBar.appendChild(careerNavItem);
        }
    });

    function DisplayHomePage() {
        console.log("Called DisplayHomePage...");

        // Main content container
        let MainContent = document.getElementsByTagName("main")[0];

        // Paragraph inside a container
        let MainParagraphContainer = document.createElement("div");
        MainParagraphContainer.setAttribute("class", "main-paragraph-container");

        let MainParagraph = document.createElement("p");
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = `
        Welcome to Harmony Hub – your centralized control hub for seamless entertainment and smart home experiences! 
        We're thrilled to have you on board. Get ready to simplify your life with Harmony's intuitive features, 
        allowing you to effortlessly manage your devices and create custom activities. 
        
        Whether it's turning on your home theater system or setting the perfect mood lighting, Harmony Hub is here to harmonize your home. 
        
        Explore, customize, and enjoy the convenience of connected living. Let the harmony begin!
        `;
        MainParagraphContainer.appendChild(MainParagraph);
        MainContent.appendChild(MainParagraphContainer);
    }
    function DisplayContactPage() {
        console.log("Called DisplayContactPage...");

        var map = L.map('map').setView([43.9396879079, -78.8914931007], 15);

        L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let FullNameInput = document.getElementById('fullName');
        let EmailAddressInput = document.getElementById('emailAddress');
        let SubjectInput = document.getElementById('subject');
        let MessageInput = document.getElementById('message');

        let SendButton = document.getElementById("sendButton");
        let ContactForm = document.getElementById("ContactForm");

        SendButton.addEventListener("click", function (event) {
            event.preventDefault(); // prevent default form submission behaviour

            // trim the inputs of any blank
            let ContactName = FullNameInput.value.trim();
            let ContactEmail = EmailAddressInput.value.trim();
            let ContactSubject = SubjectInput.value.trim();
            let ContactMessage = MessageInput.value.trim();

            if (ContactName !== "" && ContactEmail !== "" && ContactSubject !== "" && ContactMessage !== "") {
                document.getElementById('modalFullName').textContent = `Full Name: ${ContactName}`;
                document.getElementById('modalEmailAddress').textContent = `Email Address: ${ContactEmail}`;
                document.getElementById('modalSubject').textContent = `Subject: ${ContactSubject}`;
                document.getElementById('modalMessage').textContent = `Message: ${ContactMessage}`;

                // clears the text fields
                $("#fullName").val('');
                $("#emailAddress").val('');
                $("#subject").val('');
                $("#message").val('');

                // Show the modal
                $('#ContactModal').modal("show")
                setTimeout(redirect, 5000);
            } else {
                $('#ContactErrorModal').modal("show")
            }
        });

        $("#cancelButton").on("click", function (event){
            $("#fullName").val('');
            $("#emailAddress").val('');
            $("#subject").val('');
            $("#message").val('');
        });

        // Submit a review
        $("#reviewButton").on("click", (event) => {
            event.preventDefault();

            $('#feedbackMessageArea').html('<p>Feedback submitted successfully!</p>');
            resetRatingStars();
            $('#review').val('');
        });

        // Cancel a review
        $("#cancelReviewButton").on("click", function(event) {
            event.preventDefault();

            $('#feedbackMessageArea').html('');

            resetRatingStars();

            $('#review').val('');
        });

        document.querySelectorAll('.star').forEach(function (star) {
            star.addEventListener('click', function () {
                const rating = this.dataset.rating;
                document.getElementById('rating').value = rating;

                // Remove selected class from all stars
                document.querySelectorAll('.star').forEach(function (star) {
                    star.classList.remove('selected');
                });

                // Add selected class to clicked star and all preceding stars
                this.classList.add('selected');
                if (this.previousElementSibling !== null){
                    this.previousElementSibling.classList.add('selected');
                }

                console.log('Rating selected:', rating);
            });
        });

        // function to redirect page
        function redirect() {
            window.location.href = "index.html";
        }

        function resetRatingStars() {
            // Remove the "selected" class from all stars
            $('.star').removeClass('selected');
            // Reset the hidden input value to 0
            $('#rating').val('0');
        }
    }


    function DisplayServicesPage(){
        console.log("Called DisplayServicePage...");
    }
    function DisplayBlogPage(){
        console.log("Called DisplayBlogPage...");
    }
    function DisplayPortfolioPage(){
        console.log("Called DisplayPortfolioPage...");

        // Storage for projects
        let Projects = [
            { title: 'EcoTech Innovators',
                description: 'The EcoTech Innovators project by Harmony Hub aims to create a sustainable, ' +
                    'technology-driven solution to address environmental challenges in our local community. ' +
                    'This comprehensive initiative combines community engagement, education, and the development of ' +
                    'innovative digital tools to promote eco-conscious practices and reduce our collective carbon footprint.',
                image: 'pictures/ecotech-harmony.jpg'},
            { title: 'EcoEdu Explorers',
                description: 'EcoEdu Explorers is a visionary project by Harmony Hub that seeks to cultivate ' +
                    'environmental literacy and a deep connection with nature among the younger generation. ' +
                    'This multifaceted initiative combines interactive learning experiences, community involvement, ' +
                    'and digital tools to instill a sense of environmental stewardship in the minds of children.',
                image: 'pictures/EcoEdu Explorers.jpg'}
        ]

        // Storage more projects
        let MoreProjects = [
            { title: 'Harmony Health Connect',
                description: 'Harmony Health Connect is a groundbreaking project by Harmony Hub that aims to bridge the ' +
                    'gap between technology and healthcare, providing an integrated platform to enhance health outcomes ' +
                    'and foster a holistic approach to well-being within our community.',
                image: 'pictures/Harmony Health Connect.jpg'}
        ]

        let CardContainer = document.getElementsByTagName("main")[0];

        // Loop to create every card in the storage
        Projects.forEach(project => {
            CreateProjectCard(project);
        })

        function CreateProjectCard(Project){
            // creating div for the card
            let Card = document.createElement('div');
            Card.setAttribute("class", "portfolioDiv")

            // create h2 tag for the title of the card
            let Title = document.createElement('h2');
            Title.setAttribute("class", "blog-title")
            // put the text into the h2 tag
            Title.textContent = Project.title;

            // create a paragraph tag to store the description of the card
            let Description = document.createElement('p');
            Description.setAttribute("class", "ProjectDescription");
            // put the text into the p tag
            Description.textContent = Project.description;

            // create a picture tag to store the image of the project
            let Picture = document.createElement('img');
            Picture.setAttribute("class", "ProjImg")

            // add the image to the tag
            Picture.src = Project.image;
            // add an alternate text in case image does not load
            Picture.alt = Project.title

            // Append the tags to the card
            Card.appendChild(Title);
            Card.appendChild(Description);
            Card.appendChild(Picture);

            // Append div to main container
            CardContainer.appendChild(Card);
        }

        // make function to add more projects
        function AddMoreProjects(){
            // Clears the main tag project
            CardContainer.innerHTML = '';

            // Recreate the old project
            Projects.forEach(project => {
                CreateProjectCard(project);
            })

            // Creates new projects
            MoreProjects.forEach(MoreProject => {
                CreateProjectCard(MoreProject);
            })
        }

        let LoadMoreBtn = document.getElementById("LoadMoreBtn");
        LoadMoreBtn.addEventListener("click", function (){
            AddMoreProjects();
        });
    }
    function DisplayPrivacyPolicyPage(){
        console.log("Called DisplayPrivacyPolicyPage...");

    }
    function DisplayTeamPage(){
        console.log("Called DisplayServicePage...");
    }
    function DisplayTOSPage(){
        console.log("Called DisplayServicePage...");

    }

    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage...");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";

            let index = 1;
            let keys = Object.keys(localStorage);

            for(const key of keys){
                let contact = new core.Contact();
                let contactData = localStorage.getItem(key);
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text=center">${index}</th>
                        <td>${contact.fullName}</td>
                        <td>${contact.contactNumber}</td>
                        <td>${contact.emailAddress}</td>
                        <td>
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                                <i class="fas fa-edit fa-sm"> Edit</i>
                            </button>
                        </td>
                        <td>
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                                 <i class="fas fa-trash-alt fa-sm"> Delete</i>
                            </button>
                        </td>
                        </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }

        $("#addButton").on("click", () => {
            location.href = "edit.html#add";
        });

        $("button.edit").on("click", function (){
            location.href = "edit.html#" + $(this).val();
        });

        $("button.delete").on("click", function (){
            if (confirm("Confirm Delete Contact?")){
                localStorage.removeItem($(this).val());
            }
            location.href="contact-list.html";
        });
    }

    function LoadCareer(htmlData){
        $("main").html(htmlData);
    }

    function DisplayCareerPage(){
        console.log("Called DisplayCareerPage()...");
        AjaxRequest("GET", "./views/content/careerContent.html", LoadCareer);
    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()...");

        ContactFormValidation();

        let page = location.hash.substring(1)
        switch (page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fa fa-plus fa-sm"</i> Add`)

                $("#editButton").on("click", (event) => {
                    // prevent form submission.
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break;
            default:
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                // display the contact information
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click", (event) => {

                    // Prevent the form submission
                    event.preventDefault();
                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val();
                    contact.emailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break;
        }
    }

    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage...");

        let messageArea = $("#messageArea");

        $("#loginButton").on("click", function () {

            let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function(data) {
                for(const user of data.users) {
                    console.log(user);
                    if (userName.value === user.Username && password.value === user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }if(success) {
                    sessionStorage.setItem("user", JSON.stringify({ type: "user", data: newUser.toJSON() }));
                    // sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "contact-list.html";
                } else {
                    $("#userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Credentials").show();
                }

            });
        });
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            location.href = "index.html";
        })
    }

    function DisplayRegisterPage(){
        console.log("Called DisplayServicePage...");

        RegisterFormValidation();

        $("#registerButton").on("click", (event) =>{
            event.preventDefault();
        });
    }

    function DisplayGalleryPage(){
        console.log("Called DisplayGalleryPage...");
        document.addEventListener("DOMContentLoaded", function() {
            InitializeLightbox();
        });
    }

    function DisplayEventsPage(){
        console.log("Called DisplayEventsPage...");
        $.get("./data/events.json", function(data) {
            for(const event of data.events) {
                $("#events").append(
                    `
                    <div class="event-card">
                        <h2>${event.title}</h2>
                        <p>Date: ${event.date}</p>
                        <p>Location: ${event.location}</p>
                        <p>Description: ${event.description}</p>
                    </div>
                    `
                );
            }
        });

    }

    function search(){
        let query = $("#searchInput").val().trim().toLowerCase();
        // Switch case to compare the input the various pages we have
        switch(query){
            case "career":
                redirect('career.html');
                break;
            default:
                console.log("No matching page found: " + query);
                break;
        }
    }

    function LoadHeader(htmlData) {
        $("header").html(htmlData);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
        $("#searchButton").on("click", (event) => {
            event.preventDefault();// Prevent default button behavior

            search();
        });
        $("#Careers").append(`
            <a class="nav-link" href="../../career.html"> <i class="fa-solid fa-briefcase"></i> Career</a>`);
        $("#BlogNav").html(`
            <i class="fa-solid fa-book"></i> News
        `);
    }

    function Start(){
        console.log("App Started...");

        AjaxRequest("GET", "./views/components/header.html", LoadHeader);

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Blog":
                DisplayBlogPage();
                break;
            case "Contact":
                DisplayContactPage();
                break;
            case "Portfolio":
                DisplayPortfolioPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "PrivacyPolicy":
                DisplayPrivacyPolicyPage();
                break;
            case "Team":
                DisplayTeamPage();
                break;
            case "TOS":
                DisplayTOSPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Career":
                DisplayCareerPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            case "Gallery":
                DisplayGalleryPage();
                break;
            case "Events":
                DisplayEventsPage();
                break;
        }
    }

    window.addEventListener("load", Start);

})();