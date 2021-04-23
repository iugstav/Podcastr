import { createContext, ReactNode, useState } from 'react'

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PLayerContextData = {
  episodeList: Array<Episode>
  currentEpisodeIndex: number; 
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean
  hasNext: boolean;
  hasPrevious: boolean;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setPlayingState: (state: boolean) => void;
  clearPlayerState: () => void;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const PlayerContext = createContext({} as PLayerContextData)

type PlayerContextProviderProps = {
  children: ReactNode;
} 

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0) 
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }
  
  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext() {
    if(isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    }else if(hasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    } 
  }

  function playPrevious() {

    if(hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  return(
    <PlayerContext.Provider value={{ 
      episodeList, 
      currentEpisodeIndex, 
      play, 
      isPlaying,
      isLooping,
      isShuffling,
      togglePlay,
      toggleLoop,
      toggleShuffle,
      playList,
      playNext,
      hasNext,
      playPrevious,
      hasPrevious,
      setPlayingState,
      clearPlayerState
    }}>
      {children}
    </PlayerContext.Provider>
  )
}