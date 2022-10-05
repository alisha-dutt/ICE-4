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
    function LoadData(method, url, callback) {
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
    function SaveContactListData(contactList) {
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
    function LoadCOntactListData() {
        // create an empty contact array container
        let ContactArray = new Array();
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
    function LoadHeader() {
        $.get("./Views/components/header.html", function (html_data) {
            // console.log(html_data);
            $("header").html(html_data);
            switch (document.title) {
                case "Home":
                    $("#homePage").addClass("active");
                    break;
                case "About Us":
                    $("#aboutPage").addClass("active");
                    break;
                case "Our Projects":
                    $("#projectsPage").addClass("active");
                    break;
                case "Our Services":
                    $("#servicesPage").addClass("active");
                    break;
                case "Contact us":
                    $("#contactPage").addClass("active");
                    break;
            }
        });
    }
    function LoadFooter() {
        $.get("./Views/components/footer.html", function (html_data) {
            // console.log(html_data);
            $("footer").html(html_data);
        });
    }
    function Start() {
        console.log("App started");
        LoadHeader();
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map