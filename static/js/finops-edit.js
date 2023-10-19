import finopsJson from '/json/finops.json' assert {type: 'json'};


window.onload = function (){ 

    document.getElementById("topic").innerText = "FinOps Strategic Technical Framework";

    const allArrays = splitData(finopsJson);

    // Radio Buttons and CheckBoxes have to be rendered now
    renderHTMLInputControls(allArrays[0],'radio','rblBiz');
    renderHTMLInputControls(allArrays[1],'checkbox','cbListIT');
    renderHTMLInputControls(allArrays[2],'checkbox','cbListCap');
    renderHTMLInputControls(allArrays[3],'checkbox','cbListEnablers');

    // Finally, render the button that will be used for updating hierarchy changes
    renderHTMLButton('updateHierarchyButton',allArrays[4]);

}

function splitData(allArrays)
{
    // allData has a list of Biz strat, IT strat, capability, enablers
    // I have to break it up into 4 different arrays and then populate
    // the tables for each of the four.

    var bizArray = [];
    var itArray = [];
    var capArray = [];
    var enablersArray = [];
    //var descriptionArray = [];
    var combinedData = []
   
    for (let i=0;i<allArrays.length; i++){
        
        const type = allArrays[i].type;        

        if (type === 'biz')
            bizArray.push(allArrays[i]);

        if (type === 'its')
            itArray.push(allArrays[i]);

       if (type === 'cap')
            capArray.push(allArrays[i]);

        if (type === 'enabler')
            enablersArray.push(allArrays[i]);

        /* if (type === 'desc')
            descriptionArray.push(allData[i]); */

        combinedData.push(allArrays[i]);
    }

    // return arrays wrapped inside an array

    return [bizArray,itArray,capArray,enablersArray,combinedData];//,descriptionArray];
}

function renderHTMLInputControls(dataArray, type, controlId){
    
    var td = document.getElementById(controlId);

    for(let entry=0; entry<dataArray.length;entry++){
        
        // Declare Radio Button List
        let newInputControl = document.createElement("input");
        newInputControl.type = type;
        newInputControl.value = dataArray[entry].title;
        newInputControl.id = dataArray[entry].name;
        newInputControl.name = controlId;
        newInputControl.className = controlId;
        newInputControl.alt = dataArray[entry].tree;

        // Create text to display
        let newInputControlText = document.createTextNode(dataArray[entry].title);

        // Attach event to RBL
        if (type === 'radio'){
            newInputControl.addEventListener('click',function(){
                showHierarchy(newInputControl.alt);
            });
        }  

        // attach RBL to TD
        td.appendChild(newInputControl);
        td.appendChild(newInputControlText);
        td.appendChild(document.createElement('br'));
    }     
}

function renderHTMLButton(tableCellId,combinedData){
    var td = document.getElementById(tableCellId);

    // Generate a new button to add to the table cell
    let newButton = document.createElement("BUTTON");
    let buttonText = document.createTextNode("Update Hierarchy");

    // assign Id, color, width to button
    newButton.id = 'updateHierarchyButton';
    //newButton.style.backgroundColor = colorHex;
    newButton.style.width="30%";
    newButton.style.fontSize = "16px";

    // Attach event to button
    newButton.addEventListener('click', function(){
        updateHierarchy(combinedData);
    });
       
    //assign style to TD to place buttons in the middle
    td.setAttribute("display","block");
    td.setAttribute("margin","auto");

    newButton.appendChild(buttonText);
    td.appendChild(newButton);
    
}

function showHierarchy(theTree){

    // Some checkboxes might still be checked and we have to uncheck them
    var checkBoxesRendered = document.getElementsByTagName('input');
    for (var i = 0; i < checkBoxesRendered.length; i++){
        if (checkBoxesRendered[i].type == 'checkbox')
            checkBoxesRendered[i].checked = false;
    }    
    
    // tree has the following structure: b,its,cap,enabler
    // to show hierarchy, the string needs to be split around the ','
    // loop through the array and if array entry starts: 
    //  with b, highlight biz
    //  with its, highlight IT
    //  with cap, highlight Capabilities
    //  with enabler, highlight Enablers

    var itemsToHighlight = theTree.split(',');
    
    for (let i = 0; i <itemsToHighlight.length; i++){
        if(itemsToHighlight[i].startsWith('b'))
            continue;
        if(itemsToHighlight[i].startsWith('i'))
            tickCheckBoxes('cbListIT',itemsToHighlight[i]);
        if(itemsToHighlight[i].startsWith('c'))
            tickCheckBoxes('cbListCap',itemsToHighlight[i]);
        if(itemsToHighlight[i].startsWith('e'))
            tickCheckBoxes('cbListEnablers',itemsToHighlight[i]);
    }
}

function tickCheckBoxes(controlId, valueToTick){

    let elementsArray = document.getElementsByClassName(controlId);
    
    for (let element = 0; element< elementsArray.length; element++){
        if (elementsArray[element].id === valueToTick)
            elementsArray[element].checked = true;
    }
}

function updateHierarchy(combinedData){
    
    // To update hierarchy, I need the ID of the biz (or its or cap or enabler) for which the mapping is being updated.
    // This I will do by finding the radio button list which has been selected

    var selectedId = getSelectedRadioButton(); 
    var checkBoxesSelected = getSelectedCheckBoxes(selectedId);

    console.log(selectedId);
    console.log(checkBoxesSelected);

}

function getSelectedRadioButton(){

    var selectedId;

    let inputControlsArray = document.getElementsByTagName('input');

    for (var i = 0; i < inputControlsArray.length; i++){
        if (inputControlsArray[i].type == 'radio' && inputControlsArray[i].checked){
            selectedId = inputControlsArray[i].id;
        } 
    }
    return selectedId;
}

function getSelectedCheckBoxes(selectedId){
    
    var selectedCheckBoxesId='';

    let checkBoxesArray = document.getElementsByTagName('input');

    //console.log(checkBoxesArray);

    for (var i=0; i<checkBoxesArray.length; i++){
        if(checkBoxesArray[i].type == 'checkbox' && checkBoxesArray[i].checked){
            selectedCheckBoxesId = selectedCheckBoxesId + checkBoxesArray[i].id;
            selectedCheckBoxesId += ',';
        }
    }
    // Trimming the extra ',' at the end of selectedCheckBoxesId
    selectedCheckBoxesId = selectedCheckBoxesId + selectedCheckBoxesId.slice(0,selectedCheckBoxesId.length-1);

    // Adding the PRIMARY ID to the front of the selectedCheckBoxesId value
    return selectedId + ',' + selectedCheckBoxesId;
}

function updateDataFile(combinedArray){    
    //const fs = jsonfile;
}

