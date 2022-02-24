import React, { useState } from 'react';
import Input from './Input';
import Cliente from '../core/Cliente';
import Botao from './Botao'

interface PropsForm {
    cliente: Cliente;
    clienteMudou?: (cliente: Cliente) => void;
    cancelado: () => void;
}

export default function Formulario(props: PropsForm){

    const id = props.cliente?.id;

    const [nome, setNome] = useState<string>(props.cliente?.nome ?? '');
    const [idade, setIdade] = useState<number>(props.cliente?.idade ?? 0);

    return (
        <div>
            {id ? ( <Input texto="Código" tipo="text" valor={id}/> ) : false } 
            <Input texto="Nome" tipo="text" valor={nome} valorMudou={setNome}/>
            <Input texto="Idade" tipo="number" valor={idade} valorMudou={setIdade}/>
            <div className='flex justify-end mt-4'>
                <Botao goForm={ () => props.clienteMudou?.(new Cliente(nome, idade, id)) }>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao goForm={ props.cancelado }>
                    Cancelar
                </Botao>
            </div>
        </div>
    );
}