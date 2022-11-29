async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    //let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=ca4225acb1f64add8d98021463d6e7c7');
    
    //below code is for testing, since twelvedata sucks
    const {GME, MSFT, DIS, BNTX} = mockData;
    //const {GME, MSFT, DIS, BNTX} = response;
    const stocks = [GME, MSFT, DIS, BNTX];

    stocks.forEach(stock => stock.values.reverse());
    
    
    //line graph for first stock compilation
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map( value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });
    //bar graph for highest stock price
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data:{
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock=>getHighestPrice(stock)),
                backgroundColor: stocks.map(stock=>getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock=>getColor(stock.meta.symbol))
                
            }]
            
        }
    })

    
}

function getHighestPrice(stock){
    let highestPriceArr = [];
    for (let i = 0; i<stock.values.length; i++){
        let stockHigh = parseFloat(stock.values[i].high);
        highestPriceArr.push(stockHigh)
    }

    let highestPrice = 0;
    
    for (let i = 0; i<highestPriceArr.length; i++){
        if(highestPrice<highestPriceArr[i]){
            highestPrice = highestPriceArr[i];
        }
    }
    return highestPrice;
}



function getColor(stock){
    if(stock === 'GME'){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === 'MSFT'){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === 'DIS'){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === 'BNTX'){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

main()