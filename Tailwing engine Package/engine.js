
const styleMap = {
  p: "padding",
  m: "margin",
  bg: "backgroundColor",
  text: "color",
  fs: "fontSize",
  center: "textAlign",
  rounded: "borderRadius"
};


document.addEventListener("DOMContentLoaded",()=>{

    const element = document.querySelectorAll("*");

    console.log(element);

    element.forEach(el => {
        console.log(el.classList); 

        // give array of class of each element => DOMTokenList(3) ['chai-text-blue', 'chai-fs-24', 'chai-text-center', value: 'chai-text-blue chai-fs-24 chai-text-center']
        // if no class show as empty (DOMTokenList [value: ''])

        el.classList.forEach((cl) => {
            if(cl.startsWith("chai")){
                const parts = cl.split("-");  //['chai', 'text', 'blue']
                
                console.log(parts);

                let type = parts[1];
                let value = parts.slice(2).join("-");

                console.log(type,value);

                let property = styleMap[type];

                if(property){
                    el.style[property] = formatValue(value);
                }

            }
        })
    })
})


function formatValue(value){
    return isNaN(value) ? value : value + "px";
}