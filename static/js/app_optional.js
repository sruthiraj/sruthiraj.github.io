// from data.js
var tableData = data;

// initializing
const headerValues = ["Date", "City", "State", "Country", "Shape", "Duration", "Comments"];
const elementToFieldMappings = [{elementId: "datetime", fieldName: "datetime"},{elementId: "city", fieldName: "city"}, {elementId: "state", fieldName: "state"}, {elementId: "country", fieldName: "country"},{elementId: "shape", fieldName: "shape"}];

// select table
var table = d3.select("table");

//populate table with all conents
function populateTable(data) {
    table.selectAll("tr").remove();
    buildHeader();
    data.forEach(appendRows);
}

// builds the headers of the table
function buildHeader() {
    var header = table.append("tr");
    for (var i = 0; i < headerValues.length; i++) {
        header.append("th").text(headerValues[i]);
    }
}

//append rows of the table
function appendRows(dataRow) {

    var row = table.append("tr");
    var thekeys = Object.keys(dataRow);
    for (var i = 0; i < thekeys.length; i++) {
        row.append("td").text(dataRow[thekeys[i]]);
    }
}

populateTable(tableData);

// multiple filters
var filterTable = d3.select("#filter-btn");

filterTable.on("click", function () {
    d3.event.preventDefault();
    var filteredData = tableData;
    elementToFieldMappings.forEach(function(elementToFieldMapping){
        filteredData = filterDataset(filteredData, elementToFieldMapping.elementId, elementToFieldMapping.fieldName);    
    })
       
    populateTable(filteredData);
  
});

function filterDataset(dataset, inputElementId, fieldName){
    var inputValue = d3.select('#' + inputElementId).property("value");
    
    if (!inputValue) {
        return dataset
    }
    return dataset.filter(row => row[fieldName] === inputValue);
}

