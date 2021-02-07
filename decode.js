const romanNumerals = { 
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
}

const message = document.getElementById("message")
const button = document.querySelector("#scramble-button")
const output = document.getElementById("morse")
const result = document.querySelector("#result pre")
const resultSpan = document.querySelector("#result span")
const encodeDecodeButton = document.querySelector("#encode-decode-container span");
const encodeDecode = document.querySelector("#encode-decode-container ul");
const encodeDecodeLi = Array.from(document.querySelectorAll("#encode-decode-container ul li"));
const baseButton = document.querySelector("#base span");
const base = document.querySelector("#base ul");
const baseLi = Array.from(document.querySelectorAll("#base li"));
const key = document.querySelector("#secret-key input")
const container = document.getElementById("container")




////////--- this section is for dom manipulation--------/////////

baseLi.forEach( li => {
    li.addEventListener("click", () => {
        baseButton.textContent = li.textContent
        baseLi.forEach( element => {
            element.style.width = ""
        })
    })
})



function grow(){
    message.style.height = "5px"
    message.style.height = (message.scrollHeight)+"px"
}
grow()




encodeDecodeButton.addEventListener("click", () => {
    encodeDecodeLi.forEach( li => {
        if(li.style.width == "") li.style.width = "200px"
        else li.style.width = ""
    })
})

encodeDecodeLi.forEach( li => {
    li.addEventListener("click", () => {
        encodeDecodeButton.textContent = li.textContent
        encodeDecodeLi.forEach( element => {
            element.style.width = ""
        })
    })
})

baseButton.addEventListener("click", () => {
    const w = document.querySelector("header nav");
    baseLi.forEach( li => {
        if(li.style.width == ""){
            li.style.width = "200px";
            w.style.zIndex = "1"
            container.style.zIndex = "-1"
        } 
        else if(li.style.width = "200px"){
            li.style.width = ""
            w.style.zIndex = "0"
            container.style.zIndex = "1"
        } 

        li.addEventListener("click", () => {
           w.style.zIndex = "0"
           container.style.zIndex = "1"

        })
    })
})


/////////---------this section is for funtionality---------/////////////

