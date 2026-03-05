        const inputTipo = document.getElementById('tipo');
        const inputPeso = document.getElementById('peso');
        const infoDose = document.getElementById('info-dose');
        
        const resUI = document.getElementById('res-ui');
        const resML = document.getElementById('res-ml');
        const resFrascos = document.getElementById('res-frascos');
        const containerResultados = document.getElementById('resultados');
        const placeholder = document.getElementById('placeholder');

        function calcular() {
            const tipo = inputTipo.value;
            const peso = parseFloat(inputPeso.value);
            
            // Define a dose base por kg
            const doseBase = tipo === 'soro' ? 40 : 20;
            infoDose.innerText = `Dose padrão: ${doseBase} UI/kg`;

            // Verifica se o peso é válido
            if (isNaN(peso) || peso <= 0) {
                containerResultados.classList.add('hidden');
                placeholder.classList.remove('hidden');
                return;
            }

            // Exibe os resultados e oculta o placeholder
            containerResultados.classList.remove('hidden');
            placeholder.classList.add('hidden');

            // Cálculos baseados nos parâmetros fornecidos:
            // Concentração: 200 UI/ml
            // Frasco: 5ml = 1000 UI
            
            const totalUI = peso * doseBase;
            const totalML = totalUI / 200;
            const totalFrascos = Math.ceil(totalUI / 1000);

            // Atualização do DOM com formatação brasileira
            resUI.innerText = totalUI.toLocaleString('pt-BR');
            resML.innerText = totalML.toLocaleString('pt-BR', { 
                minimumFractionDigits: 1, 
                maximumFractionDigits: 1 
            });
            resFrascos.innerText = totalFrascos;
        }

        // Listeners para atualização instantânea
        inputTipo.addEventListener('change', calcular);
        inputPeso.addEventListener('input', calcular);