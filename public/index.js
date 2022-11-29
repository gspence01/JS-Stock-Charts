async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    //let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=ca4225acb1f64add8d98021463d6e7c7');
    //let result = await response.json();
    

    //below code is for testing, since twelvedata sucks
    const {GME, MSFT, DIS, BNTX} = mockData;
    //const {GME, MSFT, DIS, BNTX} = response;
    const stocks = [GME, MSFT, DIS, BNTX];
    

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map( value => value.datetime),
            datasets: stocks.map(stock => ({
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor:  'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)'
            }))
        }
    });

   
}

main()