button.addEventListener("click", async () => {
    const keyArray  = key.value.split("/")
    let secretMessage  = message.value
    resultSpan.style.width = "100%"
    result.style.width = "100%"

    if (baseButton.textContent == "morse") {
        if(key.value != ""){
            const dot = new RegExp(`${keyArray[0]}`, "gi")
            const dash = new RegExp(`${keyArray[1]}`, "gi")
            const smallSpace = new RegExp(`${keyArray[2]}`, "gi")
            const bigSpace = new RegExp(`${keyArray[3]}`, "gi")
            secretMessage = secretMessage.replace(dot, ".").replace(dash, "-").replace(bigSpace, "   ").replace(smallSpace, " ")
        }
       
        const get = await fetch("../decode/morse.json") 
        const morseData = await get.json()
        const keys = Object.keys(morseData);
        const values = Object.values(morseData);
        let morseArray = secretMessage.split(' ') 
        let string = ''
      
        for (let i = 0; i < morseArray.length; i++) {
          for (let j = 0; j < keys.length; j++) {
            if (morseArray[i] == values[j]) string += keys[j]
          }
        }
        output.textContent = string.replace(/  /g, " ") 
    }
    
    if(baseButton.textContent == "roman"){
        if(key.value != ""){
            const I = new RegExp(`${keyArray[0]}`, "g")
            const V = new RegExp(`${keyArray[1]}`, "g")
            const X = new RegExp(`${keyArray[2]}`, "g")
            const L = new RegExp(`${keyArray[3]}`, "g")
            const C = new RegExp(`${keyArray[4]}`, "g")
            const D = new RegExp(`${keyArray[5]}`, "g")
            const M = new RegExp(`${keyArray[6]}`, "g")
            secretMessage = secretMessage
                                .replace(I, "I")
                                .replace(V, "V")
                                .replace(X, "X")
                                .replace(L, "L")
                                .replace(C, "C")
                                .replace(D, "D")
                                .replace(M, "M")
        }
        const romans = await fetch("../decode/roman.json")
        const roman = await romans.json()

        let number = []
        let keys = Object.keys(roman).reverse()
        let values = Object.values(roman).reverse()
        secretMessage = secretMessage
                .replace(/IX/g, "VIIII")
                .replace(/XC/g, "LXXXX")
                .replace(/CM/g, "DCCCC")
                .replace(/IV/g, "IIII")
                .replace(/XD/g, "XXXX")
                .replace(/CD/g, "CCCC")

        for(let i = 0; i < secretMessage.length; i++){
            for(let j = 0; j < keys.length; j++){
                if(secretMessage[i] == keys[j]) number.push(values[j])
                else if(secretMessage[i] == " ") number.push(" ")
            }
        }
        let romanArray = []
        let newArray = []
        let numberArray = number.join(" ").replace(/               /g, "  ").split("  ")
        numberArray.map(string => {
            string = string.split(" ")
            string = string.reduce((x, y) => parseInt(x) + parseInt(y))
            newArray.push(string)
       })
       newArray = newArray.forEach(num => {
         num = String.fromCharCode(num)
         romanArray.push(num)
       })
        output.textContent = romanArray.join("")
    }

    if(baseButton.textContent != "morse" || "roman"){

        if(key.value != ""){
            const k0 = new RegExp(`${keyArray[0]}`, "g")
            const k1 = new RegExp(`${keyArray[1]}`, "g")
            const k2 = new RegExp(`${keyArray[2]}`, "g")
            const k3 = new RegExp(`${keyArray[3]}`, "g")
            const k4 = new RegExp(`${keyArray[4]}`, "g")
            const k5 = new RegExp(`${keyArray[5]}`, "g")
            const k6 = new RegExp(`${keyArray[6]}`, "g")
            const k7 = new RegExp(`${keyArray[7]}`, "g")
            const k8 = new RegExp(`${keyArray[8]}`, "g")
            const k9 = new RegExp(`${keyArray[9]}`, "g")
            const A = new RegExp(`${keyArray[10]}`, "g")
            const B = new RegExp(`${keyArray[11]}`, "g")
            const C = new RegExp(`${keyArray[12]}`, "g")
            const D = new RegExp(`${keyArray[13]}`, "g")
            const E = new RegExp(`${keyArray[14]}`, "g")
            const F = new RegExp(`${keyArray[15]}`, "g")
            secretMessage = secretMessage
                                .replace(k0, "0")
                                .replace(k1, "1")
                                .replace(k2, "2")
                                .replace(k3, "3")
                                .replace(k4, "4")
                                .replace(k5, "5")
                                .replace(k6, "6")
                                .replace(k7, "7")
                                .replace(k8, "8")
                                .replace(k9, "9")
                                .replace(A, "a")
                                .replace(B, "b")
                                .replace(C, "c")
                                .replace(D, "d")
                                .replace(E, "e")
                                .replace(F, "f")
        }
        console.log(secretMessage)

        let code;
        switch(baseButton.textContent){
            case "binary": code = 2
            break
            case "octal": code = 8
            break
            case "decimal": code = 10
            break
            case "hex": code = 16
        }

        console.log(code)
        let string = ''
        let secretMessageArray = secretMessage.split(' ')
        console.log(secretMessageArray)
        for(let i = 0; i < secretMessageArray.length; i++){
            if(secretMessageArray[i] != ''){
                let ascii = parseInt(secretMessageArray[i], code)
                string += String.fromCharCode(ascii)
            }
        }
       // console.log(string)
        output.textContent = string
    }


      
})

// l => j
// t => w

    // let code;
    // switch(baseButton.textContent){
    //     case "binary": code = 2
    //     break
    //     case "octal": code = 8
    //     break
    //     case "decimal": code = 10
    //     break
    //     case "hex": code = 16
    // }


    // let string = ''
    // let secretMessageArray = secretMessage.split(' ')
    // for(let i = 0; i < secretMessageArray.length; i++){
    //     if(secretMessageArray[i] != ''){
    //         let ascii = parseInt(secretMessageArray[i], code)
    //         string += String.fromCharCode(ascii)
    //     }
    // }
    //  output.textContent = string

