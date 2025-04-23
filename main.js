import { mostrarMenu, lerTarefas, escreverNoArquivo, criarTarefa, verTarefas, tarefasConcluidas, tarefaIncompletas, terminarTarefa} from './auxiliary_functions.js'
import PromptSync from 'prompt-sync'

const prompt = PromptSync()

await mostrarMenu()

const numero = +prompt("Escolha umas das opções: ")

switch(numero){
    case 1: 
        await criarTarefa()
        break
    case 2: 
        await verTarefas()
        break
    case 3:
        await tarefasConcluidas()
        break
    case 4:
        await tarefaIncompletas()
        break
    case 5: 
        await terminarTarefa()
        break
    case 6:
        console.log("Fechando sistema")
        break;
    default:
        console.log("Error: Opção invalida")
}
