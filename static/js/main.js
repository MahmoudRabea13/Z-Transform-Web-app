const realInputBtn = document.getElementById ("real-input");
const customeBtn = document.getElementById ("custome_button");
const customText = document.getElementById ("custom-text");
custome_button.addEventListener("click", function(){
    realInputBtn.click();
})

realInputBtn.addEventListener("change", function(){
    if (realInputBtn.value){
        customText.innerHTML=realInputBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    }
    else{
        customText.innerHTML="No file chosen"
    }
})

document.getElementById("btn_3").onclick = function () {
    //e.preventDefault();
    location.href = "/catalog";
};
