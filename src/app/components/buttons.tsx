import next from "next";

type ButtonProps = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

export function AgregarACarritoButton({text, onClick, disabled=false}:ButtonProps){
    return(
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={onClick}
            disabled={disabled}
            >{text}</button>
    );
}

type SinGustosButtonProps = Omit<ButtonProps, "text" | "disabled">;

export function AgregarCantidadSinGustosButton({onClick}: SinGustosButtonProps){
    return(
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={onClick}
        > + </button>
    );
}

export function EliminarCantidadSinGustosButton({onClick}: SinGustosButtonProps){
    return(
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={onClick}
        > - </button>
    );
}

type ConGustosButtonProps = Omit<ButtonProps, "text" | "disabled">;

export function AgregarCantidadButton({onClick}: ConGustosButtonProps){
    return(
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={onClick}
        > + </button>
    );
}

export function EliminarCantidadButton({onClick}: ConGustosButtonProps){
    return(
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={onClick}
        > - </button>
    );
}

