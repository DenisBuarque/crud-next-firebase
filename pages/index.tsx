import Head from 'next/head'
import Layout from './components/Layout'
import Tabela from './components/Tabela';
import Cliente from './core/Cliente';
import Formulario from './components/Formulario';
import Botao from './components/Botao';
import { useState, useEffect } from 'react';

import { firestore } from './backend/config';
import { collection, query, getDocs, getDoc, QueryDocumentSnapshot, DocumentData, doc, setDoc, orderBy, deleteDoc, updateDoc } from "firebase/firestore";

export default function Home() {

    const [customers, setCustomers] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
    const [visivel, setVisivel] = useState<'tabela' | 'formulario'>('tabela');

    // faz a consulta da collection no firebase
    const queryCollectons = query(collection(firestore, "customers"),orderBy('nome'));

    //listando clientes
    const listCustomers = async () => {
        
        const querySnapshot = await getDocs(queryCollectons);
        const result: QueryDocumentSnapshot<DocumentData>[] = [];

        querySnapshot.forEach((doc) => {
            result.push(doc);
        });
        
        setCustomers(result);
    };

    useEffect( () => {
        listCustomers();
    }, []);

    const clienteSelecionado = async (id: string) => {

        const docReferenci = doc(firestore, "customers", id);
        const docSnapshot = await getDoc(docReferenci);
        if (docSnapshot.exists()) {
            let cliente = new Cliente(docSnapshot.data().nome, docSnapshot.data().idade, docSnapshot.id);
            setCliente(cliente);
            setVisivel('formulario');
        }
        return;
    }

    function novoCliente() {
        setCliente(Cliente.vazio());
        setVisivel('formulario');
    }

    const salvarCliente = async (cliente: Cliente) => {

        if (cliente.nome === '') {
            alert('Digite seu nome.');
            return;
        }

        if (cliente.idade <= 0) {
            alert('Digite sua idade.');
            return;
        }

        // se existe id faz Update 
        if(cliente.id){
            try {
                const docReference = doc(firestore, 'customers', cliente.id);
                await updateDoc(docReference, { 'nome': cliente.nome, 'idade': cliente.idade });
            } catch( err ){
                console.log('Erro ao atualizar: ' + err);
            }
        } else { // se naõ existe id realiza o cadastro
            try{
                const timestamp: string = Date.now().toString();
                const _document = doc(firestore, `customers/${timestamp}`);
        
                let data = {
                    nome: cliente.nome,
                    idade: cliente.idade,
                }
                // set o document na colletioc
                await setDoc(_document, data);
            } catch(err) {
                console.log("Erro ao cadastrar:" + err);
            }
            
        }

        
        

        
        
        // redireciona para tabela
        setVisivel('tabela');
        // lista os cliente
        listCustomers();
    }

    const clienteExcluido = async (id: string) => {
        try{
            // pega referencia da collection firabse
            const docRef = doc(firestore, 'customers', id);
            // deleta o document
            await deleteDoc(docRef);
            // redirect tabla
            setVisivel('tabela');
            // list customers
            listCustomers();
        }catch(err){
            console.log('Erro ao deletar' + err)
        }
    }

    return (
        <div>
            <Head>
                <title>Create Next App - CRUD</title>
            </Head>

            <main className="flex items-center justify-center bg-gray-300 h-screen">
                <Layout titulo='Cadastro Simples'>

                    {visivel === 'tabela' ? (
                        <>
                            <Botao goForm={ () => novoCliente() }>
                                Novo Cliente
                            </Botao>
                            <Tabela
                                clientes={customers}
                                clienteSelecionado={clienteSelecionado}
                                clienteExcluido={clienteExcluido} />
                        </>
                    ) : (
                        <Formulario
                            cliente={cliente}
                            clienteMudou={salvarCliente}
                            cancelado={() => setVisivel('tabela')}
                        />
                    )}
                </Layout>
            </main>

        </div>
    )
}
