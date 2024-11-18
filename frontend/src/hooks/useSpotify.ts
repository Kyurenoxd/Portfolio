"use client";

import { useState, useEffect } from 'react';
import type { SpotifyTrack } from '@/types/spotify';

export function useSpotify() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/spotify/current-track');
        if (!response.ok) {
          throw new Error('Failed to fetch track');
        }
        const data = await response.json();
        if (data.is_playing === false) {
          setTrack(null);
        } else {
          setTrack(data);
        }
      } catch (error) {
        console.error('Error fetching track:', error);
        setTrack(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 1000);

    return () => clearInterval(interval);
  }, []);

  return { track, loading };
} 