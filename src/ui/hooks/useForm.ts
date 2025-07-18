import { useState } from "react";

export default function useForm() {
    const [formState, setFormState] = useState({
        postCode: "",
        houseNumber: "",
        firstName: "",
        lastName: "",
        selectedAddress: "",
    });

    console.log("Form state:", formState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setFormState((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormState({
            postCode: "",
            houseNumber: "",
            firstName: "",
            lastName: "",
            selectedAddress: "",
        });
    }
    return { formState, handleChange, resetForm };
}