// ============================================================================
// VoiceCommandButton - Floating voice command button wired to Cassiopeia
// ============================================================================

'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type VoiceStatus = 'idle' | 'recording' | 'processing' | 'success' | 'error';

export function VoiceCommandButton() {
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const supported = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
    setIsSupported(supported);
    if (!supported) {
      setError('Microphone capture is not supported in this browser. Try Chrome on desktop.');
    }
  }, []);

  const sendToCassiopeia = async (audioBlob: Blob) => {
    setStatus('processing');
    setError('');
    setResponseMessage('');

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice-command.webm');

      const response = await fetch('/api/voice/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Cassiopeia could not process the audio.');
      }

      const data = await response.json();
      const simulated = !data.forwarded;

      setStatus('success');
      setTranscript('');
      setResponseMessage(
        data.message ||
          (simulated
            ? 'Captured your voice. Cassiopeia will process this once online.'
            : 'Cassiopeia is processing your request now.')
      );
    } catch (err) {
      console.error('[Voice] error sending audio', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error while sending audio');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const startRecording = async () => {
    if (!isSupported || status === 'recording') return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach((track) => track.stop());
        sendToCassiopeia(audioBlob);
      };

      recorder.start();
      recorderRef.current = recorder;
      setTranscript('Listening...');
      setStatus('recording');
      setError('');
    } catch (err) {
      console.error('[Voice] microphone permission error', err);
      setError('Microphone permission denied or unavailable.');
      setStatus('error');
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && status === 'recording') {
      setStatus('processing');
      recorderRef.current.stop();
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        setStatus('error');
        cleanupStream();
        // Clear any existing timeout before setting a new one
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setStatus('idle'), 3000);
      };

      recorder.onstop = async () => {
        setStatus('processing');
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
          setStatus('success');
        } catch (err) {
          console.error('[Voice] Cassiopeia request failed', err);
          setError('Cassiopeia could not process the audio. Please try again.');
          setStatus('error');
        } finally {
          // Clear any existing timeout before setting a new one
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => setStatus('idle'), 3000);
        }
      };

      recorder.start();
      setIsListening(true);
    } catch (err) {
      console.error('[Voice] Microphone access failed', err);
      setError('Microphone access denied. Please enable it and try again.');
      setIsListening(false);
      setStatus('error');
      cleanupStream();
      // Clear any existing timeout before setting a new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleClick = () => {
    if (!isSupported) {
      setError('Microphone capture is not supported in this browser.');
      return;
    }

    if (status === 'recording') {
      stopRecording();
    } else {
      startRecording();
    if (isListening) {
      stopRecording();
    } else if (status === 'idle') {
      void startRecording();
    }
  };

  useEffect(() => {
    return () => {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stopRecording();
      cleanupStream();
    };
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleClick}
        disabled={status === 'processing' || status === 'success' || status === 'error'}
        className={cn(
          'fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all',
          status === 'recording'
            ? 'animate-pulse bg-gradient-to-r from-purple-500 to-blue-500 scale-110'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105'
          "fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-60",
          isListening
            ? "animate-pulse bg-gradient-to-r from-purple-500 to-blue-500 scale-110"
            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105"
        )}
        aria-label={
          !isSupported
            ? 'Voice commands unavailable'
            : status === 'recording'
              ? 'Stop listening'
              : 'Start voice command'
        }
        disabled={!isSupported || status === 'processing'}
      >
        <span className="text-3xl">{status === 'recording' ? '🎤' : '🎙️'}</span>

        {/* Waveform animation when listening */}
        {status === 'recording' && (
          <div className="absolute inset-0 rounded-full">
            <div className="absolute inset-0 rounded-full bg-purple-400/30 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping delay-75" />
          </div>
        )}
      </button>

      {/* Transcript popup */}
      {(transcript || status !== 'idle' || error) && (
      {(transcript || responseMessage || error) && (
        <div className="fixed bottom-28 right-8 z-50 max-w-sm rounded-lg border border-purple-500/50 bg-slate-900 p-4 shadow-xl animate-in fade-in slide-in-from-bottom-4">
          {transcript && (
            <div className="font-sans text-sm text-white mb-2">
              {transcript}
            </div>
          )}
          {responseMessage && (
            <div className="font-display text-lg text-purple-300">{responseMessage}</div>
          )}
          {error && (
            <div className="mt-2 flex items-center gap-2 text-xs text-red-300">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              {error}
            </div>
          )}
          {!error && status === 'processing' && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Processing...
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
                  status === 'processing' ? "bg-yellow-500 animate-pulse" : "bg-green-500 animate-pulse"
                )}
              />
              {status === 'processing' && 'Sending to Cassiopeia...'}
              {status === 'success' && 'Success!'}
              {status !== 'processing' && status !== 'success' && 'Processing...'}
            </div>
          )}
        </div>
      )}
    </>
  );
}
