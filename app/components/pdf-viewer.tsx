"use client"

import { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Add required CSS imports
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    // Set up the worker only on the client side
    if (typeof window !== "undefined") {
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
      setMounted(true)
    }
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error)
    setLoading(false)
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages))
  }

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-600">Loading PDF viewer...</div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-600">Loading PDF...</div>
        </div>
      )}

      <div className="flex-1 overflow-auto flex justify-center items-start p-4">
        <Document
          file="/resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="max-w-full"
        >
          <Page
            pageNumber={pageNumber}
            className="shadow-lg"
            width={typeof window !== "undefined" ? Math.min(800, window.innerWidth - 100) : 800}
          />
        </Document>
      </div>

      {!loading && numPages > 0 && (
        <div className="bg-gray-100 p-4 flex items-center justify-between border-t">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span className="text-gray-700">
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
