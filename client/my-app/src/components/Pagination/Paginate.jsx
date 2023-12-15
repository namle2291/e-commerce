import React, { memo, useEffect, useState } from 'react'
import { FcNext, FcPrevious } from 'react-icons/fc'
import clsx from 'clsx'

function Paginate({ currentPage = 1, pageCount, PageChange }) {
  return (
    <div className="flex">
      {currentPage > 1 && (
        <button
          className="border px-2 h-[30px]"
          onClick={() => PageChange(currentPage - 1)}
        >
          <FcPrevious />
        </button>
      )}
      {pageCount && (
        <>
          {Array(pageCount)
            .fill(null)
            .map((el, idx) => (
              <button
                key={idx}
                className={clsx(
                  'border w-[30px] h-[30px]',
                  currentPage === idx + 1 && 'bg-blue-400 text-white'
                )}
                onClick={() => PageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
        </>
      )}
      {currentPage < pageCount && (
        <button
          className="border px-2 h-[30px]"
          onClick={() => PageChange(currentPage + 1)}
        >
          <FcNext />
        </button>
      )}
    </div>
  )
}

export default memo(Paginate)
