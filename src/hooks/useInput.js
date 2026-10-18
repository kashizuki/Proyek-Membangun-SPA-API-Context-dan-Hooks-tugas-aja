import { useState } from 'react';

// Custom hook useInput untuk menangani input form bertipe controlled component
function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  return [value, handleValueChange];
}

export default useInput;
