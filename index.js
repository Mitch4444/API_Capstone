
function watchFormSubmit() {
    $('#get-beers-form').on('submit', e => {
      e.preventDefault();
      $('#errors').html('');
      $('#results').html('');
  
      const beers = $('#abv').val().toLowerCase();
      const limit = $('#result-count').val();
  
      $('#beers').val('');
      $('#result-count').val('');
      getBeersFromApi(beers,limit);
    });
  }
  
  //link the api url to retrieve data
  function getBeersFromApi(abv){
    const url = `https://api.punkapi.com/v2/beers?abv_gt=${abv}`;
  // if everything is correct this will retrieve the given data
    fetch(url)
      .then(res => {
        if (res.ok){
          return res.json();
        }
        throw new Error(res.statusText); // give errors such as 400 
      })
      .then(results => {
        if(!results.length){
          $('#errors').html("Sorry, we could not find any results for that query please try again");
        }
        console.log(results);
         decorateResults(results);
      })
      .catch(e => {
        $('#errors').html(e);
      });
  }
  function input() {
      var input = document.getElementById("abv").value;
      // uses user input to adjust what to return
  }
  
  //return the results
  function decorateResults(results){
    const decorated = results.map(result => {
      return decorateSingleResult(result);
    })
    $('#results').html(decorated);
  }
  // the layout on how the results should look
  function decorateSingleResult(result){
    return `
      <li>
        <h2 class="results">${result.name}:</h2>
        <p class= "tagline">${result.tagline}</p>
          <h3>Description:</h3>
          <p>${result.description}</p>
          <h4>ABV: ${result.abv}</h4>
          <h3>Pairs Well With:</h3>
          <p>${result.food_pairing}</p>
          <hr / class="break">
        </li>
    `;
  }
  
  
  $(watchFormSubmit);
