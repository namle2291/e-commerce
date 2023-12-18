import { Input } from 'antd';
import React from 'react';

function InputField({
   field,
   defaultValue,
   id,
   hidden,
   placeholder,
   errors,
   label,
   type = 'text',
}) {
   return (
      <div className="mb-2">
         {label && <label className="text-sm text-gray-600">{label}</label>}
         <Input
            type={type}
            {...field}
            defaultValue={defaultValue}
            hidden={hidden}
            size="large"
            placeholder={placeholder}
            className="mt-2"
         />
         {errors && (
            <span className="text-red-600 text-sm">{errors[id]?.message}</span>
         )}
      </div>
   );
}

export default InputField;
