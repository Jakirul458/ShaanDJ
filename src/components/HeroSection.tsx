
// import { useState, useEffect } from "react";
// import YouTube from "react-youtube";
// import { Button } from "@/components/ui/button";
// import { Play, Music, Volume2, VolumeX } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import api from "@/lib/api"; // axios instance

// interface Song {
//   _id: string;
//   title: string;
//   views: string;
//   duration: string;
//   lang: string;
//   thumbnail?: string;
//   videoId: string;
//   link: string;
// }

// const HeroSection = () => {
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLatestSongs = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get("/songs");
//         const allSongs: Song[] = response.data.data || [];
//         setSongs(allSongs.slice(0, 3)); // latest 3 song
//       } catch (error) {
//         console.error("Failed to fetch songs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLatestSongs();
//   }, []);

//   return (
//     <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
//         <div className="absolute top-20 left-20 w-32 h-32 md:w-40 md:h-40 bg-primary/20 rounded-full blur-3xl animate-float"></div>
//         <div
//           className="absolute bottom-20 right-20 w-44 h-44 md:w-60 md:h-60 bg-secondary/20 rounded-full blur-3xl animate-float"
//           style={{ animationDelay: "1s" }}
//         />
//         <div
//           className="absolute top-1/2 left-1/2 w-60 h-60 md:w-80 md:h-80 bg-accent/10 rounded-full blur-3xl animate-float"
//           style={{ animationDelay: "2s" }}
//         />
//       </div>

//       <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
//         {/* Title */}
//         <h1 className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-6">
//           <img src="/logo.svg" alt="VDJ shaan Logo" className="h-20 w-20 md:h-28 lg:h-48 object-contain animate-glow" />
//           <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-neon animate-glow mt-2 md:mt-0">
//             VDJ Shaan
//           </span>
//           <img src="/logo.svg" alt="VDJ shaan Logo" className="h-20 w-20 md:h-28 lg:h-48 object-contain animate-glow" />
//         </h1>

//         <h2 className="text-foreground text-lg md:text-2xl mt-2">
//           Your vibe, My mashup world
//         </h2>

//         <p className="text-base md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
//           <span className="text-primary glow-purple">One channel, endless mashups</span> –{" "}
//           <span className="text-secondary glow-yellow">for your vibes and emotions</span>
//         </p>

//         {/* CTA */}
//         <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12">
//           <Button
//             size="lg"
//             onClick={() => window.open("https://www.youtube.com/@vdjshaan", "_blank")}
//             className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-lg px-6 py-4 animate-pulse-glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
//           >
//             <Play className="mr-2 h-6 w-6" />
//             Explore YouTube
//           </Button>

//           <Button
//             variant="outline"
//             size="lg"
//             onClick={() =>
//               window.open("https://open.spotify.com/artist/1AElbGTdtp3Uly2j6U4JpX", "_blank")
//             }
//             className="border-primary text-primary hover:bg-primary/10 text-lg px-6 py-4 glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
//           >
//             <Music className="mr-2 h-6 w-6" />
//             Listen Spotify
//           </Button>
//         </div>

//         {/* Latest Songs */}
//         <div className="mt-8 md:mt-12 max-w-5xl mx-auto">
//           <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">
//             Latest Releases
//           </h2>

//           {loading ? (
//             // Loader
//             <div className="flex justify-center items-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//             </div>
//           ) : songs.length === 0 ? (
//             <p className="text-muted-foreground text-center">No songs available</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
//               {songs.map((song, index) => (
//                 <YouTubeVideoCard key={song._id} song={song} index={index} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// const YouTubeVideoCard = ({ song, index }: { song: Song; index: number }) => {
//   const [muted, setMuted] = useState(true);

//   const playerOptions = {
//     height: "192",
//     width: "100%",
//     playerVars: {
//       autoplay: 1,
//       controls: 0,
//       mute: muted ? 1 : 0, // Autoplay works only if muted
//       loop: 1,
//       modestbranding: 1,
//       rel: 0,
//       playlist: song.videoId,
//     },
//   };

//   const toggleMute = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setMuted((prev) => !prev);
//   };

//   return (
//     <Card
//       className="group cursor-pointer border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-float"
//       style={{ animationDelay: `${index * 0.1}s` }}
//       onClick={() => window.open(song.link, "_blank")}
//     >
//       <CardContent className="p-0 relative">
//         <YouTube videoId={song.videoId} opts={playerOptions} />

