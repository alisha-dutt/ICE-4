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
    function Start(){
        console.log("App started");
        $.getJSON("./Data/contacts.json",function(DataSource){
            console.log(DataSource.ContactList);
        });
         localStorage.setItem ("0", "Alisha Dutt");
    } 
    window.addEventListener("load", Start);
})();