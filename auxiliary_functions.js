import { readFile, writeFile } from 'fs/promises'
import { type  } from 'os'
import PromptSync from 'prompt-sync'

const prompt = PromptSync()
const caminhoDoArquivo = "./tarefas.json"

export const mostrarMenu = () => {
    console.log(`       
        Menu de Operações:

        1 = Criar uma nova tarefa
        2 = Visualizar todas as tarefas
        3 = Visualizar apenas tarefas concluídas
        4 = Visualizar apenas tarefas não concluídas
        5 = Concluir uma tarefa
        6 = Sair
        
        `)
}

export async function lerTarefas() {
    try{
        const dadosLidos = await readFile(caminhoDoArquivo, "utf-8")
        return JSON.parse(dadosLidos)
    }catch(error) {
        console.error(`Erro ao ler o arquivo! ${error.message}`)
        return undefined
    }
   
}

export async function escreverNoArquivo(listaTarefas){
    const listaTarefasString = JSON.stringify(listaTarefas, null, 2)

    try{
        await writeFile(caminhoDoArquivo, listaTarefasString, "utf-8")
        console.log("Arquivo Atualizado!")
    }catch(error) {
        console.error(`Erro ao escrever no arquivo! ${error.message}`)
    }

}

export async function criarTarefa() {
    const tarefas = await lerTarefas()
    const titulo = prompt('Digite o Título da Tarefa: ')
    const descricao = prompt('Digite a Descrição da Tarefa: ')
    const novaTarefa = {
        id: (tarefas.length + 1),
        titulo: titulo,
        descricao: descricao,
        concluida: false
    }

    tarefas.push(novaTarefa)
    
    await escreverNoArquivo(tarefas)
    
    console.log("Nova tarefa adicionada!")
}

export async function verTarefas() {
    const tarefas = await lerTarefas()
    
    console.log(tarefas)
}

export async function tarefasConcluidas() {
    const tarefas = await lerTarefas()
    const concluidas = tarefas.filter(tarefa => tarefa.concluida === true)
    
    console.log(concluidas)

    if (concluidas.length === 0) {
        console.log('Nenhuma tarefa concluída')
        return
    }
}

export async function tarefaIncompletas() {
    const tarefas = await lerTarefas()
    const incompletas = tarefas.filter(tarefa => tarefa.concluida === false)
    
    console.log(incompletas)

    if (incompletas.length === 0) {
        console.log('Nenhuma tarefa não concluída')
        return
    }
}

export async function terminarTarefa() {
    const tarefas = await lerTarefas()
    const id = +prompt('Digite o ID da tarefa incompleta: ')
    const atividade = tarefas.find (tarefa => tarefa.id === parseInt(id))

    atividade.concluida = true

    console.log(`A tarefa ${atividade.id} foi concluida`)

    await escreverNoArquivo(tarefas)
}