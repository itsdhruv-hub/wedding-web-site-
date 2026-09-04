import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

// Data & Translations
import { en } from './translations/en';
import { gu } from './translations/gu';
import { hi } from './translations/hi';
import { desi } from './translations/desi';
import { weddingConfig } from './data/weddingConfig';

// Core UI Components
import IntroLoader from './components/IntroLoader';
import InvitationEnvelope from './components/InvitationEnvelope';
import MusicPlayer from './components/MusicPlayer';
import LanguageSwitcher from './components/LanguageSwitcher';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import PetalsOverlay from './components/PetalsOverlay';

import ScrollProgress from './components/ScrollProgress';

// Page Content Sections
import Hero from './components/Hero';
import GuestWelcome from './components/GuestWelcome';
import ScratchDate from './components/ScratchDate';
import Countdown from './components/Countdown';
import CoupleIntro from './components/CoupleIntro';
import OurStory from './components/OurStory';
import StoryVideo from './components/StoryVideo';
import Events from './components/Events';
import WeddingTimeline from './components/WeddingTimeline';
import Venue from './components/Venue';
import MemoryCards from './components/MemoryCards';
import Gallery from './components/Gallery';
import Family from './components/Family';
import ShareInvitation from './components/ShareInvitation';
import LoveNote from './components/LoveNote';
import FinalSection from './components/FinalSection';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [guestName, setGuestName] = useState('');
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [shouldAutoPlayMusic, setShouldAutoPlayMusic] = useState(false);

  const musicPlayerRef = useRef(null);

  // Dictionary lookup map
  const dictionaryMap = { en, gu, hi, desi };
  const t = dictionaryMap[currentLang] || en;

  useEffect(() => {
    // Read ?guest=Name from URL parameters
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest');
    if (guestParam) {
      setGuestName(guestParam);
    }
  }, []);

  const handleEnvelopeOpened = () => {
    setIsEnvelopeOpened(true);
    setShouldAutoPlayMusic(true);
    if (musicPlayerRef.current) {
      musicPlayerRef.current.playMusic();
    }
  };

  const handleSaveDateClick = () => {
    const scratchElem = document.getElementById('scratch-date');
    if (scratchElem) scratchElem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreStoryClick = () => {
    const storyElem = document.getElementById('story');
    if (storyElem) storyElem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-cream-light text-softBrown overflow-x-hidden">
      {/* Desktop Magnetic Ring Custom Cursor */}
      <CustomCursor />

      {/* Floating Golden Flower Petals */}
      <PetalsOverlay active={isEnvelopeOpened} count={8} />

      {/* Smart Intro Loader */}
      <IntroLoader onFinish={() => setIsLoaderFinished(true)} />

      {/* Digital Fullscreen 3D Opening Envelope */}
      <AnimatePresence>
        {isLoaderFinished && !isEnvelopeOpened && (
          <InvitationEnvelope
            guestName={guestName}
            t={t}
            currentLang={currentLang}
            onSelectLang={setCurrentLang}
            onOpenEnvelope={handleEnvelopeOpened}
          />
        )}
      </AnimatePresence>

      {/* Floating Global Controls (Music & Language & Nav) */}
      <MusicPlayer ref={musicPlayerRef} autoStart={shouldAutoPlayMusic} />

      {isEnvelopeOpened && (
        <>
          <ScrollProgress />
          <LanguageSwitcher currentLang={currentLang} onSelectLang={setCurrentLang} />
          <Navigation t={t} />
        </>
      )}

      {/* Main Digital Wedding Experience Content */}
      {isEnvelopeOpened && (
        <main className="relative z-10">
          
          {/* Breathtaking Parallax Video Hero Section */}
          <Hero
            t={t}
            onSaveDate={handleSaveDateClick}
            onExploreStory={handleExploreStoryClick}
          />

          {/* Dynamic Personalized Guest Greeting Banner */}
          <GuestWelcome guestName={guestName} t={t} />

          {/* Interactive Scratch-to-Reveal Wedding Date */}
          <ScratchDate t={t} />

          {/* Animated 4-Unit Countdown Timer */}
          <Countdown t={t} />

          {/* Bride & Groom Editorial Profiles */}
          <CoupleIntro t={t} />

          {/* Love Note Separator 1 */}
          <LoveNote
            quote="Out of all the people, in all the world, we found each other."
            bgImage={weddingConfig.story[0]?.image}
          />

          {/* Cinematic Our Story Timeline */}
          <OurStory t={t} />

          {/* Couple Story Video */}
          <StoryVideo t={t} />

          {/* Redesigned Luxury 3D Wedding Celebrations Showcase */}
          <Events t={t} />

          {/* Day-of Ceremony Itinerary */}
          <WeddingTimeline t={t} />

          {/* Love Note Separator 2 */}
          <LoveNote
            quote="In your eyes, I found my home. In your heart, I found my forever."
            bgImage={weddingConfig.story[3]?.image}
          />

          {/* Destination Venue Map & Directions */}
          <Venue t={t} />

          {/* Interactive Polaroid Memory Cards */}
          <MemoryCards t={t} />

          {/* Editorial Photo Gallery with Lightbox */}
          <Gallery t={t} />

          {/* Patel & Shah Family Showcase */}
          <Family t={t} />

          {/* Share Invitation & Instagram Hashtag */}
          <ShareInvitation t={t} />

          {/* "Our Forever Starts Here" Final Section */}
          <FinalSection t={t} />

        </main>
      )}
    </div>
  );
}
