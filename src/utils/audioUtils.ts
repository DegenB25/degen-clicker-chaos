
// Store audio elements for reuse
const audioCache: Record<string, HTMLAudioElement> = {};

/**
 * Play a sound effect from a URL
 * @param soundUrl The URL of the sound to play
 * @param volume Optional volume between 0 and 1
 */
export const playSound = (soundUrl: string, volume: number = 1.0) => {
  try {
    // Try to get cached audio element or create a new one
    if (!audioCache[soundUrl]) {
      audioCache[soundUrl] = new Audio(soundUrl);
    }
    
    const audio = audioCache[soundUrl];
    audio.volume = Math.max(0, Math.min(1, volume)); // Ensure volume is between 0 and 1
    audio.currentTime = 0; // Reset to start
    
    // Play the sound and catch any errors
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Error playing sound:", error);
      });
    }
  } catch (error) {
    console.error("Error setting up audio:", error);
  }
};

// Predefined sound URLs
export const SOUNDS = {
  CLICK: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
  PAGE_CHANGE: "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3",
  TOKEN_EARN: "https://assets.mixkit.co/active_storage/sfx/888/888-preview.mp3"
};
