export type VoiceEngineConfig = {
  ttsEndpoint?: string
  sttEndpoint?: string
  apiKey?: string
}

export class VoiceEngine {
  private readonly ttsEndpoint: string
  private readonly sttEndpoint: string
  private readonly apiKey?: string

  constructor(config: VoiceEngineConfig = {}) {
    this.ttsEndpoint = config.ttsEndpoint ?? '/api/voice/tts'
    this.sttEndpoint = config.sttEndpoint ?? '/api/voice/stt'
    this.apiKey = config.apiKey
  }

  async speak(text: string, voiceId?: string): Promise<void> {
    await fetch(this.ttsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
      },
      body: JSON.stringify({ text, voiceId }),
    })
  }

  async listen(audioBlob: Blob): Promise<string> {
    const formData = new FormData()
    formData.append('audio', audioBlob, 'onboarding-audio.webm')

    const response = await fetch(this.sttEndpoint, {
      method: 'POST',
      headers: this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : undefined,
      body: formData,
    })

    if (!response.ok) {
      return ''
    }

    const payload = (await response.json()) as { text?: string }
    return payload.text ?? ''
  }
}
