'use client'

import { Share2 } from 'lucide-react'
import { useState } from 'react'
import { Language, translate } from '../utils/translations'

interface ShareButtonProps {
  language: Language
}

export default function ShareButton({ language }: ShareButtonProps) {
  const [showToast, setShowToast] = useState(false)

  // 네이티브 공유 기능
  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'InnoCard',
        url: window.location.href
      })
    } catch (err) {
      // 공유 실패 시 클립보드 복사로 폴백
      try {
        await navigator.clipboard.writeText(window.location.href)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 2000)
      } catch (clipboardErr) {
        console.error('Error sharing:', err)
      }
    }
  }

  return (
    <>
      <button
        onClick={handleShare}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Share"
      >
        <Share2 className="w-5 h-5" />
      </button>
      
      {/* 토스트 메시지 */}
      {showToast && (
        <div className="fixed bottom-24 right-8 z-50 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          {translate('linkCopied', language)}
        </div>
      )}
    </>
  )
} 