
// Store audio elements for reuse
const audioCache: Record<string, HTMLAudioElement> = {};

// Track if user has interacted with the page
let userHasInteracted = false;

// Track pending sounds to play after interaction
const pendingSounds: Array<{soundUrl: string, volume: number}> = [];

// Listen for user interaction
document.addEventListener('click', () => {
  userHasInteracted = true;
  
  // Play any pending sounds
  while (pendingSounds.length > 0) {
    const sound = pendingSounds.shift();
    if (sound) {
      playSound(sound.soundUrl, sound.volume);
    }
  }
}, { once: true });

/**
 * Play a sound effect from a URL
 * @param soundUrl The URL of the sound to play
 * @param volume Optional volume between 0 and 1
 * @returns Promise that resolves when the sound starts playing
 */
export const playSound = (soundUrl: string, volume: number = 1.0): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // If user hasn't interacted yet, queue the sound for later
      if (!userHasInteracted) {
        console.log('Queueing sound for later (after user interaction):', soundUrl);
        pendingSounds.push({ soundUrl, volume });
        resolve();
        return;
      }
      
      // Try to get cached audio element or create a new one
      if (!audioCache[soundUrl]) {
        console.log('Creating new audio element for:', soundUrl);
        audioCache[soundUrl] = new Audio(soundUrl);
        
        // Set up error handler
        audioCache[soundUrl].onerror = (e) => {
          console.error("Audio loading error:", e);
          reject(e);
        };
      }
      
      const audio = audioCache[soundUrl];
      audio.volume = Math.max(0, Math.min(1, volume)); // Ensure volume is between 0 and 1
      audio.currentTime = 0; // Reset to start
      
      console.log(`Playing sound: ${soundUrl} (volume: ${volume})`);
      
      // Play the sound and catch any errors
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log(`Sound started playing: ${soundUrl}`);
            resolve();
          })
          .catch(error => {
            console.error("Error playing sound:", error);
            reject(error);
          });
      } else {
        resolve();
      }
    } catch (error) {
      console.error("Error setting up audio:", error);
      reject(error);
    }
  });
};

// Local audio files (CDN fallbacks)
export const SOUNDS = {
  CLICK: "/click.mp3", // Primary source
  CLICK_FALLBACK: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", // Fallback
  PAGE_CHANGE: "/page-change.mp3",
  PAGE_CHANGE_FALLBACK: "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3",
  TOKEN_EARN: "/token-earn.mp3",
  TOKEN_EARN_FALLBACK: "https://assets.mixkit.co/active_storage/sfx/888/888-preview.mp3"
};

// Helper to play with fallback
export const playSoundWithFallback = (primarySource: string, fallbackSource: string, volume: number = 1.0) => {
  playSound(primarySource, volume).catch(() => {
    console.log(`Primary sound failed, trying fallback: ${fallbackSource}`);
    playSound(fallbackSource, volume);
  });
};

