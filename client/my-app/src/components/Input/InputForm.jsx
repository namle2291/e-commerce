import React from 'react'
import clsx from 'clsx'

export default function InputForm({
   id,
   register,
   validate,
   defaultValue,
   type,
   fw = false,
   customs,
   errors,
}) {
   return (
      <div className="flex flex-col gap-1">
         <input
            {...register(id, validate)}
            type={type}
            defaultValue={defaultValue}
            className={clsx(fw && 'w-full', 'outline-none', customs)}
         />
         {errors[id] && <p className="text-red-600">{errors[id]?.message}</p>}
      </div>
   )
}
