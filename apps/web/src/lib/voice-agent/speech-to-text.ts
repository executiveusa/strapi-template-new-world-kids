export type SpeechToTextResult = {
  text: string
  confidence: number
}

export async function transcribeAudio(audioBlob: Blob): Promise<SpeechToTextResult> {
  const formData = new FormData()
  formData.append('audio', audioBlob, 'voice-input.webm')

  const response = await fetch('/api/voice/stt', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    return { text: '', confidence: 0 }
  }

  const payload = (await response.json()) as SpeechToTextResult
  return payload
}
