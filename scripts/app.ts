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
        // Step 1: create an empty XHR object
        let XHR = new XMLHttpRequest();

        // Step2: Compse the Request
        XHR.open(method,url);

        // Step3: send the request to the server
        XHR.send();

        // Step 4: setup an event Listener
        XHR.addEventListener("readystatechange", function(){
            if((XHR.status ==200)&&(XHR.readyState ==4))
            {
                // console.log(XHR.responseText);
                // let contactDataSource= JSON.parse(XHR.responseText);
                // console.log(contactDataSource.ContactList[0]);
                callback(XHR.responseText);
            }
        });

    }

    // First meyhod of using functions
    function Start(){
        console.log("App started");
        // LoadData("GET", "./Data/contacts.json", function(XHR){
        //     console.log(XHR);
        // });
        $.getJSON("./Data/contacts.json",function(DataSource){
            console.log(DataSource.ContactList);
        })
    }

    window.addEventListener("load", Start);
})();






/*  for reference only
(function()
{
//  first method of using function

    function Start()
    {
        console.log("App Started");

        // for(let index =0; index <10;index++){
        //     console.log(index);
        // }
        // index =15;
        // console.info(index);
    }


    // second method of using function (let function)

    // let Start = function(){
    //     console.log("app Started");
    // }


    // third method of using function (arrow function)

    // let Start = ()=>{
    //     console.log("app Started");
    // }
    window.addEventListener("load", Start);
})();*/