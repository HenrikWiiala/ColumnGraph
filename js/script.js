
var svg = d3.select("svg")
.append("svg")
.attr("width", 1200)
.attr("height", 600);

var margin = {top: 20, right: 20, bottom: 100, left: 100};
var graphHeight = 600 - margin.top - margin.bottom;
var graphWidth = 1200 - margin.left - margin.right;
var graph = svg.append("g")
.attr("width", graphWidth)
.attr("height", graphHeight)
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Group x-axelille
var xAxisGroup = graph.append("g")
.attr("transform", `translate(0, ${graphHeight})`)
.attr("class", "xAxis"); 
//Group y-axelille
var yAxisGroup = graph.append("g");

d3.json("js/measures.json").then(data => {
    var dataArray = [ ];
    for (var k in data) {
    object = data[k].Measures;
    dataArray.push(object);

    
    }
    console.log(dataArray)

    var min = d3.min(dataArray, d => parseFloat(d.AirPressure.replace(",",".")));
    var max = d3.max(dataArray, d => parseFloat(d.AirPressure.replace(",",".")));
    console.log(max, min);
    
    
    var min = d3.min(dataArray, d => parseFloat(d.Temp.replace(",",".")));
    var max = d3.max(dataArray, d => parseFloat(d.Temp.replace(",",".")));
    console.log(max, min);

    var min = d3.min(dataArray, d => parseFloat(d.Humidity.replace(",",".")));
    var max = d3.max(dataArray, d => parseFloat(d.Humidity.replace(",",".")));
    console.log(max, min);

    //d3.min(dataArray, d => parseFloat(d.Humidity.replace(/\"/g, "")));

    var y = d3.scaleLinear()
    .domain([0, max])
    .range([graphHeight, 0]);
    
    var x =d3.scaleBand()
    .domain(dataArray.map(item => item.Timestamp))
    .range([0, 1200])
    .paddingInner(0.1);

    

    console.log(dataArray.map(item => item.Timestamp));
    console.log(x.bandwidth()); //x:n badwidth, yhteinen arvo kaikille pylväille, yksittäisen pylvään leveys  .paddingouter datasta?



        var rects = graph.selectAll("rect")
        .data(dataArray);

        rects.attr("width", x.bandwidth())
        .attr("height", d => graphHeight - y(d.Humidity.replace(",","."))) //graph height vähennettynä 
        .attr("fill", "blue")
        .attr("x", d => x(d.Timestamp)) //Näillä saadaan graph "oikein päin"
        .attr("y", d => y(d.Humidity.replace(",","."))); //Näillä saadaan graph "oikein päin"

        rects.enter()
        .append("rect")
        .attr("width", x.bandwidth())
        .attr("height", d => graphHeight - y(d.Humidity.replace(",",".")))
        .attr("fill", "blue")
        .attr("x", d => x(d.Timestamp)) //Näillä saadaan graph "oikein päin"
        .attr("y", d => y(d.Humidity.replace(",","."))); //Näillä saadaan graph "oikein päin"
    
        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y)
        .ticks(10) //korkeusnumeroiden määrä
        .tickFormat(d => d + " Dew points?");

        

        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);
        

        xAxisGroup.selectAll("text")
        .attr("transform", "rotate(-30)")
        .attr("text-anchor", "end")
        .attr("fill", "blue");

        
    }
);

