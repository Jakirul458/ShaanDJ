import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

// import Image1 from "@/assets/about1.jpg";
// import Image2 from "@/assets/about2.jpg";
// import Image3 from "@/assets/about3.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">🎧 About</span>{" "}
              <span className="text-neon animate-glow">VDJ Shaan</span>
            </h1>
          </div>

          {/* Story Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8 md:p-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
                 <h2 className="text-3xl font-bold mb-6 text-primary text-center">🌌 The Journey</h2>
                <p>
                  From the bustling club scene of Mumbai to the global stage,
                  VDJ Shaan’s journey is a story of sound, struggle, and evolution.
                </p>
                <p>
                  He began in 2008 as a video editor, shaping visuals before realizing his true calling in music. By 2012, he had transitioned into VDJing — bringing visuals and beats together in a way India had never seen before. What started with Bollywood remixes soon became the foundation of a new sound.
                </p>
                <p>
                  Shaan built his name remixing and reimagining India’s most iconic songs for the dancefloor, but he didn’t stop there. He evolved — introducing Afro house rhythms, Arabic textures, and global club energy into his sets and productions. This transformation gave birth to the Mirage series: not just albums, but a cultural movement that blends Bollywood nostalgia with international electronic vibes.
                </p>
                <p>
                  Today, with the launch of Mirage Records, Shaan is stepping into the next chapter: original music. From Bollywood remixes to Afro-fusion edits, and now to original productions, his story is about constant reinvention without losing identity.
                </p>
                <p>
                  Crowned by the Times Group as India’s No.1 VDJ, and having worked with legends like Sonu Nigam, Salim–Sulaiman, and Singer Shaan, Shaan is no longer just an artist — he is a brand, a storyteller, and a global ambassador of India’s fusion sound.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mirage Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8 md:p-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
                <h2 className="text-3xl font-bold mb-6 text-primary text-center">🌌 About Mirage Music</h2>
                <p>
                  Mirage is not just music — it’s a movement. Born from VDJ Shaan’s vision to merge Bollywood soul with Afro house and Arabic rhythms, Mirage has redefined the sound of Indian dancefloors. What began as an experimental fusion has now become a full-fledged culture — a sound that is unmistakably Shaan’s.
                </p>
                <p>
                  From Mirage 1 to Mirage 4, every edition has pushed boundaries, delivering fresh edits and global club-ready cuts. Mirage has built a loyal following not only across India’s clubs and festivals, but also among international DJs and listeners who connect with its unique blend of nostalgia and innovation.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    In India, Mirage tracks have become staples in the nightlife scene, setting clubs ablaze from Mumbai to Goa, Delhi to Bangalore.
                  </li>
                  <li>
                    Globally, Mirage has reached audiences in Dubai, London, and beyond, resonating with crowds hungry for a sound that feels both familiar and futuristic.
                  </li>
                </ul>
                <p>
                  With Mirage 5 on the horizon and the launch of Mirage Records, the vision is clearer than ever: to take this Indian-born global fusion sound to every corner of the world. Mirage isn’t just an album drop — it’s a cultural wave, and the world is beginning to ride it.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Image Gallery */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <img src={Image1} alt="VDJ Shaan 1" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300" />
            <img src={Image2} alt="VDJ Shaan 2" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300" />
            <img src={Image3} alt="VDJ Shaan 3" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300" />
          </div> */}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
