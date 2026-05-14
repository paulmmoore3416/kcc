'use client'

import { useState } from 'react'
import { Mic, MicOff, MessageSquare, Bot, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [inputText, setInputText] = useState('')
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [status, setStatus] = useState('Ready')

  const handleCommand = async (text: string) => {
    if (!text) return
    setTranscript(text)
    setStatus('Processing with KCC AI...')
    
    try {
      const response = await fetch('/api/ai/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: text }),
      })
      const data = await response.json()
      setResponse(data.response || 'I encountered an error processing your command.')
    } catch (error) {
      setResponse('Failed to communicate with KCC AI.')
    } finally {
      setStatus('Ready')
      setInputText('')
    }
  }

  const toggleListening = async () => {
    if (isListening) {
      setIsListening(false)
      setStatus('Ready')
      return
    }

    setIsListening(true)
    setStatus('Authenticating...')

    try {
      // 1. Get temporary token
      const tokenRes = await fetch('/api/speech/token')
      const { token } = await tokenRes.json()

      if (!token) {
        throw new Error('Could not get Speechmatics token')
      }

      setStatus('Connecting...')

      // 2. Setup WebSocket for Speechmatics Real-time
      const socket = new WebSocket(`wss://eu2.rt.speechmatics.com/v2?auth_token=${token}`)
      
      socket.onopen = () => {
        setStatus('Listening...')
        socket.send(JSON.stringify({
          message: 'StartRecognition',
          transcription_config: {
            language: 'en',
            enable_partials: true,
          },
          audio_format: {
            type: 'raw',
            encoding: 'pcm_f32le',
            sample_rate: 16000,
          }
        }))

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
          const audioContext = new AudioContext({ sampleRate: 16000 })
          const source = audioContext.createMediaStreamSource(stream)
          const processor = audioContext.createScriptProcessor(4096, 1, 1)

          source.connect(processor)
          processor.connect(audioContext.destination)

          processor.onaudioprocess = (e) => {
            if (socket.readyState === WebSocket.OPEN) {
              const inputData = e.inputBuffer.getChannelData(0)
              socket.send(inputData.buffer)
            }
          }

          socket.onclose = () => {
            stream.getTracks().forEach(track => track.stop())
            audioContext.close()
          }
        })
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.message === 'AddTranscript') {
          const text = data.metadata.transcript
          if (text) {
            setTranscript(text)
            handleCommand(text)
            socket.close()
            setIsListening(false)
          }
        }
      }

      socket.onerror = () => {
        throw new Error('WebSocket error')
      }

    } catch (error) {
      console.error('Speechmatics error:', error)
      setStatus('Web Speech Fallback...')
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript
          handleCommand(text)
          setIsListening(false)
        }
        recognition.onerror = () => {
          setIsListening(false)
          setStatus('Ready')
        }
        recognition.start()
      } else {
        setIsListening(false)
        setStatus('Voice unavailable.')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Autonomous SRE</p>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded bg-muted border border-border">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{status}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Command the cluster..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand(inputText)}
            className="w-full bg-background border border-input rounded-lg py-3 pl-4 pr-24 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button 
              onClick={toggleListening}
              className={`p-2 rounded-md transition-all ${isListening ? 'bg-destructive/20 text-destructive' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
            <button 
              onClick={() => handleCommand(inputText)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {(transcript || response) ? (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted">
            {transcript && (
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground font-bold uppercase ml-1">You</p>
                <div className="bg-muted/50 border border-border p-3 rounded-lg text-sm">
                  {transcript}
                </div>
              </div>
            )}

            {response && (
              <div className="space-y-1">
                <p className="text-[10px] text-primary font-bold uppercase ml-1">Agent</p>
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg text-sm leading-relaxed">
                  {response}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center space-y-2">
            <Bot className="h-8 w-8 text-muted/50 mx-auto" />
            <p className="text-xs text-muted-foreground">Ask me to scale deployments, check logs, or analyze costs.</p>
          </div>
        )}
      </div>
    </div>
  )
}
