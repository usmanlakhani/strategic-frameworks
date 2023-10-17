import finopsJson from '/json/finops.json' assert {type: 'json'};
 

window.onload = function (){   
    
    //**** Print Topic */
    document.getElementById("topic").innerText = "FinOps Strategic Technical Framework";
    
    const allArrays = splitData(finopsJson);
   
    renderBusiness(allArrays[0],finopsJson[4]);
    renderIT(allArrays[1],finopsJson[4]);
    renderCapabilities(allArrays[2],finopsJson[4]);
    renderEnablers(allArrays[3],finopsJson[4]);
    
}

function splitData(finopsJson)
{
    //allData has a list of Biz strat, IT strat, capability, enablers
    // I have to break it up into 4 different arrays and then populate
    // the tables for each of the four.

    var bizArray = [];
    var itArray = [];
    var capArray = [];
    var enablersArray = [];
    var descriptionArray = [];
   
    for (let i=0;i<finopsJson.length; i++){
        
        const type = finopsJson[i].type;        

        if (type === 'biz')
            bizArray.push(finopsJson[i]);

        if (type === 'its')
            itArray.push(finopsJson[i]);

       if (type === 'cap')
            capArray.push(finopsJson[i]);

        if (type === 'enabler')
            enablersArray.push(finopsJson[i]);

        if (type === 'desc')
            descriptionArray.push(finopsJson[i]);
    }
    //Return all of the sub arrays as ONE ARRAY 
    //This is the way I used to return multiple arrays in one go.

    return [bizArray,itArray,capArray,enablersArray,descriptionArray];
}

function renderBusiness(bizArray,descriptionArray){
    
    //var bizArray = JSON.parse(biz)
    var td = document.getElementById("bizRowTable")
    renderEmbeddedTable(td,bizArray,4,true,"#90CAF9",descriptionArray,true);    
}

function renderIT(itArray,descriptionArray){
    
    //var itArray = JSON.parse(its)
    var td = document.getElementById("itRowTable")
    renderEmbeddedTable(td,itArray,4,false,"#D1C4E9",descriptionArray,false);    
}

function renderCapabilities(capArray,descriptionArray){
    
    //var capArray = JSON.parse(cap)
    var td = document.getElementById("capRowTable")
    renderEmbeddedTable(td,capArray,6,false,"#FFCC80",descriptionArray,false)    
}

function renderEnablers(enablersArray,descriptionArray){
    
    //var enablersArray = JSON.parse(enablers)
    var td = document.getElementById("enRowTable")
    renderEmbeddedTable(td,enablersArray,8,false,"#A9FF56",descriptionArray,false);    
}

// Function Signature: 
// tableCell = The name of the table cell (td) in which we make the dynamic html table
// itemsArray = The array holding the ID, name and other information for the table cell. Contents for itemsArray are saved in .json
// chunkSize = The number of cells to make before line breaking
// attachEvent = true will make a tree for the button (tree = all connected domains across Biz, IT, Cap and Enablers)
// colorHex = Color code for each row and its sub HTML elements
// descriptionArray = Holds the description text that comes from .json file
// displayDescription = boolean to confirm if descriptions are to be shown or not
function renderEmbeddedTable(tableCell, itemsArray,chunkSize,attachEvent,colorHex,descriptionArray,displayDescriptions){

    var embeddedTable = document.createElement("table");
    embeddedTable.setAttribute("width","99%");    
    embeddedTable.className = 'tg';

    // Chunk the itemsArray into smaller arrays.
    var chunks = []; 

    chunks = chunkArray(itemsArray,chunkSize);

    for(let row=0;row<chunks.length;row++)
    {
           
            // Make row
           let newRow = document.createElement("tr");

           var smallerChunk = chunks[row];

           // make cells based on the contents of smallerChunk
           for (let cell=0;cell<smallerChunk.length;cell++)
           {    
                // let 
                let newCell = document.createElement("td");
                let newButton = document.createElement("BUTTON");
                let buttonText = document.createTextNode(smallerChunk[cell].title);

                // assign style to table cell
                //newCell.style.border = " black solid 1px";

                // Make button text big enough to read
                //buttonText.setAttribute("fontSize","10px");

                // assign Id, color, width to button
                newButton.id = smallerChunk[cell].name;
                newButton.style.backgroundColor = colorHex;
                newButton.style.width="99%";
                newButton.style.fontSize = "16px";
                newButton.title = smallerChunk[cell].alt;
                newButton.className="notpressed";

                //assign style to TD to place buttons in the middle
                newCell.setAttribute("horizontal-align","middle");
                newCell.setAttribute("display","block");
                newCell.setAttribute("margin","auto");


                //assign an event to the button
                if(attachEvent)
                {
                    newButton.name = smallerChunk[cell].tree;
                    newButton.addEventListener("click", function()
                    {
                        highlightTree(newButton.name);
                        //showDescription(newButton.id,descriptionArray);
                    });                    
                }

/*                 if(displayDescriptions){
                    newButton.name = smallerChunk[cell].tree;
                    newButton.addEventListener("click",function()
                    {
                        showDescription(newButton.id,descriptionArray);
                    });
                } */

                // put elements in their place
                newButton.appendChild(buttonText);
                newCell.appendChild(newButton);
                newRow.appendChild(newCell);
           }

           embeddedTable.appendChild(newRow)
    }

    tableCell.appendChild(embeddedTable);
}

function chunkArray(itemsArray,chunkSize){
    let index=0;
    const results = [];
    while (index < itemsArray.length)
    {
        results.push(itemsArray.slice(index,index+chunkSize));
        index += chunkSize;
    }
    return results;
}

function highlightTree(children)
{
    const toBeGreyed = document.getElementsByClassName("notpressed");
    for(let toGreyOut=0; toGreyOut<toBeGreyed.length; toGreyOut++)
    {
        document.getElementById(toBeGreyed[toGreyOut].id).style.backgroundColor = "#757575";
        document.getElementById(toBeGreyed[toGreyOut].id).disabled = true;
    }
    
    var arrTree = children.split(",");

    for (let x=0; x<arrTree.length;x++)
		{
			let depId = arrTree[x];
			//alert(typeof enablerId);
			document.getElementById(depId).style.background='#FEFC00';
            document.getElementById(depId).className="pressed";
            document.getElementById(depId).disabled = false;
		}
}

/* function showDescription(buttonId,descriptionArray){
    
    var embeddedTable = document.createElement("table");
    embeddedTable.setAttribute("width","99%");    
    embeddedTable.className = 'tg';

    //tdBizDescription
    alert("ho");

} */

