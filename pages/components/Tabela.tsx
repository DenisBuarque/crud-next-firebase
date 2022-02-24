import Cliente from '../core/Cliente';
import { DocumentData } from "firebase/firestore";

interface TabelaProps {
    //clientes: Cliente[];
    clientes: DocumentData[];
    clienteSelecionado?: (id: string) => void;
    clienteExcluido?: (id: string) => void; 
}

export default function Tabela(porps: TabelaProps){

    return (
        <>
            <table className="w-full">
                <thead className="bg-gray-400">
                    <tr>
                        <th className="text-left p-4">Código</th>
                        <th className="text-left p-4">Nome</th>
                        <th className="text-left p-4">Idade</th>
                        <th className="p-4">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {porps.clientes?.map((cliente, index) => (
                        <tr key={cliente.id} className={`${index % 2 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                            <td className="text-left p-4">{cliente.id}</td>
                            <td className="text-left p-4">{cliente.data().nome}</td>
                            <td className="text-left p-4">{cliente.data().idade}</td>
                            <td className="flex items-center justify-center p-4">
                                <button onClick={ () => porps.clienteSelecionado?.(cliente.id) } className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button onClick={ () => porps.clienteExcluido?.(cliente.id) } className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}