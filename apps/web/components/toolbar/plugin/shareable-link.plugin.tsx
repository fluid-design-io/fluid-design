'use client'

import { useColorStore } from '@/context/color-store-provider'
import useCopyText from '@/hooks/use-copy-text'
import { colorHelper } from '@/lib/colorHelper'
import { Label } from '@ui/components/ui/label'
import { Skeleton } from '@ui/components/ui/skeleton'
import { Switch } from '@ui/components/ui/switch'
import { Copy, Figma } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from 'ui/components/ui/button'
import { Input } from 'ui/components/ui/input'
import { cn } from 'ui/lib/utils'

function ShareableLinkPlugin({
  setOpen,
}: {
  setOpen: (open: boolean) => void
}) {
  const baseColors = useColorStore((s) => s.colors.baseColors)
  const [loadingSocialPreview, setLoadingSocialPreview] = useState(true)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [figmaPlugin, setFigmaPlugin] = useState(false)
  const { copyText } = useCopyText()
  const colorParams =
    '/?' +
    Object.entries(baseColors)
      .map(([key, value]) =>
        `${key}=${colorHelper.toHex(value)}`.replace('#', ''),
      )
      .join('&')
  const staticUrl = process.env.NEXT_PUBLIC_URL + colorParams
  const handleCopy = () => {
    copyText(figmaPlugin ? staticUrl + `&token=${token}` : staticUrl)
    setOpen(false)
  }
  const handleGenerateToken = async () => {
    setLoading(true)
    const { data, error } = await fetch('/api/v1/figma-plugin', {
      body: JSON.stringify({
        baseColors: {
          accent: colorHelper.toHex(baseColors.accent),
          primary: colorHelper.toHex(baseColors.primary),
          secondary: colorHelper.toHex(baseColors.secondary),
        },
      }),
      method: 'POST',
    }).then((res) => res.json())
    if (error) {
      toast.error('Error generating token')
      setLoading(false)
      return
    }
    setToken(data.token)
    setLoading(false)
  }
  useEffect(() => {
    if (!figmaPlugin || !!token) return
    handleGenerateToken()
  }, [figmaPlugin])
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative w-full">
        <div
          className={cn(
            'mb-4 grid place-items-stretch overflow-hidden rounded-md',
            'aspect-[120/63] w-full rounded-md',
          )}
        >
          <Skeleton
            className={cn('h-full w-full', {
              'opacity-0': !loadingSocialPreview,
            })}
          />
          <Image
            alt="Social preview"
            className={cn(
              'absolute inset-0 h-full w-full rounded border object-cover',
            )}
            height={184}
            onLoad={() => setLoadingSocialPreview(false)}
            src={`${process.env.NEXT_PUBLIC_URL}/api/og${colorParams}`}
            width={352}
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Label
          className="flex items-center justify-start text-foreground/80"
          htmlFor="preserve-size"
        >
          <Figma className="h3.5 me-1.5 w-3.5" /> Figma Plugin
        </Label>
        <Switch
          aria-label="Figma Plugin"
          checked={figmaPlugin}
          id="preserve-size"
          onCheckedChange={setFigmaPlugin}
        />
      </div>
      <div className="flex space-x-2">
        <Input
          className="h-8"
          disabled={loading}
          readOnly
          value={figmaPlugin ? staticUrl + `&token=${token}` : staticUrl}
        />
        <Button
          className="h-8"
          disabled={loading}
          onClick={handleCopy}
          size="icon"
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy</span>
        </Button>
      </div>
    </div>
  )
}

export default ShareableLinkPlugin
