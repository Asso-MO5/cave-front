import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export function Pagination({ totalItems, defaultLimit = 50 }) {
  const searchParams = useParams()
  const btnClass = 'whitespace-nowrap cursor-pointer'
  const totalPages = Math.ceil(
    totalItems / Number(searchParams.limit || defaultLimit)
  )

  const currentPage = Number(searchParams.page) || 1
  const isOnFirstPage = currentPage === 1
  const isOnLastPage = currentPage === totalPages

  const getPageNumbers = useMemo(() => {
    const pages = []
    const maxPagesToShow = 5
    const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2)
    const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1

    let startPage = Math.max(currentPage - maxPagesBeforeCurrentPage, 1)
    let endPage = Math.min(currentPage + maxPagesAfterCurrentPage, totalPages)

    if (currentPage <= maxPagesBeforeCurrentPage) {
      endPage = Math.min(maxPagesToShow, totalPages)
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = Math.max(totalPages - maxPagesToShow + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) pages.push(i)

    if (startPage > 1) {
      pages.unshift('...')
      pages.unshift(1)
    }

    if (endPage < totalPages) {
      pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }, [currentPage, totalPages])

  const handleChangePage = (pageNumber) => {
    //TODO
    /*
        setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set("page", String(pageNumber))
      return newParams
    })
    */
  }

  return (
    <div className="flex gap-2">
      <button
        data-current={isOnFirstPage}
        className={`${btnClass} text-base-border data-[current=true]:opacity-50`}
        onClick={() => handleChangePage(Number(currentPage - 1))}
        disabled={isOnFirstPage}
      >
        Precédent
      </button>

      {getPageNumbers.map((pageNumber, i) => (
        <button
          key={i}
          data-current={pageNumber === currentPage}
          className={`${btnClass} text-lg relative data-[current=true]:text-mo-secondary`}
          onClick={() => handleChangePage(Number(pageNumber))}
          disabled={pageNumber === currentPage || pageNumber === '...'}
        >
          {pageNumber}
          {pageNumber === currentPage && totalPages > 1 && (
            <div className="absolute top-full left-[2px] right-0 flex justify-center">
              <div className="w-1 h-1 -mt-1 bg-base-secondary rounded-full"></div>
            </div>
          )}
        </button>
      ))}
      <button
        data-current={isOnLastPage}
        className={`${btnClass} text-base-border data-[current=true]:opacity-50`}
        onClick={() => handleChangePage(Number(currentPage + 1))}
        disabled={isOnLastPage}
      >
        Suivant
      </button>
    </div>
  )
}
