// write your code here!

// always good practice to check connection by: console.log("hello world");

// When the page loads, fetch the ducks and display each duck image in the `#duck-nav`

let duckNav = document.querySelector("#duck-nav");

fetch("http://localhost:3000/ducks")
    .then(res => res.json())
    .then(ducks => {
        console.log(ducks)  // to see if the code works and we see the object with its array in the console of the browser
        for (let duck of ducks) {
            addDuckNav(duck);
        }
        // grab `#duck-nav`

    });

 function addDuckNav(duck) {   
        let imgUrl = duck.img_url;
        let img = document.createElement("img");
        img.src = imgUrl;
        duckNav.append(img);

        img.addEventListener("click", () => { duckDisplay(duck)
        });
    };
    
    function duckDisplay(duck) {
        let duckDis = document.querySelector("#duck-display");
        //If another image is clicked in the `#duck-nav` it replaces the previous name, image, and button with the proper content.
        duckDis.innerHTML = '';
        let h2 = document.createElement("h2")
            h2.textContent = duck.name;
        let img = document.createElement("img")
            img.src = duck.img_url;
        let button = document.createElement("button")
            button.textContent = duck.likes + " " + "Likes";
        
            button.addEventListener ("click", () => { addsLikes(duck, button) });

            duckDis.append(h2, img, button);
}

// When the likes button is clicked, it increments the number of likes displayed for that duck. Be sure that the button continues to read "X likes".

    function addsLikes(duck, button) {
        duck.likes++
        console.log(duck.likes);
        fetch (`http://localhost:3000/ducks/${duck.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                likes: duck.likes
            }) 
        })
        .then(res => res.json())
        .then(
            (data => { 
                console.log(data);
            button.textContent = data.likes + " " + "Likes";
            })

    )}

const duckForm = document.querySelector("#new-duck-form");
    duckForm.addEventListener("submit", (e) => {
     e.preventDefault();
    // console.log(e);
    // console.log(e.target[0].value);
    let newName = e.target[0].value;
    let newUrl = e.target[1].value;
    let displayObj = {name: newName, img_url: newUrl, likes: 0 };

    addDuckNav(displayObj);
})



