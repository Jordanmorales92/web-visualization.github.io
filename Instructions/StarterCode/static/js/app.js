// Dropdown Function
function menu() {

    // Dropdown Menu

    let dropdown= d3.select("#selDataset");

    // Pull Data from JSON

    d3.json("samples.json").then((data) => {
        console.log(data);
    

    let sample_id = data.names;

    sample_id.forEach((x) => {
        dropdown.append("option").text(x).property("value", x);
    });

    metadata(sample_id[0]);
    charts(sample_id[0]);
    
    });
}


// Metadata Function:
function metadata(x) {
  d3.json("samples.json").then((data) => {
    
    // Data for MetaData 
    let subject_demos = data.metadata;

    // Loop for MetaData //Now do the metadata demo panel at sample-metadata
    let demographics = subject_demos.filter(demographic => demographic.id == x)[0];

    // Display Metadata
    let metadata_text = d3.select("#sample-metadata");

    // Output

    metadata_text.html("");

    //
    Object.entries(demographics).forEach(([key, value]) => {
        metadata_text.append("p").text(`${key}: ${value}`);
    });
 }); 
}

// Charts Function

function charts(x) {

 d3.json("samples.json").then((data) => { 
    
    // Data from Samples
    let samples = data.samples;

    // Loop through Samples
    let sample_object = samples.filter(object => object.id ==x)[0];

    // Variables
    let ids = sample_object.otu_ids;
    let labels = sample_object.otu_labels;
    let values = sample_object.sample_values;

    // Slicing
    let top_ids = ids.slice(0,10).reverse().map(otuID => 'OTU' + otuID);
    let top_labels = labels.slice(0,10).reverse();
    let top_values = values.slice(0,10).reverse();

    // Create Charts
    var bar_chart = [
        {
            x: top_values,
            y: top_ids,
            text: top_labels,
            type: "bar",
            orientation: "h"
        }
    ];

    // Bar Layout
    var bar_layout = {
        title: "Belly Button Bar Chart",
        xaxis: {title: "OTU ID"}};

    // Rendering Chart
    Plotly.newPlot("bar", bar_chart, bar_layout);

    // Bubble Chart

    let bubble_chart = [
        {
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: ids,
                colorscale: "Portland",
                size: values,
            }
        }
    ];

    // Bubble Layout

   let bubble_layout = {
        xaxis: {title: "OTU ID"},
   };

   // Render Bubble Chart

   Plotly.newPlot("bubble", bubble_chart, bubble_layout);

 });  
}

// OptionChange Function

function optionChanged(selectedID) {

    charts(selectedID);
    metadata(selectedID);
};

menu();
