import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiCheck } = FiIcons;

function CourseVideoPlayer({ videoId, title, onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // In a real implementation, these would be connected to actual YouTube API events
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgress = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    
    // Mark as completed when progress is at 95% or more
    if (newProgress >= 95 && !isCompleted) {
      setIsCompleted(true);
      if (onComplete) onComplete();
    }
  };

  const handleFullscreen = () => {
    // This would trigger fullscreen in a real implementation
    console.log('Fullscreen requested');
  };

  const markComplete = () => {
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative">
        {/* YouTube Embed */}
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&enablejsapi=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Custom Controls Overlay (for demonstration - in reality, YouTube controls would be used) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button onClick={handlePlayPause} className="focus:outline-none">
                <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="h-6 w-6" />
              </button>
              <button onClick={handleMute} className="focus:outline-none">
                <SafeIcon icon={isMuted ? FiVolumeX : FiVolume2} className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 mx-4">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgress}
                className="w-full h-2 bg-gray-600 rounded-full appearance-none cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progress}%, #4b5563 ${progress}%, #4b5563 100%)`
                }}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {isCompleted ? (
                <span className="flex items-center text-green-400 text-sm">
                  <SafeIcon icon={FiCheck} className="h-5 w-5 mr-1" />
                  Completed
                </span>
              ) : (
                <button 
                  onClick={markComplete} 
                  className="text-sm bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded transition-colors"
                >
                  Mark Complete
                </button>
              )}
              <button onClick={handleFullscreen} className="focus:outline-none">
                <SafeIcon icon={FiMaximize} className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
      </div>
    </motion.div>
  );
}

export default CourseVideoPlayer;