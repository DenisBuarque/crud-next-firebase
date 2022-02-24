interface PropsInput {
    tipo?: 'text' | 'number';
    texto: string;
    valor: any;
    valorMudou?: (valor: any) => void;
}

export default function Input(props: PropsInput){
    return (
        <div className="flex flex-col">
            <label className='mt-4'>{props.texto}</label>
            <input 
                type={props.tipo ?? 'text'} 
                value={props.valor} 
                onChange={ e => props.valorMudou?.( e.target.value ) }
                className="border border-gray-400 rounded focus:outline-none p-3" />
        </div>
    );
}