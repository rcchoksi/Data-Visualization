var chart, vis;
var height = 200;
var width = 300;
var barPadding = 5;
//Rawdata is being read in updateClicked() function and passed to the update() function
//y and x contain the data to be represented on the y and the x axis respectively
var rawdata, y, x;

//Gets called when the page is loaded.
function init(){
  chart = d3.select('#vis').append('svg');
   vis = chart.attr("width", width)
             .attr("height", height);
}

//Called when the update button is clicked
//parses the csv data and stores it in rawdata according to the dropdown value selected
function updateClicked(){
  if(getXSelectedOption() == 'region' && getYSelectedOption() == 'sales')
        d3.csv('CoffeeData.csv', function(data) {
        rawdata = d3.nest()
        .key(function(d) { return d.region;
         })
        .rollup(function(d) {
            return d3.sum(d, function(g){return g.sales;
            });})    
        .entries(data);
        update(rawdata);

      });
  else if(getXSelectedOption() == 'region' && getYSelectedOption() == 'profit') 
       d3.csv('CoffeeData.csv', function(data) {
        rawdata = d3.nest()
        .key(function(d) { return d.region;
         })
        .rollup(function(d) {
            return d3.sum(d, function(g){return g.profit;
            });})    
        .entries(data); 
        update(rawdata);

      });
  else if(getXSelectedOption() == 'category' && getYSelectedOption() == 'sales')
        d3.csv('CoffeeData.csv', function(data) {
        rawdata = d3.nest()
        .key(function(d) { return d.category;
         })
        .rollup(function(d) {
            return d3.sum(d, function(g){return g.sales;
            });})    
        .entries(data); 
        update(rawdata);

      });
  else if(getXSelectedOption() == 'category' && getYSelectedOption() == 'profit')
        d3.csv('CoffeeData.csv', function(data) {
        rawdata = d3.nest()
        .key(function(d) { return d.category;
         })
        .rollup(function(d) {
            return d3.sum(d, function(g){return g.profit;
            });})    
        .entries(data);
        update(rawdata);

      });
}

//Callback for when data is loaded
//Variables max and multiplier are used to define the height of the bars with respect to the largest value
function update(rawdata){

        y = d3.values(rawdata).map(function(d)  {return d.value;});
        x = d3.values(rawdata).map(function(d) {return d.key;});
      
        d3.select('svg').remove();
        chart = d3.select('#vis').append('svg');
        
        vis = chart.attr("width", width + 100)
             .attr("height", height + 50)
             .append('g');
        var appending =vis.attr("transform", "translate(50,0)")
                      .selectAll('rect')
                      .data(y)
                      .enter().append('rect');
        var max = Math.max.apply(null, y);
        var multiplier = max/200; 
        appending.attr("x", function(d, i) {
                                return (3 + i * width / y.length);
                            })
                            .attr("y", function(d) {
                                return (height - (d / multiplier));
                            })
                            .attr("width", width / y.length - 4)
                            .attr("height", function(d) {
                                return 10  + d / multiplier;  
                            })
                            .style("fill", function(d, i) {
                              var color;
                                if(i == 0) {
                                  color = "blue";
                                }
                                else if(i == 1) {
                                  color = "orange"; 
                                }
                                else if(i == 2) {
                                  color = "green";
                                }
                                else {
                                  color = "red";
                                }
                                return color;
                            });   
          var xaxisScale = d3.scaleBand().domain(x).range([0, width+3]);
          vis.append('g').attr("transform", "translate(0, 210)").call(d3.axisBottom(xaxisScale)); 
          var yaxisScale = d3.scaleLinear().domain([max, 0]).range([0, height+10]);
          vis.append('g').attr("transform", "translate(303, 0)").call(d3.axisRight(yaxisScale).ticks(5));

}

// Returns the selected option in the X-axis dropdown. Use d[getXSelectedOption()] to retrieve value instead of d.getXSelectedOption()
function getXSelectedOption(){
  var node = d3.select('#xdropdown').node();
  var i = node.selectedIndex;
  return node[i].value;
}

// Returns the selected option in the X-axis dropdown. 
function getYSelectedOption(){
  var node = d3.select('#ydropdown').node();
  var i = node.selectedIndex;
  return node[i].value;
}
