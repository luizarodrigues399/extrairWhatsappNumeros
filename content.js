function saveFile(whatsappContacts){

    let filename = 'whatsappContacts.txt'

    let file = new Blob(whatsappContacts, {type: 'text/plain'});
    
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    
    else { // Others
        let a = document.createElement("a")

        let url = URL.createObjectURL(file)

        a.href = url

        a.download = filename

        document.body.appendChild(a)

        a.click()

        setTimeout(function() {

            document.body.removeChild(a)

            window.URL.revokeObjectURL(url)
        }, 0)
    }
}  

const extractContacts = () => {

    let list = document.querySelectorAll('[aria-label="Lista de conversas"]')

    let children = Object.values(list[0].children)

    const whatsappContacts = children.map((child) => {

        return `${child.querySelector('.x1iyjqo2').getAttribute('title')} \n`
    })

    // let prompt = prompt("Qual o nome do arquivo?");

    saveFile(whatsappContacts)
}


let button = document.createElement("BUTTON")

let text = document.createTextNode("Download Contatos")

let css =  `position:absolute;
            z-index:100;background:green; 
            color:white; 
            border-radius: 25px; 
            padding:15px;
            right:10px; 
            top:50px`


button.style.cssText = css

button.appendChild(text)

button.addEventListener("click", extractContacts)

document.body.appendChild(button)



