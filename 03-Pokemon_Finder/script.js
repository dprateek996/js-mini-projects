/* 
async function getData() {
    let response  = await fetch ('https://jsonplaceholder.typicode.com/todos/2');
    
      let data = await response.json();
      console.log(data);
}
getData();
*/



async function fetchData(){
    try{
          

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch the data");
        }
        const data = await response.json();
        const pokemonSprite =  data.sprites.front_default;
        const imgElement =  document.getElementById("pokemonSprite");


        imgElement.src = pokemonSprite;
        imgElement.alt = pokemonName;
        imgElement.style.display = "block";
    }
    catch(error){
        console.error(error);
    }
}