import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { Button } from '../Button'

export function Pagination({ totalItems, defaultLimit = 50 }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(
    totalItems / Number(searchParams.get('limit') || defaultLimit)
  )

  const currentPage = Number(searchParams.get('page')) || 1
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
  }, [searchParams.get('page'), totalPages])

  const handleChangePage = (pageNumber) => {
    const newParams = new URLSearchParams(window.location.search)
    newParams.set('page', String(pageNumber))

    router.push(`${window.location.pathname}?${newParams.toString()}`)
  }

  return (
    <div className="sm:absolute inset-0">
      <div className="flex gap-3 justify-center items-center pt-3 flex-wrap">
        <Button
          onClick={() => handleChangePage(Number(currentPage - 1))}
          disabled={isOnFirstPage}
        >
          Precédent
        </Button>

        {getPageNumbers.map((pageNumber, i) => (
          <button
            key={i}
            data-current={pageNumber === currentPage}
            className={`whitespace-nowrap cursor-pointer text-lg relative data-[current=true]:font-bold data-[current=true]:underline disabled:opacity-100`}
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
        <Button
          onClick={() => handleChangePage(Number(currentPage + 1))}
          disabled={isOnLastPage}
        >
          Suivant
        </Button>
      </div>
    </div>
  )
}
