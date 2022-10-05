"use strict";
// IFFE -- Immediately invoked function expression
// self executing function
(function () {
    /**
     * This function loads data asynchrounously from a URL.
     *It calls the callback function when the data loading is complete
     * @param {string} method
     * @param {string} url
     * @param {function} callback
     */
    function LoadData(method: string, url: string, callback: Function): void {
        let XHR = new XMLHttpRequest();
        XHR.open(method, url);
        XHR.send();
        XHR.addEventListener("readystatechange", function () {
            if ((XHR.status == 200) && (XHR.readyState == 4)) {
                callback(XHR.responseText);
            }
        });
    }
    /**
     * this method saves our data to localStorge
     *
     * @param {any[]} contactList
     */
    function SaveContactListData(contactList: any[]): void {
        let count = 0;
        for (const contact of contactList) {
            let newContact = new Contact(contact.FullName, contact.ContactNumber, contact.EmailAddress);
            //  console.log(newContact.toString());
            localStorage.setItem(count.toString(), newContact.toJSON());
            count++;
        }
    }
    /**
     * this method reads our data from the localStorage and returns a contact Array
     *
     * @return {*}  {Contact[]}
     */
    function LoadCOntactListData(): Contact[] {
        // create an empty contact array container
        let ContactArray = new Array<Contact>();
        let keys = Object.keys(localStorage);
        for (let key of keys) {
            let newContact = new Contact();
            console.log(localStorage.getItem(key));
            newContact.fromJSON(localStorage.getItem(key));
            console.log(newContact.toString());
            ContactArray.push(newContact);
        }
        return ContactArray;
    }
    
    function LoadHeader(): void {
        $.get("./Views/components/header.html", function (html_data) {
            // console.log(html_data);
            $("header").html(html_data);
            // switch (document.title) {
            //     case "Home":
            //         $("#homePage").addClass("active");
            //         break;
            //     case "About Us":
            //         $("#aboutPage").addClass("active");
            //         break;
            //     case "Our Projects":
            //         $("#projectsPage").addClass("active");
            //         break;
            //     case "Our Services":
            //         $("#servicesPage").addClass("active");
            //         break;
            //     case "Contact Us":
            //         $("#contactPage").addClass("active");
            //         break;
            // }
            $("li>a").on("click", function()
            {
                let title =$(this).prop("id") as string;
                document.title = title.substring(0,1).toUpperCase() + title.substring(1);
                LoadContent();
            });
            
        });
    }
    function LoadContent(): void {
            switch (document.title) 
            {
                case "Home":
                    $.get("./Views/content/home.html", function (html_data){$("main").html(html_data);})
                    break;
                case "About":
                      $.get("./Views/content/about.html", function (html_data){$("main").html(html_data);})
                    break;
                case "Projects":
                      $.get("./Views/content/projects.html", function (html_data){$("main").html(html_data);})
                    break;
                case "Services":
                      $.get("./Views/content/services.html", function (html_data){$("main").html(html_data);})
                    break;
                case "Contact":
                      $.get("./Views/content/contact.html", function (html_data){$("main").html(html_data);})
                    break;
            }
        }
    function LoadFooter(): void {
        $.get("./Views/components/footer.html", function (html_data) {
            // console.log(html_data);
            $("footer").html(html_data);
        });
    }

    function Start() {
        console.log("App started");
        document.title="Home";
        LoadHeader();
        // LoadContent();
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();