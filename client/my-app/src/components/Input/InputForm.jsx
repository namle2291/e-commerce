import React from 'react';
import clsx from 'clsx';

export default function InputForm({
   id,
   register,
   validate,
   defaultValue = null,
   type = 'text',
   fw = false,
   customs,
   errors,
   placeholder = null,
   label = null,
}) {
   return (
      <div className="flex flex-col gap-1">
         {label && <label htmlFor={id}>{label}:</label>}
         <input
            {...register(id, validate)}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={clsx(fw && 'w-full', 'outline-none', customs)}
         />
         {errors && <p className="text-red-600">{errors[id]?.message}</p>}
      </div>
   );
}
