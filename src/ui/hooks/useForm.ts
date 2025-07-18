import { useState } from "react";

/**
 * Custom hook for form state, handling changes, and resetting the state
 * @returns {object} - Returns formState, handleChange, and resetForm
 */
export default function useForm() {
    const [formState, setFormState] = useState({
        postCode: "",
        houseNumber: "",
        firstName: "",
        lastName: "",
        selectedAddress: "",
    });

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