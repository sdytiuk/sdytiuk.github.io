function CallAjax(url, getData, type, dataType, fxnSuccess, fxnError)
{
    let ajaxOptions = {};

    //AJAX! These are the minimum properties to send an AJAX request
    //url - where to send the request
    //type - GET (select)/ POST (update)/ PUT (insert) / DELETE (delete)
    //GET is the type by DEFAULT
    //data - what data are we sending? (must match web service spec!)
    //dataType - what response do we want back? (HTML, JSON, XML)
    //success - callback for successful completion - once the async request is complete
    //error - callback for error in operation
    ajaxOptions['url'] = url;
    ajaxOptions['data'] = getData;
    ajaxOptions['type'] = type;
    ajaxOptions['dataType'] = dataType;
    ajaxOptions['success'] = fxnSuccess; //method
    ajaxOptions['error'] = fxnError; //method

    $.ajax(ajaxOptions);
}

$(document).ready(() =>
{
    $("#butIntel").click( () => {
        //click handler for Smart Dump
        //set up the AJAX request and dump the results to the console
        //https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple

        //"cheating" way - do not send by GET, just use the filled-in URL:
        //CallAjax("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple",
        //null,"GET","JSON",AjaxLogToConsole,AjaxError);

        //"proper" way - send data using GET!
        let getData = {};
        getData['amount'] = 10;
        getData['category'] = 21;
        getData['difficulty'] = "easy";
        getData["type"] = "multiple";

        CallAjax("https://opentdb.com/api.php",getData,"GET", "JSON", SmartDump, AjaxError);
    });

    $("#butPlay").click( () =>
    {
        let getData = {};
        getData['amount'] = $("#HowMany").val();
        getData['category'] = 21;
        getData['difficulty'] = "easy";
        getData["type"] = "multiple";

        CallAjax("https://opentdb.com/api.php",getData,"GET", "JSON", GenerateGame, AjaxError);
    });

});

function GenerateGame(ajaxData, responseStatus)
{
    //parent tag: 
    let parent = $("#Display");

    for (let item in ajaxData["results"])
    {
        //create divs for each question
        let qDiv = document.createElement("div");
        //display the question
        $(qDiv).append(ajaxData["results"][item]["question"]);
        parent.append(qDiv);
    }
    

}

//these are the params that AJAX request sends back...
function AjaxLogToConsole(ajaxData, responseStatus)
{
    console.log(ajaxData);
}

function SmartDump(ajaxData, responseStatus)
{
    //purpose: display the response data intelligently into the #SmartDump
    //smart meaning don't hardcode any expectations of the data

    RecursiveSmartDump(ajaxData, $("#SmartDump"));
    
}

//display the info from anyObject into the parentElem
//parentElem is a JQuery object
function RecursiveSmartDump(anyObject,parentElem)
{
    //ADD: create elements to display the results in a bulleted, indented list
    //RESUME class at 3:10

    //create an unordered list which will be placed inside the parentElem
    let ol = document.createElement("ul");

    //for every item in the collection
    for (let item in anyObject)
    {
        //dumping to the console
        console.log(item + ": " + anyObject[item]);
        //create a bullet point
        let li = document.createElement("li");

        //if the item is an object, I want to call the function again and insert
        //the information as an indent to the current bullet point
        if (typeof(anyObject[item]) == 'object')
        {
            //write the name of the item (i.e. incorrect_answers)
            $(li).html(item);
            //we know it's an object and we want to display that too!
            RecursiveSmartDump(anyObject[item],$(li));
            
        }
        //the item is not an object so display the item and it's associated value
        else
            $(li).html(item + ": " + anyObject[item]);
        //append the bullet point that has been filled in to the list
        $(ol).append(li);
    }

    //append the list to the specified parent element
    parentElem.append(ol);
}

function AjaxError(ajaxReq, textStatus, errorThrown)
{
    console.log('Error : ' + ajaxReq + ': ' + textStatus + ': ' + errorThrown);
}