

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => { 
            
            for(const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
        
            for(const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de Coleta
// Pegar todos os Li's
const itensToCollect = document.querySelectorAll(".itens-grid")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const cCollectedItens = document.querySelector("input[name=items]")

let selectedItens = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // add or remove a class with javascript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', itemId)

    // Verificar se existem itens selecionados, se sim pegar os itens selecionados 

    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId //Isso será true or false
        return itemFound})

    // se ja estiver selecionado 

    if(alreadySelected >= 0) {
        // tirar da seleção
        const filteredItens = selectedItens.filter( item => {
            const itemIsDifferent = item !=itemId //false
            return itemIsDifferent
        })

        selectedItens = filteredItens
    } else {
        // se não estiver selecionado adcionar a seleção
        selectedItens.push(itemId)
    }  

    // console.log('selectedItens:  ', selectedItens)

    // atualizar o campo escondido com os itens selecionados
    cCollectedItens.value = selectedItens
    
}
 