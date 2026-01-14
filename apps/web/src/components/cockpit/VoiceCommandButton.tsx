// ============================================================================
// VoiceCommandButton - Floating voice command button
// ============================================================================

'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function VoiceCommandButton() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const cleanupStream = () => {
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    }
    setIsListening(false);
  };

  const startRecording = async () => {
    try {
      setError(null);
      setTranscript('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onerror = () => {
        setError('Recording failed. Please try again.');
        setIsListening(false);
        setIsProcessing(false);
        cleanupStream();
      };

      recorder.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType });
        audioChunksRef.current = [];
        cleanupStream();

        try {
          const formData = new FormData();
          formData.append('audio', audioBlob, 'voice-command.webm');

          const response = await fetch('/api/voice/command', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Unable to process audio.');
          }

          const data = await response.json();
          setTranscript(data?.transcript ?? '');
        } catch (err) {
          console.error('[Voice] Cassiopeia request failed', err);
          setError('Cassiopeia could not process the audio. Please try again.');
        } finally {
          setIsProcessing(false);
        }
      };

      recorder.start();
      setIsListening(true);
    } catch (err) {
      console.error('[Voice] Microphone access failed', err);
      setError('Microphone access denied. Please enable it and try again.');
      setIsListening(false);
      setIsProcessing(false);
      cleanupStream();
    }
  };

  const handleClick = () => {
    if (isListening) {
      stopRecording();
    } else if (!isProcessing) {
      void startRecording();
    }
  };

  useEffect(() => {
    return () => {
      stopRecording();
      cleanupStream();
    };
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={cn(
          "fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-60",
          isListening
            ? "animate-pulse bg-gradient-to-r from-purple-500 to-blue-500 scale-110"
            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105"
        )}
        aria-label={isListening ? 'Stop listening' : 'Start voice command'}
      >
        <span className="text-3xl">{isListening ? '🎤' : '🎙️'}</span>

        {/* Waveform animation when listening */}
        {isListening && (
          <div className="absolute inset-0 rounded-full">
            <div className="absolute inset-0 rounded-full bg-purple-400/30 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping delay-75" />
          </div>
        )}
      </button>

      {/* Transcript popup */}
      {(transcript || isProcessing || error) && (
        <div className="fixed bottom-28 right-8 z-50 max-w-sm rounded-lg border border-purple-500/50 bg-slate-900 p-4 shadow-xl animate-in fade-in slide-in-from-bottom-4">
          <div className="font-sans text-sm text-white mb-2">
            {error ? 'Voice command error' : 'You said:'}
          </div>
          {error ? (
            <div className="font-display text-sm text-red-300">
              {error}
            </div>
          ) : (
            <div className="font-display text-lg text-purple-300">
              {transcript ? `"${transcript}"` : 'Listening...'}
            </div>
          )}
          {!error && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  isProcessing ? "bg-yellow-500 animate-pulse" : "bg-green-500 animate-pulse"
                )}
              />
              {isProcessing ? 'Sending to Cassiopeia...' : 'Processing...'}
            </div>
          )}
        </div>
      )}
    </>
  );
}
