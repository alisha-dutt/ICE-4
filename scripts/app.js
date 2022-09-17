// IFFE -- Immediately invoked function expression
// seld executing function
(function(){

    function Start()
    {
        console.log("App Started");
    }
    window.addEventListener("load", Start);
})();