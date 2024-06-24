import { useCallback, useState } from 'react'
import { toast } from 'sonner'

const useCopyText = () => {
  const [isCopied, setIsCopied] = useState(false)

  const copyText = useCallback((text: string) => {
    if (!navigator.clipboard) {
      // fallbackCopyTextToClipboard(text)
      return
    }
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true)
        toast('Copied to clipboard')
        setTimeout(() => setIsCopied(false), 2000)
      },
      (err) => {
        console.error('Failed to copy: ', err)
      }
    )
  }, [])

  //TODO: Not the best solution
  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text

    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand('copy')
      setIsCopied(successful)
      setTimeout(() => setIsCopied(false), 2000)
      toast('Copied to clipboard')
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
      toast.error('Oops, unable to copy')
    }

    document.body.removeChild(textArea)
  }

  return { isCopied, copyText }
}

export default useCopyText
