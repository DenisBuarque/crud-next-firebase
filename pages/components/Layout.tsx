import Titulo from './Titulo';

interface PropsLayout {
    titulo: string;
    children: any
}

export default function Layout(props: PropsLayout){
    return (
        <div className="flex flex-col w-2/3 bg-white text-gray-800 rounded">
            <Titulo>
                {props.titulo}
            </Titulo>
            <div className='p-6'>
                {props.children}
            </div>
        </div>
    );
}