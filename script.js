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
const secretKeyP = document.querySelector("#secret-key p")
const secretKeySpan = document.querySelector("#secret-key span")
const encodeDecodeButton = document.querySelector("#encode-decode-container span");
const encodeDecode = document.querySelector("#encode-decode-container ul");
const encodeDecodeLi = Array.from(document.querySelectorAll("#encode-decode-container ul li"));
const baseButton = document.querySelector("#base span");
const base = document.querySelector("#base ul");
const baseLi = Array.from(document.querySelectorAll("#base li"));
const inputs = document.getElementById("inputs")
const container = document.getElementById("container")


const k1 = document.getElementById("k1")
const k2 = document.getElementById("k2")
const k3 = document.getElementById("k3")
const k4 = document.getElementById("k4")


////////--- this section is for dom manipulation--------/////////

baseLi.forEach( li => {
    li.addEventListener("click", () => {
        baseButton.textContent = li.textContent
        const morse = `
        <input type="text" id="k1" placeholder="dot">
        <input type="text" id="k2" placeholder="dash">
        <input type="text" id="k3" placeholder="letter">
        <input type="text" id="k4" placeholder="word">`

        const roman = `
        <input type="text" id="k1" placeholder="I">
        <input type="text" id="k2" placeholder="V">
        <input type="text" id="k3" placeholder="X">
        <input type="text" id="k4" placeholder="L">
        <input type="text" id="k5" placeholder="C">
        <input type="text" id="k6" placeholder="D">
        <input type="text" id="k7" placeholder="M">
        `
        const binary = `
        <input type="text" id="k1" placeholder="1">
        <input type="text" id="k2" placeholder="0">`

        const octal = `
        <input type="text" id="k1" placeholder="0">
        <input type="text" id="k2" placeholder="1">
        <input type="text" id="k3" placeholder="2">
        <input type="text" id="k4" placeholder="3">
        <input type="text" id="k5" placeholder="4">
        <input type="text" id="k6" placeholder="5">
        <input type="text" id="k7" placeholder="6">
        <input type="text" id="k8" placeholder="7">`

        const decimal = `
        <input type="text" id="k1" placeholder="0">
        <input type="text" id="k2" placeholder="1">
        <input type="text" id="k3" placeholder="2">
        <input type="text" id="k4" placeholder="3">
        <input type="text" id="k5" placeholder="4">
        <input type="text" id="k6" placeholder="5">
        <input type="text" id="k7" placeholder="6">
        <input type="text" id="k8" placeholder="7">
        <input type="text" id="k9" placeholder="8">
        <input type="text" id="k10" placeholder="9">`

        const hex = `
        <input type="text" id="k1" placeholder="0">
        <input type="text" id="k2" placeholder="1">
        <input type="text" id="k3" placeholder="2">
        <input type="text" id="k4" placeholder="3">
        <input type="text" id="k5" placeholder="4">
        <input type="text" id="k6" placeholder="5">
        <input type="text" id="k7" placeholder="6">
        <input type="text" id="k8" placeholder="7">
        <input type="text" id="k9" placeholder="8">
        <input type="text" id="k10" placeholder="9">
        <input type="text" id="k11" placeholder="A">
        <input type="text" id="k12" placeholder="B">
        <input type="text" id="k13" placeholder="C">
        <input type="text" id="k14" placeholder="D">
        <input type="text" id="k15" placeholder="E">
        <input type="text" id="k16" placeholder="F">`

        switch(baseButton.textContent){
            case "morse": inputs.innerHTML = morse;
            break;
            case "roman": inputs.innerHTML = roman;
            break;
            case "binary": inputs.innerHTML = binary;
            break;
            case "octal": inputs.innerHTML = octal;
            break;
            case "decimal": inputs.innerHTML = decimal;
            break;
            case "hex": inputs.innerHTML = hex;
            break;
        }

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


const getdata = async () => {
    const code = await fetch("../encode/morse.json")
    const morseData = await code.json()
    
    button.addEventListener('click', async () => {
            result.style.width = "100%"
            resultSpan.style.width = "100%"
            secretKeyP.style.width = "100%"
            secretKeySpan.style.width = "100%"
         
        if(baseButton.textContent == "morse"){
        console.log(baseButton.textContent)
        const encode = () => {
            let string = message.value
            string = string.split('')
            let newString = []
            const keys = Object.keys(morseData);
            const values = Object.values(morseData);
            for(let i = 0; i < string.length; i++){
                for(let j = 0; j < keys.length; j++){
                    if(string[i] == keys[j]) newString.push(values[j] + " ")
                }
            }
            
            const valuesArray = []
            const inputArray = Array.from(inputs.children)
            inputArray.forEach(element => {
                valuesArray.push(element.value)
            })
            const empty = valuesArray.reduce((a, b) => a + b)
            const checked = new Set(valuesArray)

            if(empty.length >= 4){
                if(checked.size != valuesArray.length){
                    secretKeySpan.textContent = "keys must be different"
                } 
            }
            const secretkey = `${k1.value||"."}/${k2.value||"-"}/${k3.value||"_"}/${k4.value||"___"}`
            secretKeySpan.textContent = secretkey
            if(k1.value != '' || k2.value != '' || k3.value != '' || k4.value != '') {
                   return  output.textContent = newString.join('')
                    .replace(/[.]/g, k1.value || '.')
                    .replace(/[-]/g, k2.value||'-')
                    .replace(/[ ]{2,}/g, k4.value || "   ")
                    .replace(/[ ]{1}/g, k3.value ||' ');
                } 
            return output.innerHTML = newString.join(' ').replace(/[ ]{2}/g, ' ').replace(/[ ]{3,}/g, '   ');
        }
        encode()
        }

        if(baseButton.textContent != "morse" && baseButton.textContent != "roman"){
            const numbers = () => {

                let string = message.value
                let charCode = []
                let code;
                switch(baseButton.textContent){
                    case "binary": code = 2;
                    break;
                    case "octal": code = 8;
                    break;
                    case "decimal": code = 10;
                    break;
                    case "hex": code = 16;
                    break;
                }

                const valuesArray = []
                const inputArray = Array.from(inputs.children)
                inputArray.forEach(element => {
                    if(element.value != ""){
                        valuesArray.push(element.value)
                    }
                })
                const checked = new Set(valuesArray)

                for(let i = 0; i < string.length; i++){
                    let bin = string[i].charCodeAt(0).toString(code)
                     charCode.push(bin+' ')  
                   }

                    const k1 = document.getElementById("k1")
                    const k2 = document.getElementById("k2")
                    const k3 = document.getElementById("k3")
                    const k4 = document.getElementById("k4")
                    const k5 = document.getElementById("k5")
                    const k6 = document.getElementById("k6")
                    const k7 = document.getElementById("k7")
                    const k8 = document.getElementById("k8")
                    const k9 = document.getElementById("k9")
                    const k10 = document.getElementById("k10")
                    const k11 = document.getElementById("k11")
                    const k12 = document.getElementById("k12")
                    const k13 = document.getElementById("k13")
                    const k14 = document.getElementById("k14")
                    const k15 = document.getElementById("k15")
                    const k16 = document.getElementById("k16") 


                    if(inputArray.length == 2){
                        const secretkey = `${k1.value||"0"}/${k2.value||"1"}`
                        secretKeySpan.textContent = secretkey
                    }
                    if(inputArray.length == 8){
                        const secretkey = `${k1.value||"0"}/${k2.value||"1"}/${k3.value||"2"}/${k4.value||"3"}/${k5.value||"4"}/${k6.value||"5"}/${k7.value||"6"}/${k8.value||"7"}`
                        secretKeySpan.textContent = secretkey
                    }
                    if(inputArray.length == 10){
                        const secretkey = `${k1.value||"0"}/${k2.value||"1"}/${k3.value||"2"}/${k4.value||"3"}/${k5.value||"4"}/${k6.value||"5"}/${k7.value||"6"}/${k8.value||"7"}/${k9.value||"8"}/${k10.value||"9"}`
                        secretKeySpan.textContent = secretkey
                    }
                    if(inputArray.length == 16){
                        const secretkey = `${k1.value||"0"}/${k2.value||"1"}/${k3.value||"2"}/${k4.value||"3"}/${k5.value||"4"}/${k6.value||"5"}/${k7.value||"6"}/${k8.value||"7"}/${k9.value||"8"}/${k10.value||"9"}/${k11.value||"a"}/${k12.value||"b"}/${k13.value||"c"}/${k14.value||"d"}/${k15.value||"e"}/${k16.value||"f"}`
                        secretKeySpan.textContent = secretkey
                    }


                if(checked.size != valuesArray.length) secretKeySpan.textContent = "keys must be different" 
                let check = baseButton.textContent
                switch(check){
                    case "binary":  return output.textContent = charCode.join(' ')
                                        .replace(/[0]/g, k1.value || '0')
                                        .replace(/[1]/g, k2.value||'1');
                    case "octal": return output.textContent = charCode.join(' ')
                                        .replace(/[0]/g, k1.value || '0')
                                        .replace(/[1]/g, k2.value||'1')
                                        .replace(/[2]/g, k3.value || "2")
                                        .replace(/[3]/g, k4.value ||'3')
                                        .replace(/[4]/g, k5.value ||'4')
                                        .replace(/[5]/g, k6.value ||'5')
                                        .replace(/[6]/g, k7.value ||'6')
                                        .replace(/[7]/g, k7.value ||'7');
                    case "decimal":return output.textContent = charCode.join(' ')
                                        .replace(/[0]/g, k1.value || '0')
                                        .replace(/[1]/g, k2.value||'1')
                                        .replace(/[2]/g, k3.value || "2")
                                        .replace(/[3]/g, k4.value ||'3')
                                        .replace(/[4]/g, k5.value ||'4')
                                        .replace(/[5]/g, k6.value ||'5')
                                        .replace(/[6]/g, k7.value ||'6')
                                        .replace(/[7]/g, k7.value ||'7')
                                        .replace(/[8]/g, k7.value ||'8')
                                        .replace(/[9]/g, k7.value ||'9');
                    case "hex": {  return output.textContent = charCode.join('')
                                        .replace(/[0]/g, k1.value || '0')
                                        .replace(/[1]/g, k2.value||'1')
                                        .replace(/[2]/g, k3.value || "2")
                                        .replace(/[3]/g, k4.value ||'3')
                                        .replace(/[4]/g, k5.value ||'4')
                                        .replace(/[5]/g, k6.value ||'5')
                                        .replace(/[6]/g, k7.value ||'6')
                                        .replace(/[7]/g, k8.value ||'7')
                                        .replace(/[8]/g, k9.value ||'8')
                                        .replace(/[9]/g, k10.value ||'9')
                                        .replace(/[a]/g, k11.value ||'a')
                                        .replace(/[b]/g, k12.value ||'b')
                                        .replace(/[c]/g, k13.value ||'c')
                                        .replace(/[d]/g, k14.value ||'d')
                                        .replace(/[e]/g, k15.value ||'e')
                                        .replace(/[f]/g, k16.value ||'f');
                    } 
                    default:  return output.textContent =  charCode.join('')
                }
                    
              }
              numbers()
        }


        if(baseButton.textContent == "roman"){

            const k1 = document.getElementById("k1")
            const k2 = document.getElementById("k2")
            const k3 = document.getElementById("k3")
            const k4 = document.getElementById("k4")
            const k5 = document.getElementById("k5")
            const k6 = document.getElementById("k6")
            const k7 = document.getElementById("k7")

            let finalArray = []
            let romanArray = []
            let asciiArray = []
            let string = message.value
            string.split('').forEach( letter => asciiArray.push(letter.charCodeAt()))

            for(let i = 0; i < asciiArray.length; i++){
                    let number = asciiArray[i];
                    let roman = ''
                    let keys = Object.keys(romanNumerals).reverse()
                    let values = Object.values(romanNumerals).reverse()
                    for(let i = 0;number+i > i; i++){
                        if(number >= values[0]){
                            number -= values[0]
                            roman += keys[0]
                        } else if(number < values[0]){
                            values.shift()
                            keys.shift()
                        }
                    }
                    romanArray.push(roman)
            }
            romanArray.forEach(element => {
                finalArray.push(element
                    .replace(/VIIII/g, "IX")
                    .replace(/LXXXX/g, "XC")
                    .replace(/DCCCC/g, "CM")
                    .replace(/IIII/g, "IV")
                    .replace(/XXXX/g, "XD")
                    .replace(/CCCC/g, "CD"))
            })

            const secretkey = `${k1.value||"I"}/${k2.value||"V"}/${k3.value||"X"}/${k4.value||"L"}/${k5.value||"C"}/${k6.value||"D"}/${k7.value||"M"}`
            secretKeySpan.textContent = secretkey

            const valuesArray = []
            const inputArray = Array.from(inputs.children)
            inputArray.forEach(element => {
                if(element.value != ""){
                    valuesArray.push(element.value)
                }
            })
            const checked = new Set(valuesArray)

            if(checked.size != valuesArray.length) secretKeySpan.textContent = "keys must be different"

            if(k1.value != '' || k2.value != '' || k3.value != '' || k4.value != '' || k5.value != '' || k6.value != '' || k7.value != '') {
                output.textContent = finalArray.join(' ')
                 .replace(/[I]/g, k1.value || 'I')
                 .replace(/[V]/g, k2.value||'V')
                 .replace(/[X]/g, k3.value || "X")
                 .replace(/[L]/g, k4.value ||'L')
                 .replace(/[C]/g, k5.value ||'C')
                 .replace(/[D]/g, k6.value ||'D')
                 .replace(/[M]/g, k7.value ||'M')
             } else output.textContent = finalArray.join(' ')
        }
        if(output.textContent == "") output.textContent = "you have no message"
    })
}
getdata()
