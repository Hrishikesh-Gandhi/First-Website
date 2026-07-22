function updateDigits() {
    const slider = document.querySelector(".slider");
    const digits = document.getElementById("digits");
   digits.innerHTML = slider.value;
   updateLink();
}
function updateLink() {
    const link = document.querySelectorAll(".start-link");
    link.forEach((link) => {
        link.href = `Game.html?digits=${document.getElementById("digits").innerHTML}`;
    });
}


addEventListener("keydown", (e) => {
    if(e.key === "ArrowLeft"){
        const slider = document.querySelector(".slider");
        slider.value = parseInt(slider.value) - 1;
        updateDigits();
    }
    if(e.key === "ArrowRight"){
        const slider = document.querySelector(".slider");
        slider.value = parseInt(slider.value) + 1;
        updateDigits();
    }
    if(e.key === "Enter"){
        window.location.href = `Game.html?digits=${document.getElementById("digits").innerHTML}`;
    }
});
