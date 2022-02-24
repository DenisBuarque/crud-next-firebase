interface PropsBotao {
    children: string;
    goForm: () => void;
}

export default function Botao(props: PropsBotao){
    return (
        <button onClick={props.goForm} className="bg-gray-800 text-white p-2 rounded mr-2 mb-3">
            {props.children}
        </button>
    );
}