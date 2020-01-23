'use strict';

function displayResults(responseJson){
//empties results 
    $(`.js-results`).empty();
    let user = `<h3>Handle: <span>${responseJson[0].owner.login}</span></h3>`
    $(`.js-results`).append(user);
    for (let i=0; i<responseJson.length;i++){
       $(`.js-results`).append(
        `<div class="result-item"><li><h3>${responseJson[i].name}</h3>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        </li></div>`)
    }

  $('.js-results').removeClass('hidden');
}

function getRepo(username){
    const url = `https://api.github.com/users/${username}/repos`
    console.log(url);
    fetch (url)
   
    .then(response =>{
        if (response.ok){
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then(responseJson =>
        displayResults(responseJson))

    .catch(err=>{
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm(){
    $(`form`).submit(event =>{
        event.preventDefault();
        const username = $(`.js-username`).val();
        getRepo(username);
    });

}

$(watchForm);