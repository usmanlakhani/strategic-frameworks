//import allData from './index.json' assert {type: 'json'};
import indexJson from '/json/index.json' assert {type: 'json'};

window.onload = function(){

    renderHTMLAnchorLinks(indexJson);
}

function renderHTMLAnchorLinks(indexJson){

    var chunks = []
    var chunkSize = 3;
    chunks = chunkArray(indexJson,chunkSize);
    
    var tblFrameworks = document.getElementById('tblFrameworks');
        
    // Loop through the chunks and for each chunk, create a TD for Domain Name and a TD for Action (View and Edit)
    for (let chunk=0; chunk<chunks.length; chunk++){

       var dataInChunk = chunks[chunk];      

       for (let index=0; index < dataInChunk.length; index++){
         
        var newTR = document.createElement('tr');
        var newDomainTD = document.createElement('td');
        var newViewTD = document.createElement('td');
        var newEditTD = document.createElement('td');


        // 1. Configure Domain TDs
        newDomainTD.innerHTML = dataInChunk[index].domain;
        newDomainTD.className = 'tableCellStyle';
        newDomainTD.style.width = '50%';

        // 2. Configure Action TDs
        newViewTD.className = 'tableCellStyle';
        newViewTD.style.width = '25%';   
        
        newEditTD.className = 'tableCellStyle';
        newEditTD.style.width = '25%'; 

        // 2a. Depending upon value of ACTIVE, View and Edit will either be a href or not
        if(dataInChunk[index].type === "framework"){
            
            // 2a.1 View link
            var linkView = document.createElement('a');           
            linkView.innerHTML = 'View';
            newViewTD.appendChild(linkView);
            if(dataInChunk[index].activeView === 'true')
                linkView.href = dataInChunk[index].view;

            // 2a.2 Edit link
            var linkEdit = document.createElement('a');
            linkEdit.innerHTML = 'Edit';
            newEditTD.appendChild(linkEdit);
            if(dataInChunk[index].editView === 'true')
                linkEdit.href = dataInChunk[index].edit;
                
        }

        // 3. Attach table cells to table row
        newTR.appendChild(newDomainTD);
        newTR.appendChild(newViewTD);
        newTR.appendChild(newEditTD);

        // 4. Attach table row to main table
        tblFrameworks.appendChild(newTR);
       }      
    }
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