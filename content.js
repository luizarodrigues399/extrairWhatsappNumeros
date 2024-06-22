// juntar os arquivos gerados com comando de prompt no windows. Exemplo: "copy /b *.txt newfile.txt"

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


const extractContactsArchived = () => {

    let classes = '.x10l6tqk.x13vifvy.xds687c.x1ey2m1c.x17qophe';

    let gridCell = document.querySelectorAll(classes + " [role='gridcell']._ak8o");

    let span, input, resultado = [];

    gridCell.forEach(function(element, index){

        span = element.querySelector("span");

        input = document.createElement("input");

        input.style='width: 20px; background-color: yellow'; 

        input.type = "text";

        input.value = index;

        element.appendChild(input); 

        if (span.title != 'pronto'){
            resultado.push(span.title + '\n');
        }

        span.title = 'pronto';
    });

    input.style='width: 20px; background-color: red';

    saveFile(resultado)

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

button.addEventListener("click", extractContactsArchived)

document.body.appendChild(button)



