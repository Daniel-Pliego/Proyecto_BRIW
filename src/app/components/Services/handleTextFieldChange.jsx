export default function handleTextFieldChange(event, fieldName, setFormData) {
        const value = event.target.value;
        setFormData(prevData => {
            const newData = { ...prevData };
            newData[fieldName] = value;
            return newData;
        });
    };
