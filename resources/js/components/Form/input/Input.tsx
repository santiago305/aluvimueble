import InputError from "@/components/input-error";
import { Label } from "@/components/ui/label";
import { BlogInputProps } from "./InputTypes";
import { Input } from "@/components/ui/input";


export default function InputForm({
    id,
    label,
    value,
    placeholder,
    autoComplete,
    error,
    type = "text",
    onChange,
}: BlogInputProps) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={type}
                className="mt-1 block w-full"
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                placeholder={placeholder}
            />
            {error && <InputError message={error} className="mt-2" />}
        </div>
    );
}