//         {/* Mute/Unmute Button */}
//         <button
//           onClick={toggleMute}
//           className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full hover:bg-primary transition z-10"
//           title={muted ? "Unmute" : "Mute"}
//         >
//           {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
//         </button>

//         {/* Duration + Lang badges */}
//         <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded z-10">
//           {song.duration}
//         </div>
//         <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded z-10">
//           {song.lang}
//         </div>

//         <div className="p-4">
//           <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
//             {song.title}
//           </h3>
//           <div className="flex items-center justify-between text-sm text-muted-foreground">
//             <span>{song.views}</span>
//             <span className="text-primary font-medium">Watch Now</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default HeroSection;



//===========================================================================================================

import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";
import { Play, Music, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";

import HeroImage from "@/asset/gurudongmar.jpg";



interface Song {
  _id: string;
  title: string;
  views: string;
  duration: string;
  lang: string;
  thumbnail?: string;
  videoId: string;
  link: string;
}

const HeroSection = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestSongs = async () => {
      try {
        setLoading(true);
        const response = await api.get("/songs");
        const allSongs: Song[] = response.data.data || [];
        setSongs(allSongs.slice(0, 3)); // latest 3 songs
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestSongs();
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
        <div className="absolute top-20 left-20 w-32 h-32 md:w-40 md:h-40 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-44 h-44 md:w-60 md:h-60 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-60 h-60 md:w-80 md:h-80 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Title */}
        {/* <h1 className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-6">
          <img
            src="/logo.svg"
            alt="VDJ shaan Logo"
            className="h-20 w-20 md:h-28 lg:h-48 object-contain animate-glow"
          />
          <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-neon animate-glow mt-2 md:mt-0">
            VDJ Shaan
          </span>
          <img
            src="/logo.svg"
            alt="VDJ shaan Logo"
            className="h-20 w-20 md:h-28 lg:h-48 object-contain animate-glow"
          />
        </h1> */}

     <img
  src={HeroImage}
  alt="VDJ Shaan"
  className="w-full h-[50vh] object-cover animate-glow rounded-2xl shadow-lg mt-16 md:mt-20"
/>



        <h2 className="text-foreground text-lg md:text-2xl mt-2">
          Your vibe, My DJ world
        </h2>

        <p className="text-base md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          <span className="text-primary glow-purple">One channel and album, Endless DJ</span> –{" "}
          <span className="text-secondary glow-yellow">for your vibes and emotions</span>
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={() => window.open("https://www.youtube.com/@vdjshaan", "_blank")}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-lg px-6 py-4 animate-pulse-glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <Play className="mr-2 h-6 w-6" />
            Explore YouTube
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              window.open("https://open.spotify.com/artist/1AElbGTdtp3Uly2j6U4JpX", "_blank")
            }
            className="border-primary text-primary hover:bg-primary/10 text-lg px-6 py-4 glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <Music className="mr-2 h-6 w-6" />
            Listen Spotify
          </Button>
        </div>

        {/* Latest Songs */}
        <div className="mt-8 md:mt-12 max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">
            Latest Releases
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : songs.length === 0 ? (
            <p className="text-muted-foreground text-center">No songs available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {songs.map((song, index) => (
                <YouTubeVideoCard key={song._id} song={song} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const YouTubeVideoCard = ({ song, index }: { song: Song; index: number }) => {
  const [muted, setMuted] = useState(true);

  const playerOptions = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: muted ? 1 : 0,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      playlist: song.videoId,
    },
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
  };

  return (
    <Card
      className="group border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 
                 transition-all duration-300 hover:scale-105 animate-float cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => window.open(song.link, "_blank")}
    >
      <CardContent className="p-0">
        {/* Video container like AlbumSection's image */}
        <div className="relative w-full h-72 overflow-hidden rounded-t-xl">
          <YouTube videoId={song.videoId} opts={playerOptions} className="w-full h-full" />

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full 
                       hover:bg-primary transition z-10"
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Duration + Lang badges */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded z-10">
            {song.duration}
          </div>
          <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded z-10">
            {song.lang}
          </div>
        </div>

        {/* Text Content like AlbumSection */}
        <div className="p-4 text-left">
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {song.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{song.views}</span>
            <span className="text-primary font-medium">Watch Now</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSection;
