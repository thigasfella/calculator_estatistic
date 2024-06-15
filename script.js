// Aguarda o carregamento do conteúdo HTML
document.addEventListener('DOMContentLoaded', function() {
    // Obtenção dos elementos HTML necessários
    const input_media_aritmetica_simples_resultado = document.getElementById("input_aritmetica_simples_resultado");
    const input_media_aritmetica_ponderada_resultado = document.getElementById("input_aritmetica_ponderada_resultado");
    const input_mediana_resultado = document.getElementById("input_mediana_resultado");
    const input_moda_resultado = document.getElementById("input_moda_resultado");
    const btn_mediana = document.getElementById("btn_calcular_mediana");
    const btn_moda_calculo = document.getElementById("btn_moda_calculo");
    const btn_calcular_media_aritmetica_simples = document.getElementById("calcular_aritmetica_simples");
    const btn_calcular_media_aritmetica_ponderada = document.getElementById("calcular_aritmetica_ponderada");

    // Função para calcular a média aritmética simples
    const calculo_media_aritmetica_simples = (...array_numbers) => {
        const input_media_aritmetica_simples = document.getElementById("input_aritmetica_simples").value;
        let valores_separados = input_media_aritmetica_simples.split(' ');

        const numRegex = /^-?\d*\.?\d+$/;
        // Verifica se os valores são números válidos
        for (let i = 0; i < valores_separados.length; i++) {
            let valor = parseFloat(valores_separados[i]);
            if (isNaN(valor) || valores_separados.some(valor => !numRegex.test(valor.toString()))) {
                alert("Insira valores válidos!");
                return;
            }
            array_numbers.push(valor);
        }
        // Calcula a média aritmética simples
        const sum = array_numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum / array_numbers.length;
    }

    // Evento de clique para calcular a média aritmética simples
    btn_calcular_media_aritmetica_simples.addEventListener('click', function(){
        const resultado = calculo_media_aritmetica_simples();
        input_media_aritmetica_simples_resultado.value = resultado.toFixed(2);
        input_media_aritmetica_simples_resultado.style.color = "white";
    });

    // Função para calcular a média aritmética ponderada
    const calculo_media_aritmetica_ponderada = (valores, pesos) => {
        let soma_pesos = pesos.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        let soma_valores_pesados = 0;

        for (let i = 0; i < valores.length; i++) {
            soma_valores_pesados += valores[i] * pesos[i];
        }

        return soma_valores_pesados / soma_pesos;
    }

    // Evento de clique para calcular a média aritmética ponderada
    btn_calcular_media_aritmetica_ponderada.addEventListener('click', function() {
        const input_media_aritmetica_ponderada = document.getElementById("input_aritmetica_ponderada").value;
        const input_pesos = document.getElementById("input_aritmetica_ponderada_pesos").value;
        let valores_separados = input_media_aritmetica_ponderada.split(' ');
        let pesos_separados = input_pesos.split(' ');
        let valores = [];
        let pesos = [];

        const numRegex = /^-?\d*\.?\d+$/;
        // Verifica se os valores e pesos são números válidos
        for (let i = 0; i < valores_separados.length; i++) {
            let valor = parseFloat(valores_separados[i]);
            let peso = parseFloat(pesos_separados[i]);

            if (!numRegex.test(valores_separados[i]) || !numRegex.test(pesos_separados[i])) {
                alert("Insira valores e pesos válidos!");
                return;
            } 
            // Verifica se a quantidade de valores e pesos coincide
            if (valores_separados.length != pesos_separados.length) {
                alert("Os valores não coincidem!");
                return;
            }

            valores.push(valor);
            pesos.push(peso);
        }

        const resultado = calculo_media_aritmetica_ponderada(valores, pesos);
        if (resultado !== undefined) {
            input_media_aritmetica_ponderada_resultado.value = resultado.toFixed(2);
            input_media_aritmetica_ponderada_resultado.style.color = "white";
        }
    });

    // Função para calcular a mediana
    const calculo_mediana = (valores) => {
        if (valores.length % 2 === 0) {
            const meio = valores.length / 2;
            return (valores[meio - 1] + valores[meio]) / 2;
        } else {
            const meio = Math.floor(valores.length / 2);
            return valores[meio];
        }
    }

    // Evento de clique para calcular a mediana
    btn_mediana.addEventListener('click', function(){
        const input_mediana_valor = document.getElementById("input_mediana").value;
        const valores_separados = input_mediana_valor.split(' ').map(Number);
        valores_separados.sort((a, b) => a - b);
        const numRegex = /^-?\d*\.?\d+$/;

        // Verifica se há valores não numéricos ou com vírgulas
        if (valores_separados.some(isNaN) || valores_separados.some(valor => !numRegex.test(valor.toString()))) {
            alert("Insira valores válidos!");
            return;
        }

        const resultado = calculo_mediana(valores_separados);
        input_mediana_resultado.value = resultado.toFixed(2);
        input_mediana_resultado.style.color = "white";
    });

    // Função para calcular a moda
    const calculo_moda = (array_moda) => {
        let contador = {};
        let maxRepeticoes = 0;
        let modas = [];

        for (let valor of array_moda) {
            contador[valor] = (contador[valor] || 0) + 1;

            if (contador[valor] > maxRepeticoes) {
                maxRepeticoes = contador[valor];
            }
        }

        for (let valor in contador) {
            if (contador[valor] === maxRepeticoes) {
                modas.push(parseFloat(valor));
            }
        }

        return modas;
    }

    // Evento de clique para calcular a moda
    btn_moda_calculo.addEventListener('click', function(){
        const valor_input_moda = document.getElementById("input_moda").value
        const valores_separados = valor_input_moda.split(' ').map(Number)
        const array_moda = []
        const numRegex = /^-?\d*\.?\d+$/;

        valores_separados.forEach(valor => array_moda.push(valor))

        // Verifica se há valores não numéricos ou com vírgulas
        if (valores_separados.some(isNaN) || valores_separados.some(valor => !numRegex.test(valor.toString()))) {
            alert("Insira valores válidos!");
            return;
        }

        const resultado = calculo_moda(array_moda);
        document.getElementById("input_moda_resultado").value = resultado.join(', ');
        document.getElementById("input_moda_resultado").style.color = "white";
    });
});
