import { UrlData } from "@/core/entities/Interface";

export function handleTextFieldChange (event, fieldName, setFormData) {
        const value = event.target.value;
        setFormData(prevData => {
            const newData = { ...prevData };
            newData[fieldName] = value;
            return newData;
        });
    };

export function resetUrlFormData (setFormData, id_profile) {
    setFormData(new UrlData({
      name: '',
      url: '',
      frecuency: '',
      id_profile: id_profile,
    }));
  };
