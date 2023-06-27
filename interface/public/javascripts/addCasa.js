// Accordion
function addCasa(id) {
    var container = document.getElementById(id)
    numberLabel = document.createElement("label")
    numberLabel.innerHTML = "Número"

    numberInput = document.createElement("input")
    numberInput.setAttribute("type", "text")
    numberInput.setAttribute("name", "numero")
    numberInput.setAttribute("placeholder", "Número")
    numberInput.setAttribute("class", "w3-input")

    foroLabel = document.createElement("label")
    foroLabel.innerHTML = "Foro"

    foroInput = document.createElement("input")
    foroInput.setAttribute("type", "text")
    foroInput.setAttribute("name", "foro")
    foroInput.setAttribute("placeholder", "Foro")
    foroInput.setAttribute("class", "w3-input")

    enfiteutaLabel = document.createElement("label")
    enfiteutaLabel.innerHTML = "Enfiteuta"

    enfiteutaInput = document.createElement("input")
    enfiteutaInput.setAttribute("type", "text")
    enfiteutaInput.setAttribute("name", "enfiteuta")
    enfiteutaInput.setAttribute("placeholder", "Enfiteuta")
    enfiteutaInput.setAttribute("class", "w3-input")

    descLabel = document.createElement("label")
    descLabel.innerHTML = "Descrição"

    descInput = document.createElement("textarea")
    descInput.setAttribute("type", "text")
    descInput.setAttribute("name", "descricao")
    descInput.setAttribute("placeholder", "Descrição")
    descInput.setAttribute("class", "w3-input")

    container.appendChild(numberLabel)
    container.appendChild(numberInput)

    container.appendChild(foroLabel)
    container.appendChild(foroInput)

    container.appendChild(enfiteutaLabel)
    container.appendChild(enfiteutaInput)

    container.appendChild(descLabel)
    container.appendChild(descInput)
}
