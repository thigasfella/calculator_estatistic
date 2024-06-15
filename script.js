const input_media_aritmetica_simples_resultado = document.getElementById("input_aritmetica_simples_resultado")
const input_media_aritmetica_ponderada_resultado = document.getElementById("input_aritmetica_ponderada_resultado")
const input_mediana_resultado = document.getElementById("input_mediana_resultado")
const input_moda_resultado = document.getElementById("input_moda_resultado")
const btn_mediana = document.getElementById("btn_calcular_mediana")
const btn_moda_calculo = document.getElementById("btn_moda_calculo")
const btn_calcular_media_aritmetica_simples = document.getElementById("calcular_aritmetica_simples")
const btn_calcular_media_aritmetica_ponderada = document.getElementById("calcular_aritmetica_ponderada")

const calculo_media_aritmetica_simples = (...array_numbers) => {
    //pega o valor do input
    const input_media_aritmetica_simples = document.getElementById("input_aritmetica_simples").value
    // separa os números
    let valores_separados = input_media_aritmetica_simples.split(' ')
    

    // Verifica se o valor não é um número e se tem vígula, 
    //caso não houver ele adiciona os valores no array_numbers
    for(let i = 0; i < valores_separados.length; i++){
        let valores = parseFloat(valores_separados[i])
        if(isNaN(valores) || valores_separados[i].includes(',')){
            alert("Insira valores válidos!")
            return
        }
        array_numbers.push(valores)
    }
    //soma de todos os valores que tiverem no input
    const sum = array_numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    //divisão da soma pela quantidade de números
    return sum / array_numbers.length
}
// botão para calcular a media aritmética simples, com evento click e uma função de callBack
btn_calcular_media_aritmetica_simples.addEventListener('click', function(){
    // variável que armazena o resultado da função
    const resultado = calculo_media_aritmetica_simples()
    //inserindo resultado para o input de resultado
    input_media_aritmetica_simples_resultado.value = resultado.toFixed(2)
    //setando cor branca para a string
    input_media_aritmetica_simples_resultado.style.color = "white";

})

//funcao para calcular a media aritmética ponderada pegando valores e pesos como parâmetros
const calculo_media_aritmetica_ponderada = (valores, pesos) => {
    // os valores nos dois inputs devem ter o mesmo tamanho 
    //para ter a multiplicação entre valor e peso e soma da multiplicação
    if (valores.length !== pesos.length) {
        alert("O número de valores e pesos deve ser igual.");
        return;
    }
    // soma dos pesos
    let soma_pesos = pesos.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    let soma_valores_pesados = 0;

    //multiplicação e soma dos valores
    for (let i = 0; i < valores.length; i++) {
        soma_valores_pesados += valores[i] * pesos[i];
    }
    //divisão com a soma da multiplicação dos valores com a soma dos pesos
    return soma_valores_pesados / soma_pesos;
}

//evento de click para botão de calular média ponderada
btn_calcular_media_aritmetica_ponderada.addEventListener('click', function() {
    //pega o valor do input para obter os valores
    const input_media_aritmetica_ponderada = document.getElementById("input_aritmetica_ponderada").value;
    //pega o valor do input para obter o valor dos pesos
    const input_pesos = document.getElementById("input_aritmetica_ponderada_pesos").value;
    // separa os valores
    let valores_separados = input_media_aritmetica_ponderada.split(' ');
    // separa os pesos
    let pesos_separados = input_pesos.split(' ');

    //cria um array com valores
    let valores = [];
    //cria um array com pesos
    let pesos = [];

    // pega os valores e pesos separados fazendo a verificação se é um número, caso for, o codigo adiciona
    // os valores para os arrays: valores e pesos
    for (let i = 0; i < valores_separados.length; i++) {
        let valor = parseFloat(valores_separados[i]);
        let peso = parseFloat(pesos_separados[i]);
        if (isNaN(valor) || isNaN(peso)) {
            alert("Insira valores e pesos válidos");
            return;
        }
        valores.push(valor);
        pesos.push(peso);
    }
    //envia o resultado para os parâmetros valores, pesos da função
    const resultado = calculo_media_aritmetica_ponderada(valores, pesos);
    // se o resultado for diferente de undefined ele seta o resultado no input de resultado
    if (resultado !== undefined) {
        input_media_aritmetica_ponderada_resultado.value = resultado.toFixed(2);
        input_media_aritmetica_ponderada_resultado.style.color = "white";
    }
});

const calculo_mediana = (valores) => {
    if (valores.length % 2 === 0) {
        // Se o array tem um número par de elementos, calcular a média dos dois valores do meio
        const meio = valores.length / 2;
        return (valores[meio - 1] + valores[meio]) / 2;
    } else {
        // Se o array tem um número ímpar de elementos, retornar o valor do meio
        const meio = Math.floor(valores.length / 2);
        return valores[meio];
    }
}

btn_mediana.addEventListener('click', function(){
    const input_mediana_valor = document.getElementById("input_mediana").value;
    const valores_separados = input_mediana_valor.split(' ').map(Number); // Convertendo os valores para números
    valores_separados.sort((a, b) => a - b);

    const resultado = calculo_mediana(valores_separados);
    input_mediana_resultado.value = resultado.toFixed(2);
    input_mediana_resultado.style.color = "white";
});


const calculo_moda = (array_moda) => {
    let contador = {};
    let maxRepeticoes = 0;
    let modas = [];

    // Conta quantas vezes cada valor aparece e encontra a frequência máxima
    for (let valor of array_moda) {
        contador[valor] = (contador[valor] || 0) + 1;

        if (contador[valor] > maxRepeticoes) {
            maxRepeticoes = contador[valor];
        }
    }

    // Encontra todos os valores que têm a frequência máxima
    for (let valor in contador) {
        if (contador[valor] === maxRepeticoes) {
            modas.push(parseFloat(valor)); // Converter para número se necessário
        }
    }

    return modas;
}

btn_moda_calculo.addEventListener('click', function(){
    const valor_input_moda = document.getElementById("input_moda").value
    const valores_separados = valor_input_moda.split(' ').map(Number)

    const array_moda = []
    valores_separados.forEach(valor => array_moda.push(valor))
    
    // Chamada da função de cálculo da moda
    const resultado = calculo_moda(array_moda)

    // Atribuição do resultado ao input de resultado
    document.getElementById("input_moda_resultado").value = resultado.join(', '); // Exibindo como uma lista separada por vírgulas
    document.getElementById("input_moda_resultado").style.color = "white";
})
