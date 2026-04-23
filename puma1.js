 let container = document.getElementById("container");
    let ddown = document.getElementById("ddown");

    container.addEventListener("mouseenter", () => {
        ddown.style.display = "block";
    });

    container.addEventListener("mouseleave", () => {
        ddown.style.display = "none";
    });

let sports=document.querySelector("#sports");
let ddown1=document.querySelector("#ddown1");

sports.addEventListener("mouseover",() =>{
    ddown1.style.display="block";
});
sports.addEventListener("mouseout",() =>{
    ddown1.style.display="none";
});