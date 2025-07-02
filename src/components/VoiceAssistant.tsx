import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import EnergyOrb from './EnergyOrb';
import HolographicPanel from './HolographicPanel';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleListening = () => {
    setIsListening(!isListening);
    // Simulate AI response
    if (!isListening) {
      setTimeout(() => {
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 3000);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-radial from-energy-glow/5 via-transparent to-transparent" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        
        {/* Top floating panels */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
          <HolographicPanel 
            title="Weather"
            delay={0}
          >
            <div className="text-sm space-y-2">
              <div className="text-lg font-light">22°C</div>
              <div className="text-muted-foreground">Clear Sky</div>
              <div className="text-xs opacity-60">San Francisco, CA</div>
            </div>
          </HolographicPanel>

          <HolographicPanel 
            title={currentTime.toLocaleTimeString()}
            delay={0.2}
          >
            <div className="text-sm space-y-1">
              <div className="text-xs text-muted-foreground">
                {currentTime.toLocaleDateString()}
              </div>
              <div className="text-xs opacity-60">Pacific Time</div>
            </div>
          </HolographicPanel>

          <HolographicPanel 
            title="Music"
            delay={0.4}
          >
            <div className="text-sm space-y-2">
              <div className="text-xs font-medium">Cyberpunk Ambient</div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-3 h-3" />
                <div className="text-xs text-muted-foreground">Playing</div>
              </div>
            </div>
          </HolographicPanel>
        </div>

        {/* Central energy orb */}
        <div className="flex-1 flex items-center justify-center">
          <EnergyOrb 
            isListening={isListening} 
            isSpeaking={isSpeaking}
          />
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <HolographicPanel title="Voice Control" delay={0.6}>
            <div className="flex items-center gap-6">
              <Button
                size="lg"
                variant={isListening ? "destructive" : "default"}
                onClick={toggleListening}
                className="rounded-full w-16 h-16 neon-glow"
              >
                {isListening ? (
                  <MicOff className="w-6 h-6" />
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </Button>
              
              <div className="text-center">
                <div className="text-sm text-glow">
                  {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Say something"}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {isListening ? "Touch to stop" : "Touch to activate"}
                </div>
              </div>
            </div>
          </HolographicPanel>
        </div>

        {/* Side notifications */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-4">
          <HolographicPanel 
            title="Notifications" 
            delay={0.8}
            className="w-64"
          >
            <div className="space-y-3">
              <div className="text-xs p-2 rounded bg-glass-panel/30">
                <div className="text-neon-cyan font-medium mb-1">System Update</div>
                <div className="text-muted-foreground">Neural network enhanced</div>
              </div>
              <div className="text-xs p-2 rounded bg-glass-panel/30">
                <div className="text-accent font-medium mb-1">Calendar</div>
                <div className="text-muted-foreground">Meeting in 30 minutes</div>
              </div>
            </div>
          </HolographicPanel>
        </div>

        {/* Assistant status */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
          <HolographicPanel 
            title="ARIA Status" 
            delay={1.0}
            className="w-48"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full pulse-slow" />
                <span className="text-xs">Online</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Neural processing: Active
              </div>
              <div className="text-xs text-muted-foreground">
                Voice recognition: Ready
              </div>
              <div className="text-xs text-energy-glow">
                Learning mode: Enabled
              </div>
            </div>
          </HolographicPanel>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;