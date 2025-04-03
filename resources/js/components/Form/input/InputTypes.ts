import { ChangeEvent } from "react";

export interface BlogInputProps {
    id: string;
    label: string;
    value: string;
    placeholder: string;
    autoComplete?: string;
    error?: string;
    type?: string; 
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
