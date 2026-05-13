'use client'

import { useState } from 'react'
import { Mic, MicOff, MessageSquare, Bot, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

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

      setStatus('Connecting to Speechmatics...')

      // 2. Setup WebSocket for Speechmatics Real-time
      const socket = new WebSocket(`wss://eu2.rt.speechmatics.com/v2?auth_token=${token}`)
      
      socket.onopen = () => {
        setStatus('Listening (Speechmatics)...')
        // Start recognition
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

        // Start recording audio
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
            setTranscript(prev => prev + ' ' + text)
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
      // Fallback to Web Speech API
      setStatus('Falling back to Web Speech...')
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
        setStatus('Voice recognition not available.')
      }
    }
  }

  return (
    <Card className="border-border bg-card/50 shadow-lg hover:shadow-primary/10 transition-shadow sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center space-x-2">
          <div className="relative">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="text-foreground">AI Command Center</span>
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Autonomous SRE Agent</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 gap-2">
            <Input 
              placeholder="Type or speak a command..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommand(inputText)}
              className="text-xs h-9 bg-background/50 border-border focus:border-primary transition-colors"
            />
            <Button 
              size="sm" 
              className="h-9 w-9 p-0 bg-primary hover:bg-primary/90 text-primary-foreground" 
              onClick={() => handleCommand(inputText)}
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className={`rounded-full w-9 h-9 p-0 shrink-0 transition-colors ${
                isListening 
                  ? 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30 text-red-400' 
                  : 'bg-secondary hover:bg-secondary/90 text-primary-foreground'
              }`}
              onClick={toggleListening}
              variant="outline"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex items-center justify-between px-2 py-1 rounded bg-background/30 border border-border">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">{status}</span>
            {isListening && (
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
              </div>
            )}
          </div>

          {(transcript || response) && (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 py-2">
              {transcript && (
                <div className="flex items-start space-x-2 justify-end">
                  <div className="bg-primary/20 p-3 rounded-lg text-xs border border-primary/30 max-w-[85%]">
                    <p className="text-primary italic">{transcript}</p>
                  </div>
                </div>
              )}

              {response && (
                <div className="flex items-start space-x-2">
                  <Bot className="h-4 w-4 mt-1 text-secondary flex-shrink-0" />
                  <div className="bg-card border border-border/50 p-3 rounded-lg text-xs max-w-[85%] shadow-sm">
                    <p className="font-semibold text-secondary mb-2 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      KCC Agent
                    </p>
                    <p className="leading-relaxed text-muted-foreground">{response}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {!transcript && !response && (
            <div className="text-center py-4 text-muted-foreground">
              <p className="text-xs">Type or speak to interact with the AI Command Center</p>
              <p className="text-[10px] mt-2 text-muted-foreground/60">Powered by Gemini 1.5 Pro</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
