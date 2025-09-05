import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music } from "lucide-react";
import api from "@/lib/api";

const UpdateSong = () => {
  const [songId, setSongId] = useState("");
  const [song, setSong] = useState({
    title: "",
    duration: "",
    lang: "",
    link: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSong(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put(`/songs/${songId}`, song, { withCredentials: true });
      if (res.data.success) {
        setSuccess("✅ Song updated successfully!");
        setError("");
      } else {
        setError(res.data.message || "Failed to update song.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="min-h-[80vh] flex items-center justify-center">
            <Card className="max-w-lg w-full bg-card/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <Music className="h-10 w-10 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">
                    <span className="text-neon animate-glow">Update</span>{" "}
                    <span className="text-foreground">Song</span>
                  </h1>
                  <p className="text-muted-foreground">Modify existing track details</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"><p className="text-destructive">{error}</p></div>}
                  {success && <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"><p className="text-green-600">{success}</p></div>}

                  <Input
                    type="text"
                    name="songId"
                    value={songId}
                    onChange={(e) => setSongId(e.target.value)}
                    placeholder="Song ID"
                    required
                  />
                  <Input
                    type="text"
                    name="title"
                    value={song.title}
                    onChange={handleChange}
                    placeholder="New Title"
                  />
                  <Input
                    type="text"
                    name="duration"
                    value={song.duration}
                    onChange={handleChange}
                    placeholder="New Duration"
                  />
                  <Input
                    type="text"
                    name="lang"
                    value={song.lang}
                    onChange={handleChange}
                    placeholder="New Language"
                  />
                  <Input
                    type="text"
                    name="link"
                    value={song.link}
                    onChange={handleChange}
                    placeholder="New YouTube Link"
                  />

                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 animate-pulse-glow">
                    Update Song
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UpdateSong;
