"use strict";
// IFFE -- Immediately invoked function expression
// self executing function
(function()
{
    /**
     * This function loads data asynchrounously from a URL.
     *It calls the callback function when the data loading is complete
     * @param {string} method
     * @param {string} url
     * @param {function} callback
     */
    function LoadData(method:string,url:string,callback:Function):void{
        let XHR = new XMLHttpRequest();
        XHR.open(method,url);
        XHR.send();
        XHR.addEventListener("readystatechange", function(){
            if((XHR.status ==200)&&(XHR.readyState ==4))
            {
                callback(XHR.responseText);
            }
        });
    }
    /**
     * this method saves our data to localStorge
     *
     * @param {any[]} contactList
     */
    function SaveContactListData(contactList:any[]):void
    {
        let count =0;
            for (const contact of contactList) 
            {
             let newContact = new Contact(contact.FullName, contact.ContactNumber,contact.EmailAddress);   
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
    function LoadCOntactListData():Contact[]
    {
        // create an empty contact array container
        let ContactArray = new Array<Contact>();
        let keys = Object.keys(localStorage);
        for(let key of keys){
            let newContact= new Contact();
           console.log(localStorage.getItem(key));
           newContact.fromJSON(localStorage.getItem(key));
           console.log(newContact.toString());
           ContactArray.push(newContact);
        } 
        return ContactArray;
    }
    function Start(){
        console.log("App started");        
        $.getJSON("./Data/contacts.json",function(DataSource){
            // Get data from dataScouce
            // console.log(DataSource.ContactList);
            let contactList:any[]= DataSource.ContactList;
              SaveContactListData(contactList);
              let ContactArray =LoadCOntactListData();
              for (const contact of ContactArray) {
                console.log(contact.toString());
              }
            // load data into objects
            // let contact = new Contact();
            // console.log(contact.toString());                      
        });
        
    } 
    window.addEventListener("load", Start);
})();