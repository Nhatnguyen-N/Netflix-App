import EpisodeListItem from "@/src/components/EpisodeListItem";
import MediaHeader from "@/src/components/MediaHeader";
import MediaInfo from "@/src/components/MediaInfo";
import SeasonSelector from "@/src/components/SeasonSelectorMenu";
import { Episode } from "@/src/types/types";
import mediaDetailedList from "@assets/data/mediaDetailedList.json";
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function MediaDetails() {
  const { id } = useLocalSearchParams();
  const mediaItem = mediaDetailedList.find((media) => media.id === id);
  const videoViewRef = useRef<VideoView | null>(null);

  const [selectedSeason, setSelectedSeason] = useState<string>("Season 1");
  const [seasonEpisodes, setSeasonEpisodes] = useState<Episode[]>([]);
  const [episodeLoadingId, setEpisodeLoadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!mediaItem || mediaItem.type !== "TV_SERIES") return;

    const season = mediaItem.seasons?.find(
      (seasonItem) => seasonItem.seasonName === selectedSeason
    );

    setSeasonEpisodes(season?.episodes || []);
  }, [selectedSeason]);

  if (!mediaItem) {
    return <Text>Media Not Founds!</Text>;
  }
  const {
    type,
    title,
    description,
    releaseYear,
    ageRestriction,
    duration,
    thumbnail,
    trailer,
    videoUrl,
    seasons,
  } = mediaItem;
  const videoSource =
    type === "MOVIE" ? videoUrl : seasons?.[0].episodes?.[0].videoUrl;

  if (!videoSource) {
    return <Text>No playable video found.</Text>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const trailerPlayer = useVideoPlayer(trailer, (player) => {
    player.currentTime = 10;
    player.play();
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mediaPlayer = useVideoPlayer(videoSource, (player) => {
    player.showNowPlayingNotification = true;
  });

  const onPlayMediaPressed = async (video?: string, episodeId?: string) => {
    trailerPlayer.pause();
    if (video && episodeId) {
      setEpisodeLoadingId(episodeId);
      await mediaPlayer.replaceAsync(video);
      setEpisodeLoadingId(null);
    }
    videoViewRef.current?.enterFullscreen();
    mediaPlayer.play();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MediaHeader
        thumbnail={thumbnail}
        trailerPlayer={trailerPlayer}
        mediaPlayer={mediaPlayer}
        videoViewRef={videoViewRef}
      />
      <FlatList
        data={seasonEpisodes}
        renderItem={({ item }) => (
          <EpisodeListItem
            episode={item}
            onPlayMediaPressed={onPlayMediaPressed}
            isEpisodeLoading={episodeLoadingId === item.id}
          />
        )}
        ListHeaderComponent={
          <View style={{ padding: 10, gap: 5 }}>
            <MediaInfo
              title={title}
              releaseYear={releaseYear}
              ageRestriction={ageRestriction}
              duration={duration}
              description={description}
              type={type}
              nrOfSeasons={seasons?.length}
              onPlayMediaPressed={onPlayMediaPressed}
            />
            {type === "TV_SERIES" && !!seasons && (
              <SeasonSelector
                seasons={seasons}
                selectedSeason={selectedSeason}
                setSelectedSeason={setSelectedSeason}
              />
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}
